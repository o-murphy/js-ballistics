// wasm/bindings.cpp
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include "bclibc.hpp"

using namespace emscripten;
using namespace bclibc;

constexpr double APEX_IS_MAX_RANGE_RADIANS = 0.0003;
constexpr double ALLOWED_ZERO_ERROR_FEET = 1e-2;

// ============================================================================
// Type Aliases
// ============================================================================

using DragTableIface = val;
using WindsIfaceList = val;

enum class IntegrationMethod
{
    RK4,
    EULER
};

struct DragTablePoint
{
public:
    double Mach;
    double CD;
};

struct ShotPropsInput
{
public:
    double bc;
    double look_angle_rad;
    double twist_inch;
    double length_inch;
    double diameter_inch;
    double weight_grain;
    double barrel_elevation_rad;
    double barrel_azimuth_rad;
    double sight_height_ft;
    double cant_angle_rad;
    double alt0_ft;
    double muzzle_velocity_fps;
    DragTableIface drag_table;
    BCLIBC_Atmosphere atmo;
    BCLIBC_Coriolis coriolis;
    WindsIfaceList winds;
    // options
    IntegrationMethod method;
    BCLIBC_Config config;
};

struct TrajectoryRequest
{
public:
    double range_limit_ft;
    double range_step_ft;
    double time_step;
    bool dense_output;
    BCLIBC_TrajFlag filter_flags;
};

struct Interception
{
public:
    BCLIBC_BaseTrajData raw_data;
    BCLIBC_TrajectoryData full_data;
};

struct HitOutput
{
public:
    val trajectory = val::array();
    val dense_trajectory = val::array();
    BCLIBC_TerminationReason reason = BCLIBC_TerminationReason();
};

inline static BCLIBC_WindSock windSockFromVal(const WindsIfaceList &winds)
{
    BCLIBC_WindSock sock;

    if (winds.isUndefined() || winds.isNull() || !winds.isArray())
    {
        return sock;
    }

    try
    {
        unsigned length = winds["length"].as<unsigned>();
        for (unsigned i = 0; i < length; i++)
        {
            sock.push(winds[i].as<BCLIBC_Wind>());
        }
    }
    catch (...)
    {
        std::invalid_argument("Array of Winds has invalid format");
    }
    sock.update_cache();
    return sock;
}

inline static BCLIBC_MachList machListFromVal(const DragTableIface &drag_table)
{
    BCLIBC_MachList list;

    if (!drag_table.isUndefined() && !drag_table.isNull())
    {
        unsigned length = drag_table["length"].as<unsigned>();
        for (unsigned i = 0; i < length; i++)
        {
            auto point = drag_table[i];
            list.push_back(point["Mach"].as<double>());
        }
    }

    return list;
}

// ============================================================================
// Helper: PCHIP Curve Generation
// ============================================================================

/**
 * @brief Creates a BCLIBC_Curve from JavaScript array of {Mach, CD} objects
 * using PCHIP (Piecewise Cubic Hermite Interpolating Polynomial) algorithm.
 */
