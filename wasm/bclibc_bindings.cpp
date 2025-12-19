// bclibc_bindings.cpp
#include <emscripten/bind.h>
#include "bclibc/v3d.hpp"

using namespace emscripten;
using namespace bclibc;

EMSCRIPTEN_BINDINGS(ballistics)
{
    // Реєструємо V3dT як value_object (без .constructor()!)
    value_object<BCLIBC_V3dT>("V3dT")
        .field("x", &BCLIBC_V3dT::x)
        .field("y", &BCLIBC_V3dT::y)
        .field("z", &BCLIBC_V3dT::z);

    // ========================================================================
    // Створення векторів
    // ========================================================================

    function("v3dCreate", optional_override([](double x, double y, double z)
                                            { return BCLIBC_V3dT(x, y, z); }));

    function("v3dZero", optional_override([]()
                                          { return BCLIBC_V3dT(0, 0, 0); }));

    // ========================================================================
    // Арифметичні операції (створюють нові вектори)
    // ========================================================================

    function("v3dAdd", optional_override([](const BCLIBC_V3dT &a, const BCLIBC_V3dT &b)
                                         { return a + b; }));

    function("v3dSubtract", optional_override([](const BCLIBC_V3dT &a, const BCLIBC_V3dT &b)
                                              { return a - b; }));

    function("v3dNegate", optional_override([](const BCLIBC_V3dT &v)
                                            { return -v; }));

    function("v3dMultiply", optional_override([](const BCLIBC_V3dT &v, double scalar)
                                              { return v * scalar; }));

    function("v3dDivide", optional_override([](const BCLIBC_V3dT &v, double scalar)
                                            { return v / scalar; }));

    function("v3dDot", optional_override([](const BCLIBC_V3dT &a, const BCLIBC_V3dT &b)
                                         { return a * b; }));

    // ========================================================================
    // In-place операції (змінюють вектор, швидші)
    // ========================================================================

    function("v3dAddInPlace", optional_override([](BCLIBC_V3dT &v, const BCLIBC_V3dT &other)
                                                {
        v += other;
        return v; }),
             allow_raw_pointers());

    function("v3dSubtractInPlace", optional_override([](BCLIBC_V3dT &v, const BCLIBC_V3dT &other)
                                                     {
        v -= other;
        return v; }),
             allow_raw_pointers());

    function("v3dMultiplyInPlace", optional_override([](BCLIBC_V3dT &v, double scalar)
                                                     {
        v *= scalar;
        return v; }),
             allow_raw_pointers());

    function("v3dDivideInPlace", optional_override([](BCLIBC_V3dT &v, double scalar)
                                                   {
        v /= scalar;
        return v; }),
             allow_raw_pointers());

    // ========================================================================
    // Оптимізовані fused операції
    // ========================================================================

    function("v3dFusedMultiplyAdd", optional_override([](BCLIBC_V3dT &v, const BCLIBC_V3dT &other, double scalar)
                                                      {
        v.fused_multiply_add(other, scalar);
        return v; }),
             allow_raw_pointers());

    function("v3dFusedMultiplySubtract", optional_override([](BCLIBC_V3dT &v, const BCLIBC_V3dT &other, double scalar)
                                                           {
        v.fused_multiply_subtract(other, scalar);
        return v; }),
             allow_raw_pointers());

    function("v3dLinearCombination", optional_override([](BCLIBC_V3dT &result, const BCLIBC_V3dT &vec_a, double scalar_a, const BCLIBC_V3dT &vec_b, double scalar_b)
                                                       {
        result.linear_combination(vec_a, scalar_a, vec_b, scalar_b);
        return result; }),
             allow_raw_pointers());

    function("v3dLinearCombination4", optional_override([](BCLIBC_V3dT &result, const BCLIBC_V3dT &v_a, double s_a, const BCLIBC_V3dT &v_b, double s_b, const BCLIBC_V3dT &v_c, double s_c, const BCLIBC_V3dT &v_d, double s_d)
                                                        {
        result.linear_combination_4(v_a, s_a, v_b, s_b, v_c, s_c, v_d, s_d);
        return result; }),
             allow_raw_pointers());

    // ========================================================================
    // Властивості вектора
    // ========================================================================

    function("v3dMagnitude", optional_override([](const BCLIBC_V3dT &v)
                                               { return v.mag(); }));

    function("v3dMagnitudeSquared", optional_override([](const BCLIBC_V3dT &v)
                                                      { return v.mag_squared(); }));

    function("v3dNormalized", optional_override([](const BCLIBC_V3dT &v)
                                                { return v.norm(); }));

    function("v3dNormalize", optional_override([](BCLIBC_V3dT &v)
                                               {
        v.normalize();
        return v; }),
             allow_raw_pointers());
}