inline static BCLIBC_Curve curveFromVal(const DragTableIface &drag_table)
{
    if (drag_table.isUndefined() || drag_table.isNull())
    {
        throw std::invalid_argument("Curve data is undefined or null");
    }

    unsigned n = drag_table["length"].as<unsigned>();

    if (n < 2)
    {
        throw std::invalid_argument("BCLIBC_Curve requires at least 2 data points");
    }

    // Extract x (Mach) and y (CD)
    std::vector<double> x(n);
    std::vector<double> y(n);

    for (unsigned i = 0; i < n; ++i)
    {
        auto item = drag_table[i];
        x[i] = item["Mach"].as<double>();
        y[i] = item["CD"].as<double>();
    }

    // Calculate PCHIP slopes and coefficients
    int nm1 = n - 1;

    std::vector<double> h(nm1);
    std::vector<double> d(nm1);
    std::vector<double> m(n);

    BCLIBC_Curve curve_points(nm1);

    // Steps and finite differences
    for (int i = 0; i < nm1; ++i)
    {
        h[i] = x[i + 1] - x[i];
        d[i] = (y[i + 1] - y[i]) / h[i];
    }

    // Calculate slopes
    if (n == 2)
    {
        m[0] = d[0];
        m[1] = d[0];
    }
    else
    {
        // Interior slopes (Fritsch–Carlson)
        for (int i = 1; i < (int)n - 1; ++i)
        {
            if (d[i - 1] == 0.0 || d[i] == 0.0 || d[i - 1] * d[i] < 0.0)
            {
                m[i] = 0.0;
            }
            else
            {
                double w1 = 2.0 * h[i] + h[i - 1];
                double w2 = h[i] + 2.0 * h[i - 1];
                m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]);
            }
        }

        // Left endpoint
        double m0 = ((2.0 * h[0] + h[1]) * d[0] - h[0] * d[1]) / (h[0] + h[1]);
        if (m0 * d[0] <= 0.0)
            m0 = 0.0;
        else if ((d[0] * d[1] < 0.0) && (std::fabs(m0) > 3.0 * std::fabs(d[0])))
            m0 = 3.0 * d[0];
        m[0] = m0;

        // Right endpoint
        double mn = ((2.0 * h[n - 2] + h[n - 3]) * d[n - 2] - h[n - 2] * d[n - 3]) /
                    (h[n - 2] + h[n - 3]);
        if (mn * d[n - 2] <= 0.0)
            mn = 0.0;
        else if ((d[n - 2] * d[n - 3] < 0.0) && (std::fabs(mn) > 3.0 * std::fabs(d[n - 2])))
            mn = 3.0 * d[n - 2];
        m[n - 1] = mn;
    }

    // Build cubic coefficients
    for (int i = 0; i < nm1; ++i)
    {
        double H = h[i];
        double yi = y[i];
        double mi = m[i];
        double mip1 = m[i + 1];

        double A = (y[i + 1] - yi - mi * H) / (H * H);
        double B = (mip1 - mi) / H;

        curve_points[i].a = (B - 2.0 * A) / H;
        curve_points[i].b = 3.0 * A - B;
        curve_points[i].c = mi;
        curve_points[i].d = yi;
    }

    return curve_points;
}

double interpolate2pt(
    double x, double x0, double y0, double x1, double y1)
{
    double result;
    BCLIBC_InterpStatus status = BCLIBC_interpolate2pt(x, x0, y0, x1, y1, result);

    if (status != BCLIBC_InterpStatus::SUCCESS)
    {
        throw std::domain_error("Zero division error during interpolation");
    }
    return result;
}

inline static double selectCalcStep(const IntegrationMethod method)
{

    switch (method)
    {
    case IntegrationMethod::RK4:
        return 0.0025;
        break;
    case IntegrationMethod::EULER:
        return 0.5;
        break;
    default:
        throw std::invalid_argument("Unknown integration method");
        break;
    }
}

BCLIBC_IntegrateCallable selectIntegrationMethod(const IntegrationMethod &method)
{
    switch (method)
    {
    case IntegrationMethod::RK4:
        return BCLIBC_integrateRK4;
        break;
    case IntegrationMethod::EULER:
        return BCLIBC_integrateEULER;
        break;
    default:
        throw std::invalid_argument("Unknown integration method");
        break;
    }
}

BCLIBC_ShotProps shotPropsFromVal(const ShotPropsInput &props)
{
    return BCLIBC_ShotProps(
        props.bc,
        props.look_angle_rad,
        props.twist_inch,
        props.length_inch,
        props.diameter_inch,
        props.weight_grain,
        props.barrel_elevation_rad,
        props.barrel_azimuth_rad,
        props.sight_height_ft,
        std::cos(props.cant_angle_rad),
        std::sin(props.cant_angle_rad),
        props.alt0_ft,
        selectCalcStep(props.method) * props.config.cStepMultiplier,
        props.muzzle_velocity_fps,
        0.0,
        curveFromVal(props.drag_table),
        machListFromVal(props.drag_table),
        props.atmo,
        props.coriolis,
        windSockFromVal(props.winds),
        BCLIBC_TRAJ_FLAG_NONE);
}

// ============================================================================
// Exception Handling Utilities
// ============================================================================

/**
 * @brief Creates a JavaScript Error constructor from the global scope
 * @param className Name of the Error class (e.g., "SolverRuntimeError")
 * @return JavaScript Error constructor function
 */
inline static val getErrorConstructor(const std::string& className)
{
    // Try to get custom error class from globalThis, fall back to Error
    try {
        val globalThis = val::global("globalThis");
        if (!globalThis.isUndefined()) {
            val errorClass = globalThis[className];
            // Check if it's a function by trying to use it as a constructor
            if (!errorClass.isUndefined()) {
                return errorClass;
            }
        }
    } catch (...) {
        // Fall back to standard Error
    }
    return val::global("Error");
}

/**
 * @brief Converts C++ exception to JavaScript Error with proper type
 * @param e C++ exception
 * @param errorType JavaScript error type name
 */
template<typename ExceptionType>
inline static void throwAsJsError(const ExceptionType& e, const std::string& errorType)
{
    val ErrorClass = getErrorConstructor(errorType);
    // Call the constructor with 'new' keyword
    val error = ErrorClass.new_(std::string(e.what()));
    // Set prototype to ensure instanceof works
    error.set("__proto__", ErrorClass["prototype"]);
    error.set("name", val(errorType));
    error.throw_();
}

/**
 * @brief Converts BCLIBC_OutOfRangeError to JavaScript OutOfRangeError
 */
inline static void throwOutOfRangeError(const BCLIBC_OutOfRangeError& e)
{
    val ErrorClass = getErrorConstructor("OutOfRangeError");
    val error = ErrorClass.new_(std::string(e.what()));
    error.set("__proto__", ErrorClass["prototype"]);
    error.set("name", val("OutOfRangeError"));
    error.set("requestedDistanceFt", e.requested_distance_ft);
    error.set("maxRangeFt", e.max_range_ft);
    error.set("lookAngleRad", e.look_angle_rad);
    error.throw_();
}

/**
 * @brief Converts BCLIBC_ZeroFindingError to JavaScript ZeroFindingError
 */
inline static void throwZeroFindingError(const BCLIBC_ZeroFindingError& e)
{
    val ErrorClass = getErrorConstructor("ZeroFindingError");
    val error = ErrorClass.new_(std::string(e.what()));
    error.set("__proto__", ErrorClass["prototype"]);
    error.set("name", val("ZeroFindingError"));
    error.set("zeroFindingError", e.zero_finding_error);
    error.set("iterationsCount", e.iterations_count);
    error.set("lastBarrelElevationRad", e.last_barrel_elevation_rad);
    error.throw_();
}

/**
 * @brief Converts BCLIBC_InterceptionError to JavaScript InterceptionError
 */
inline static void throwInterceptionError(const BCLIBC_InterceptionError& e)
{
    val ErrorClass = getErrorConstructor("InterceptionError");
    val error = ErrorClass.new_(std::string(e.what()));
    error.set("__proto__", ErrorClass["prototype"]);
    error.set("name", val("InterceptionError"));
    // TODO: Convert rawData and fullData to JS objects if needed
    error.throw_();
}

/**
 * @brief Universal exception handler wrapper template
 * Wraps any callable and converts C++ exceptions to JavaScript errors
 */
template<typename Func>
inline static auto wrapExceptions(Func&& func) -> decltype(func())
{
    try {
        return func();
    }
    catch (const BCLIBC_OutOfRangeError& e) {
        throwOutOfRangeError(e);
        throw; // unreachable, but needed for compiler
    }
    catch (const BCLIBC_ZeroFindingError& e) {
        throwZeroFindingError(e);
        throw; // unreachable, but needed for compiler
    }
    catch (const BCLIBC_InterceptionError& e) {
        throwInterceptionError(e);
        throw; // unreachable, but needed for compiler
    }
    catch (const BCLIBC_SolverRuntimeError& e) {
        throwAsJsError(e, "SolverRuntimeError");
        throw; // unreachable, but needed for compiler
    }
    catch (const std::exception& e) {
        // Generic fallback for any other std::exception
        val error = val::global("Error").new_(std::string(e.what()));
        error.throw_();
        throw; // unreachable, but needed for compiler
    }
}

inline static void initEngine(BCLIBC_BaseEngine &engine, const ShotPropsInput &shotProps)
{
    engine.integrate_func = selectIntegrationMethod(shotProps.method);
    engine.config = shotProps.config;
    engine.shot = shotPropsFromVal(shotProps);
    engine.gravity_vector = BCLIBC_V3dT(0.0, engine.config.cGravityConstant, 0.0);
}

inline static BCLIBC_TrajectoryData findApex(const ShotPropsInput &shotProps)
{
    return wrapExceptions([&]() {
        BCLIBC_BaseEngine engine;
        initEngine(engine, shotProps);

        BCLIBC_BaseTrajData apex;
        engine.find_apex(apex);

        return BCLIBC_TrajectoryData(engine.shot, apex, BCLIBC_TRAJ_FLAG_APEX);
    });
}

inline static BCLIBC_MaxRangeResult findMaxRange(const ShotPropsInput &shotProps, double low_angle_deg, double high_angle_deg)
{
    return wrapExceptions([&]() {
        BCLIBC_BaseEngine engine;
        initEngine(engine, shotProps);

        return engine.find_max_range(
            low_angle_deg,
            high_angle_deg,
            APEX_IS_MAX_RANGE_RADIANS);
    });
}

inline static double findZeroAngle(const ShotPropsInput &shotProps, double distance)
{
    return wrapExceptions([&]() {
        BCLIBC_BaseEngine engine;
        initEngine(engine, shotProps);
        return engine.zero_angle_with_fallback(
            distance,
            APEX_IS_MAX_RANGE_RADIANS,
            ALLOWED_ZERO_ERROR_FEET);
    });
}

inline static HitOutput integrate(const ShotPropsInput &shotProps, const TrajectoryRequest &request)
{
    return wrapExceptions([&]() {
        HitOutput obj = HitOutput();

        std::vector<BCLIBC_TrajectoryData> filtered_records;
        BCLIBC_BaseTrajSeq dense_trajectory;

        BCLIBC_BaseEngine engine;
        initEngine(engine, shotProps);

        engine.integrate_filtered(
            request.range_limit_ft,
            request.range_step_ft,
            request.time_step,
            request.filter_flags,
            filtered_records,
            obj.reason,
            request.dense_output ? &dense_trajectory : nullptr);

        for (const auto &row : filtered_records)
        {
            obj.trajectory.call<void>("push", row);
        }

        if (request.dense_output)
        {
            for (ssize_t i = 0; i < dense_trajectory.get_length(); ++i)
            {
                obj.dense_trajectory.call<void>("push", dense_trajectory[i]);
            }
        }
        return obj;
    });
}

inline static Interception integrateRawAt(const ShotPropsInput &shotProps, const BCLIBC_BaseTrajData_InterpKey &key, const double &target_value)
{
    return wrapExceptions([&]() {
        BCLIBC_TerminationReason reason;
        BCLIBC_BaseTrajSeq dense_trajectory;

        BCLIBC_BaseEngine engine;
        initEngine(engine, shotProps);
        Interception result = {};

        engine.integrate_at(key, target_value, result.raw_data, result.full_data);
        return result;
    });
}

inline static bool get_flat_fire_only(const BCLIBC_Coriolis &obj)
{
    return obj.flat_fire_only != 0;
}

inline static void set_flat_fire_only(BCLIBC_Coriolis &obj, bool val)
{
    obj.flat_fire_only = val ? 1 : 0;
}

inline static val get_position(const BCLIBC_BaseTrajData &d)
{
    val v = val::object();
    v.set("x", d.px);
    v.set("y", d.py);
    v.set("z", d.pz);
    return v;
}

inline static void set_position(BCLIBC_BaseTrajData &d, const val &v)
{
    d.px = v["x"].as<double>();
    d.py = v["y"].as<double>();
    d.pz = v["z"].as<double>();
}

inline static val get_velocity(const BCLIBC_BaseTrajData &d)
{
    val v = val::object();
    v.set("x", d.vx);
    v.set("y", d.vy);
    v.set("z", d.vz);
    return v;
}

inline static void set_velocity(BCLIBC_BaseTrajData &d, const val &v)
{
    d.vx = v["x"].as<double>();
    d.vy = v["y"].as<double>();
    d.vz = v["z"].as<double>();
}

inline static BCLIBC_BaseTrajData interpolateBaseTrajData(
    BCLIBC_BaseTrajData_InterpKey key_kind,
    double key_value,
    const BCLIBC_BaseTrajData &p0,
    const BCLIBC_BaseTrajData &p1,
    const BCLIBC_BaseTrajData &p2)
{
    BCLIBC_BaseTrajData out;
    BCLIBC_BaseTrajData::interpolate(key_kind, key_value, p0, p1, p2, out);
    return out;
};

// ============================================================================
// Test Functions for Exception Handling
// ============================================================================

/**
 * @brief Custom C++ exception class for testing
 * Inherits from std::runtime_error and adds custom fields
 */
class TestCustomException : public std::runtime_error
{
public:
    double customValue;
    int customCount;

    TestCustomException(const std::string& message, double value, int count)
        : std::runtime_error(message), customValue(value), customCount(count) {}
};

/**
 * @brief Test function that throws std::runtime_error as JavaScript Error
 * Used to verify C++ exception to JavaScript exception conversion
 */
inline static void testThrowRuntimeError(const std::string& message)
{
    // Create and throw JavaScript Error object directly
    val error = val::global("Error").new_(message);
    error.throw_();
}

/**
 * @brief Test function that throws BCLIBC_SolverRuntimeError for testing
 * This will be caught by wrapExceptions and converted to JS SolverRuntimeError
 */
inline static void testThrowSolverError(const std::string& message)
{
    wrapExceptions([&]() {
        throw BCLIBC_SolverRuntimeError(message);
        return; // needed for template deduction
    });
}

/**
 * @brief Test function that throws custom C++ exception with additional fields
 * Converts custom exception to JavaScript Error with properties
 */
inline static void testThrowCustomException(const std::string& message, double value, int count)
{
    try {
        throw TestCustomException(message, value, count);
    }
    catch (const TestCustomException& e) {
        // Create JavaScript Error with custom properties
        val error = val::global("Error").new_(std::string(e.what()));
        error.set("customValue", e.customValue);
        error.set("customCount", e.customCount);
        error.throw_();
    }
}

EMSCRIPTEN_BINDINGS(bclibc)
{
    // ========================================================================
    // Constants
    // ========================================================================

    constant("APEX_IS_MAX_RANGE_RADIANS", APEX_IS_MAX_RANGE_RADIANS);
    constant("ALLOWED_ZERO_ERROR_FEET", ALLOWED_ZERO_ERROR_FEET);

    // ========================================================================
    // Enums
    // ========================================================================

    enum_<BCLIBC_InterpMethod>("_InterpMethod")
        .value("PCHIP", BCLIBC_InterpMethod::PCHIP)
        .value("LINEAR", BCLIBC_InterpMethod::LINEAR);

    enum_<BCLIBC_TerminationReason>("_TerminationReason")
        .value("NO_TERMINATE", BCLIBC_TerminationReason::NO_TERMINATE)
        .value("TARGET_RANGE_REACHED", BCLIBC_TerminationReason::TARGET_RANGE_REACHED)
        .value("MINIMUM_VELOCITY_REACHED", BCLIBC_TerminationReason::MINIMUM_VELOCITY_REACHED)
        .value("MAXIMUM_DROP_REACHED", BCLIBC_TerminationReason::MAXIMUM_DROP_REACHED)
        .value("MINIMUM_ALTITUDE_REACHED", BCLIBC_TerminationReason::MINIMUM_ALTITUDE_REACHED)
        .value("HANDLER_REQUESTED_STOP", BCLIBC_TerminationReason::HANDLER_REQUESTED_STOP);

    enum_<BCLIBC_TrajFlag>("_TrajFlag")
        .value("NONE", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_NONE)
        .value("ZERO_UP", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_ZERO_UP)
        .value("ZERO_DOWN", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_ZERO_DOWN)
        .value("ZERO", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_ZERO)
        .value("MACH", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_MACH)
        .value("RANGE", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_RANGE)
        .value("APEX", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_APEX)
        .value("ALL", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_ALL)
        .value("MRT", BCLIBC_TrajFlag::BCLIBC_TRAJ_FLAG_MRT);

    enum_<IntegrationMethod>("_IntegrationMethod")
        .value("RK4", IntegrationMethod::RK4)
        .value("EULER", IntegrationMethod::EULER);

    enum_<BCLIBC_BaseTrajData_InterpKey>("_BaseTrajDataInterpKey")
        .value("TIME", BCLIBC_BaseTrajData_InterpKey::TIME)
        .value("POS_X", BCLIBC_BaseTrajData_InterpKey::POS_X)
        .value("POS_Y", BCLIBC_BaseTrajData_InterpKey::POS_Y)
        .value("POS_Z", BCLIBC_BaseTrajData_InterpKey::POS_Z)
        .value("VEL_X", BCLIBC_BaseTrajData_InterpKey::VEL_X)
        .value("VEL_Y", BCLIBC_BaseTrajData_InterpKey::VEL_Y)
        .value("VEL_Z", BCLIBC_BaseTrajData_InterpKey::VEL_Z)
        .value("MACH", BCLIBC_BaseTrajData_InterpKey::MACH);

    enum_<BCLIBC_TrajectoryData_InterpKey>("_TrajectoryDataInterpKey")
        .value("TIME", BCLIBC_TrajectoryData_InterpKey::TIME)
        .value("DISTANCE", BCLIBC_TrajectoryData_InterpKey::DISTANCE)
        .value("VELOCITY", BCLIBC_TrajectoryData_InterpKey::VELOCITY)
        .value("MACH", BCLIBC_TrajectoryData_InterpKey::MACH)
        .value("HEIGHT", BCLIBC_TrajectoryData_InterpKey::HEIGHT)
        .value("SLANT_HEIGHT", BCLIBC_TrajectoryData_InterpKey::SLANT_HEIGHT)
        .value("DROP_ANGLE", BCLIBC_TrajectoryData_InterpKey::DROP_ANGLE)
        .value("WINDAGE", BCLIBC_TrajectoryData_InterpKey::WINDAGE)
        .value("WINDAGE_ANGLE", BCLIBC_TrajectoryData_InterpKey::WINDAGE_ANGLE)
        .value("SLANT_DISTANCE", BCLIBC_TrajectoryData_InterpKey::SLANT_DISTANCE)
        .value("ANGLE", BCLIBC_TrajectoryData_InterpKey::ANGLE)
        .value("DENSITY_RATIO", BCLIBC_TrajectoryData_InterpKey::DENSITY_RATIO)
        .value("DRAG", BCLIBC_TrajectoryData_InterpKey::DRAG)
        .value("ENERGY", BCLIBC_TrajectoryData_InterpKey::ENERGY)
        .value("OGW", BCLIBC_TrajectoryData_InterpKey::OGW)
        .value("FLAG", BCLIBC_TrajectoryData_InterpKey::FLAG);

    value_object<BCLIBC_Config>("_Config")
        .field("stepMultiplier", &BCLIBC_Config::cStepMultiplier)
        .field("zeroFindingAccuracy", &BCLIBC_Config::cZeroFindingAccuracy)
        .field("minimumVelocity", &BCLIBC_Config::cMinimumVelocity)
        .field("maximumDrop", &BCLIBC_Config::cMaximumDrop)
        .field("maxIterations", &BCLIBC_Config::cMaxIterations)
        .field("gravityConstant", &BCLIBC_Config::cGravityConstant)
        .field("minimumAltitude", &BCLIBC_Config::cMinimumAltitude);

    value_object<BCLIBC_Atmosphere>("_Atmosphere")
        .field("t0", &BCLIBC_Atmosphere::_t0)
        .field("a0", &BCLIBC_Atmosphere::_a0)
        .field("p0", &BCLIBC_Atmosphere::_p0)
        .field("mach", &BCLIBC_Atmosphere::_mach)
        .field("density_ratio", &BCLIBC_Atmosphere::density_ratio)
        .field("cLowestTempC", &BCLIBC_Atmosphere::cLowestTempC);

    value_object<BCLIBC_Wind>("_Wind")
        .field("velocity_fps", &BCLIBC_Wind::velocity)
        .field("direction_from_rad", &BCLIBC_Wind::direction_from)
        .field("until_distance_ft", &BCLIBC_Wind::until_distance)
        .field("MAX_DISTANCE_FEET", &BCLIBC_Wind::MAX_DISTANCE_FEET);

    value_object<BCLIBC_Coriolis>("_Coriolis")
        .field("sin_lat", &BCLIBC_Coriolis::sin_lat)
        .field("cos_lat", &BCLIBC_Coriolis::cos_lat)
        .field("sin_az", &BCLIBC_Coriolis::sin_az)
        .field("cos_az", &BCLIBC_Coriolis::cos_az)
        .field("range_east", &BCLIBC_Coriolis::range_east)
        .field("range_north", &BCLIBC_Coriolis::range_north)
        .field("cross_east", &BCLIBC_Coriolis::cross_east)
        .field("cross_north", &BCLIBC_Coriolis::cross_north)
        .field("flat_fire_only", &get_flat_fire_only, &set_flat_fire_only)
        .field("muzzle_velocity_fps", &BCLIBC_Coriolis::muzzle_velocity_fps);

    value_object<DragTablePoint>("_DragTablePoint")
        .field("Mach", &DragTablePoint::Mach)
        .field("CD", &DragTablePoint::CD);

    value_object<ShotPropsInput>("_ShotPropsInput")
        .field("bc", &ShotPropsInput::bc)
        .field("look_angle_rad", &ShotPropsInput::look_angle_rad)
        .field("twist_inch", &ShotPropsInput::twist_inch)
        .field("length_inch", &ShotPropsInput::length_inch)
        .field("diameter_inch", &ShotPropsInput::diameter_inch)
        .field("weight_grain", &ShotPropsInput::weight_grain)
        .field("barrel_elevation_rad", &ShotPropsInput::barrel_elevation_rad)
        .field("barrel_azimuth_rad", &ShotPropsInput::barrel_azimuth_rad)
        .field("sight_height_ft", &ShotPropsInput::sight_height_ft)
        .field("cant_angle_rad", &ShotPropsInput::cant_angle_rad)
        .field("alt0_ft", &ShotPropsInput::alt0_ft)
        .field("muzzle_velocity_fps", &ShotPropsInput::muzzle_velocity_fps)
        .field("drag_table", &ShotPropsInput::drag_table)
        .field("atmo", &ShotPropsInput::atmo)
        .field("coriolis", &ShotPropsInput::coriolis)
        .field("winds", &ShotPropsInput::winds)
        .field("method", &ShotPropsInput::method)
        .field("config", &ShotPropsInput::config);

    value_object<TrajectoryRequest>("_TrajectoryRequest")
        .field("range_limit_ft", &TrajectoryRequest::range_limit_ft)
        .field("range_step_ft", &TrajectoryRequest::range_step_ft)
        .field("time_step", &TrajectoryRequest::time_step)
        .field("dense_output", &TrajectoryRequest::dense_output)
        .field("filter_flags", &TrajectoryRequest::filter_flags);

    value_object<BCLIBC_BaseTrajData>("_BaseTrajData")
        .field("time", &BCLIBC_BaseTrajData::time)
        .field("px", &BCLIBC_BaseTrajData::px)
        .field("py", &BCLIBC_BaseTrajData::py)
        .field("pz", &BCLIBC_BaseTrajData::pz)
        .field("vx", &BCLIBC_BaseTrajData::vx)
        .field("vy", &BCLIBC_BaseTrajData::vy)
        .field("vz", &BCLIBC_BaseTrajData::vz)
        .field("mach", &BCLIBC_BaseTrajData::mach)
        .field("position", get_position, set_position)
        .field("velocity", get_velocity, set_velocity);

    value_object<BCLIBC_MaxRangeResult>("_MaxRangeResult")
        .field("angle_at_max_rad", &BCLIBC_MaxRangeResult::angle_at_max_rad)
        .field("max_range_ft", &BCLIBC_MaxRangeResult::max_range_ft);

    value_object<BCLIBC_TrajectoryData>("_TrajectoryData")
        .field("time", &BCLIBC_TrajectoryData::time)
        .field("distance_ft", &BCLIBC_TrajectoryData::distance_ft)
        .field("velocity_fps", &BCLIBC_TrajectoryData::velocity_fps)
        .field("mach", &BCLIBC_TrajectoryData::mach)
        .field("height_ft", &BCLIBC_TrajectoryData::height_ft)
        .field("slant_height_ft", &BCLIBC_TrajectoryData::slant_height_ft)
        .field("drop_angle_rad", &BCLIBC_TrajectoryData::drop_angle_rad)
        .field("windage_ft", &BCLIBC_TrajectoryData::windage_ft)
        .field("windage_angle_rad", &BCLIBC_TrajectoryData::windage_angle_rad)
        .field("slant_distance_ft", &BCLIBC_TrajectoryData::slant_distance_ft)
        .field("angle_rad", &BCLIBC_TrajectoryData::angle_rad)
        .field("density_ratio", &BCLIBC_TrajectoryData::density_ratio)
        .field("drag", &BCLIBC_TrajectoryData::drag)
        .field("energy_ft_lb", &BCLIBC_TrajectoryData::energy_ft_lb)
        .field("ogw_lb", &BCLIBC_TrajectoryData::ogw_lb)
        .field("flag", &BCLIBC_TrajectoryData::flag);

    value_object<Interception>("_Interception")
        .field("raw_data", &Interception::raw_data)
        .field("full_data", &Interception::full_data);

    value_object<HitOutput>("_HitOutput")
        .field("trajectory", &HitOutput::trajectory)
        .field("dense_trajectory", &HitOutput::dense_trajectory)
        .field("reason", &HitOutput::reason);

    register_vector<BCLIBC_Wind>("_WindList");
    register_vector<DragTablePoint>("_DragTable");

    // ========================================================================
    // Functions
    // ========================================================================

    // The functions bellow can raise custom exceptions
    function("findApex", &findApex);
    function("findMaxRange", &findMaxRange);
    function("findZeroAngle", &findZeroAngle);
    function("integrate", &integrate);
    function("integrateRawAt", &integrateRawAt);

    function("interpolateBasetrajData", &interpolateBaseTrajData);
    function("interpolateTrajectoryData", &BCLIBC_TrajectoryData::interpolate);

    // ========================================================================
    // Utility Functions
    // ========================================================================

    function("getCorrection", &BCLIBC_getCorrection);
    function("calculateEnergy", &BCLIBC_calculateEnergy);
    function("calculateOgw", &BCLIBC_calculateOgw);

    // ========================================================================
    // Test Functions (for exception handling verification)
    // ========================================================================

    function("testThrowRuntimeError", &testThrowRuntimeError);
    function("testThrowCustomException", &testThrowCustomException);
    function("testThrowSolverError", &testThrowSolverError);

    // ========================================================================
    // Interpolation Functions
    // ========================================================================

    // Hermite interpolation
    function("hermite", &BCLIBC_hermite);

    // 3-point PCHIP interpolation
    function("interpolate3pt", &BCLIBC_interpolate3pt);

    // 2-point linear interpolation (wrapper для out parameter)
    function("interpolate2pt", &interpolate2pt);

    // ========================================================================
    // Vector Class
    // ========================================================================

    // Реєструємо BCLIBC_V3dT як клас (не value_object!)
    class_<BCLIBC_V3dT>("_Vector")
        // Конструктори
        .constructor<>()
        .constructor<double, double, double>()

        // Публічні поля як властивості
        .property("x", &BCLIBC_V3dT::x)
        .property("y", &BCLIBC_V3dT::y)
        .property("z", &BCLIBC_V3dT::z)

        // Арифметичні оператори (створюють нові вектори)
        .function("add", select_overload<BCLIBC_V3dT(const BCLIBC_V3dT &) const>(&BCLIBC_V3dT::operator+))
        .function("sub", select_overload<BCLIBC_V3dT(const BCLIBC_V3dT &) const>(&BCLIBC_V3dT::operator-))
        .function("neg", select_overload<BCLIBC_V3dT() const>(&BCLIBC_V3dT::operator-))
        // .function("neg", optional_override([](const BCLIBC_V3dT& self) {
        //     return -self;
        // }))
        .function("mul", select_overload<BCLIBC_V3dT(double) const>(&BCLIBC_V3dT::operator*))
        .function("div", select_overload<BCLIBC_V3dT(double) const>(&BCLIBC_V3dT::operator/))
        .function("dot", select_overload<double(const BCLIBC_V3dT &) const>(&BCLIBC_V3dT::operator*))

        // NOTE: NOT RECOMMENDED FOR ESC! USE WRAPPERS THAT RETURNS VOID
        // In-place оператори (змінюють вектор)
        // .function("iadd", &BCLIBC_V3dT::operator+=)
        // .function("isub", &BCLIBC_V3dT::operator-=)
        // .function("imul", &BCLIBC_V3dT::operator*=)
        // .function("idiv", &BCLIBC_V3dT::operator/=)

        // In-place оператори (safe: void, без reference)
        .function("iadd", optional_override([](BCLIBC_V3dT &self, const BCLIBC_V3dT &other)
                                            { self += other; }))
        .function("isub", optional_override([](BCLIBC_V3dT &self, const BCLIBC_V3dT &other)
                                            { self -= other; }))
        .function("imul", optional_override([](BCLIBC_V3dT &self, double scalar)
                                            { self *= scalar; }))
        .function("idiv", optional_override([](BCLIBC_V3dT &self, double scalar)
                                            { self /= scalar; }))

        // Оптимізовані fused операції
        .function("fusedMultiplyAdd", &BCLIBC_V3dT::fused_multiply_add)
        .function("fusedMultiplySubtract", &BCLIBC_V3dT::fused_multiply_subtract)
        .function("linearCombination", &BCLIBC_V3dT::linear_combination)
        .function("linearCombination4", &BCLIBC_V3dT::linear_combination_4)

        // Властивості вектора
        .function("mag", &BCLIBC_V3dT::mag)
        .function("magSquared", &BCLIBC_V3dT::mag_squared)
        .function("norm", &BCLIBC_V3dT::norm)
        // NOTE: THIS IS UNSAFE! USE WRAPPER
        // .function("inorm", &BCLIBC_V3dT::normalize)
        .function("inorm", optional_override([](BCLIBC_V3dT &self)
                                             { self.normalize(); }))
        .function("toString", optional_override([](const BCLIBC_V3dT &self)
                                                { return std::string("Vector(") +
                                                         std::to_string(self.x) + ", " +
                                                         std::to_string(self.y) + ", " +
                                                         std::to_string(self.z) + ")"; }))
        .function("copy", optional_override([](const BCLIBC_V3dT &self)
                                            { return self; }));
}
