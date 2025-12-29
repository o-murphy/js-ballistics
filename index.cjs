"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Ammo: () => Ammo,
  Angular: () => Angular,
  Atmo: () => Atmo,
  BCPoint: () => BCPoint,
  Calculator: () => Calculator,
  Coriolis: () => Coriolis,
  DEFAULT_CONFIG: () => DEFAULT_CONFIG,
  DangerSpace: () => DangerSpace,
  Dimension: () => Dimension,
  Distance: () => Distance,
  DragModel: () => DragModel,
  DragModelMultiBC: () => DragModelMultiBC,
  DragTables: () => DragTables,
  Energy: () => Energy,
  HitResult: () => HitResult,
  IntegrationMethod: () => IntegrationMethod,
  InterceptionError: () => InterceptionError,
  Measure: () => Measure,
  OutOfRangeError: () => OutOfRangeError,
  PreferredUnits: () => PreferredUnits,
  Pressure: () => Pressure,
  RangeError: () => RangeError,
  Shot: () => Shot,
  SolverRuntimeError: () => SolverRuntimeError,
  Temperature: () => Temperature,
  TrajFlag: () => TrajFlag,
  TrajectoryData: () => TrajectoryData,
  UNew: () => UNew,
  Unit: () => Unit,
  UnitAliasError: () => UnitAliasError,
  UnitConversionError: () => UnitConversionError,
  UnitProps: () => UnitProps,
  UnitTypeError: () => UnitTypeError,
  Vacuum: () => Vacuum,
  Velocity: () => Velocity,
  Weapon: () => Weapon,
  Weight: () => Weight,
  Wind: () => Wind,
  ZeroFindingError: () => ZeroFindingError,
  cA0: () => cA0,
  cA1: () => cA1,
  cA2: () => cA2,
  cA3: () => cA3,
  cA4: () => cA4,
  cA5: () => cA5,
  cDegreesCtoK: () => cDegreesCtoK,
  cDegreesFtoR: () => cDegreesFtoR,
  cDensityImperialToMetric: () => cDensityImperialToMetric,
  cEarthAngularVelocityRadS: () => cEarthAngularVelocityRadS,
  cGravityConstant: () => cGravityConstant,
  cGravityImperial: () => cGravityImperial,
  cLapseRateImperial: () => cLapseRateImperial,
  cLapseRateKperFoot: () => cLapseRateKperFoot,
  cLapseRateMetric: () => cLapseRateMetric,
  cLowestTempF: () => cLowestTempF,
  cMaxIterations: () => cMaxIterations,
  cMaxWindDistanceFeet: () => cMaxWindDistanceFeet,
  cMaximumDrop: () => cMaximumDrop,
  cMinimumAltitude: () => cMinimumAltitude,
  cMinimumVelocity: () => cMinimumVelocity,
  cPressureExponent: () => cPressureExponent,
  cSpeedOfSoundImperial: () => cSpeedOfSoundImperial,
  cSpeedOfSoundMetric: () => cSpeedOfSoundMetric,
  cStandardDensity: () => cStandardDensity,
  cStandardDensityMetric: () => cStandardDensityMetric,
  cStandardHumidity: () => cStandardHumidity,
  cStandardPressure: () => cStandardPressure,
  cStandardPressureMetric: () => cStandardPressureMetric,
  cStandardTemperatureC: () => cStandardTemperatureC,
  cStandardTemperatureF: () => cStandardTemperatureF,
  cStepMultiplier: () => cStepMultiplier,
  cZeroFindingAccuracy: () => cZeroFindingAccuracy,
  loadBclibc: () => loadBclibc,
  makeDataPoints: () => makeDataPoints,
  preferredUnits: () => preferredUnits,
  trajFlagName: () => trajFlagName,
  trajFlagNames: () => trajFlagNames,
  unitTypeCoerce: () => unitTypeCoerce
});
module.exports = __toCommonJS(index_exports);

// node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL(`file:${__filename}`).href : document.currentScript && document.currentScript.tagName.toUpperCase() === "SCRIPT" ? document.currentScript.src : new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/constants.ts
var cGravityImperial = 32.17405;
var cEarthAngularVelocityRadS = 72921159e-12;
var cStandardHumidity = 0;
var cPressureExponent = 5.255876;
var cA0 = 1.24871;
var cA1 = 0.0988438;
var cA2 = 152907e-8;
var cA3 = -307031e-11;
var cA4 = 421329e-12;
var cA5 = 3342e-7;
var cStandardTemperatureC = 15;
var cLapseRateKperFoot = -19812e-7;
var cLapseRateMetric = -65e-4;
var cStandardPressureMetric = 1013.25;
var cSpeedOfSoundMetric = 20.0467;
var cStandardDensityMetric = 1.225;
var cStandardTemperatureF = 59;
var cLapseRateImperial = -356616e-8;
var cStandardPressure = 29.92;
var cSpeedOfSoundImperial = 49.0223;
var cStandardDensity = 0.076474;
var cDegreesCtoK = 273.15;
var cDegreesFtoR = 459.67;
var cDensityImperialToMetric = 16.0185;
var cLowestTempF = -130;
var cMaxWindDistanceFeet = 1e8;

// build/bclibc.js
async function Module(moduleArg = {}) {
  var moduleRtn;
  var Module2 = moduleArg;
  var ENVIRONMENT_IS_WEB = !!globalThis.window;
  var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
  var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
  if (ENVIRONMENT_IS_NODE) {
    const { createRequire } = await import("module");
    var require2 = createRequire(importMetaUrl);
  }
  var arguments_ = [];
  var thisProgram = "./this.program";
  var quit_ = (status, toThrow) => {
    throw toThrow;
  };
  var _scriptName = importMetaUrl;
  var scriptDirectory = "";
  var readAsync, readBinary;
  if (ENVIRONMENT_IS_NODE) {
    var fs = require2("fs");
    if (_scriptName.startsWith("file:")) {
      scriptDirectory = require2("path").dirname(require2("url").fileURLToPath(_scriptName)) + "/";
    }
    readBinary = (filename) => {
      filename = isFileURI(filename) ? new URL(filename) : filename;
      var ret = fs.readFileSync(filename);
      return ret;
    };
    readAsync = async (filename, binary = true) => {
      filename = isFileURI(filename) ? new URL(filename) : filename;
      var ret = fs.readFileSync(filename, binary ? void 0 : "utf8");
      return ret;
    };
    if (process.argv.length > 1) {
      thisProgram = process.argv[1].replace(/\\/g, "/");
    }
    arguments_ = process.argv.slice(2);
    quit_ = (status, toThrow) => {
      process.exitCode = status;
      throw toThrow;
    };
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    try {
      scriptDirectory = new URL(".", _scriptName).href;
    } catch {
    }
    {
      if (ENVIRONMENT_IS_WORKER) {
        readBinary = (url) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.responseType = "arraybuffer";
          xhr.send(null);
          return new Uint8Array(xhr.response);
        };
      }
      readAsync = async (url) => {
        var response = await fetch(url, { credentials: "same-origin" });
        if (response.ok) {
          return response.arrayBuffer();
        }
        throw new Error(response.status + " : " + response.url);
      };
    }
  } else {
  }
  var out = console.log.bind(console);
  var err = console.error.bind(console);
  var wasmBinary;
  var ABORT = false;
  var isFileURI = (filename) => filename.startsWith("file://");
  function binaryDecode(bin) {
    for (var i2 = 0, l = bin.length, o = new Uint8Array(l), c; i2 < l; ++i2) {
      c = bin.charCodeAt(i2);
      o[i2] = ~c >> 8 & c;
    }
    return o;
  }
  var readyPromiseResolve, readyPromiseReject;
  var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
  var HEAP64, HEAPU64;
  var runtimeInitialized = false;
  function updateMemoryViews() {
    var b = wasmMemory.buffer;
    HEAP8 = new Int8Array(b);
    HEAP16 = new Int16Array(b);
    HEAPU8 = new Uint8Array(b);
    HEAPU16 = new Uint16Array(b);
    HEAP32 = new Int32Array(b);
    HEAPU32 = new Uint32Array(b);
    HEAPF32 = new Float32Array(b);
    HEAPF64 = new Float64Array(b);
    HEAP64 = new BigInt64Array(b);
    HEAPU64 = new BigUint64Array(b);
  }
  function preRun() {
    if (Module2["preRun"]) {
      if (typeof Module2["preRun"] == "function") Module2["preRun"] = [Module2["preRun"]];
      while (Module2["preRun"].length) {
        addOnPreRun(Module2["preRun"].shift());
      }
    }
    callRuntimeCallbacks(onPreRuns);
  }
  function initRuntime() {
    runtimeInitialized = true;
    if (!Module2["noFSInit"] && !FS.initialized) FS.init();
    TTY.init();
    wasmExports["S"]();
    FS.ignorePermissions = false;
  }
  function postRun() {
    if (Module2["postRun"]) {
      if (typeof Module2["postRun"] == "function") Module2["postRun"] = [Module2["postRun"]];
      while (Module2["postRun"].length) {
        addOnPostRun(Module2["postRun"].shift());
      }
    }
    callRuntimeCallbacks(onPostRuns);
  }
  function abort(what) {
    Module2["onAbort"]?.(what);
    what = "Aborted(" + what + ")";
    err(what);
    ABORT = true;
    what += ". Build with -sASSERTIONS for more info.";
    var e = new WebAssembly.RuntimeError(what);
    readyPromiseReject?.(e);
    throw e;
  }
  var wasmBinaryFile;
  function findWasmBinary() {
    return binaryDecode('\0asm\0\0\0\xD5V`\x7F\x7F`\x7F\x7F\0`\x7F\0`\x7F\x7F\x7F`\x7F\x7F\x7F\x7F`\x7F\x7F\x7F\0`\x7F\x7F\x7F\x7F\x7F`\x7F\x7F\x7F\x7F\x7F\x7F\x7F`\x7F\x7F\x7F\x7F\x7F\x7F`\x7F\x7F\x7F\x7F\0`\b\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F`\x7F\x7F\x7F\x7F\x7F\x7F\0`\0\x7F`\x7F\x7F\x7F\x7F\x7F\0`\0\0`\x07\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F`\x7F\x7F|\0`|||`\x7F~~~~\0`\n\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0`\x7F\x7F|`\x7F|\0`||`\x07\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0`\x7F\x7F|\x7F`\x7F\x7F\x7F\x7F~\x7F`\b\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0`\x7F~~\x7F\0`\x07||||||||`\x7F~\x7F~`\x7F\x7F|\x7F|\x7F`\x7F||`\x7F|`\x7F|\x7F\x7F\0`|\x7F|`\n\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F`||\x7F|`\f\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F`\b\x7F\x7F|\x7F\x7F\x7F\x7F\x7F\0`\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0`\v\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F`\x7F\x7F\x7F|`\x7F\x7F\x7F\x7F~`	\x7F\x7F|\x7F|\x7F|\x7F|\x7F`\x7F\x7F\x7F|\x7F`||||||`\x7F\x7F|\x7F\x7F\x7F\0`\x7F\x7F||\0`\x07\x7F\x7F\x7F\x7F\x7F~~\x7F`\x7F\x7F\x7F\x7F~~\x7F`\x7F\x7F\x7F\x7F|\x7F`\x7F\x7F\x7F\x7F\x7F|`\r\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\x7F\0`\x7F\x7F\x7F~~\0`\x7F~\x7F\x7F\x7F`\x7F~\0`\x7F\x7F\x7F~~`~~~~\x7F`~\x7F\x7F`\x7F|\x7F\x7F`\x7F|\x7F\x7F\x7F\x7F\0`\x7F|\x7F\x7F|\x7F`~~|`|\x7F\x7F`\x7F\x7F|\x7F\x7F`|||||\x7F\x7F`\x7F\x7F\x7F}`\x7F\x7F~\0`~~}`\x7F\x7F~`\x7F~~~\0`~~~\x7F`\x7F\x7F~\x7F\x7F\0`\x7F|\x7F\x7F\x7F\x7F\x7F`~\x7F`\x07\x7F\x7F|\x7F\x7F|\x7F\x7F`\n\x7F\x7F\x7F|\x7F|\x7F|\x7F|\x7F`\x7F\x7F\x7F|\x7F|\x7F`\x7F|||\x7F`\x7F||||||`\b\x7F||||||||`\x7F|||`\b\x7F\x7F|\x7F\x7F\x7F\x7F\x7F\x7F`\x7F\x7F|\x7F\x7F\x7F\x7F`\x7F\x7F||`\x7F\x7F||\x7F\x83+aa\0ab\0ac\0ad\0ae\0af\0ag\x003ah\0ai\0aj\0ak\0al\0am\0\0an\0ao\0\vap\0\raq\0	ar\0\fas\0\vat\0au\0av\x004aw\0ax\0ay\x005az\0aA\0\faB\0aC\0aD\0\0aE\0	aF\0aG\0\0aH\0aI\x006aJ\0\0aK\0aL\0aM\0aN\0aO\0	aP\0aQ\0\xA8\xA6\0\0\0\f\0\0\0\0\0	\x1B\r\0\0\07\0\b\b\0\n\n\x07\x07!\0\0	\0\v89\x1B"\b\b##\0\0:\b\0$;<!\r\0\0\0\0\0\0\0\0\0=\0\0\v	\0\r%\r%\r	\0\0\0>\0\0?\0@&\0\0A\0\0	\0\f\0\0\0\b\n\n\b\n\n\0\b\n\0\0\0\'\'\r((\v\r\v\v\r\v\v\0\b\b\b\b\x07	)B*\x07*\0\bCDE	\x1BFG\0\0\0\0\0\0\0\0\0\0	H\0\0\fI\0\b"$J\0\0K\f		\f  L+M\f,)N\f\0\0\0\v\v\v\r\r\r\0			OPQR\0\0\0.\0\0\0\0\0S\0\0\0\0\0	\0\0,\0\0\b\0\b\n\n\b\b\bT/\v\vU\x070\x070\n\f\x07\x07\x07\x07\x07\n\x07\x07\x07\x07\x07\b12\b\b\b\0\b1\f\x002\b\f\b\b\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07\x07	\b	\b\f\0\0\0\0\0\0\0\f\0\0\0\f\f\0	\0\0\0\0\0-\x07p\xD0\xD0\x07\x82\x80\x80\b\x7FA\x80\xCE\v\x07\x1BR\0S\0\xD0T\0U\0<V\0\xA5W\0-	\xA7\b\0A\v\xCF\xFDV\xACYXW\x99\x97\xB4YXW\x98YXW\xACYXW\xA7\xA4\xEE\x8B\x86YXW\xA1\x9BXW\xFD\xF9\x95\x91\x8F\x8C\x99\x97\x88\x80\x98YXW\xFA\xF9\x99\x97\xF7YXW\xF6\xEE\xEA\xE6\xE1\xDC\x86YXW\xD6YXW\x99\x97\xD0Y\xCE\xC8\xC2\xBC\xB5\xB1\xFD\xF9\x99\x97\xAE\xAA\xA6\xA3\x9A\x91\x88\x82\xFE\xF5\xEA\xDF\xD7\xF2\xD6\xF7\xB6\xB5\xD4\xB2_\xD3\xCF\xCDY\xC4\xC2\xC1\xC0XW\xBF\xBE\xBD\xBC\xBB\xBA\xB9\xB8\xB7\xB6\xB5\x8B\xB4\xB3\xB2\xB1\xB0\xAF\xAE\xAD\xAB\xAA\xA9\xA8\xA7\xA6\xA5\xA4\xA3\xA2\xCE\xCD\xCC\xCB\xA1\xC4\xA0\xCA\xC9\xC8\x9F\xC7\xEE\xC6\xC5\xC4\x9E\xC3\xA1\xC4\xA0\xC2\xC1\xC0\x9F\xBF\xEE\xBE\xBD\xBC\x9E\xB1\xB3\xF9V2\xBB\xBA\xC22\xB9\xB8\xB7V\xC3\xBE\xFB\xBE\xBE\xBE\xF4\xB0\xAF\xF3\xAE\xAD\x94\xAB\xAAV2\xA92\xA82\xA6\x91\x88\x87\xA32\xA2\xE7\x9A\xB2\x81\x80\xFFFF\x99\xFE\x98\xB1\x97\xB1\xB0\xE6\xFC\xFB\xAD\xE5\xF8\xF7\xE3\x96\xB2\x81\x80\xFFFF\x94\xFE\x93\xB1\x92\xB1\xB0\xE6\xFC\xFB\xAD\xE5\xF8\xF7\x84\x83\x84\x83\x81\x90\x9D\x9E\xA0F\x9F\x8E\x8B\xE9\x8A\x89\x87\x86\xE9\x85\xE6\x84\x83\xE5\x82\x81\xFF\xFE\xE5\xFD\xE6\xFC\xFB\xF8-\xC2\x9C\xF4\xF2\xF0\xEE\xEC\xE9\xE7\xE5\xE3\xE1\xDE\xDC\xDA\xD8\x9D\xA2\xA1\x9A\x94\x93\x92\x90\x8F\x9B\x8E\x8D\x8C\xA1\x8A\x89\x87\x86\x85F\x84\x83\x90\x81\xFF\xFD\xFC\xFA\xF8\x8F\x80\xD1\xCC\xFB\xF9\xF7V22\xA0\x9F\x9E\x9D\x9C\x9B\x99\x98\x9B\x97\x96\x952\x99\x99\x8B\xEC\xEC\x8B\xEC2\x96\x95\x8BFF\x94\x9D2\x96\x95\x8BFF\x94\x9D2\x93\x92\x8BFF\x91\x9D2\x93\x92\x8BFF\x91\x9DV2\xF5\xF4\xF3V2\xF2\xF1\xF02\xEF\xED\xEC\xEB\xCD\xCD\xE9\xE8\xE7\xE5\xE42\xE3\xE2\xE0\xDF\xC6\xC6\xDE\xDD\xDB\xDA\xD92\xD8\xD7\xD5\xD4\xD3\xD2\xCF\xCD2\xCB\xCA\xC9\xC7\xC6\xC5\xC4\xC3V2\xBA\xC1\xC0\xBF\xBE\xBD\xBB\xF6\xF1\xED\xE0\xDB\xE8\xE4V2\xBA\xBA\xB9\xB8\xB7\xB6\xB4\xF3\xEF\xEB\xDD\xD9\xE6\xE2\xCE\x8E\xB3\xCE\x8E\xB22\xA0\xA0QQQ\xB2Fhh2\xA0\xA0QQQ\xB2Fhh2\x9F\x9FQQQ\xB1Fhh2\x9F\x9FQQQ\xB1Fhh2\xB0\xAF2\xAD\xAC2\xAB\xA92\xA8\xA72\xA2\xA5\xB22\xA2\xA4\xB2V\xD5GV2\xC2\xC2\x802\x8D2\x802\xD2\xC7\xCA\xD12\xC8\xCB\xD02\xC9\xCC\xCF2\xCE2\xC52\xC42\xC6\x89\xFB\xC3\x89\x89\x89\x89\f\xB3\n\xED\xA0\v\xA6;\x7FA \0 \0AM\x1B!@@ <"\0\r\0A\xFC\xCD(\0"E\r\0 \0\f\v\v \0E@G\v \0\v\0 \0-\0\vA\x07v@ \0(\b \0(\0-\v \0\v\x82\f\b\x7F@ \0E\r\0 \0A\bk" \0Ak(\0"Axq"\0j!@ Aq\r\0 AqE\r  (\0"k"A\xE8\xA0(\0I\r \0 j!\0@@@A\xEC\xA0(\0 G@ (\f! A\xFFM@  (\b"G\rA\xD8\xA0A\xD8\xA0(\0A~ Avwq6\0\f\v (!\x07  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ ! "Aj! ("\r\0 Aj! ("\r\0\v A\x006\0\f\v ("AqAG\rA\xE0\xA0 \x006\0  A~q6  \0Ar6  \x006\0\v  6\f  6\b\f\vA\0!\v \x07E\r\0@ ("At"(\x88\xA3 F@ A\x88\xA3j 6\0 \rA\xDC\xA0A\xDC\xA0(\0A~ wq6\0\f\v@  \x07(F@ \x07 6\f\v \x07 6\v E\r\v  \x076 ("@  6  6\v ("E\r\0  6  6\v  O\r\0 ("AqE\r\0@@@@ AqE@A\xF0\xA0(\0 F@A\xF0\xA0 6\0A\xE4\xA0A\xE4\xA0(\0 \0j"\x006\0  \0Ar6 A\xEC\xA0(\0G\rA\xE0\xA0A\x006\0A\xEC\xA0A\x006\0\vA\xEC\xA0(\0"\x07 F@A\xEC\xA0 6\0A\xE0\xA0A\xE0\xA0(\0 \0j"\x006\0  \0Ar6 \0 j \x006\0\v Axq \0j!\0 (\f! A\xFFM@ (\b" F@A\xD8\xA0A\xD8\xA0(\0A~ Avwq6\0\f\v  6\f  6\b\f\v (!\b  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ ! "Aj! ("\r\0 Aj! ("\r\0\v A\x006\0\f\v  A~q6  \0Ar6 \0 j \x006\0\f\vA\0!\v \bE\r\0@ ("At"(\x88\xA3 F@ A\x88\xA3j 6\0 \rA\xDC\xA0A\xDC\xA0(\0A~ wq6\0\f\v@  \b(F@ \b 6\f\v \b 6\v E\r\v  \b6 ("@  6  6\v ("E\r\0  6  6\v  \0Ar6 \0 j \x006\0  \x07G\r\0A\xE0\xA0 \x006\0\v \0A\xFFM@ \0A\xF8qA\x80\xA1j!\x7FA\xD8\xA0(\0"A \0Avt"\0qE@A\xD8\xA0 \0 r6\0 \f\v (\b\v!\0  6\b \0 6\f  6\f  \x006\b\vA! \0A\xFF\xFF\xFF\x07M@ \0A& \0A\bvg"kvAq AtrA>s!\v  6 B\x007 AtA\x88\xA3j!\x7F@\x7FA\xDC\xA0(\0"A t"qE@A\xDC\xA0  r6\0  6\0A!A\b\f\v \0A AvkA\0 AG\x1Bt! (\0!@ "(Axq \0F\r Av! At!  Aqj"("\r\0\v  6A! !A\b\v!\0 "\f\v (\b" 6\f  6\bA!\0A\b!A\0\v!  j 6\0  6\f \0 j 6\0A\xF8\xA0A\xF8\xA0(\0Ak"\0A\x7F \0\x1B6\0\v\vM\x7F \0(\0!\0 :!  \0(\f \0(\b"kAuI\x7F At j(\0A\0GA\0\vE@=\0\v \0(\b Atj(\0\v\xA0\x7F@\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\v" I@#\0Ak"$\0  k"@  \0-\0\vA\x07v\x7F \0(\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v"\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\v"kK@ \0   k j  \xD3\v \x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v"j A\0\xCC  j!@ \0-\0\vA\x07v@ \0 6\f\v \0 A\xFF\0q:\0\v\v A\0:\0  j -\0:\0\0\v Aj$\0\f\v \0\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v \x8C\v\v7\x7F \0(\0"\0A\xC0\xC0G@ \0 \0(Ak"6 A\x7FF@ \0 \0(\0(\b\0\v\v\v\xD4\x7F~@ \0)p"B\0R  \0)x \0(" \0(,"k\xAC|"WqE@ \0\xAB"A\0N\r \0(,! \0(!\v \0B\x7F7p \0 6h \0   k\xAC|7xA\x7F\v B|! \0(! \0(\b!@ \0)p"P\r\0  }"  k\xACY\r\0  \xA7j!\v \0 6h \0  \0(,"\0 k\xAC|7x \0 O@ Ak :\0\0\v \v\0 \0-\v\x86\x7F@ \x85! \0-\0\vA\x07v\x7F \0(\bA\xFF\xFF\xFF\xFF\x07qAkA\v!\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\v!  M@\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v!@ E\r\0 At"E\r\0   \xFC\n\0\0\v#\0Ak"$\0\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\v\v@ \0-\0\vA\x07v@ \0 6\f\v \0 A\xFF\0q:\0\v\v A\x006\f  Atj (\f6\0 Aj$\0\f\v \0   k A\0   \x83\v\v\xA6\x7F@ L! \0-\0\vA\x07v\x7F \0(\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v!\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\v!  M@\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v!@ E"\r\0 \r\0   \xFC\n\0\0\v \0  \x8C\f\v \0   k A\0   \x84\v\v\0 \0\xF0 \xF0sAs\v\0 \0\xF1 \xF1sAs\v\xC5\x7FA\xBC\xC0-\0\0@A\xB8\xC0(\0\v#\0A k"$\0@@@ A\bj" \0Atj \0A\xA4&A\x923A \0tA\xFF\xFF\xFF\xFF\x07q\x1B\xD7"6\0 A\x7FF\r \0Aj"\0AG\r\0\vA\xE8\xB4!\0 A\xE8\xB4A}E\rA\x80\xB5!\0 A\x80\xB5A}E\rA\0!\0A\xDC\xBD-\0\0E@@ \0At \0A\x923\xD76\xAC\xBD \0Aj"\0AG\r\0\vA\xDC\xBDA:\0\0A\xC4\xBDA\xAC\xBD(\x006\0\vA\xAC\xBD!\0 A\bj"A\xAC\xBDA}E\rA\xC4\xBD!\0 A\xC4\xBDA}E\rA<"\0E\r\0 \0 )7 \0 )7\b \0 )\b7\0\f\vA\0!\0\v A j$\0A\xBC\xC0A:\0\0A\xB8\xC0 \x006\0 \0\v\xCD\n\x7F	~#\0A\xE0\0k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!\n  \x85B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83!\v B\xFF\xFF\xFF\xFF\xFF\xFF?\x83"\fB \x88! B0\x88\xA7A\xFF\xFFq!\x07@@ B0\x88\xA7A\xFF\xFFq"	A\xFF\xFFkA\x82\x80~O@ \x07A\xFF\xFFkA\x81\x80~K\r\v P B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"\rB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T \rB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\v\f\v P B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\v !\f\v  \rB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@  \x84P@B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0!\vB\0!\f\v \vB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\vB\0!\f\v  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@  \r\x84B\0!P@B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0!\v\f\v \vB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\v\f\v  \r\x84P@B\0!\f\v  \x84P@B\0!\f\v \rB\xFF\xFF\xFF\xFF\xFF\xFF?X@ A\xD0\0j  \f  \f \fP"\x1ByB\xC0\0B\0 \x1B|\xA7"AkDA k! )X"\fB \x88! )P!\v B\xFF\xFF\xFF\xFF\xFF\xFF?V\r\0 A@k  \n  \n \nP"\b\x1ByB\xC0\0B\0 \b\x1B|\xA7"\bAkD  \bkAj! )H!\n )@!\v \x07 	j jA\xFF\xFF\0k!@ \nB\x86"B \x88B\x80\x80\x80\x80\b\x84" B \x88"~" B\x86"B \x88"\n B\x80\x80\x84"\r~|" T\xAD  B1\x88 \x84B\xFF\xFF\xFF\xFF\x83" \fB\xFF\xFF\xFF\xFF\x83"\f~|" T\xAD|  \r~|   B\x80\x80\xFE\xFF\x83" \f~"  \n~|" T\xAD    B\xFF\xFF\xFF\xFF\x83"~|"V\xAD||"V\xAD|  \r~"  \f~|" T\xADB \x86 B \x88\x84|   B \x86|"V\xAD|  \r ~"\r \n \f~|"\f  ~|"  ~|"B \x88  V\xAD \f \rT\xAD  \fT\xAD||B \x86\x84|" T\xAD|    ~"\f  \n~|"B \x88  \fT\xADB \x86\x84|"\n T\xAD \n B \x86|" \nT\xAD||"\n T\xAD| \n  B \x86"  ~|" T\xAD|" T\xAD|" \nT\xAD|"B\x80\x80\x80\x80\x80\x80\xC0\0\x83B\0R@ Aj!\f\v B?\x88 B\x86 B?\x88\x84! B\x86 B?\x88\x84! B\x86! B\x86\x84!\v A\xFF\xFFN@ \vB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\vB\0!\f\v~ A\0L@A k"\x07A\xFF\0M@ A0j   A\xFF\0j"D A j   D Aj   \x07t    \x07t )0 )8\x84B\0R\xAD )  )\x84\x84! )( )\x84! )\0! )\b\f\vB\0!\f\v B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 \xADB0\x86\x84\v \v\x84!\v P B\0Y B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FQ\x1BE@ \v B|"P\xAD|!\v\f\v  B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x85\x84B\0R@ !\f\v \v  B\x83|" T\xAD|!\v\v \0 7\0 \0 \v7\b A\xE0\0j$\0\v\0 \0A\xD0\0j<A\xD0\0j\v\x81\x7F#\0Ak"$\0  \x006\f#\0Ak"$\0 \0(\0A\x7FG@ A\fj" A\fj6\0 A\bj" 6\0@ \0(\0"AF\r\0\v E@ \0A6\0 \x9C \0A\x7F6\0\v\v Aj$\0 \0( Aj$\0Ak\v\xB8\x07	\x7F#\0Ak"\x07$\0  (Aj6 \x07 6\f  \0A\bj"( (\0"kAuO@@ Aj"\0 ( kAu"K@#\0A k"\n$\0@ \0 k" (\b (kAuM@  \x9F\f\v \nA\fj!\x7F  ( (\0kAuj!#\0Ak"\0$\0 \0 6\f \x88"M@ (\b (\0kAu" AvI@ \0 At6\b#\0Ak"$\0 \0A\bj"(\0 \0A\fj"	(\0I!\v Aj$\0 	  \v\x1B(\0!\v \0Aj$\0 \f\vG\0\v! ( (\0kAu!#\0Ak"\0$\0  A\fj"	6 A\x006\f \x7F \0A\bj 	 \x87 \0(\b!\b \0(\fA\0\v!  \b6\0  \b Atj"6\b  \b Atj6\f  6 \0Aj$\0#\0Ak"\b$\0 (\b! \bAj"\0 A\bj6\b \0 6\0 \0  Atj6 \0(\0!@ \0( G@ ( A\x006\0 \0 \0(\0Aj"6\0\f\v\v \0(\b \0(\x006\0 \bAj$\0 ( (\0"\0 ("kj!  \0k"@  \0 \xFC\n\0\0\v  6  (\x006 (\0!\0  (6\0  \x006 (!\0  (\b6  \x006\b (\b!\0  (\f6\b  \x006\f  (6\0 ( (\0 (!\0@ (\b" \0G@  Ak6\b (\f\v\v (\0"\0@ ( \0 (\f \0kAu\x86\v\v \nA j$\0\f\v \0 I@ (  (\0 \0Atj\x9E\v\v\v (\0 Atj(\0"\0@ \0 \0(Ak"6 A\x7FF@ \0 \0(\0(\b\0\v\v \x07(\f!\0 \x07A\x006\f (\0 Atj \x006\0 \x07(\f!\0 \x07A\x006\f \0@ \0 \0(Ak"6 A\x7FF@ \0 \0(\0(\b\0\v\v \x07Aj$\0\v\xCB(\v\x7F#\0Ak"\n$\0@@@@@@@@@@ \0A\xF4M@A\xD8\xA0(\0"A \0A\vjA\xF8q \0A\vI\x1B"Av"\0v"Aq@@ A\x7FsAq \0j"At"A\x80\xA1j"\0 (\x88\xA1"(\b"F@A\xD8\xA0 A~ wq6\0\f\v  \x006\f \0 6\b\v A\bj!\0  Ar6  j" (Ar6\f\v\v A\xE0\xA0(\0"\bM\r @@A \0t"A\0 kr  \0tqh"At"A\x80\xA1j" (\x88\xA1"\0(\b"F@A\xD8\xA0 A~ wq"6\0\f\v  6\f  6\b\v \0 Ar6 \0 j"\x07  k"Ar6 \0 j 6\0 \b@ \bAxqA\x80\xA1j!A\xEC\xA0(\0!\x7F A \bAvt"qE@A\xD8\xA0  r6\0 \f\v (\b\v!  6\b  6\f  6\f  6\b\v \0A\bj!\0A\xEC\xA0 \x076\0A\xE0\xA0 6\0\f\v\vA\xDC\xA0(\0"\vE\r \vhAt(\x88\xA3"(Axq k! !@@ ("\0E@ ("\0E\r\v \0(Axq k"   I"\x1B! \0  \x1B! \0!\f\v\v (!	  (\f"\0G@ (\b" \x006\f \0 6\b\f\n\v ("\x7F Aj ("E\r Aj\v!@ !\x07 "\0Aj! \0("\r\0 \0Aj! \0("\r\0\v \x07A\x006\0\f	\vA\x7F! \0A\xBF\x7FK\r\0 \0A\vj"Axq!A\xDC\xA0(\0"\x07E\r\0A!\bA\0 k! \0A\xF4\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtkA>j!\b\v@@@ \bAt(\x88\xA3"E@A\0!\0\f\vA\0!\0 A \bAvkA\0 \bAG\x1Bt!@@ (Axq k" O\r\0 ! "\r\0A\0! !\0\f\v \0 ("   AvAqj("F\x1B \0 \x1B!\0 At! \r\0\v\v \0 rE@A\0!A \bt"\0A\0 \0kr \x07q"\0E\r \0hAt(\x88\xA3!\0\v \0E\r\v@ \0(Axq k" I!   \x1B! \0  \x1B! \0("\x7F  \0(\v"\0\r\0\v\v E\r\0 A\xE0\xA0(\0 kO\r\0 (!\b  (\f"\0G@ (\b" \x006\f \0 6\b\f\b\v ("\x7F Aj ("E\r Aj\v!@ ! "\0Aj! \0("\r\0 \0Aj! \0("\r\0\v A\x006\0\f\x07\v A\xE0\xA0(\0"M@A\xEC\xA0(\0!\0@  k"AO@ \0 j" Ar6 \0 j 6\0 \0 Ar6\f\v \0 Ar6 \0 j" (Ar6A\0!A\0!\vA\xE0\xA0 6\0A\xEC\xA0 6\0 \0A\bj!\0\f	\v A\xE4\xA0(\0"I@A\xE4\xA0  k"6\0A\xF0\xA0A\xF0\xA0(\0"\0 j"6\0  Ar6 \0 Ar6 \0A\bj!\0\f	\vA\0!\0 A/j"\x7FA\xB0\xA4(\0@A\xB8\xA4(\0\f\vA\xBC\xA4B\x7F7\0A\xB4\xA4B\x80\xA0\x80\x80\x80\x807\0A\xB0\xA4 \nA\fjApqA\xD8\xAA\xD5\xAAs6\0A\xC4\xA4A\x006\0A\x94\xA4A\x006\0A\x80 \v"j"A\0 k"\x07q" M\r\bA\x90\xA4(\0"@A\x88\xA4(\0"\b j"	 \bM\r	  	I\r	\v@A\x94\xA4-\0\0AqE@@@@@A\xF0\xA0(\0"@A\x98\xA4!\0@ \0(\0"\b M@  \b \0(jI\r\v \0(\b"\0\r\0\v\vA\0\x84"A\x7FF\r !A\xB4\xA4(\0"\0Ak" q@  k  jA\0 \0kqj!\v  M\rA\x90\xA4(\0"\0@A\x88\xA4(\0" j"\x07 M\r \0 \x07I\r\v \x84"\0 G\r\f\v  k \x07q"\x84" \0(\0 \0(jF\r !\0\v \0A\x7FF\r A0j M@ \0!\f\vA\xB8\xA4(\0"  kjA\0 kq"\x84A\x7FF\r  j! \0!\f\v A\x7FG\r\vA\x94\xA4A\x94\xA4(\0Ar6\0\v \x84!A\0\x84!\0 A\x7FF\r \0A\x7FF\r \0 M\r \0 k" A(jM\r\vA\x88\xA4A\x88\xA4(\0 j"\x006\0A\x8C\xA4(\0 \0I@A\x8C\xA4 \x006\0\v@A\xF0\xA0(\0"@A\x98\xA4!\0@  \0(\0" \0("jF\r \0(\b"\0\r\0\v\f\vA\xE8\xA0(\0"\0A\0 \0 M\x1BE@A\xE8\xA0 6\0\vA\0!\0A\x9C\xA4 6\0A\x98\xA4 6\0A\xF8\xA0A\x7F6\0A\xFC\xA0A\xB0\xA4(\x006\0A\xA4\xA4A\x006\0@ \0At" A\x80\xA1j"6\x88\xA1  6\x8C\xA1 \0Aj"\0A G\r\0\vA\xE4\xA0 A(k"\0Ax kA\x07q"k"6\0A\xF0\xA0  j"6\0  Ar6 \0 jA(6A\xF4\xA0A\xC0\xA4(\x006\0\f\v  M\r  K\r \0(\fA\bq\r \0  j6A\xF0\xA0 Ax kA\x07q"\0j"6\0A\xE4\xA0A\xE4\xA0(\0 j" \0k"\x006\0  \0Ar6  jA(6A\xF4\xA0A\xC0\xA4(\x006\0\f\vA\0!\0\f\vA\0!\0\f\vA\xE8\xA0(\0 K@A\xE8\xA0 6\0\v  j!A\x98\xA4!\0@@  \0(\0"G@ \0(\b"\0\r\f\v\v \0-\0\fA\bqE\r\vA\x98\xA4!\0@@ \0(\0" M@   \0(j"I\r\v \0(\b!\0\f\v\vA\xE4\xA0 A(k"\0Ax kA\x07q"k"\x076\0A\xF0\xA0  j"6\0  \x07Ar6 \0 jA(6A\xF4\xA0A\xC0\xA4(\x006\0  A\' kA\x07qjA/k"\0 \0 AjI\x1B"A\x1B6 A\xA0\xA4)\x007 A\x98\xA4)\x007\bA\xA0\xA4 A\bj6\0A\x9C\xA4 6\0A\x98\xA4 6\0A\xA4\xA4A\x006\0 Aj!\0@ \0A\x076 \0A\bj \0Aj!\0 I\r\0\v  F\r\0  (A~q6   k"Ar6  6\0\x7F A\xFFM@ A\xF8qA\x80\xA1j!\0\x7FA\xD8\xA0(\0"A Avt"qE@A\xD8\xA0  r6\0 \0\f\v \0(\b\v! \0 6\b  6\fA\f!A\b\f\vA!\0 A\xFF\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtrA>s!\0\v  \x006 B\x007 \0AtA\x88\xA3j!@@A\xDC\xA0(\0"A \0t"qE@A\xDC\xA0  r6\0  6\0\f\v A \0AvkA\0 \0AG\x1Bt!\0 (\0!@ "(Axq F\r \0Av! \0At!\0  Aqj"("\r\0\v  6\v  6A\b! "!\0A\f\f\v (\b"\0 6\f  6\b  \x006\bA\0!\0A!A\f\v j 6\0  j \x006\0\vA\xE4\xA0(\0"\0 M\r\0A\xE4\xA0 \0 k"6\0A\xF0\xA0A\xF0\xA0(\0"\0 j"6\0  Ar6 \0 Ar6 \0A\bj!\0\f\vA\xD4\xA0A06\0A\0!\0\f\v \0 6\0 \0 \0( j6 Ax kA\x07qj"\b Ar6 Ax kA\x07qj"  \bj"k!\x07@A\xF0\xA0(\0 F@A\xF0\xA0 6\0A\xE4\xA0A\xE4\xA0(\0 \x07j"\x006\0  \0Ar6\f\vA\xEC\xA0(\0 F@A\xEC\xA0 6\0A\xE0\xA0A\xE0\xA0(\0 \x07j"\x006\0  \0Ar6 \0 j \x006\0\f\v ("\0AqAF@ \0Axq!	 (\f!@ \0A\xFFM@ (\b" F@A\xD8\xA0A\xD8\xA0(\0A~ \0Avwq6\0\f\v  6\f  6\b\f\v (!@  G@ (\b"\0 6\f  \x006\b\f\v@ ("\0\x7F Aj ("\0E\r Aj\v!@ ! \0"Aj! \0("\0\r\0 Aj! ("\0\r\0\v A\x006\0\f\vA\0!\v E\r\0@ ("\0At"(\x88\xA3 F@ A\x88\xA3j 6\0 \rA\xDC\xA0A\xDC\xA0(\0A~ \0wq6\0\f\v@  (F@  6\f\v  6\v E\r\v  6 ("\0@  \x006 \0 6\v ("\0E\r\0  \x006 \0 6\v \x07 	j!\x07  	j"(!\0\v  \0A~q6  \x07Ar6  \x07j \x076\0 \x07A\xFFM@ \x07A\xF8qA\x80\xA1j!\0\x7FA\xD8\xA0(\0"A \x07Avt"qE@A\xD8\xA0  r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\f\vA! \x07A\xFF\xFF\xFF\x07M@ \x07A& \x07A\bvg"\0kvAq \0AtrA>s!\v  6 B\x007 AtA\x88\xA3j!\0@@A\xDC\xA0(\0"A t"qE@A\xDC\xA0  r6\0 \0 6\0\f\v \x07A AvkA\0 AG\x1Bt! \0(\0!@ "\0(Axq \x07F\r Av! At! \0 Aqj"("\r\0\v  6\v  \x006  6\f  6\b\f\v \0(\b" 6\f \0 6\b A\x006  \x006\f  6\b\v \bA\bj!\0\f\v@ \bE\r\0@ ("At"(\x88\xA3 F@ A\x88\xA3j \x006\0 \0\rA\xDC\xA0 \x07A~ wq"\x076\0\f\v@  \b(F@ \b \x006\f\v \b \x006\v \0E\r\v \0 \b6 ("@ \0 6  \x006\v ("E\r\0 \0 6  \x006\v@ AM@   j"\0Ar6 \0 j"\0 \0(Ar6\f\v  Ar6  j" Ar6  j 6\0 A\xFFM@ A\xF8qA\x80\xA1j!\0\x7FA\xD8\xA0(\0"A Avt"qE@A\xD8\xA0  r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\f\vA!\0 A\xFF\xFF\xFF\x07M@ A& A\bvg"\0kvAq \0AtrA>s!\0\v  \x006 B\x007 \0AtA\x88\xA3j!@@ \x07A \0t"qE@A\xDC\xA0  \x07r6\0  6\0  6\f\v A \0AvkA\0 \0AG\x1Bt!\0 (\0!@ "(Axq F\r \0Av! \0At!\0  Aqj"\x07("\r\0\v \x07 6  6\v  6\f  6\b\f\v (\b"\0 6\f  6\b A\x006  6\f  \x006\b\v A\bj!\0\f\v@ 	E\r\0@ ("At"(\x88\xA3 F@ A\x88\xA3j \x006\0 \0\rA\xDC\xA0 \vA~ wq6\0\f\v@  	(F@ 	 \x006\f\v 	 \x006\v \0E\r\v \0 	6 ("@ \0 6  \x006\v ("E\r\0 \0 6  \x006\v@ AM@   j"\0Ar6 \0 j"\0 \0(Ar6\f\v  Ar6  j" Ar6  j 6\0 \b@ \bAxqA\x80\xA1j!\0A\xEC\xA0(\0!\x7FA \bAvt"\x07 qE@A\xD8\xA0  \x07r6\0 \0\f\v \0(\b\v! \0 6\b  6\f  \x006\f  6\b\vA\xEC\xA0 6\0A\xE0\xA0 6\0\v A\bj!\0\v \nAj$\0 \0\v\0\x9C\0\v-\0 E@ \0( (F\v \0 F@A\v \0( (\xA9E\v\r\0 \0(\0\xF4 \0\v\r\0 \0(\0\xFA \0\vu~ \0  ~  ~| B \x88" B \x88"~| B\xFF\xFF\xFF\xFF\x83" B\xFF\xFF\xFF\xFF\x83"~"B \x88  ~|"B \x88|  ~ B\xFF\xFF\xFF\xFF\x83|"B \x88|7\b \0 B\xFF\xFF\xFF\xFF\x83 B \x86\x847\0\v\0 \0-\0\0A qE@   \0\xB8\v\v\xED\x7F\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\v!@  kAH\r\0 E\r\0  \xA1 Ak!\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\v\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v"j!@@@ ,\0\0!\0  O\r\0@ \0A\0L\r\0 \0A\xFF\0N\r\0 \0 (\0G\r\v Aj!   kAJj!\f\v\v \0A\0L\r \0A\xFF\0N\r ,\0\0 (\0AkK\r\v A6\0\v\vP~@ A\xC0\0q@  A@j\xAD\x86!B\0!\f\v E\r\0  \xAD"\x86 A\xC0\0 k\xAD\x88\x84!  \x86!\v \0 7\0 \0 7\b\vk\x7F#\0A\x80k"$\0@  L\r\0 A\x80\xC0q\r\0    k"A\x80 A\x80I"\x1B\xE9 E@@ \0 A\x80B A\x80k"A\xFFK\r\0\v\v \0  B\v A\x80j$\0\v\0A\0\v\0=\0\v\xCE	\x7F~#\0A\xF0\0k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83!	@@ P" B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"\nB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0}B\x80\x80\x80\x80\x80\x80\xC0\x80\x80\x7FT \nP\x1BE@ B\0R 	B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0}"\vB\x80\x80\x80\x80\x80\x80\xC0\x80\x80\x7FV \vB\x80\x80\x80\x80\x80\x80\xC0\x80\x80\x7FQ\x1B\r\v  \nB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T \nB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84! !\f\v P 	B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T 	B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\f\v  \nB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0   \x85  \x85B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x85\x84P"\x1B!B\0  \x1B!\f\v  	B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P\r  \n\x84P@  	\x84B\0R\r  \x83!  \x83!\f\v  	\x84B\0R\r\0 ! !\f\v    T 	 \nV 	 \nQ\x1B"\b\x1B!\n   \b\x1B"\fB\xFF\xFF\xFF\xFF\xFF\xFF?\x83!	   \b\x1B"\vB0\x88\xA7A\xFF\xFFq!\x07 \fB0\x88\xA7A\xFF\xFFq"E@ A\xE0\0j \n 	 \n 	 	P"\x1ByB\xC0\0B\0 \x1B|\xA7"AkD )h!	 )`!\nA k!\v   \b\x1B! \vB\xFF\xFF\xFF\xFF\xFF\xFF?\x83! \x07~  A\xD0\0j     P"\x07\x1ByB\xC0\0B\0 \x07\x1B|\xA7"\x07AkDA \x07k!\x07 )P! )X\vB\x86 B=\x88\x84B\x80\x80\x80\x80\x80\x80\x80\x84! 	B\x86 \nB=\x88\x84  \x85!~ B\x86"  \x07F\r\0  \x07k"\x07A\xFF\0K@B\0!B\f\v A@k  A\x80 \x07kD A0j   \x07t )8! )0 )@ )H\x84B\0R\xAD\x84\v!	B\x80\x80\x80\x80\x80\x80\x80\x84!\v \nB\x86!\n@ B\0S@B\0!B\0! 	 \n\x85  \v\x85\x84P\r \n 	}! \v } 	 \nV\xAD}"B\xFF\xFF\xFF\xFF\xFF\xFF\xFFV\r A j     P"\x07\x1ByB\xC0\0B\0 \x07\x1B\x84\xA7A\fk"\x07D  \x07k! )(! ) !\f\v 	 \n|" 	T\xAD  \v||"B\x80\x80\x80\x80\x80\x80\x80\b\x83P\r\0 	B\x83 B?\x86 B\x88\x84\x84! Aj! B\x88!\v \fB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83! A\xFF\xFFN@ B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!B\0!\f\vA\0!\x07@ A\0J@ !\x07\f\v Aj   A\xFF\0jD   A kt )\0 ) )\x84B\0R\xAD\x84! )\b!\v B=\x86 B\x88\x84! B\x88B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 \x07\xADB0\x86\x84 \x84!@@ \xA7A\x07q"AG@    AK\xAD|"V\xAD|!\f\v    B\x83|"V\xAD|!\f\v E\r\v\v \0 7\0 \0 7\b A\xF0\0j$\0\vd\0 (A\xB0q"A F@ \v@ AG\r\0@@ \0-\0\0"A+k\0\0\v \0Aj\v  \0kAH\r\0 A0G\r\0 \0-\0A rA\xF8\0G\r\0 \0Aj!\0\v \0\v9\x7F\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v!#\0Ak"\0$\0 \0 6\f \0(\f \0Aj$\0\v\x84\x7F~#\0Ak"$\0 \0~ E@B\0\f\v   Au"s k"\xADB\0 g"A\xD1\0jD )\bB\x80\x80\x80\x80\x80\x80\xC0\0\x85A\x9E\x80 k\xADB0\x86|B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FB\0 A\0H\x1B\x84! )\0\v7\0 \0 7\b Aj$\0\v}\x7F@@ \0"AqE\r\0 -\0\0E@A\0\v@ Aj"AqE\r -\0\0\r\0\v\f\v@ "Aj!A\x80\x82\x84\b (\0"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xF\r\0\v@ "Aj! -\0\0\r\0\v\v  \0k\v\xCA\x7F|#\0Ak"$\0@ \0\xBDB \x88\xA7A\xFF\xFF\xFF\xFF\x07q"A\xFB\xC3\xA4\xFFM@ A\x80\x80\xC0\xF2I\r \0D\0\0\0\0\0\0\0\0A\0\x93!\0\f\v A\x80\x80\xC0\xFF\x07O@ \0 \0\xA1!\0\f\v \0 \xEF! +\b!\0 +\0!@@@@ AqAk\0\v  \0A\x93!\0\f\v  \0\x94!\0\f\v  \0A\x93\x9A!\0\f\v  \0\x94\x9A!\0\v Aj$\0 \0\v\xC2|\x7F#\0Ak"$\0| \0\xBDB \x88\xA7A\xFF\xFF\xFF\xFF\x07q"A\xFB\xC3\xA4\xFFM@D\0\0\0\0\0\0\xF0? A\x9E\xC1\x9A\xF2I\r \0D\0\0\0\0\0\0\0\0\x94\f\v \0 \0\xA1 A\x80\x80\xC0\xFF\x07O\r\0 \0 \xEF! +\b!\0 +\0!@@@@ AqAk\0\v  \0\x94\f\v  \0A\x93\x9A\f\v  \0\x94\x9A\f\v  \0A\x93\v Aj$\0\v\xE5\x7F#\0Ak"$\0  \0(\0"A\bk(\0"6\f  \0 j6  Ak(\x006\b (\b" A\0>! (!@ @ (\f!\0#\0A@j"$\0 A@k$\0A\0  \0\x1B!\f\v#\0A@j"$\0 \0 N@ B\x007 A\x006  6\f  6 B\x007 B\x007$ B\x007, A\x006< B\x81\x80\x80\x80\x80\x80\x80\x8074  \x006\b  Aj  AA\0 (\0(\v\0 \0A\0 (\x1B!\v A@k$\0 "\r\0#\0A@j"$\0 A\x006 A\xB0\x8F6\f  \x006\b  6A\0!\0 AjA\0A\'\xFC\v\0 A\x006< A:\0;  Aj AA\0 (\0(\r\0@@@ ((\0\v (A\0 ($AF\x1BA\0 ( AF\x1BA\0 (,AF\x1B!\0\f\v (AG@ (,\r ( AG\r ($AG\r\v (!\0\v A@k$\0 \0!\v Aj$\0 \v	\0A\xF6\xFA\0\v\0 \0A\x006\b \0B\x007\0\v\xB4\n\x7F#\0Ak"\x07$\0@ \x07Aj \0\xE4"\v-\0\0AG\r\0  j"	  \0 \0(\0A\fk(\0j"(A\xB0qA F\x1B!\b (!@ -\0PAF@ (\0L!\f\v \x07A\fj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF8\xC1."A  (\0(\0! 0  6\0L A:\0P\v\x7F ! ! \xC0!\fA\0!#\0Ak"$\0@@ "E\r\0 (\f! \b k"\nA\0J@   \n (\0(0\0 \nG\r\v 	 k" H@  k"A\xF8\xFF\xFF\xFF\x07O\r@ A\vO@ A\x07r"Aj+!  A\xFF\xFF\xFF\xFF\x07k6\f  6  6\b\f\v  :\0 Aj!\v @  \f \xFC\v\0\vA\0!  jA\0:\0\0  ( Aj ,\0A\0H\x1B  (\0(0\0 ,\0A\0H@ (\f (-\v G\r\v 	 \bk"A\0J@  \b  (\0(0\0 G\r\v A\x006\f !\v Aj$\0 \f\v\xC1\0\v\r\0 \0 \0(\0A\fk(\0j" (Ar\xEF\v \v\xAC \x07Aj$\0 \0\v=\x7FA\xA8\xA0(\0! (\0"@A\xA8\xA0A\xB0\x9F  A\x7FF\x1B6\0\v \0A\x7F  A\xB0\x9FF\x1B6\0 \0\v.\x7FA9"\0A\x84\x976\0 \0A\xDC\x966\0 \0A\xF0\x966\0 \0A\xC4\x97A\0\vG\x7F \0 7p \0 \0(, \0("k\xAC7x \0(\b!@ P\r\0   k\xACY\r\0  \xA7j!\v \0 6h\v\0 \0\v\0  \0(\0j 9\0\v\r\0  \0(\0j+\0\v\v\0 \0@ \0-\v\v\xAC\x7F#\0Ak"$\0  6\fA\0!@ \x7FA \0 A\fj5\r\0A A\xC0\0\x7F \0(\0"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v" (\0(\f\0E\r\0  A\0 (\0(4\0!@@ \0? A0k! \0 A\fj5\r\0 AH\r\0 A\xC0\0\x7F \0(\0"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v" (\0(\f\0E\r Ak!  A\0 (\0(4\0 A\nlj!\f\v\v \0 A\fj5E\rA\v (\0r6\0\v Aj$\0 \v\xCC\x7F#\0Ak"$\0  6\fA\0!@ \x7FA \0 A\fj6\r\0A\x7F \0(\0"(\f"\x07 (F@  (\0($\0\0\f\v \x07-\0\0\v\xC0"A\x80I\x7F (\b Atj(\0A\xC0\0qA\0GA\0\vE\r\0  A\0 (\0($\0!@@ \0@ A0k! \0 A\fj6\r\0 AH\r\0\x7F \0(\0"(\f"\x07 (F@  (\0($\0\0\f\v \x07-\0\0\v\xC0"A\x80I\x7F (\b Atj(\0A\xC0\0qA\0GA\0\vE\r Ak!  A\0 (\0($\0 A\nlj!\f\v\v \0 A\fj6E\rA\v (\0r6\0\v Aj$\0 \v.\0@ \0(A\xCA\0q"\0@ \0A\xC0\0F@A\b\v \0A\bG\rA\vA\0\vA\n\v\xCF~\x7F#\0Ak"$\0 \xBD"B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07\x83! \0~ B4\x88B\xFF\x83"B\0R@ B\xFFR@ B\x88! B\x80\xF8\0|! B<\x86\f\v B\x88!B\xFF\xFF! B<\x86\f\v P@B\0!B\0\f\v  B\0 y\xA7"\x07A1jD )\bB\x80\x80\x80\x80\x80\x80\xC0\0\x85!A\x8C\xF8\0 \x07k\xAD! )\0\v7\0 \0 B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83 B0\x86\x84 \x847\b Aj$\0\v\x8B\x7F A\x80O@ @ \0  \xFC\n\0\0\v \0\v \0 j!@ \0 sAqE@@ \0AqE@ \0!\f\v E@ \0!\f\v \0!@  -\0\0:\0\0 Aj! Aj"AqE\r  I\r\0\v\v A|q!@ A\xC0\0I\r\0  A@j"K\r\0@  (\x006\0  (6  (\b6\b  (\f6\f  (6  (6  (6  (6  ( 6   ($6$  ((6(  (,6,  (060  (464  (868  (<6< A@k! A@k" M\r\0\v\v  O\r@  (\x006\0 Aj! Aj" I\r\0\v\f\v AI@ \0!\f\v AI@ \0!\f\v Ak! \0!@  -\0\0:\0\0  -\0:\0  -\0:\0  -\0:\0 Aj! Aj" M\r\0\v\v  I@@  -\0\0:\0\0 Aj! Aj" G\r\0\v\v \0\v\xC5\x7F\b|@  dE@ !\v ! ! !\f\v !\v !\v@  cE@ ! ! !	 !\r\f\v    d"\x07\x1B!\r   \x07\x1B!	 \v  \x07\x1B!  \v \x07\x1B!\v !\vD\0\0\0\0\0\0\0\0!  	\xA1" 	 \r\xA1"\xA0!@  \v\xA1 \xA3"D\0\0\0\0\0\0\0\0d D\0\0\0\0\0\0\0\0ck"\x07  \xA1 \xA3"\fD\0\0\0\0\0\0\0\0d \fD\0\0\0\0\0\0\0\0ck"\blA\0L@  \xA0 \xA0!\n\f\v  \xA0 \xA0"  \xA0 \xA0"\n\xA0  \xA3 \n \f\xA3\xA0\xA3!\v \n \xA2  \f\xA2\xA1 \xA3"\nD\0\0\0\0\0\0\0\0d \nD\0\0\0\0\0\0\0\0ck \x07F@ D\0\0\0\0\0\0\b@\xA2 \n \n\x99 \x99D\0\0\0\0\0\0\b@\xA2d\x1B!\v  \xA0 \xA0 \f\xA2  \xA2\xA1 \xA3"D\0\0\0\0\0\0\0\0d D\0\0\0\0\0\0\0\0ck \bF@ \fD\0\0\0\0\0\0\b@\xA2  \x99 \f\x99D\0\0\0\0\0\0\b@\xA2d\x1B!\v \0 \r 	 \0 	e"\x07\x1B\xA1   \x07\x1B"\xA3"\0 \0\xA2"D\0\0\0\0\0\0\b@\xA2" \0 \xA2"	 	\xA0"	\xA1   \x07\x1B\xA2 	 \xA1D\0\0\0\0\0\0\xF0?\xA0 \v  \x07\x1B\xA2  \0D\0\0\0\0\0\0\0\xC0\xA0 \xA2 \0\xA0   \x07\x1B\xA2 \0D\0\0\0\0\0\0\xF0\xBF\xA0 \xA2   \x07\x1B\xA2\xA0\xA2\xA0\xA0\v\xEF\x7F#\0Ak"	$\0 	 6\b 	 6\f 	Aj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF0\xC1.!\b 0 A\x006\0A\0!@@  \x07F\r \r@ 	A\fj 	A\bj5\r\0@ \b (\0A\0 \b(\0(4\0A%F@ Aj \x07F\rA\0!\x7F@ \b (A\0 \b(\0(4\0"A\xC5\0F\r\0A!\n A\xFFqA0F\r\0 \f\v A\bj \x07F\rA\b!\n ! \b (\bA\0 \b(\0(4\0\v! 	 \0 	(\f 	(\b      \0(\0($\n\x006\f  \njAj!\f\v \bA (\0 \b(\0(\f\0@@ \x07 Aj"G@ \bA (\0 \b(\0(\f\0\r\v\v@ 	A\fj" 	A\bj5\r \bA\x7F (\0"(\f"\n (F@  (\0($\0\0\f\v \n(\0\v \b(\0(\f\0E\r ?\f\0\v\0\v \b\x7F 	A\fj"(\0"(\f"\n (F@  (\0($\0\0\f\v \n(\0\v \b(\0(\0 \b (\0 \b(\0(\0F@ Aj! ?\f\v A6\0\v (\0!\f\v\v A6\0\v 	A\fj 	A\bj5@  (\0Ar6\0\v 	(\f 	Aj$\0\v\x9B\x7F#\0Ak"\b$\0 \b 6\b \b 6\f \bAj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF8\xC1.!	 0 A\x006\0A\0!@@  \x07F\r \r@ \bA\fj \bA\bj6\r\0@ 	 ,\0\0A\0 	(\0($\0A%F@ Aj \x07F\rA\0!\x7F@ 	 ,\0A\0 	(\0($\0"A\xC5\0F\r\0A!\n A\xFFqA0F\r\0 \f\v Aj \x07F\rA!\n ! 	 ,\0A\0 	(\0($\0\v! \b \0 \b(\f \b(\b      \0(\0($\n\x006\f  \njAj!\f\v ,\0\0"A\x80I\x7F 	(\b Atj(\0AqA\0\v@@ \x07 Aj"G@ ,\0\0"A\x80I\x7F 	(\b Atj(\0AqA\0\v\r\v\v@ \bA\fj" \bA\bj6\r\x7F (\0"(\f"\n (F@  (\0($\0\0\f\v \n-\0\0\v\xC0"A\x80I\x7F 	(\b Atj(\0AqA\0\vE\r @\f\0\v\0\v 	\x7F \bA\fj"(\0"(\f"\n (F@  (\0($\0\0\f\v \n-\0\0\v\xC0 	(\0(\f\0 	 ,\0\0 	(\0(\f\0F@ Aj! @\f\v A6\0\v (\0!\f\v\v A6\0\v \bA\fj \bA\bj6@  (\0Ar6\0\v \b(\f \bAj$\0\v\xD7\x7F#\0Ak"\x07$\0@ \0E\r\0 (\f!  kAu"\bA\0J@ \0  \b \0(\0(0\0 \bG\r\v  kAu" H@ \0\x7F \x07Aj  k" \xBB"-\0\vA\x07v@ (\0\f\v \v  \0(\0(0\0! ,  G\r\v  kAu"A\0J@ \0   \0(\0(0\0 G\r\v (\f A\x006\f \0!	\v \x07Aj$\0 	\v\xCE\x7F#\0Ak"\x07$\0@ \0E\r\0 (\f!  k"\bA\0J@ \0  \b \0(\0(0\0 \bG\r\v  k" H@ \0\x7F \x07Aj  k" \xBD"-\0\vA\x07v@ (\0\f\v \v  \0(\0(0\0! ,  G\r\v  k"A\0J@ \0   \0(\0(0\0 G\r\v (\f A\x006\f \0!	\v \x07Aj$\0 	\v\xA2\x7F#\0Ak"$\0 \0-\0\vA\x07v@ \0(\b \0(\0-\v\x7F -\0\vA\x07v@ (\f\v -\0\v\v -\0\vA\x07v! \0 (\b6\b \0 )\x007\0 A\0:\0\v A\0:\0  -\0:\0\0@ \0 F"\r\0 \r\0\v \0-\0\vA\x07v!\0@ \r\0 \0\r\0\v Aj$\0\v\x97\x7F|#\0A\xF0\0k"$\0@ \0(\xC8@ \0+P!\b \0+h!	 A0j" \0+H9 A\x006@  98 A\xA0\xD8\x0060 \0+\xB0! \0+\xB8!\n  	9X   \n\x9A\xA2"D\0\0\0\0\0\0\0\0\xA4D\0\0\0\0\0\0\0\0 \xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0X\x1B \b\x99\xA19P \0+\xC8!  6h  9` A\xC4\xD6\x006  A\b+"6$  A\bj"\x076,  6  6\0  \x076( \0(\xC8"E\r  \0 A j  (\0(	\0@ (\0"\0AF@ A6\0AA\xD3A\x86A\xE7\x1BA\xE80 p\f\v  \x006AA\xD3A\x8AA\xE7\x1BA\x921 Ajp\v A j\xF4 A\xF0\0j$\0\vA\b9A\x9A0fA\xC8\x98A\0\vA9"\0A\xD8\xAC6\0 \0A\xE4\xACA\xBB\0\v \0 \0A\x84\x976\0 \0A\xF4\x976\0 \0Aj \xCD \0\v>\x7F#\0Ak"$\0  \x006\f (\f!#\0Ak"\0$\0 \0 6\f \0(\f \0Aj$\0 Aj$\0\v\f\0 \0A\x82\x86\x80 6\0\0\v[\x7F\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\vAtj!#\0Ak"\0$\0 \0 6\f \0(\f \0Aj$\0\v\xAC\x7F@ A\x80qE\r\0 E\r\0 A\xCA\0q"A\bF\r\0 A\xC0\0F\r\0 \0A+:\0\0 \0Aj!\0\v A\x80q@ \0A#:\0\0 \0Aj!\0\v@ -\0\0"@ \0 :\0\0 \0Aj!\0 Aj!\f\v\v \0\x7FA\xEF\0 A\xCA\0q"A\xC0\0F\r\0A\xD8\0A\xF8\0 A\x80\x80q\x1B A\bF\r\0A\xE4\0A\xF5\0 \x1B\v:\0\0\vX\x7F\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\vj!#\0Ak"\0$\0 \0 6\f \0(\f \0Aj$\0\vB\x7F  l! \x7F (LA\0H@ \0  \xB8\f\v \0  \xB8\v"\0F@ A\0 \x1B\v \0 n\v&\x7F#\0Ak"$\0  6\f \0   \x85 Aj$\0\v\x80\x7F|#\0A0k"$\0 +\0!\x07 +\b! +!  +9(  9   9 + ! +(!  +09  9\b  9\0 \0  \x07 Aj  +8 \x96 A0j$\0\v~\x7F L"A\xF8\xFF\xFF\xFF\x07I@@@ A\vO@ A\x07r"Aj+! \0 A\xFF\xFF\xFF\xFF\x07k6\b \0 6\0 \0 6\f\v \0 :\0\v \0! E\r\v E\r\0   \xFC\n\0\0\v  jA\0:\0\0 \0\v\xC1\0\v\xD5\n\b\x7F#\0Ak"\v$\0@A\xFC\x9E-\0\0Aq@A\xF8\x9E(\0!\f\vA\xF8\x9E\x7F#\0Ak"$\0@A\xA7$\xBA"	\x7F 	L"\x07A\xF8\xFF\xFF\xFF\x07O\r@@ \x07A\vO@ \x07A\x07r"\nAj+!\b  \nA\xFF\xFF\xFF\xFF\x07k6\f  \b6  \x076\b\f\v  \x07:\0 Aj!\b \x07E\r\v \x07E\r\0 \b 	 \x07\xFC\n\0\0\v \x07 \bjA\0:\0\0#\0Ak"	$\0\x7F 	AjA\x82\x82!\b#\0Ak"\x07$\0 \x07A\x006\f\x7F Aj"\n-\0\vA\x07v@ \n(\0\f\v \n\v!\n \x07A\xD4\xA0(\x006\bA\xD4\xA0A\x006\0 \n \x07A\fjA\nB\x80\x80\x80\x80\br\xA7!\fA\xD4\xA0(\0!\rA\xD4\xA0 \x07(\b6\0 \x07 \r6\b@ \x07(\bA\xC4\0G@ \x07(\f \nF\r \x07Aj$\0 \f\f\v \b\x82\0\v#\0Ak"\0$\0 \0Aj \bA\xAA\x81\x7F \0-\0A\x07v@ \0(\f\vA\0\v=\0\v"\x07A\x80\x80\x80\x80xH@ \b\x82\0\v \b, 	Aj$\0 ,\0A\0H@ (\f (-\v \x07A\0 \x07A\0J\x1BA2\v Aj$\0\f\v\xC1\0\v"6\0A\xFC\x9EA:\0\0\v \0 N@ \v 6\b#\0A k"$\0  6  6@@@A\0A\0  \x85"A\0H@A\xDC\xB7A\xFA2AR\f\v A\xF8\xFF\xFF\xFF\x07O\r@@ A\vO@ A\x07r"\bAj+!\x07  \bA\xFF\xFF\xFF\xFF\x07k6  \x076\f  6\f\v  :\0 A\fj!\x07 E\r\v E\r\0 \x07A\0 \xFC\v\0\v  \x07jA\0:\0\0 (\f A\fj ,\0A\0H\x1B Aj  (\x85A\xB8$!A\x8A!@@@@@@ \0A\nk)\0\vA\xB6#!A\x9E!\f\vA\xD2$!A\x98!\f\vA\x81$!A\x84!\f\vA\xCC$!A\x92!\f\vA\xE2"!A\xA4!\vA\xDC\xB7  LR  LRA\xA4ARA\xF42AR  LRA\xCC+AR!\0#\0Ak"$\0 A\bj \0\xE4@ -\0\bE\r\0 \0 \0(\0A\fk(\0j"( Aj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xB8\xBF.!\x07 0  \0 \0(\0A\fk(\0j(6\0 \0 \0(\0A\fk(\0j"-\0PE@#\0Ak"\b$\0 \bA\fj"	 ("6\0 A\xC0\xC0G@  (Aj6\v 	A\xF8\xC1."A  (\0(\0! 	0 \bAj$\0  6\0L A:\0P\v  \x07 (\0  (\0L\xC0  \x07(\0(\b\x006 (\r\0 \0 \0(\0A\fk(\0jA\xAE\v A\bj\xAC Aj$\0 \0A\xEF2AR  LRA\xF42AR (\f A\fj ,\0"\0A\0H"\x1B ( \0 \x1BRA\x8F3ARA\xDC\xB7\xAF ,\0A\0N\r\0 ( (\f-\v A j$\0\f\v\xC1\0\v\v \vAj$\0\vv\x7F#\0Ak"$\0  \x006\f@ \0 F\r\0@  Ak"6\b \0 O\r (\f"\0-\0\0! \0 (\b"\0-\0\0:\0\0 \0 :\0\0  (\fAj"\x006\f (\b!\f\0\v\0\v Aj$\0\v\xA9\x07\x7F~#\0Ak"\b$\0@@@ A$L@ \0-\0\0"\r \0!\f\vA\xD4\xA0A6\0B\0!\f\v \0!@@ \xC0"A F A	kAIrE\r -\0! Aj! \r\0\v\f\v@ A\xFFq"A+k\0\0\vA\x7FA\0 A-F\x1B!\x07 Aj!\v\x7F@ ArAG\r\0 -\0\0A0G\r\0A!	 -\0A\xDFqA\xD8\0F@ Aj!A\f\v Aj! A\b \x1B\f\v A\n \x1B\v"\n\xAD!\fA\0!@@@ -\0\0"A0k"A\xFFqA\nI\r\0 A\xE1\0kA\xFFqAM@ A\xD7\0k!\f\v A\xC1\0kA\xFFqAK\r A7k!\v \n A\xFFqL\r\0 \b \fB\0 \vB\0AA!@ \b)\bB\0R\r\0 \v \f~"\r \xADB\xFF\x83"B\x7F\x85V\r\0 \r |!\vA!	 !\v Aj! !\f\v\v @   \0 	\x1B6\0\v@@ @A\xD4\xA0A\xC4\x006\0 \x07A\0 B\x83"\fP\x1B!\x07 !\v\f\v  \vV\r B\x83!\f\v@ \f\xA7\r\0 \x07\r\0A\xD4\xA0A\xC4\x006\0 B}!\f\v  \vZ\r\0A\xD4\xA0A\xC4\x006\0\f\v \v \x07\xAC"\x85 }!\v \bAj$\0 \v\xDB\x7F~A!@ \0B\0R B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0V B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1B\r\0 B\0R B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0V B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1B\r\0 \0 \x84  \x84\x84P@A\0\v  \x83B\0Y@ \0 T  S  Q\x1B@A\x7F\v \0 \x85  \x85\x84B\0R\v \0 V  U  Q\x1B@A\x7F\v \0 \x85  \x85\x84B\0R!\v \vP~@ A\xC0\0q@  A@j\xAD\x88!B\0!\f\v E\r\0 A\xC0\0 k\xAD\x86  \xAD"\x88\x84!  \x88!\v \0 7\0 \0 7\b\v\xA8\0@ A\x80\bN@ \0D\0\0\0\0\0\0\xE0\x7F\xA2!\0 A\xFFI@ A\xFF\x07k!\f\v \0D\0\0\0\0\0\0\xE0\x7F\xA2!\0A\xFD  A\xFDO\x1BA\xFEk!\f\v A\x81xJ\r\0 \0D\0\0\0\0\0\0`\xA2!\0 A\xB8pK@ A\xC9\x07j!\f\v \0D\0\0\0\0\0\0`\xA2!\0A\xF0h  A\xF0hM\x1BA\x92j!\v \0 A\xFF\x07j\xADB4\x86\xBF\xA2\v\x7F \x8D! \0 6 \0 6\0\v\xD4\x7F@ \x85!#\0Ak"$\0 A\xF7\xFF\xFF\xFFM@@ AI@ \0 A\xFF\0q:\0\v \0!\f\v A\bj AO\x7F AjA~q" Ak" AF\x1BA\vAjv (\f \0 (\b"6\0 \0 (\fA\x80\x80\x80\x80xr6\b \0 6\v@ E\r\0 At"\0E\r\0   \0\xFC\n\0\0\v A\x006  Atj (6\0 Aj$\0\f\vG\0\v\v\xEC\x7F#\0Ak"$\0 \0(!\x7F (\0 \0(\0k"A\xFF\xFF\xFF\xFF\x07I@ At\f\vA\x7F\v"A \x1B! (\0!\x07 \0(\0!\b A\xA7F\x7FA\0 \0(\0\v \xB5"@ A\xA7G@ \0(\0 \0A\x006\0\v A\xA66 A\bj" 6\0  (6 \0 \xAD (\0! A\x006\0 @  (\0\v  \0(\0 \x07 \bkj6\0  \0(\0 A|qj6\0 Aj$\0\v=\0\vh\x7F#\0Ak"$\0  6\f  6\b Aj A\fjS \0   (\b\x85!(\0"\0@A\xA8\xA0(\0 \0@A\xA8\xA0A\xB0\x9F \0 \0A\x7FF\x1B6\0\v\v Aj$\0 \v*\x7F#\0Ak"$\0  (\x006\0 \0    y Aj$\0\v\x88\x7F#\0Ak"\n$\0 \n \x006\f@@@ (\0"\v G\r\0 	(` \0F\x7FA+ \0 	(dG\rA-\v!\0  \vAj6\0 \v \0:\0\0\f\v@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vE\r\0 \0 G\r\0A\0!\0 \b(\0" \x07kA\x9FJ\r (\0!\0 \b Aj6\0  \x006\0\f\vA\x7F!\0 	 	A\xE8\0j \nA\fj\xD5 	kAu"AJ\r@@@ A\bk\0\0\v  J\r\f\v AG\r\0 AH\r\0 (\0" F\r  kAJ\r Ak-\0\0A0G\rA\0!\0 A\x006\0  Aj6\0  -\0\xF0\xD8:\0\0\f\v  (\0"\0Aj6\0 \0 A\xF0\xD8j-\0\0:\0\0  (\0Aj6\0A\0!\0\f\vA\0!\0 A\x006\0\v \nAj$\0 \0\v\x8A\x7F#\0Ak"\n$\0 \n \0:\0@@@ (\0"\v G\r\0 \0A\xFFq"\f 	-\0F\x7FA+ \f 	-\0G\rA-\v!\0  \vAj6\0 \v \0:\0\0\f\v@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vE\r\0 \0 G\r\0A\0!\0 \b(\0" \x07kA\x9FJ\r (\0!\0 \b Aj6\0  \x006\0\f\vA\x7F!\0 	 	Aj \nAj\xD9 	k"AJ\r@@@ A\bk\0\0\v  J\r\f\v AG\r\0 AH\r\0 (\0" F\r  kAJ\r Ak-\0\0A0G\rA\0!\0 A\x006\0  Aj6\0  -\0\xF0\xD8:\0\0\f\v  (\0"\0Aj6\0 \0 A\xF0\xD8j-\0\0:\0\0  (\0Aj6\0A\0!\0\f\vA\0!\0 A\x006\0\v \nAj$\0 \0\v\x81\x7F@@ AO@ \0 rAq\r@ \0(\0 (\0G\r Aj! \0Aj!\0 Ak"AK\r\0\v\v E\r\v@ \0-\0\0" -\0\0"F@ Aj! \0Aj!\0 Ak"\r\f\v\v  k\vA\0\vf\x7F~#\0Ak"$\0 \0~ E@B\0\f\v  \xADB\0A\xF0\0 g"AskD )\bB\x80\x80\x80\x80\x80\x80\xC0\0\x85A\x9E\x80 k\xADB0\x86|! )\0\v7\0 \0 7\b Aj$\0\v\0 \0 f"\0A\xEC\x986\0 \0\v{\x7FA\x7F!@ \0A\x7FF\r\0 (LA\0H!@@ ("E@ \xB3 ("E\r\v  (,A\bkK\r\v \rA\x7F\v  Ak"6  \0:\0\0  (\0Aoq6\0 \0A\xFFq!\v \vr\x7F \0A\xFC\xB36\0 \0(@ \0((!@ @A\0 \0 Ak"At" \0($j(\0 \0(  j(\0\0\f\v\v \0Aj0 \0( - \0($- \0(0- \0(<-\v \0\v\xCF\x7F L!#\0Ak"$\0@ A\xF7\xFF\xFF\xFF\x07M@@ A\vI@ \0 A\xFF\0q:\0\v \0!\f\v A\bj A\vO\x7F A\bjAxq" Ak" A\vF\x1BA\n\vAj\x83 (\f \0 (\b"6\0 \0 (\fA\x80\x80\x80\x80xr6\b \0 6\v@ E"\r\0 \r\0   \xFC\n\0\0\v A\0:\0\x07  j -\0\x07:\0\0 Aj$\0\f\vG\0\v \0\v\x7F +! \0 6 \0 6\0\vW\x7F~@A\xC4\x9A(\0"\xAD \0\xADB\x07|B\xF8\xFF\xFF\xFF\x83|"B\xFF\xFF\xFF\xFFX@ \xA7"\0?\0AtM\r \0#\r\vA\xD4\xA0A06\0A\x7F\vA\xC4\x9A \x006\0 \v\xB5\x7F#\0A\xA0k"$\0  \0 A\x9Ej \x1B"6\x94  Ak"\0A\0 \0 M\x1B6\x98 A\0A\x90\xFC\v\0 A\x7F6L A\xD56$ A\x7F6P  A\x9Fj6,  A\x94j6T A\0:\0\0A\0!#\0A\xD0k"$\0  6\xCC A\xA0j"\0A\0A(\xFC\v\0  (\xCC6\xC8@A\0  A\xC8j A\xD0\0j \0\x8CA\0H@A\x7F!\0\f\v (LA\0H  (\0"A_q6\0\x7F@@ (0E@ A\xD0\x0060 A\x006 B\x007 (,!  6,\f\v (\r\vA\x7F \xEB\r\v   A\xC8j A\xD0\0j A\xA0j\x8C\v! @ A\0A\0 ($\0 A\x0060  6, A\x006 (!\0 B\x007 A\x7F \0\x1B!\v  (\0"\0 A qr6\0A\x7F  \0A q\x1B!\0\r\0\v A\xD0j$\0 A\xA0j$\0 \0\vu\x7F~ \0B\x80\x80\x80\x80Z@@ Ak" \0" \0B\n\x80"\0B\n~}\xA7A0r:\0\0 B\xFF\xFF\xFF\xFF\x9FV\r\0\v\v \0B\0R@ \0\xA7!@ Ak"  A\nn"A\nlkA0r:\0\0 A	K !\r\0\v\v \v\\\x7F \0(\x90"@ \0 6\x94 \0(\x98 -\v \0(\x84"@ \0 6\x88 \0(\x8C -\v \0(x"@ \0 6| \0(\x80 -\v\v\xAA\x7F#\0Ak"$\0 \0( \f!\0@A\xCC\x9E-\0\0Aq@A\xC8\x9E(\0!\f\vAA\x9C9A\x07!A\xCC\x9EA:\0\0A\xC8\x9E 6\0\v  +\x009\b A\x006 A\0A\0 Aj A\bj\xFC! ("@ \v \0 * A	O@ \v \0A	O@ \0\v Aj$\0\v\f\0 \0\xFD \0-\v\xF1\x7F#\0Ak"$\0@  \0-\0\vA\x07v\x7F \0(\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v"\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\v"kM@ E"\r\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v" j!\x07@ \r\0 \r\0 \x07  \xFC\n\0\0\v  j!@ \0-\0\vA\x07v@ \0 6\f\v \0 A\xFF\0q:\0\v\v A\0:\0  j -\0:\0\0\f\v \0   k j  A\0  \x84\v Aj$\0 \0\v\v\0  6\0A\v\xA2\x7F#\0Ak"$\0 \0-\0\vA\x07v@ \0(\b \0(\0-\v\x7F -\0\vA\x07v@ (\f\v -\0\v\v -\0\vA\x07v! \0 (\b6\b \0 )\x007\0 A\0:\0\v A\x006\f  (\f6\0@ \0 F"\r\0 \r\0\v \0-\0\vA\x07v!\0@ \r\0 \0\r\0\v Aj$\0\vi\x7F#\0Ak"$\0 A\fj" ("6\0 A\xC0\xC0G@  (Aj6\v  A\xB8\xC2." (\0(\0\x006\0 \0  (\0(\0 0 Aj$\0\vb\x7F#\0Ak"$\0 A\fj" \0("\x006\0 \0A\xC0\xC0G@ \0 \0(Aj6\v A\xF0\xC1."\0A\xF0\xD8A\x8A\xD9  \0(\0(0\0 0 Aj$\0 \vi\x7F#\0Ak"$\0 A\fj" ("6\0 A\xC0\xC0G@  (Aj6\v  A\xB0\xC2." (\0(\0\0:\0\0 \0  (\0(\0 0 Aj$\0\v\xBB\x7F A\xF0\xB4 \x1B"(\0!@\x7F@ E@ \rA\0\vA~ E\r@ @ !\f\v -\0\0"\xC0"A\0N@ \0@ \0 6\0\v A\0G\vA\xA8\xA0(\0(\0E@A \0E\r \0 A\xFF\xBFq6\0A\v A\xC2k"A2K\r At(\xA0\xB5! Ak"E\r Aj!\v -\0\0"Av"\x07Ak Au \x07jrA\x07K\r\0@ Ak! A\xFFqA\x80k Atr"A\0N@ A\x006\0 \0@ \0 6\0\v  k\v E\r Aj",\0\0"A@H\r\0\v\v A\x006\0A\xD4\xA0A6\0A\x7F\v\v  6\0A~\v\xA2\x7F\x7F@ \0(L"A\0N@ E\rA\xE0\x9F(\0 A\xFF\xFF\xFF\xFFqG\r\v \0(" \0(\bG@ \0 Aj6 -\0\0\f\v \0\xAB\f\v \0 \0(L"A\xFF\xFF\xFF\xFF \x1B6L\x7F \0(" \0(\bG@ \0 Aj6 -\0\0\f\v \0\xAB\v \0(L \0A\x006L\v\v\0 \0 f"\0A\x9C\x986\0 \0\v\x99| \0 \0\xA2"  \xA2\xA2 D|\xD5\xCFZ:\xD9\xE5=\xA2D\xEB\x9C+\x8A\xE6\xE5Z\xBE\xA0\xA2  D}\xFE\xB1W\xE3\xC7>\xA2D\xD5a\xC1\xA0*\xBF\xA0\xA2D\xA6\xF8\x81?\xA0\xA0! \0 \xA2! E@   \xA2DIUUUUU\xC5\xBF\xA0\xA2 \0\xA0\v \0  D\0\0\0\0\0\0\xE0?\xA2  \xA2\xA1\xA2 \xA1 DIUUUUU\xC5?\xA2\xA0\xA1\v\x92|D\0\0\0\0\0\0\xF0? \0 \0\xA2"D\0\0\0\0\0\0\xE0?\xA2"\xA1"D\0\0\0\0\0\0\xF0? \xA1 \xA1    D\x90\xCB\xA0\xFA>\xA2DwQ\xC1l\xC1V\xBF\xA0\xA2DLUUUUU\xA5?\xA0\xA2  \xA2" \xA2  D\xD48\x88\xBE\xE9\xFA\xA8\xBD\xA2D\xC4\xB1\xB4\xBD\x9E\xEE!>\xA0\xA2D\xADR\x9C\x80O~\x92\xBE\xA0\xA2\xA0\xA2 \0 \xA2\xA1\xA0\xA0\v;\0 \0 6l \0A\0:\0h \0B\x007  \0A\0:\0 \0A\xC8\xD8\x006\0 \0 M9 \0 N9\b \0\v\xC3|\x7F@ \0AK\r\0A8!	 |@@@@@@@@ \0\b\0\x07	\v +\0" +\0"\x07a\r\b +\0"\b a\r\b  \x07 \bb\r\x07\f\b\vA\b!	\f\vA!	\f\vA!	\f\vA !	\f\vA(!	\f\vA0!	\v  	j+\0"  	j+\0"\x07a\r  	j+\0"\b \x07a\r  \ba\r  \b  \x07 +\0 +\0 +\0_\v9\0   \b  \x07 +\b +\b +\b_9\b   \b  \x07 + + +_9   \b  \x07 + + +_9   \b  \x07 +  +  + _9    \b  \x07 +( +( +(_9(   \b  \x07 +0 +0 +0_90  \0AG|  \b  \x07 +8 +8 +8_ \v98\vA\b9A\x97\x92A\xA8\x98A\0\v\0  \0(\0j 6\0\v\xE9\x7F|#\0A k"$\0 |  \0+\b\xA1"\x99D\0\0\0\0\0\0>@c@  \0+ 9\0 \0+\f\v D\xDAd\x9E\xA6\xE0:`\xBF\xA2 \0+\0\xA0! D\0\0\0\0 \x9F\xE1@d@AA\xEAA\xD7A\xE8A\xE9-A\0p\v@ Dfffffq\xC0c@ B\xE6\xCC\x99\xB3\xE6\xCC\xC4\xB8@7\b  9\0AA\xEAA\xDEA\xE8A\xA2/ pDfffffq\xC0!\f\v  \0+("cE\r\0  9AA\xEAA\xE4A\xE8A\xE9. Ajp !\v \0+! D\xDAd\x9E\xA6\xE0:`\xBF\xA2 \0+\0Dfffffq@\xA0"\xA3D\0\0\0\0\0\0\xF0?\xA0D?S\xAF[@\xB9!\x07  \0+    \x07\xA2\xA2  Dfffffq@\xA0"\xA2\xA3\xA29\0 \x9FD$\xB9\xFC\x87\xF4\v4@\xA2D!\x7F\xA3\xFC(?\n@\xA2\v9\0 A j$\0\v\r\0  \0(\0j(\0\v\x82*\x7F|#\0A\xD0k"	$\0A\xAF!\b@@@@ (\xF0\0\vA\xB0!\b\v 	 \b6\f 	A\xD4\xCF\x006\b 	 	A\bj6 \0(\xC8! \0A\x006\xC8@@@  \0A\xB8j" F\x7FA E\rA\v (\0j(\0\0 	("\bE@ \0A\x006\xC8\f\v \b 	A\bjF\r \0 \b6\xC8\f\v 	A\bj!\b\v \0 6\xC8 \b  \b(\0(\f\0 	(" 	A\bjF\x7FA E\rA\v!  (\0 j(\0\0\v \0 )\xA87h \0 )\xA07` \0 )\x987X \0 )\x907P \0 )\x887H \0 )\x807@ \0 )\xF878 	A\bj!#\0A\x80k"$\0 "(\xF0! +P!\x1B +@! +8! +0! +(! + !  +!! +!" +\b!# +\0!$D{\xAEG\xE1zd?! +H"M!% N!&@@ \0\vD\0\0\0\0\0\0\xE0?!\v@@ (d"Ak\0\0\vA\b9A\xB7\x7FA\xF8\x98A\0\v +\xF8! +X! A\xAD\f"\n! A	O@ \vA\xAC\x9E-\0\0AqE@AA\x943A\x07!A\xAC\x9EA:\0\0A\xA8\x9E 6\0\v A	O@ 	\v  6\xD0 A\x006\xF8A\xA8\x9E(\0 A\0 A\xF8j A\xD0j! (\xF8"@ \v A	O@ \v@@@@ \xFC"\fAK@ \fA\x80\x80\x80\x80O\r \fAt"\r+! \rE"\x07E@ A\0 \r\xFC\v\0\v \r+!\v \x07E@ \vA\0 \r\xFC\v\0\v A\xE0\0j!  \xA2! A\x006\xF4@ A\xF8j  A\xF4j\xD8 (\xFCA\xE9\f"\n! A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v A	I"E@ 	\v  6\xD0 A\x006\xC8A\xB8\x9E(\0 A\0 A\xC8j A\xD0j! (\xC8"@ \v  (\xF4Atj 9\0 E@ \v (\xFCA\x96&\f"\n! A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v A	I"E@ 	\v  6\xD0 A\x006\xC8A\xB8\x9E(\0 A\0 A\xC8j A\xD0j! (\xC8"@ \v \v (\xF4Atj 9\0 E@ \v (\xFC"A	O@ \v  (\xF4Aj"6\xF4  \fI\r\0\v \fAk"\bAt"+! E"E@ A\0 \xFC\v\0\v +! E@ A\0 \xFC\v\0\v \r+!\n \x07E@ \nA\0 \r\xFC\v\0\v \fA\x81\x80\x80\xC0\0N\r  \bAt"\x07+"6\xBC   \x07j"6\xC4A\0! \x07@ A\0 \x07\xFC\v\0\v  6\xC0 +\0! \v+\0"!@  At"\x07j  Aj"At"j+\0" \xA1"9\0 \x07 j  \vj+\0" \xA1 \xA39\0 ! !  \bG\r\0\v \fAF\rA!@D\0\0\0\0\0\0\0\0!@  AkAt"\x07j+\0"D\0\0\0\0\0\0\0\0a\r\0  At"j+\0"D\0\0\0\0\0\0\0\0a\r\0  \xA2D\0\0\0\0\0\0\0\0c\r\0  j+\0" \xA0 \x07 j+\0"\xA0"  \xA0 \xA0"\xA0  \xA3  \xA3\xA0\xA3!\v \n Atj 9\0 Aj" \bG\r\0\vD\0\0\0\0\0\0\0\0!D\0\0\0\0\0\0\0\0!@ +\0"  +\0" \xA0 +\b"\xA0\xA2  +\b"\xA2\xA1  \xA0\xA3"\xA2D\0\0\0\0\0\0\0\0e\r\0  \xA2D\0\0\0\0\0\0\0\0cE@ !\f\v "\x99 \x99D\0\0\0\0\0\0\b@\xA2dE\r\0 D\0\0\0\0\0\0\b@\xA2!\v \n 9\0@  \fAt"Ak"j+\0"   j+\0" \xA0  Ak"j+\0"\xA0\xA2   j+\0"\xA2\xA1  \xA0\xA3"\xA2D\0\0\0\0\0\0\0\0e\r\0  \xA2D\0\0\0\0\0\0\0\0cE@ !\f\v "\x99 \x99D\0\0\0\0\0\0\b@\xA2dE\r\0 D\0\0\0\0\0\0\b@\xA2!\v \n \bAtj 9\0 \n+\0!\f\vA\b9A\xEF\x7FA\xF8\x98A\0\v \n +\0"9\b \n 9\0\vA\0!@ \v Aj"At"\x07j+\0!  Atj+\0! \x07 \nj+\0!  Atj" 9  9   \xA1  \xA2\xA1  \xA2\xA3"D\0\0\0\0\0\0\b@\xA2  \xA1 \xA3"\xA19\b    \xA0\xA1 \xA39\0 ! ! " \bG\r\0\v \n- - - \v- - A\x006\xB8 B\x007\xB0@@ (d"Ak\0\0\v A\xAD\f"\n! A	O@ \vA\xAC\x9E-\0\0AqE@AA\x943A\x07!A\xAC\x9EA:\0\0A\xA8\x9E 6\0\v A	O@ 	\v  6\xD0 A\x006\xF8A\xA8\x9E(\0 A\0 A\xF8j A\xD0j (\xF8"@ \v A	O@ \v A\x006\xF4\xFC"E\r\0A\0!A\0!\x07A\0!@ A\xF8j  A\xF4j\xD8 (\xFCA\xE9\f"\n!\n A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v \nA	I"\bE@ \n	\v  \n6\xD0 A\x006\xC8A\xB8\x9E(\0 \nA\0 A\xC8j A\xD0j! (\xC8"@ \v@  \x07I@  9\0 A\bj!\f\v  k"\fAu"Aj"\vA\x80\x80\x80\x80O\r \fA\xFF\xFF\xFF\xFF \x07 k"\x07Au" \v  \vK\x1B \x07A\xF8\xFF\xFF\xFF\x07O\x1B"\r\x7F \rA\x80\x80\x80\x80O\r \rAt+A\0\v"\x07j"\v 9\0 \v Atk! \f@   \f\xFC\n\0\0\v  \x07 \rAtj"\x076\xB8  \vA\bj"6\xB4  6\xB0 @ -\v !\v  6\xB4 \bE@ \n\v (\xFC"A	O@ \v  (\xF4Aj"6\xF4  I\r\0\v\v  )\x907\xA8  )\x887\xA0  )\x807\x98  )x7\x90  )p7\x88  )h7\x80 A\xB0j A\x98jA\xD0\0\xFC\n\0\0 A\x80j"B\x007\b B\x007\0 B\x007 B\x007  B\x007( B\x80\x80\x80\x80\xC0\xF0\xF5\xCB\xC1\x007@@ (\xECAk\0\0\vA\xEE	! (\xEC  A	O@ \vE\r\0 (\xECA\xAD\f"\n! A	O@ \vA\xAC\x9E-\0\0AqE@AA\x943A\x07!A\xAC\x9EA:\0\0A\xA8\x9E 6\0\v A	O@ 	\v  6\xD0 A\x006\xF8A\xA8\x9E(\0 A\0 A\xF8j A\xD0j (\xF8"@ \v A	O@ \v A\x006\xF0\xFC"\x07@ A\xE8j!@ A\xC8j  A\xF0j\xD8 (\xCC"!A\xC4\x9E-\0\0AqE@AA\xC83A\x07!A\xC4\x9EA:\0\0A\xC0\x9E 6\0 (\xCC!\v A	O@ 	\v  6\xF8 A\x006\xF4 A\xC0\x9E(\0 A\0 A\xF4j A\xF8j\xFC")\x007\xD0  )\b7\xD8  )7\xE0  )7\xE8 (\xF4"@ \v  A\xD0j\x9D (\xCC"A	O@ \v  (\xF0Aj"6\xF0  \x07I\r\0\v\v@ (\f" ( (\0"kAuI@  Atj"+\0! +\b! B\x007    M\xA29(   N\xA29  +9\f\v B\x007( B\x007  B\x007 D\0\0\0\0\x84\xD7\x97A9\v\v  )\xA87x  )\xA07p  )\x987h  )\x907`  )\x887X  )\x807P  A\xB0jA\xD0\0\xFC\n\0\0 A\x006\x80 B\x007x D\0\0\0\0\0\0\0\x009p  9h  9`  \x1B9X  %9P  &9H  9@  98  90  9(   9   !9  "9  #9\b  $9\0@ (\xC0" (\xBC"G@  k"\x07A\0H\r  \x07+"6|  6x   \x07j"6\x80 \x07@   \x07\xFC\n\0\0\v  6|\v A\x006\x8C B\x007\x84 (\xB4" (\xB0"G@  k"\x07A\0H\r  \x07+"6\x88  6\x84   \x07j"6\x8C \x07@   \x07\xFC\n\0\0\v  6\x88\v  )x7\xB8  )p7\xB0  )h7\xA8  )`7\xA0  )X7\x98  )P7\x90 A\xC0j A\xD0\0\xFC\n\0\0 A\x006\x98 B\x007\x90 (" (\0"G@  k"\x07A\0H\r  \x07+"6\x94  6\x90   \x07j"6\x98 \x07@   \x07\xFC\n\0\0\v  6\x94\v  (,6\xBC  )$7\xB4  )7\xAC  )7\xA4  )\f7\x9C A\x006\xC0@@@ |D\0\0\0\0\0\0\0\0 +"D\0\0\0\0\0\0\0\0a\r\0D\0\0\0\0\0\0\0\0 +"D\0\0\0\0\0\0\0\0a\r\0D\0\0\0\0\0\0\0\0 + "D\0\0\0\0\0\0\0\0a\r\0D\0\0\0\0\0\0\0\0 +\xA0"D\0\0\0\0\0\0\0\0a\r\0 D\0\0\0\0\0\0\b@\xB9!  \xA3" \xA2D\0\0\0\0\0\0\xF0?\xA0"D\0\0\0\0\0\0\0\0a\r D\0\0\0\0\0\0\0\0a\r D\0\0\0\0\0\0\0\0a\r \x99 \xA3" \xA2"D\0\0\0\0\0\0\0\0a\r DR\xEA\xCF\xAB\x93\xEE@@\xA3"D\0\0\0\0\0\0\0\0a\r +(! +hD\0\0\0\0\0\xE0\xA5@\xA3DUUUUUU\xD5?\xB9 D\0\0\0\0\0\0>@\xA2    \xA2\xA2\xA2\xA3\xA2D\xECQ\xB8\x85\xEB=@ \xA3 +\x90D\0\0\0\0\0\0"@\xA2D\0\0\0\0\0\0@\xA3D\0\0\0\0\0\0@@\xA0D\0\0\0\0\0\xC0|@\xA0D\0\0\0\0\x008\x80@\xA3\xA2\xA2\v9p\f\v B\x007pA\b9A\x8D-\x92A\xA8\x98A\0\v B\x007pA\b9A\xC4-\x92A\xA8\x98A\0\v\f\0\v (\0"@  6 (\b -\v (\xB0"@  6\xB4 (\xB8 -\v (\xBC"@  6\xC0 (\xC4 -\v A\x80j$\0\f\vT\0\v \0A\xF0\0j" A\xF8\0\xFC\n\0\0@  F@ \0A\x80j 	A\x98jA\x80\xFC\n\0\0\f\v \0A\xE8j 	(\x80" 	(\x84"  kAu\x9C 	(\x90"!@  	(\x8C"kAu" \0(\xFC"\b \0(\xF4"\x07kAuM@  \0(\xF8"\b \x07k"AuK@ \x07 \bG@ @ \x07  \xFC\n\0\0\v \0(\xF8!\b\v   j"k!@  F\r\0 E\r\0 \b  \xFC\n\0\0\v \0  \bj6\xF8\f\v  k!@  F\r\0 E\r\0 \x07  \xFC\n\0\0\v \0  \x07j6\xF8\f\v \x07@ \0 \x076\xF8 \x07- \0A\x006\xFC \0B\x007\xF4A\0!\b\v@ A\x80\x80\x80\x80O\r\0A\xFF\xFF\xFF\xFF \bAu"   K\x1B \bA\xF8\xFF\xFF\xFF\x07O\x1B"A\x80\x80\x80\x80O\r\0 \0 At"+"6\xF8 \0 6\xF4 \0  j6\xFC  k!@  F\r\0 E\r\0   \xFC\n\0\0\v \0  j6\xF8\f\v\f\v \0A\x80j 	A\x98jA\x80\xFC\n\0\0 \0A\x80j 	(\x98" 	(\x9C"  kAu\x9C\v \0 	(\xC46\xAC \0 	)\xBC7\xA4 \0 	)\xB47\x9C \0 	)\xAC7\x94 \0 	)\xA47\x8C \0 	(\xC86\xB0 	A\bj\x87 \0B\x0070 \0B\x007  \0 \0+`9( 	A\xD0j$\0\vA\b9A\xD8\x7FA\xF8\x98A\0\vP\0\vI\x7F \0("A\bu! \0(\0"\0  Aq\x7F  (\0j(\0 \v j A Aq\x1B  \0(\0(\r\0\v5\0 \0A\x84\x976\0 \0A\x88\x986\0 \0Aj\x7F -\0\vA\x07v@ (\0\f\v \v\xCD \0\v\0A\v\xBB\x7F#\0Ak"$\0  6\f  6\b Aj A\fjS (\b!#\0Ak"$\0  6\f  6\bA\x7F!@A\0A\0  \x85"A\0H\r\0 \0 Aj"<"\x006\0 \0E\r\0 \0   (\f\x85!\v Aj$\0(\0"\0@A\xA8\xA0(\0 \0@A\xA8\xA0A\xB0\x9F \0 \0A\x7FF\x1B6\0\v\v Aj$\0 \v\b\0A\xFF\xFF\xFF\xFF\x07\v\0A\xFF\0\vv\x7F#\0Ak"$\0  \x006\f@ \0 F\r\0@  Ak"6\b \0 O\r (\f"\0(\0! \0 (\b"\0(\x006\0 \0 6\0  (\fAj"\x006\f (\b!\f\0\v\0\v Aj$\0\v\xF6\b\x7F#\0Ak"\n$\0 A\xF0\xC1.!	 \nAj A\xB8\xC2." (\0(\0@\x7F \n-\0A\x07v@ \n(\b\f\v \n-\0A\xFF\0q\vE@ 	 \0   	(\0(0\0    \0kAtj"6\0\f\v  6\0@@ \0"\b-\0\0"\x07A+k\0\0\v 	 \x07\xC0 	(\0(,\0!\b  (\0"\x07Aj6\0 \x07 \b6\0 \0Aj!\b\v@  \bkAH\r\0 \b-\0\0A0G\r\0 \b-\0A rA\xF8\0G\r\0 	A0 	(\0(,\0!\x07  (\0"\vAj6\0 \v \x076\0 	 \b,\0 	(\0(,\0!\x07  (\0"\vAj6\0 \v \x076\0 \bAj!\b\v \b q  (\0(\0\0!\v \b!\x7F  M\x7F  \b \0kAtj (\0\xA1 (\0@\x7F \nAj"\x07-\0\vA\x07v@ \x07(\0\f\v \x07\v \rj-\0\0E\r\0 \f\x7F \x07-\0\vA\x07v@ \x07(\0\f\v \x07\v \rj,\0\0G\r\0  (\0"\fAj6\0 \f \v6\0 \r \r\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vAkIj!\rA\0!\f\v 	 ,\0\0 	(\0(,\0!\x07  (\0"Aj6\0  \x076\0 Aj! \fAj!\f\f\v\v!\v     \0kAtj  F\x1B6\0 \nAj, \nAj$\0\v9\x7F~#\0Ak"$\0 )\0!  )\b7\b  7\0 \0   \x9E Aj$\0\v\xD0\x7F A\x80q@ \0A+:\0\0 \0Aj!\0\v A\x80\bq@ \0A#:\0\0 \0Aj!\0\v A\x84q"A\x84G@ \0A\xAE\xD4\0;\0\0 \0Aj!\0\v A\x80\x80q!@ -\0\0"@ \0 :\0\0 \0Aj!\0 Aj!\f\v\v \0\x7F@ A\x80G@ AG\rA\xC6\0A\xE6\0 \x1B\f\vA\xC5\0A\xE5\0 \x1B\f\vA\xC1\0A\xE1\0 \x1B A\x84F\r\0A\xC7\0A\xE7\0 \x1B\v:\0\0 A\x84G\v*\x7F#\0Ak"$\0  )\x007\0 \0A   y Aj$\0\v\xEC\b\x7F#\0Ak"\n$\0 A\xF8\xC1.!	 \nAj A\xB0\xC2." (\0(\0@\x7F \n-\0A\x07v@ \n(\b\f\v \n-\0A\xFF\0q\vE@ 	 \0   	(\0( \0    \0kj"6\0\f\v  6\0@@ \0"\b-\0\0"\x07A+k\0\0\v 	 \x07\xC0 	(\0(\0!\b  (\0"\x07Aj6\0 \x07 \b:\0\0 \0Aj!\b\v@  \bkAH\r\0 \b-\0\0A0G\r\0 \b-\0A rA\xF8\0G\r\0 	A0 	(\0(\0!\x07  (\0"\vAj6\0 \v \x07:\0\0 	 \b,\0 	(\0(\0!\x07  (\0"\vAj6\0 \v \x07:\0\0 \bAj!\b\v \b q  (\0(\0\0!\v \b!\x7F  M\x7F  \b \0kj (\0q (\0@\x7F \nAj"\x07-\0\vA\x07v@ \x07(\0\f\v \x07\v \rj-\0\0E\r\0 \f\x7F \x07-\0\vA\x07v@ \x07(\0\f\v \x07\v \rj,\0\0G\r\0  (\0"\fAj6\0 \f \v:\0\0 \r \r\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vAkIj!\rA\0!\f\v 	 ,\0\0 	(\0(\0!\x07  (\0"Aj6\0  \x07:\0\0 Aj! \fAj!\f\f\v\v!\v     \0kj  F\x1B6\0 \nAj, \nAj$\0\v\xE4\n\x7F#\0A\x80k"\b$\0 \b 6| \bA\xA66 \bA\x006\b \b \bAj"	(\x006\f@@@  kA\fm"\nA\xE5\0O@ \n<"	E\r \b(\b! \b 	6\b @  \b(\f\0\v\v 	!\x07 !@  F@@ \0 \bA\xFC\0j"5A \n\x1B@ \0 5@  (\0Ar6\0\v@  F\r 	-\0\0AF\r\x07 	Aj!	 A\fj!\f\0\v\0\v\x7F \0(\0"\x07(\f" \x07(F@ \x07 \x07(\0($\0\0\f\v (\0\v!\r E@  \r (\0(\0!\r\v Aj!\fA\0! 	!\x07 !@  F@ \f! E\r \0? 	!\x07 ! \n \vjAI\r@  F@\f@ \x07-\0\0AG\r\0\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v F\r\0 \x07A\0:\0\0 \vAk!\v\v \x07Aj!\x07 A\fj!\f\v\0\v\0@ \x07-\0\0AG\r\0\x7F -\0\vA\x07v@ (\0\f\v \v Atj(\0!@ \x7F    (\0(\0\v \rF@A!\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v \fG\r \x07A:\0\0 \vAj!\v\f\v \x07A\0:\0\0\v \nAk!\n\v \x07Aj!\x07 A\fj!\f\v\0\v\0\v\0 \x07AA\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vE"\f\x1B:\0\0 \x07Aj!\x07 A\fj! \v \fj!\v \n \fk!\n\f\v\0\v\0\v=\0\v  (\0Ar6\0\v \b(\b!\0 \bA\x006\b \0@ \0 \b(\f\0\v \bA\x80j$\0 \v\xE2\n\x7F#\0A\x80k"\b$\0 \b 6| \bA\xA66 \bA\x006\b \b \bAj"	(\x006\f@@@  kA\fm"\nA\xE5\0O@ \n<"	E\r \b(\b! \b 	6\b @  \b(\f\0\v\v 	!\x07 !@  F@@ \0 \bA\xFC\0j"6A \n\x1B@ \0 6@  (\0Ar6\0\v@  F\r 	-\0\0AF\r\x07 	Aj!	 A\fj!\f\0\v\0\v\x7F \0(\0"\x07(\f" \x07(F@ \x07 \x07(\0($\0\0\f\v -\0\0\v\xC0!\r E@  \r (\0(\f\0!\r\v Aj!\fA\0! 	!\x07 !@  F@ \f! E\r \0@ 	!\x07 ! \n \vjAI\r@  F@\f@ \x07-\0\0AG\r\0\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v F\r\0 \x07A\0:\0\0 \vAk!\v\v \x07Aj!\x07 A\fj!\f\v\0\v\0@ \x07-\0\0AG\r\0\x7F -\0\vA\x07v@ (\0\f\v \v j,\0\0!@ \x7F    (\0(\f\0\v \rF@A!\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v \fG\r \x07A:\0\0 \vAj!\v\f\v \x07A\0:\0\0\v \nAk!\n\v \x07Aj!\x07 A\fj!\f\v\0\v\0\v\0 \x07AA\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vE"\f\x1B:\0\0 \x07Aj!\x07 A\fj! \v \fj!\v \n \fk!\n\f\v\0\v\0\v=\0\v  (\0Ar6\0\v \b(\b!\0 \bA\x006\b \0@ \0 \b(\f\0\v \bA\x80j$\0 \vM\x7F -\0\0!@ \0-\0\0"E\r\0  G\r\0@ -\0! \0-\0"E\r Aj! \0Aj!\0  F\r\0\v\v  k\vT\0 \0A\x006 \0 6 \0A\x006\f \0B\x82\xA0\x80\x80\xE0\x007 \0 E6 \0A jA\0A(\xFC\v\0 \0Aj\xD0 \0A\x006H \0A\0:\0P \0A\x7F6\0L\vA\x7F#\0Ak"$\0A\x7F!@ \0\xB3\r\0 \0 AjA \0( \0AG\r\0 -\0!\v Aj$\0 \v\x87\x7F@ \0(" (\0A\fk(\0j(E\r\0 (\0A\fk(\0 j(\r\0 (\0A\fk(\0 j(A\x80\xC0\0qE\r\0 (\0A\fk(\0 j(" (\0(\0\0A\x7FG\r\0 \0("\0 \0(\0A\fk(\0jA\xAE\v\v\r\0 \0Aj\x81 \0\v\0 \0 \0( r\xEF\v|\x7F#\0Ak"$\0 \0 \0(\0A\fk(\0j(@ A\bj \0\xE4@ -\0\bE\r\0 \0 \0(\0A\fk(\0j(" (\0(\0\0A\x7FG\r\0 \0 \0(\0A\fk(\0jA\xAE\v A\bj\xAC\v Aj$\0\v\r\0 \0A\bj\x81 \0\v\0A\x7F\v\0\v|\x7F \0 \0(H"Ak r6H \0( \0(G@ \0A\0A\0 \0($\0\v \0A\x006 \0B\x007 \0(\0"Aq@ \0 A r6\0A\x7F\v \0 \0(, \0(0j"6\b \0 6 A\x1BtAu\v\xE9\x7F \0E@A\xE8\x9C(\0"\0@ \0\xB4!\vA\x80\x9E(\0"\0@ \0\xB4 r!\vA\xD0\xA0(\0"\0@@ \0(L \0( \0(G@ \0\xB4 r!\v \0(8"\0\r\0\v\v \v \0(LA\0H!@@ \0( \0(F\r\0 \0A\0A\0 \0($\0 \0(\r\0A\x7F!\f\v \0(" \0(\b"G@ \0  k\xACA \0((\0\vA\0! \0A\x006 \0B\x007 \0B\x007 \r\0\v \v\x8D\b\v\x7F \0E@ <\v A@O@A\xD4\xA0A06\0A\0\v\x7FA A\vjAxq A\vI\x1B! \0A\bk"("	Axq!\b@ 	AqE@ A\x80I\r Aj \bM@ ! \b kA\xB8\xA4(\0AtM\r\vA\0\f\v  \bj!\x07@  \bM@ \b k"AI\r   	AqrAr6  j" Ar6 \x07 \x07(Ar6  \x85\f\vA\xF0\xA0(\0 \x07F@A\xE4\xA0(\0 \bj"\b M\r   	AqrAr6  j" \b k"Ar6A\xE4\xA0 6\0A\xF0\xA0 6\0\f\vA\xEC\xA0(\0 \x07F@A\xE0\xA0(\0 \bj" I\r@  k"AO@   	AqrAr6  j"\b Ar6  j" 6\0  (A~q6\f\v  	Aq rAr6  j" (Ar6A\0!\bA\0!\vA\xEC\xA0 \b6\0A\xE0\xA0 6\0\f\v \x07("Aq\r Axq \bj"\v I\r \v k!\f \x07(\f!@ A\xFFM@ \x07(\b" F@A\xD8\xA0A\xD8\xA0(\0A~ Avwq6\0\f\v  6\f  6\b\f\v \x07(!\n@  \x07G@ \x07(\b" 6\f  6\b\f\v@ \x07("\x7F \x07Aj \x07("E\r \x07Aj\v!\b@ \b! "Aj!\b ("\r\0 Aj!\b ("\r\0\v A\x006\0\f\vA\0!\v \nE\r\0@ \x07("At"(\x88\xA3 \x07F@ A\x88\xA3j 6\0 \rA\xDC\xA0A\xDC\xA0(\0A~ wq6\0\f\v@ \x07 \n(F@ \n 6\f\v \n 6\v E\r\v  \n6 \x07("@  6  6\v \x07("E\r\0  6  6\v \fAM@  	Aq \vrAr6  \vj" (Ar6\f\v   	AqrAr6  j" \fAr6  \vj" (Ar6  \f\x85\v !\v \v"@ A\bj\v <"E@A\0\v  \0A|Ax \0Ak(\0"Aq\x1B Axqj"   K\x1B^ \0- \v\0 \0E@A\0\v \0 \xB7\v\x89\0@ \0\x7F A\xFF\0M\r@A\xA8\xA0(\0(\0E@ A\x80\x7FqA\x80\xBFF\r\f\v A\xFFM@ \0 A?qA\x80r:\0 \0 AvA\xC0r:\0\0A\v A\x80@qA\x80\xC0G A\x80\xB0OqE@ \0 A?qA\x80r:\0 \0 A\fvA\xE0r:\0\0 \0 AvA?qA\x80r:\0A\v A\x80\x80kA\xFF\xFF?M@ \0 A?qA\x80r:\0 \0 AvA\xF0r:\0\0 \0 AvA?qA\x80r:\0 \0 A\fvA?qA\x80r:\0A\v\vA\xD4\xA0A6\0A\x7FA\v\v \0 :\0\0A\v\xC3\x7F@ ("\x7F  \xEB\r (\v ("k I@  \0  ($\0\v@@ (PA\0H\r\0 E\r\0 !@ \0 j"Ak-\0\0A\nG@ Ak"\r\f\v\v  \0  ($\0" I\r  k! (!\f\v \0!A\0!\v   ^  ( j6  j!\v \v\x81\f|~\x07\x7F#\0Ak"$\0@@ \xBD"	B4\x88\xA7"\rA\xFFq"A\xBE\bk"A\xFF~K \0\xBD"\bB4\x88\xA7"\vA\xFFkA\x82pOq\r\0 	B\x86"\nB\x80\x80\x80\x80\x80\x80\x80|B\x81\x80\x80\x80\x80\x80\x80T@D\0\0\0\0\0\0\xF0?! \bB\x80\x80\x80\x80\x80\x80\x80\xF8?Q\r \nP\r \nB\x81\x80\x80\x80\x80\x80\x80pT \bB\x86"\bB\x80\x80\x80\x80\x80\x80\x80pXqE@ \0 \xA0!\f\v \bB\x80\x80\x80\x80\x80\x80\x80\xF0\xFF\0Q\rD\0\0\0\0\0\0\0\0  \xA2 	B\0S \bB\x80\x80\x80\x80\x80\x80\x80\xF0\xFF\0Ts\x1B!\f\v \bB\x86B\x80\x80\x80\x80\x80\x80\x80|B\x81\x80\x80\x80\x80\x80\x80T@ \0 \0\xA2! \bB\0S@ \x9A  	\x8FAF\x1B!\v 	B\0Y\r#\0Ak"\vD\0\0\0\0\0\0\xF0? \xA39\b \v+\b!\f\v \bB\0S@ 	\x8F"\fE@ \0 \0\xA1"\0 \0\xA3!\f\v \vA\xFFq!\vA\x80\x80A\0 \fAF\x1B!\f \0\xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83!\b\v A\xFF~M@D\0\0\0\0\0\0\xF0?! \bB\x80\x80\x80\x80\x80\x80\x80\xF8?Q\r A\xBD\x07M@  \x9A \bB\x80\x80\x80\x80\x80\x80\x80\xF8?V\x1BD\0\0\0\0\0\0\xF0?\xA0!\f\v \rA\xFFK \bB\x80\x80\x80\x80\x80\x80\x80\xF8?VG@#\0Ak"\vD\0\0\0\0\0\0\0p9\b \v+\bD\0\0\0\0\0\0\0p\xA2!\f\v#\0Ak"\vD\0\0\0\0\0\0\09\b \v+\bD\0\0\0\0\0\0\0\xA2!\f\v \v\r\0 \0D\0\0\0\0\0\x000C\xA2\xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xA0}!\b\v| 	B\x80\x80\x80@\x83\xBF"  \bB\x80\x80\x80\x80\xD0\xAA\xA5\xF3?}"	B4\x87\xB9"A\xA8\x88+\0\xA2 	B-\x88\xA7A\xFF\0qAt"\v+\x80\x89\xA0 \b 	B\x80\x80\x80\x80\x80\x80\x80x\x83}"\bB\x80\x80\x80\x80\b|B\x80\x80\x80\x80p\x83\xBF"\0 \v+\xE8\x88"\xA2D\0\0\0\0\0\0\xF0\xBF\xA0" \b\xBF \0\xA1 \xA2"\xA0"\0 A\xA0\x88+\0\xA2 \v+\xF8\x88\xA0" \0 \xA0"\xA1\xA0\xA0  \0A\xB0\x88+\0"\xA2"  \xA2"\xA0\xA2\xA0  \xA2"   \xA0"\xA1\xA0\xA0 \0 \0 \xA2"\xA2   \0A\xE0\x88+\0\xA2A\xD8\x88+\0\xA0\xA2 \0A\xD0\x88+\0\xA2A\xC8\x88+\0\xA0\xA0\xA2 \0A\xC0\x88+\0\xA2A\xB8\x88+\0\xA0\xA0\xA2\xA0"\0   \0\xA0"\xA1\xA09\b \xBDB\x80\x80\x80@\x83\xBF"\xA2!\0  \xA1 \xA2  +\b  \xA1\xA0\xA2\xA0@ \0\xBDB4\x88\xA7A\xFFq"\vA\xC9\x07kA?I\r\0 \vA\xC9\x07I@ \0D\0\0\0\0\0\0\xF0?\xA0"\0\x9A \0 \f\x1B\f\v \vA\x89\bIA\0!\v\r\0 \0\xBDB\0S@#\0Ak"\vD\0\0\0\0\0\0\0\x90D\0\0\0\0\0\0\0 \f\x1B9\b \v+\bD\0\0\0\0\0\0\0\xA2\f\v#\0Ak"\vD\0\0\0\0\0\0\0\xF0D\0\0\0\0\0\0\0p \f\x1B9\b \v+\bD\0\0\0\0\0\0\0p\xA2\f\v \0A\xB0\xF7\0+\0\xA2A\xB8\xF7\0+\0"\xA0" \xA1"A\xC8\xF7\0+\0\xA2 A\xC0\xF7\0+\0\xA2 \0\xA0\xA0\xA0"\0 \0\xA2" \xA2 \0A\xE8\xF7\0+\0\xA2A\xE0\xF7\0+\0\xA0\xA2  \0A\xD8\xF7\0+\0\xA2A\xD0\xF7\0+\0\xA0\xA2 \xBD"	\xA7AtA\xF0q"\r+\xA0x \0\xA0\xA0\xA0!\0 \r)\xA8x 	 \f\xAD|B-\x86|!\b \vE@| 	B\x80\x80\x80\x80\b\x83P@ \bB\x80\x80\x80\x80\x80\x80\x80\x88?}\xBF" \0\xA2 \xA0D\0\0\0\0\0\0\0\x7F\xA2\f\v \bB\x80\x80\x80\x80\x80\x80\x80\xF0?|"\b\xBF" \0\xA2" \xA0"\0\x99D\0\0\0\0\0\0\xF0?c|#\0Ak"\v \vD\0\0\0\0\0\0\x009\b \v+\bD\0\0\0\0\0\0\0\xA29\b \bB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83\xBF \0D\0\0\0\0\0\0\xF0\xBFD\0\0\0\0\0\0\xF0? \0D\0\0\0\0\0\0\0\0c\x1B"\xA0"   \0\xA1\xA0 \0  \xA1\xA0\xA0\xA0 \xA1"\0 \0D\0\0\0\0\0\0\0\0a\x1B \0\vD\0\0\0\0\0\0\0\xA2\v\f\v \b\xBF" \0\xA2 \xA0\v!\v Aj$\0 \v\x9C\b\x7F@ \0"Aq@@ -\0\0"E\r A=F\r Aj"Aq\r\0\v\v@@A\x80\x82\x84\b (\0"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xG\r\0@A\x80\x82\x84\b A\xBD\xFA\xF4\xE9s"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xG\r (! Aj"! A\x80\x82\x84\b krA\x80\x81\x82\x84xqA\x80\x81\x82\x84xF\r\0\v\f\v !\v@ "-\0\0"E\r Aj! A=G\r\0\v\v \0 F@A\0\v@ \0  \0k"j-\0\0\r\0A\x8C\x9F(\0"E\r\0 (\0"E\r\0@@\x7F \0!A\0 "E\r\0 \0-\0\0"\x7F@@  -\0\0"\x07G\r \x07E\r Ak"E\r Aj! -\0! Aj! \r\0\vA\0!\v A\0\v -\0\0k\vE@ (\0 j"-\0\0A=F\r\v (! Aj! \r\f\v\v Aj!\b\v \b\v\xA6\x7F~@ \xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0X@ \0\xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x81\x80\x80\x80\x80\x80\x80\xF8\xFF\0T\r\v \0 \xA0\v \xBD"\x07B \x88\xA7"A\x80\x80\xC0\xFFk \x07\xA7"rE@ \0\x90\v AvAq" \0\xBD"\x07B?\x88\xA7r!@ \x07B \x88\xA7A\xFF\xFF\xFF\xFF\x07q" \x07\xA7rE@@@ Ak\0\vD-DT\xFB!	@\vD-DT\xFB!	\xC0\v A\xFF\xFF\xFF\xFF\x07q" rE@D-DT\xFB!\xF9? \0\xA6\v@ A\x80\x80\xC0\xFF\x07F@ A\x80\x80\xC0\xFF\x07G\r At+\xD0`\v A\x80\x80\xC0\xFF\x07G A\x80\x80\x80 j OqE@D-DT\xFB!\xF9? \0\xA6\v| @D\0\0\0\0\0\0\0\0 A\x80\x80\x80 j I\r\v \0 \xA3\x99\x90\v!\0@@@ Ak\0\v \0\x9A\vD-DT\xFB!	@ \0D\x07\\3&\xA6\xA1\xBC\xA0\xA1\v \0D\x07\\3&\xA6\xA1\xBC\xA0D-DT\xFB!	\xC0\xA0\v At+\xF0`!\0\v \0\v\xBB\x07\x7F \0(" \0(\b"I@  F@  A\xC8\0\xFC\n\0\0 \0 A\xC8\0j6\v "A\xC8\0k" I@  A\xC8\0\xFC\n\0\0 A\xC8\0j!\v \0 6  A\xC8\0A\0 A\xC8\0j" G\x7F  k"A\xB8\x7Fm! @  A\xC8\0lj  \xFC\n\0\0\v \0( \v K\x1BA\0  M\x1BjA\xC8\0\xFC\n\0\0\v@  \0(\0"\bkA\xC8\0mAj"A\xE4\xF1\xB8I@\x7FA\xE3\xF1\xB8  \bkA\xC8\0m"At"   K\x1B A\xF1\xB8\x9CO\x1B"E@A\0!A\0\f\v A\xE4\xF1\xB8O\r A\xC8\0l"+\v"\x07 j!	 \x07  \bk"j!@  G\r\0 A\xC8\0m!  \x07K@  AjA~mA\xC8\0lj!\f\vA At  \bF\x1B"A\xE4\xF1\xB8O\r A\xC8\0l"+" j!	  AvA\xC8\0lj! \x07E\r\0 \x07- \0(!\v  A\xC8\0\xFC\n\0\0 A\xC8\0j!  k"@   \xFC\n\0\0\v \0(! \0 6   \0(\0"k"A\xB8\x7FmA\xC8\0lj! @   \xFC\n\0\0\v \0   kj6 \0(\0! \0 6\0 \0(\b \0 	6\b @ -\v\vP\0\vT\0\vR\0 \0 9\0 \0 +\x009\b \0 +\b9 \0 +9 \0 +\x009  \0 +\b9( +! \0 98 \0 90 \0\v	\0 \0\xC3-\v)\0 \0 \x9C"\0 9 \0 6 \0 9\b \0A\xB0\xD6\x006\0 \0\v\0 \0 f"\0A\xD8\x996\0 \0\v	\0A\xA0\xFA\0\v\0\v\0 \0A\x88\x986\0 \0Aj\xFC \0\v\x07\0 \0\f\0\vK\x7F \0("A\bu!\x07 \0(\0"\0   Aq\x7F \x07 (\0j(\0 \x07\v j A Aq\x1B  \0(\0(\v\0\v\x9A\0 \0A:\x005@  \0(G\r\0 \0A:\x004@ \0("E@ \0A6$ \0 6 \0 6 AG\r \0(0AF\r\f\v  F@ \0("AF@ \0 6 !\v \0(0AG\r AF\r\f\v \0 \0($Aj6$\v \0A:\x006\v\vv\x7F \0($"E@ \0 6 \0 6 \0A6$ \0 \0(86\v@@ \0( \0(8G\r\0 \0( G\r\0 \0(AG\r \0 6\v \0A:\x006 \0A6 \0 Aj6$\v\v\xB8\x7F#\0Ak"$\0 Aj"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/#\0Ak"$\0\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v!@@\x7F -\0\vA\x07v@ (\0\f\v \v!  9\0 \x7F  AjA\x99\x1B m"A\0N@  M\r \f\v AtAr\v"/\f\v\v  /#\0Ak"$\0 -\0\v \0 (\b6\b \0 )\x007\0 A\x006\b B\x007\0 \0-\0\vA\x07v"E@\x7F @ \0(\f\v \0-\0\v\v\v Aj$\0 Aj$\0 , Aj$\0\v\xE7\x7F#\0Ak"$\0  6\f@@\x7F \0-\0\v"A\x07v"E@A! A\xFF\0q\f\v \0(\bA\xFF\xFF\xFF\xFF\x07qAk! \0(\v" F@ \0 A  \xAA\x7F \0-\0\vA\x07v@ \0(\0\f\vA\0\v\f\v\x7F \0-\0\vA\x07v@ \0(\0\f\vA\0\v \r\0 \0" AjA\xFF\0q:\0\v\f\v \0(\0! \0 Aj6\v  Atj"\0 (\f6\0 A\x006\b \0 (\b6 Aj$\0\v\r\0 \0  L\x8A\v\xE4\x7F#\0Ak"$\0  :\0@@\x7F \0-\0\v"A\x07v"E@A\n! A\xFF\0q\f\v \0(\bA\xFF\xFF\xFF\xFF\x07qAk! \0(\v" F@ \0 A  \xD3\x7F \0-\0\vA\x07v@ \0(\0\f\vA\0\v\f\v\x7F \0-\0\vA\x07v@ \0(\0\f\vA\0\v \r\0 \0" AjA\xFF\0q:\0\v\f\v \0(\0! \0 Aj6\v  j"\0 -\0:\0\0 A\0:\0 \0 -\0:\0 Aj$\0\v=\x7F#\0Ak"$\0  :\0@ @ \0 -\0:\0\0 Ak! \0Aj!\0\f\v\v Aj$\0\vF\x7F L"A\rj+"A\x006\b  6  6\0 A\fj! Aj"@   \xFC\n\0\0\v \0 6\0\v\0 \0(\b7G@ \0(\b\xD6\v \0\vZ\x7F#\0Ak"$\0  6\f A\bj A\fjS \0 \xB7!(\0"\0@A\xA8\xA0(\0 \0@A\xA8\xA0A\xB0\x9F \0 \0A\x7FF\x1B6\0\v\v Aj$\0 \v\x87\x7FA\xE8\xC1-\0\0E@#\0Ak"$\0A\xE0\xC1-\0\0E@#\0Ak"$\0 A6\fA\xC4\xC0 (\fAk6\0A\xC0\xC0A\x80\x8F6\0A\xC0\xC0A\xB0\xE66\0A\xC0\xC0A\xE8\xDA6\0#\0Ak"$\0A\xD0\xC0A\x006\0A\xC8\xC0B\x007\0A\xCC\xC1A\0:\0\0 A\xC8\xC06\b (\b A\0:\0#\0Ak"$\0\x88AI@G\0\v A\bjA\xD4\xC0A\x87A\xCC\xC0 (\b"6\0A\xC8\xC0 6\0A\xD0\xC0  (\fAtj6\0 Aj$\0A\xC8\xC0A\x9F A:\0 Aj$\0A\xD0\xC1A\xA4&\x82A\xC8\xC0\xA0A\xD0\xCBA\x006\0A\xCC\xCBA\x80\x8F6\0A\xCC\xCBA\xB0\xE66\0A\xCC\xCBA\x88\xEF6\0A\xC0\xC0A\xCC\xCBA\x98\xBF:;A\xD8\xCBA\x006\0A\xD4\xCBA\x80\x8F6\0A\xD4\xCBA\xB0\xE66\0A\xD4\xCBA\xA8\xEF6\0A\xC0\xC0A\xD4\xCBA\xA0\xBF:;A\xE0\xCBA\x006\0A\xDC\xCBA\x80\x8F6\0A\xDC\xCBA\xB0\xE66\0A\xE8\xCBA\0:\0\0A\xE4\xCBA\x006\0A\xDC\xCBA\xFC\xDA6\0A\xE4\xCBA\xB0\xDB6\0A\xC0\xC0A\xDC\xCBA\xF8\xC1:;A\xF0\xCBA\x006\0A\xEC\xCBA\x80\x8F6\0A\xEC\xCBA\xB0\xE66\0A\xEC\xCBA\xE8\xE66\0A\xC0\xC0A\xEC\xCBA\xF0\xC1:;A\xF8\xCBA\x006\0A\xF4\xCBA\x80\x8F6\0A\xF4\xCBA\xB0\xE66\0A\xF4\xCBA\x80\xE86\0A\xC0\xC0A\xF4\xCBA\x80\xC2:;A\x80\xCCA\x006\0A\xFC\xCBA\x80\x8F6\0A\xFC\xCBA\xB0\xE66\0A\xFC\xCBA\xB8\xE36\0A\x84\xCC76\0A\xC0\xC0A\xFC\xCBA\x88\xC2:;A\x8C\xCCA\x006\0A\x88\xCCA\x80\x8F6\0A\x88\xCCA\xB0\xE66\0A\x88\xCCA\x94\xE96\0A\xC0\xC0A\x88\xCCA\x90\xC2:;A\x94\xCCA\x006\0A\x90\xCCA\x80\x8F6\0A\x90\xCCA\xB0\xE66\0A\x90\xCCA\xFC\xEA6\0A\xC0\xC0A\x90\xCCA\xA0\xC2:;A\x9C\xCCA\x006\0A\x98\xCCA\x80\x8F6\0A\x98\xCCA\xB0\xE66\0A\x98\xCCA\x88\xEA6\0A\xC0\xC0A\x98\xCCA\x98\xC2:;A\xA4\xCCA\x006\0A\xA0\xCCA\x80\x8F6\0A\xA0\xCCA\xB0\xE66\0A\xA0\xCCA\xF0\xEB6\0A\xC0\xC0A\xA0\xCCA\xA8\xC2:;A\xAC\xCCA\x006\0A\xA8\xCCA\x80\x8F6\0A\xA8\xCCA\xB0\xE66\0A\xB0\xCCA\xAE\xD8\0;\0A\xA8\xCCA\xE8\xE36\0A\xBC\xCCA\x006\0A\xB4\xCCB\x007\0A\xC0\xC0A\xA8\xCCA\xB0\xC2:;A\xC4\xCCA\x006\0A\xC0\xCCA\x80\x8F6\0A\xC0\xCCA\xB0\xE66\0A\xC8\xCCB\xAE\x80\x80\x80\xC07\0A\xC0\xCCA\x90\xE46\0A\xD8\xCCA\x006\0A\xD0\xCCB\x007\0A\xC0\xC0A\xC0\xCCA\xB8\xC2:;A\xE0\xCCA\x006\0A\xDC\xCCA\x80\x8F6\0A\xDC\xCCA\xB0\xE66\0A\xDC\xCCA\xC8\xEF6\0A\xC0\xC0A\xDC\xCCA\xA8\xBF:;A\xE8\xCCA\x006\0A\xE4\xCCA\x80\x8F6\0A\xE4\xCCA\xB0\xE66\0A\xE4\xCCA\xC0\xF16\0A\xC0\xC0A\xE4\xCCA\xB0\xBF:;A\xF0\xCCA\x006\0A\xEC\xCCA\x80\x8F6\0A\xEC\xCCA\xB0\xE66\0A\xEC\xCCA\x94\xF36\0A\xC0\xC0A\xEC\xCCA\xB8\xBF:;A\xF8\xCCA\x006\0A\xF4\xCCA\x80\x8F6\0A\xF4\xCCA\xB0\xE66\0A\xF4\xCCA\x80\xF56\0A\xC0\xC0A\xF4\xCCA\xC0\xBF:;A\x80\xCDA\x006\0A\xFC\xCCA\x80\x8F6\0A\xFC\xCCA\xB0\xE66\0A\xFC\xCCA\xE4\xFC6\0A\xC0\xC0A\xFC\xCCA\xE8\xBF:;A\x88\xCDA\x006\0A\x84\xCDA\x80\x8F6\0A\x84\xCDA\xB0\xE66\0A\x84\xCDA\xF8\xFD6\0A\xC0\xC0A\x84\xCDA\xF0\xBF:;A\x90\xCDA\x006\0A\x8C\xCDA\x80\x8F6\0A\x8C\xCDA\xB0\xE66\0A\x8C\xCDA\xEC\xFE6\0A\xC0\xC0A\x8C\xCDA\xF8\xBF:;A\x98\xCDA\x006\0A\x94\xCDA\x80\x8F6\0A\x94\xCDA\xB0\xE66\0A\x94\xCDA\xE0\xFF6\0A\xC0\xC0A\x94\xCDA\x80\xC0:;A\xA0\xCDA\x006\0A\x9C\xCDA\x80\x8F6\0A\x9C\xCDA\xB0\xE66\0A\x9C\xCDA\xD4\x806\0A\xC0\xC0A\x9C\xCDA\x88\xC0:;A\xA8\xCDA\x006\0A\xA4\xCDA\x80\x8F6\0A\xA4\xCDA\xB0\xE66\0A\xA4\xCDA\xFC\x816\0A\xC0\xC0A\xA4\xCDA\x90\xC0:;A\xB0\xCDA\x006\0A\xAC\xCDA\x80\x8F6\0A\xAC\xCDA\xB0\xE66\0A\xAC\xCDA\xA4\x836\0A\xC0\xC0A\xAC\xCDA\x98\xC0:;A\xB8\xCDA\x006\0A\xB4\xCDA\x80\x8F6\0A\xB4\xCDA\xB0\xE66\0A\xB4\xCDA\xCC\x846\0A\xC0\xC0A\xB4\xCDA\xA0\xC0:;A\xC0\xCDA\x006\0A\xBC\xCDA\x80\x8F6\0A\xBC\xCDA\xB0\xE66\0A\xC4\xCDA\xB8\x8E6\0A\xBC\xCDA\xC8\xF66\0A\xC4\xCDA\xF8\xF66\0A\xC0\xC0A\xBC\xCDA\xC8\xBF:;A\xCC\xCDA\x006\0A\xC8\xCDA\x80\x8F6\0A\xC8\xCDA\xB0\xE66\0A\xD0\xCDA\xDC\x8E6\0A\xC8\xCDA\xD4\xF86\0A\xD0\xCDA\x84\xF96\0A\xC0\xC0A\xC8\xCDA\xD0\xBF:;A\xD8\xCDA\x006\0A\xD4\xCDA\x80\x8F6\0A\xD4\xCDA\xB0\xE66\0A\xDC\xCD76\0A\xD4\xCDA\xC4\xFA6\0A\xC0\xC0A\xD4\xCDA\xD8\xBF:;A\xE4\xCDA\x006\0A\xE0\xCDA\x80\x8F6\0A\xE0\xCDA\xB0\xE66\0A\xE8\xCD76\0A\xE0\xCDA\xE4\xFB6\0A\xC0\xC0A\xE0\xCDA\xE0\xBF:;A\xF0\xCDA\x006\0A\xEC\xCDA\x80\x8F6\0A\xEC\xCDA\xB0\xE66\0A\xEC\xCDA\xF4\x856\0A\xC0\xC0A\xEC\xCDA\xA8\xC0:;A\xF8\xCDA\x006\0A\xF4\xCDA\x80\x8F6\0A\xF4\xCDA\xB0\xE66\0A\xF4\xCDA\xEC\x866\0A\xC0\xC0A\xF4\xCDA\xB0\xC0:; Aj$\0 A\xC0\xC06\bA\xDC\xC1 (\b6\0A\xE0\xC1A:\0\0\v Aj$\0A\xE4\xC1A\xDC\xC1(\0"6\0 A\xC0\xC0G@  (Aj6\vA\xE8\xC1A:\0\0\v \0A\xE4\xC1(\0"\x006\0 \0A\xC0\xC0G@ \0 \0(Aj6\v\v3\x7F#\0Ak"$\0  \0(\x006\f  (\f Atj6\f (\f Aj$\0\v0\x7F#\0Ak"$\0  \0(\x006\f  (\f j6\f (\f Aj$\0\v\x8F\x7F#\0Ak"\x07$\0 \x07 \x006\b \x07 \x07(\b6\f#\0Ak"$\0@A\xF7\xFF\xFF\xFF\x07 k O@\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v!\b Aj" A\xF3\xFF\xFF\xFFI\x7F  At6\f   j6#\0Ak"$\0 (\0 A\fj"	(\0I!\n Aj$\0 	  \n\x1B(\0"A\vO\x7F A\bjAxq" Ak" A\vF\x1BA\n\vAjA\xF7\xFF\xFF\xFF\x07\v\x83 (! (\b @@ E"\r\0 \r\0  \b \xFC\n\0\0\v\v  G@  j!  \bj!	@  k"E"\n\r\0 \n\r\0  	 \xFC\n\0\0\v\v A\nG@ \b-\v \0 6\0 \0 (\bA\x80\x80\x80\x80xr6\b Aj$\0\f\vG\0\v \0 6\x7F \x07(\f"\0-\0\vA\x07v@ \0(\f\v \0-\0\v\v \x07Aj$\0\v\xED\x7F -\0\vA\x07vE@ \0 (\b6\b \0 )\x007\0 \0-\0\v\v (\0! (!#\0Ak"$\0@@@ A\vI@ \0" A\xFF\0q:\0\v\f\v A\xF7\xFF\xFF\xFF\x07K\r A\bj A\vO\x7F A\bjAxq" Ak" A\vF\x1BA\n\vAj\x83 (\f \0 (\b"6\0 \0 (\fA\x80\x80\x80\x80xr6\b \0 6\v@ Aj"\0E"\r\0 \r\0   \0\xFC\n\0\0\v Aj$\0\f\vG\0\v\v\\\x7F#\0Ak"$\0 (\0! \0\x7F  \0"kAu"@@   (\0F\r Aj! Ak"\r\0\v\vA\0\v"  \x1B \0kj Aj$\0\v\xFD\x7F#\0Ak"\f$\0 \f \x006\f@@ \0 F@ -\0\0AG\rA\0!\0 A\0:\0\0  (\0"Aj6\0 A.:\0\0\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vE\r 	(\0" \bkA\x9FJ\r \n(\0! 	 Aj6\0  6\0\f\v@@ \0 G\r\0\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vE\r\0 -\0\0AG\r 	(\0"\0 \bkA\x9FJ\r \n(\0! 	 \0Aj6\0 \0 6\0A\0!\0 \nA\x006\0\f\v \v \vA\xF0\0j \fA\fj\xD5 \vk"\0Au"A\x1BJ\r A\xF0\xD8j,\0\0!@@ \0A{q"\0A\xD8\0G@ \0A\xE0\0G\r  (\0"G@A\x7F!\0 Ak,\0\0"A\xDF\0q  A\xE1\0kAI\x1B ,\0\0"A\xDF\0q  A\xE1\0kAI\x1BG\r\v  Aj6\0  :\0\0\f\v A\xD0\0:\0\0\f\v A\xDF\0q  A\xE1\0kAI\x1B"\0 ,\0\0G\r\0  \0A r \0 \0A\xC1\0kAI\x1B:\0\0 -\0\0AG\r\0 A\0:\0\0\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vE\r\0 	(\0"\0 \bkA\x9FJ\r\0 \n(\0! 	 \0Aj6\0 \0 6\0\v  (\0"\0Aj6\0 \0 :\0\0A\0!\0 AJ\r \n \n(\0Aj6\0\f\vA\0!\0\f\vA\x7F!\0\v \fAj$\0 \0\v\x9B\x7F#\0Ak"$\0 A\fj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF0\xC1."A\xF0\xD8A\x8C\xD9  (\0(0\0  A\xB8\xC2." (\0(\f\0\x006\0   (\0(\0\x006\0 \0  (\0(\0 0 Aj$\0\v\xA8\x7F#\0Ak"$\0 (!@A\xB4\x9E-\0\0Aq@A\xB0\x9E(\0!\f\vAA\xB83A\x07!A\xB4\x9EA:\0\0A\xB0\x9E 6\0\v  (\x006\b A\x006 A\0A\0 Aj A\bj\xFC! ("@ \v \0  \n6 \0A\xC8\x9F6\0 A	O@ \v Aj$\0\v0\x7F#\0Ak"$\0 \0 \0 ,\0\0  \0k\xEA"  \x1B \0kj Aj$\0\v\xF5\x7F#\0Ak"\f$\0 \f \0:\0@@ \0 F@ -\0\0AG\rA\0!\0 A\0:\0\0  (\0"Aj6\0 A.:\0\0\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vE\r 	(\0" \bkA\x9FJ\r \n(\0! 	 Aj6\0  6\0\f\v@@ \0 G\r\0\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vE\r\0 -\0\0AG\r 	(\0"\0 \bkA\x9FJ\r \n(\0! 	 \0Aj6\0 \0 6\0A\0!\0 \nA\x006\0\f\v \v \vAj \fAj\xD9 \vk"A\x1BJ\r A\xF0\xD8j,\0\0!@@@@ A~qAk\0\v  (\0"G@A\x7F!\0 Ak,\0\0"A\xDF\0q  A\xE1\0kAI\x1B ,\0\0"A\xDF\0q  A\xE1\0kAI\x1BG\r\v  Aj6\0  :\0\0\f\v A\xD0\0:\0\0\f\v A\xDF\0q  A\xE1\0kAI\x1B"\0 ,\0\0G\r\0  \0A r \0 \0A\xC1\0kAI\x1B:\0\0 -\0\0AG\r\0 A\0:\0\0\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vE\r\0 	(\0"\0 \bkA\x9FJ\r\0 \n(\0! 	 \0Aj6\0 \0 6\0\v  (\0"\0Aj6\0 \0 :\0\0A\0!\0 AJ\r \n \n(\0Aj6\0\f\vA\0!\0\f\vA\x7F!\0\v \fAj$\0 \0\v\x9B\x7F#\0Ak"$\0 A\fj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF8\xC1."A\xF0\xD8A\x8C\xD9  (\0( \0  A\xB0\xC2." (\0(\f\0\0:\0\0   (\0(\0\0:\0\0 \0  (\0(\0 0 Aj$\0\v~\x7F~#\0A\xA0k"$\0  6<  6 A\x7F6 Aj"B\0U   A\xDD )\b! )\0!\x07 @  (\x88  ( (<kjj6\0\v \0 7\b \0 \x077\0 A\xA0j$\0\v\x9C\x7FA5!@ \0(" \0("AjA\x07pkA\x07jA\x07n  k"A\xF1jA\x07pAIj"A5G@ "\rA4!@@ AjA\x07pAk\0\v \0(A\x90oAk\xD3E\r\vA5\v@@ A\xF3jA\x07pAk\0\v \0(\xD3\r\vA!\v \vD\x7F#\0Ak"$\0     B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x85H )\0! \0 )\b7\b \0 7\0 Aj$\0\vC\x7F \0Aj"A\x006 A\xFC\xB36\0 A\xE8\xB16\0 \0A\xA8\xAF6\0 A\xBC\xAF6\0 \0A\x9C\xAF(\0j \xAA\vC\x7F \0Aj"A\x006 A\xFC\xB36\0 A\xD4\xAF6\0 \0A\x88\xAE6\0 A\x9C\xAE6\0 \0A\xFC\xAD(\0j \xAA\v;\0 \0(L \0(\x88E@ \0A\x80\xB5A\xE8\xB4A\xA8\xA0(\0(\0\x1B6\x88\v \0(HE@ \0A6H\v\v\xB6\x7F#\0Ak"$\0 \0 \0(\0A\fk(\0j(@  \x006\f A\0:\0\b \0 \0(\0A\fk(\0j(E@ \0 \0(\0A\fk(\0j(H"@ \xE2\v A:\0\b\v@ -\0\bE\r\0 \0 \0(\0A\fk(\0j(" (\0(\0\0A\x7FG\r\0 \0 \0(\0A\fk(\0jA\xAE\v A\bj\xAC\v Aj$\0\v\0 \0A\xB4\xAE6\0 \0Aj0 \0\v?\0 \0 6 \0A\0:\0\0  (\0A\fk(\0j"(E@ (H"@ \xAF\v \0A:\0\0\v \0\v	\0 \0\xAD-\v	\0 \0\xB0-\v\0 \0A\x94\xAD6\0 \0Aj0 \0\v\xFF~\x7F#\0A k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!~ B0\x88B\xFF\xFF\x83"\xA7"A\x81\xF8\0kA\xFDM@ B\x86 \0B<\x88\x84! A\x80\xF8\0k\xAD!@ \0B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x83"\0B\x81\x80\x80\x80\x80\x80\x80\x80\bZ@ B|!\f\v \0B\x80\x80\x80\x80\x80\x80\x80\x80\bR\r\0 B\x83 |!\vB\0  B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07V"\x1B!\0 \xAD |\f\v@ \0 \x84P\r\0 B\xFF\xFFR\r\0 B\x86 \0B<\x88\x84B\x80\x80\x80\x80\x80\x80\x80\x84!\0B\xFF\f\v A\xFE\x87K@B\0!\0B\xFF\f\vA\x80\xF8\0A\x81\xF8\0 P"\x1B"\b k"\x07A\xF0\0J@B\0!\0B\0\f\v  B\x80\x80\x80\x80\x80\x80\xC0\0\x84 \x1B!A\0!  \bG@ Aj \0 A\x80 \x07kD ) )\x84B\0R!\v  \0  \x07t )\bB\x86 )\0"B<\x88\x84!\0@ \xAD B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x83\x84"B\x81\x80\x80\x80\x80\x80\x80\x80\bZ@ \0B|!\0\f\v B\x80\x80\x80\x80\x80\x80\x80\x80\bR\r\0 \0B\x83 \0|!\0\v \0B\x80\x80\x80\x80\x80\x80\x80\b\x85 \0 \0B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07V"\x1B!\0 \xAD\v! A j$\0 B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83 B4\x86\x84 \0\x84\xBF\v\xF0\x7F~@ E\r\0 \0 :\0\0 \0 j"Ak :\0\0 AI\r\0 \0 :\0 \0 :\0 Ak :\0\0 Ak :\0\0 A\x07I\r\0 \0 :\0 Ak :\0\0 A	I\r\0 \0A\0 \0kAq"j" A\xFFqA\x81\x82\x84\bl"\x006\0   kA|q"j"Ak \x006\0 A	I\r\0  \x006\b  \x006 A\bk \x006\0 A\fk \x006\0 AI\r\0  \x006  \x006  \x006  \x006\f Ak \x006\0 Ak \x006\0 Ak \x006\0 Ak \x006\0  AqAr"k"A I\r\0 \0\xADB\x81\x80\x80\x80~!  j!@  7  7  7\b  7\0 A j! A k"AK\r\0\v\v\v\xE5\x7F A\0G!@@@ \0AqE\r\0 E\r\0 A\xFFq!@ \0-\0\0 F\r Ak"A\0G! \0Aj"\0AqE\r \r\0\v\v E\r@ A\xFFq" \0-\0\0F\r\0 AI\r\0 A\x81\x82\x84\bl!@A\x80\x82\x84\b \0(\0 s"k rA\x80\x81\x82\x84xqA\x80\x81\x82\x84xG\r \0Aj!\0 Ak"AK\r\0\v\v E\r\v A\xFFq!@  \0-\0\0F@ \0\v \0Aj!\0 Ak"\r\0\v\vA\0\vY\x7F \0 \0(H"Ak r6H \0(\0"A\bq@ \0 A r6\0A\x7F\v \0B\x007 \0 \0(,"6 \0 6 \0  \0(0j6A\0\v\0A\v\x84\x7F#\0Ak"$\0@ \0\xBDB \x88\xA7A\xFF\xFF\xFF\xFF\x07q"A\xFB\xC3\xA4\xFFM@ A\x80\x80\x80\xF2I\r \0D\0\0\0\0\0\0\0\0A\0\x8E!\0\f\v A\x80\x80\xC0\xFF\x07O@ \0 \0\xA1!\0\f\v \0 \xEF! +\0 +\b Aq\x8E!\0\v Aj$\0 \0\v\f\0  \0(\0\0\0\v\xCF\x7F|~#\0A0k"\n$\0@@@ \0\xBD"B \x88\xA7"A\xFF\xFF\xFF\xFF\x07q"A\xFA\xD4\xBD\x80M@ A\xFF\xFF?qA\xFB\xC3$F\r A\xFC\xB2\x8B\x80M@ B\0Y@  \0D\0\0@T\xFB!\xF9\xBF\xA0"\0D1cba\xB4\xD0\xBD\xA0"9\0  \0 \xA1D1cba\xB4\xD0\xBD\xA09\bA!\f\v  \0D\0\0@T\xFB!\xF9?\xA0"\0D1cba\xB4\xD0=\xA0"9\0  \0 \xA1D1cba\xB4\xD0=\xA09\bA\x7F!\f\v B\0Y@  \0D\0\0@T\xFB!	\xC0\xA0"\0D1cba\xB4\xE0\xBD\xA0"9\0  \0 \xA1D1cba\xB4\xE0\xBD\xA09\bA!\f\v  \0D\0\0@T\xFB!	@\xA0"\0D1cba\xB4\xE0=\xA0"9\0  \0 \xA1D1cba\xB4\xE0=\xA09\bA~!\f\v A\xBB\x8C\xF1\x80M@ A\xBC\xFB\xD7\x80M@ A\xFC\xB2\xCB\x80F\r B\0Y@  \0D\0\x000\x7F|\xD9\xC0\xA0"\0D\xCA\x94\x93\xA7\x91\xE9\xBD\xA0"9\0  \0 \xA1D\xCA\x94\x93\xA7\x91\xE9\xBD\xA09\bA!\f\v  \0D\0\x000\x7F|\xD9@\xA0"\0D\xCA\x94\x93\xA7\x91\xE9=\xA0"9\0  \0 \xA1D\xCA\x94\x93\xA7\x91\xE9=\xA09\bA}!\f\v A\xFB\xC3\xE4\x80F\r B\0Y@  \0D\0\0@T\xFB!\xC0\xA0"\0D1cba\xB4\xF0\xBD\xA0"9\0  \0 \xA1D1cba\xB4\xF0\xBD\xA09\bA!\f\v  \0D\0\0@T\xFB!@\xA0"\0D1cba\xB4\xF0=\xA0"9\0  \0 \xA1D1cba\xB4\xF0=\xA09\bA|!\f\v A\xFA\xC3\xE4\x89K\r\v \0D\x83\xC8\xC9m0_\xE4?\xA2D\0\0\0\0\0\x008C\xA0D\0\0\0\0\0\x008\xC3\xA0"\xFC!@ \0 D\0\0@T\xFB!\xF9\xBF\xA2\xA0" D1cba\xB4\xD0=\xA2"\xA1"D-DT\xFB!\xE9\xBFc@ Ak! D\0\0\0\0\0\0\xF0\xBF\xA0"D1cba\xB4\xD0=\xA2! \0 D\0\0@T\xFB!\xF9\xBF\xA2\xA0!\f\v D-DT\xFB!\xE9?dE\r\0 Aj! D\0\0\0\0\0\0\xF0?\xA0"D1cba\xB4\xD0=\xA2! \0 D\0\0@T\xFB!\xF9\xBF\xA2\xA0!\v   \xA1"\x009\0@ Av" \0\xBDB4\x88\xA7A\xFFqkAH\r\0   D\0\0`a\xB4\xD0=\xA2"\0\xA1" Dsp.\x8A\xA3;\xA2  \xA1 \0\xA1\xA1"\xA1"\x009\0  \0\xBDB4\x88\xA7A\xFFqkA2H@ !\f\v   D\0\0\0.\x8A\xA3;\xA2"\0\xA1" D\xC1I %\x9A\x83{9\xA2  \xA1 \0\xA1\xA1"\xA1"\x009\0\v   \0\xA1 \xA19\b\f\v A\x80\x80\xC0\xFF\x07O@  \0 \0\xA1"\x009\0  \x009\bA\0!\f\v \nAj"A\br! B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x07\x83B\x80\x80\x80\x80\x80\x80\x80\xB0\xC1\0\x84\xBF!\0A!@  \0\xFC\xB7"9\0 \0 \xA1D\0\0\0\0\0\0pA\xA2!\0 A\0! !\r\0\v \n \x009 A!@ "Ak! \nAj" Atj+\0D\0\0\0\0\0\0\0\0a\r\0\vA\0!#\0A\xB0k"$\0 AvA\x96\bk"AkAm"\bA\0 \bA\0J\x1B"\x07Ahl j!\fA\x94\xE1\0(\0"\b Aj"	Ak"\vjA\0N@ \b 	j! \x07 \vk!@ A\xC0j Atj A\0H|D\0\0\0\0\0\0\0\0 At(\xA0a\xB7\v9\0 Aj! Aj" G\r\0\v\v \fAk!A\0! \bA\0 \bA\0J\x1B! 	A\0L!\r@@ \r@D\0\0\0\0\0\0\0\0!\0\f\v  \vj!A\0!D\0\0\0\0\0\0\0\0!\0@  Atj+\0 A\xC0j  kAtj+\0\xA2 \0\xA0!\0 Aj" 	G\r\0\v\v  Atj \x009\0  F Aj!E\r\0\vA/ \fk!A0 \fk! \x07AtA\xA0\xE1\0j! \fAk! \b!@@  Atj+\0!\0A\0! ! A\0J@@ A\xE0j Atj \0D\0\0\0\0\0\0p>\xA2\xFC\xB7"D\0\0\0\0\0\0p\xC1\xA2 \0\xA0\xFC6\0  AtjA\bk+\0 \xA0!\0 Ak! Aj" G\r\0\v\v \0 u"\0 \0D\0\0\0\0\0\0\xC0?\xA2\x9CD\0\0\0\0\0\0 \xC0\xA2\xA0"\0 \0\xFC"\r\xB7\xA1!\0@@@\x7F A\0L"E@ At j" (\xDC"  u" tk"6\xDC  \rj!\r  u\f\v \r At j(\xDCAu\v"\vA\0L\r\f\vA!\v \0D\0\0\0\0\0\0\xE0?f\r\0A\0!\v\f\vA\0!A\0!\x07A! A\0J@@ A\xE0j Atj"(\0!\x7F@  \x07\x7FA\xFF\xFF\xFF\x07 E\rA\x80\x80\x80\b\v k6\0A!\x07A\0\f\vA\0!\x07A\v! Aj" G\r\0\v\v@ \r\0A\xFF\xFF\xFF!@@ \0\vA\xFF\xFF\xFF!\v At j"\x07 \x07(\xDC q6\xDC\v \rAj!\r \vAG\r\0D\0\0\0\0\0\0\xF0? \0\xA1!\0A!\v \r\0 \0D\0\0\0\0\0\0\xF0? u\xA1!\0\v \0D\0\0\0\0\0\0\0\0a@A\0! !@  \bL\r\0@ A\xE0j Ak"Atj(\0 r!  \bJ\r\0\v E\r\0@ Ak! A\xE0j Ak"Atj(\0E\r\0\v\f\vA!@ "Aj! A\xE0j \b kAtj(\0E\r\0\v  j!@ A\xC0j  	j"\x07Atj  Aj"Atj(\0\xB79\0A\0!D\0\0\0\0\0\0\0\0!\0 	A\0J@@  Atj+\0 A\xC0j \x07 kAtj+\0\xA2 \0\xA0!\0 Aj" 	G\r\0\v\v  Atj \x009\0  H\r\0\v !\f\v\v@ \0A \fku"\0D\0\0\0\0\0\0pAf@ A\xE0j Atj \0D\0\0\0\0\0\0p>\xA2\xFC"\xB7D\0\0\0\0\0\0p\xC1\xA2 \0\xA0\xFC6\0 Aj! \f!\f\v \0\xFC!\v A\xE0j Atj 6\0\vD\0\0\0\0\0\0\xF0? u!\0 A\0N@ !@  "Atj \0 A\xE0j Atj(\0\xB7\xA29\0 Ak! \0D\0\0\0\0\0\0p>\xA2!\0 \r\0\vA\0!\x07 !@ \b \x07 \x07 \bJ\x1B!  k!\f  Atj!A\0!D\0\0\0\0\0\0\0\0!\0@ At"	+\xF0v 	 j+\0\xA2 \0\xA0!\0  G Aj!\r\0\v A\xA0j \fAtj \x009\0 Ak!  \x07G \x07Aj!\x07\r\0\v\vD\0\0\0\0\0\0\0\0!\0 A\0N@ !@ "Ak! \0 A\xA0j Atj+\0\xA0!\0 \r\0\v\v \n \0\x9A \0 \v\x1B9\0 +\xA0 \0\xA1!\0A! A\0J@@ \0 A\xA0j Atj+\0\xA0!\0  G Aj!\r\0\v\v \n \0\x9A \0 \v\x1B9\b A\xB0j$\0 \rA\x07q! \n+\0!\0 B\0S@  \0\x9A9\0  \n+\b\x9A9\bA\0 k!\f\v  \x009\0  \n+\b9\b\v \nA0j$\0 \v=\0 \0-\0E@A\b9"\0A\x84\x976\0 \0A\x88\x986\0 \0AjA\xD8\xCD \0A\x84\x9AA\xBC\0\v \0Aj\v:\0 \0 6\xA0 \0A\0:\0\x9C \0A\x006\x98 \0A\0:\0 \0 9\b \0 6 \0A\xB4\xD8\x006\0 \0\v\x96|/\x7F#\0Ak"!$\0@ AI@@@@@@@@@@@@@@@@@ \0\x07\b	\n\v\f\r\v +\0!\v +\0!	 +\0!\n\f\v +\b!\v +\b!	 +\b!\n\f\r\v +!\v +!	 +!\n\f\f\v +!\v +!	 +!\n\f\v\v + !\v + !	 + !\n\f\n\v +(!\v +(!	 +(!\n\f	\v +0!\v +0!	 +0!\n\f\b\v +8!\v +8!	 +8!\n\f\x07\v +@!\v +@!	 +@!\n\f\v +H!\v +H!	 +H!\n\f\v +P!\v +P!	 +P!\n\f\v +X!\v +X!	 +X!\n\f\v +`!\v +`!	 +`!\n\f\v +h!\v +h!	 +h!\n\f\v +p!\v +p!	 +p!\n\v \0 A\x80\xFC\n\0\0 A\bj!" A\bj!# A\bj!$ Aj!% Aj!& Aj!\' Aj!( Aj!) Aj!* A j!+ A j!, A j!- A(j!. A(j!/ A(j!0 A0j!1 A0j!2 A0j!3 A8j!4 A8j!5 A8j!6 A@k!7 A@k!8 A@k!9 A\xC8\0j!: A\xC8\0j!; A\xC8\0j!< A\xD0\0j!= A\xD0\0j!> A\xD0\0j!? A\xD8\0j!@ A\xD8\0j!A A\xD8\0j!B A\xE0\0j!C A\xE0\0j!D A\xE0\0j!E A\xE8\0j!F A\xE8\0j!G A\xE8\0j!H A\xF0\0j!I A\xF0\0j!J A\xF0\0j!K \0+\b!\f \0+!\r \0+! \0+ ! \0+(! \0+0! \0+8! \0+@! \0+H! \0+P! \0+X! \0+`! \0+h! \0+p!\x1B \0+\0!\b@ \b!|    F\r\0 ! ! !@@@@@@@@@@@@@@@  Ak\0\x07\b	\n\v\f\r\v #! $! "!\f\r\v &! \'! %!\f\f\v )! *! (!\f\v\v ,! -! +!\f\n\v /! 0! .!\f	\v 2! 3! 1!\f\b\v 5! 6! 4!\f\x07\v 8! 9! 7!\f\v ;! <! :!\f\v >! ?! =!\f\v A! B! @!\f\v D! E! C!\f\v G! H! F!\f\v J! K! I!\v +\0! +\0! +\0!\b@@@ \x07\0\v\x7F  	e@  \n  	  !A\bj\xF5\f\v  	  \v \b !A\bj\xF5\vE@ !+\b\f\v \0 9h \0 \x1B9p \0 9` \0 9X \0 9P \0 9H \0 9@ \0 98 \0 90 \0 9( \0 9  \0 9 \0 \r9 \0 \f9\b \0 9\0A\b9A\xBA\x92A\xA8\x98A\0\v \0 9h \0 \x1B9p \0 9` \0 9X \0 9P \0 9H \0 9@ \0 98 \0 90 \0 9( \0 9  \0 9 \0 \r9 \0 \f9\b \0 9\0A\b9A\xF3\x7FA\xF8\x98A\0\v  \n 	 \v   \b_\v!\b@@@@@@@@@@@@@@@  Ak\0\x07\b	\n\v\f\v \b!\f\f\f\v \b!\r\f\v\v \b!\f\n\v \b!\f	\v \b!\f\b\v \b!\f\x07\v \b!\f\v \b!\f\v \b!\f\v \b!\f\v \b!\f\v \b!\f\v \b!\v !\b\v  Aj! \f\0\v\0\vA\b9A\x84	fA\xC8\x98A\0\v \0 9h \0 \b9p \0 9` \0 9X \0 9P \0 9H \0 9@ \0 98 \0 90 \0 9( \0 9  \0 9 \0 \r9 \0 \f9\b \0 6x \0 9\0 !Aj$\0\v*\x7F \0A\xD8\xD6\x006\0 \0("@ \0 6\b \0(\f -\v \0\v*\x7F \0A\xC4\xD6\x006\0 \0("@ \0 6\b \0(\f -\v \0\v.\x7FA!  b\x7F   \0 \xA1  \xA1\xA2  \xA1\xA3\xA09\0A\0A\v\v\x8F\x7F|#\0A\xC0k"$\0@ \0+\xA0D\0\0\0\0\0\0\0\0eE@ \0 \0+H"D\0\0\0\0\0\0\0\0 D\0\0\0\0\0\0\0\0a\x1B9H \0D\0\0\0\xD0\x88\xC3\0B AjAD\0\0\0\0\0\0\0\0 A\xBCj"\xF1" e -\0E\r  \xF0")878  )070  )(7(  ) 7   )7  )7  )\b7\b  )\x007\0 \0 9H A\xC0j$\0\vA\b9A\xD6/\x7FA\xF8\x98A\0\vA\b9 AjA\x942o\x99A\xD8\xD4\0A\xBC\0\v4\0 \0D\0\0\0\0\0\0\0\0b@  \0\xBB\vA(A\xEAA\x8CA\xC3A\xE3,A\0pD\0\0\0\0\0\0\0\0\v\xDF\x07\x7F@ \0(\x88 \0(\x84"kAu"AI\r\0  \0(| \0(x"\x07kAu"AjG\r\0@ +\0 f@A\0!\f\v  Ak"Atj+\0 e@ Ak!\f\v@ AJ@A\0!@  kAv j"Aj   Atj+\0 c"\b\x1B"   \b\x1B"H\r\0\v A\0J\rA\0!\f\vA\0! A\0 A\0J\x1B!@  "F@ !\f\v  Aj"Atj+\0 c\r\0\v\f\v    H\x1BAk!\v   Atj+\0\xA1"   \x07 Atj"+\0\xA2 +\b\xA0\xA2 +\xA0\xA2 +\xA0D\xD1\xF7\xF7r\xCFU+?\xA2 \0+\0\xA3\vA\b9A\x81,\x7FA\xF8\x98A\0\v\xFA9\x7FA\x93#A\xE4\x93Da2U0*\xA93?\x1BA\xE9"A\xE4\x93D{\xAEG\xE1z\x84?\x1BA\xF03A\x90AAA\xF03A\xE8#A\0A\xF03A\xC2#AA\x984A\x8AAAA\x984A\xED$A\0A\x984A\xE8%AA\x984A\xBA%AA\x984A\xD3%AA\x984A\xFD%AA\x984A\xD1#AA\xC44A\x81\x1BAA\0A\xC44A\xFA$A\0A\xC44A\xC9#AA\xC44A\x86$AA\xC44A\xEE#AA\xC44A\xC7$AA\xC44A\x9D%A\bA\xC44A\xC8"AA\xC44A\xA3$AA\xC44A\xD1"A A\xE84A\x9EAAA\xE84A\xF4+A\0A\xE84A\xBC#AA\x845A\xC3	AAA\x845A\xFF$A\0A\x845A\xB6"AA\x845A\x85"AA\x845A\xF9!AA\x845A\xBC"AA\x845A\x8B"AA\x845A\xFF!A\x07A\x845A\xC7$AA\xB85A\xAA	AAA\xB85A\xFF$A\0A\xB85A\xB1%AA\xB85A\x91"AA\xB85A\xC7$AA\xB85A\xDB"AA\xB85A\xD5"AA\xB85A\x84%AA\xB85A\xA3%A\x07A\xB85A\x8F%A\bA\xB85A\xAB%A	A\xB85A\x97%A\nA\xB85A\xF3#A\vA\xB85A\xDF$A\fA\xB85A\x9A"A\rA\xB85A\xCD"AA\xB85A\xE4$AA\xEC5A\xE7A\x8D6AA\x8F6AA+"\0A\x006\0A+"A\x006\0A\xEC5A\x95A\xE4\x93A\x926A \0A\xE4\x93A\x966A \0A+"\0A\b6\0A+"A\b6\0A\xEC5A\xDA	A\xE4\x93A\x926A \0A\xE4\x93A\x966A \0A+"\0A6\0A+"A6\0A\xEC5A\xA9\bA\xE4\x93A\x926A \0A\xE4\x93A\x966A \0A+"\0A6\0A+"A6\0A\xEC5A\xA3A\xE4\x93A\x926A \0A\xE4\x93A\x966A \0A+"\0A 6\0A+"A 6\0A\xEC5A\xE9A\x90\x93A\x9B6A\x07 \0A\x90\x93A\x9F6A\b \0A+"\0A(6\0A+"A(6\0A\xEC5A\x83\rA\xE4\x93A\x926A \0A\xE4\x93A\x966A \0A+"\0A06\0A+"A06\0A\xEC5A\x94A\xE4\x93A\x926A \0A\xE4\x93A\x966A \0A\xEC5\rA\xA46A\xF7\x1BA\xC96A	A\xCB6A\nA+"\0A\x006\0A+"A\x006\0A\xA46A\xF8+A\xE4\x93A\xCE6A\v \0A\xE4\x93A\xD26A\f \0A+"\0A\b6\0A+"A\b6\0A\xA46A\xFE+A\xE4\x93A\xCE6A\v \0A\xE4\x93A\xD26A\f \0A+"\0A6\0A+"A6\0A\xA46A\xFB+A\xE4\x93A\xCE6A\v \0A\xE4\x93A\xD26A\f \0A+"\0A6\0A+"A6\0A\xA46A\xE4A\xE4\x93A\xCE6A\v \0A\xE4\x93A\xD26A\f \0A+"\0A 6\0A+"A 6\0A\xA46A\xEDA\xE4\x93A\xCE6A\v \0A\xE4\x93A\xD26A\f \0A+"\0A(6\0A+"A(6\0A\xA46A\x99&A\xE4\x93A\xCE6A\v \0A\xE4\x93A\xD26A\f \0A\xA46\rA\xD03A\xB1A\xD76A\rA\xD96AA+"\0A\x006\0A+"A\x006\0A\xD03A\xA3A\xE4\x93A\xDC6A \0A\xE4\x93A\xE06A \0A+"\0A\b6\0A+"A\b6\0A\xD03A\xF5A\xE4\x93A\xDC6A \0A\xE4\x93A\xE06A \0A+"\0A6\0A+"A6\0A\xD03A\x8AA\xE4\x93A\xDC6A \0A\xE4\x93A\xE06A \0A+"\0A6\0A+"A6\0A\xD03A\x81#A\xE4\x93A\xDC6A \0A\xE4\x93A\xE06A \0A\xD03\rA\xE86A\x80A\x8B7AA\x8D7AA+"\0A\x006\0A+"A\x006\0A\xE86A\xD4A\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A+"\0A\b6\0A+"A\b6\0A\xE86A\xCCA\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A+"\0A6\0A+"A6\0A\xE86A\x8D\bA\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A+"\0A6\0A+"A6\0A\xE86A\x86\bA\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A+"\0A 6\0A+"A 6\0A\xE86A\xFD\vA\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A+"\0A(6\0A+"A(6\0A\xE86A\x93A\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A+"\0A06\0A+"A06\0A\xE86A\xF2\vA\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A+"\0A86\0A+"A86\0A\xE86A\x87A\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A+"\0A6\0A+"A6\0A\xE86A\xE5\bA\xC8\x92A\x997A \0A\xC8\x92A\x9D7A \0A+"\0A\xC8\x006\0A+"A\xC8\x006\0A\xE86A\x9CA\xE4\x93A\x907A \0A\xE4\x93A\x947A \0A\xE86\rA\xA47A\xB9\fA\xBD7AA\xBF7AA+"\0A\x006\0A+"A\x006\0A\xA47A\xE9A\xE4\x93A\xC27A\x1B \0A\xE4\x93A\xC67A \0A+"\0A\b6\0A+"A\b6\0A\xA47A\x96&A\xE4\x93A\xC27A\x1B \0A\xE4\x93A\xC67A \0A\xA47\rA\xCC7A\xBE\vA\xE57AA\xE77AA+"\0A\x006\0A+"A\x006\0A\xCC7A\xF6 A\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A\b6\0A+"A\b6\0A\xCC7A\xB9 A\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A6\0A+"A6\0A\xCC7A\xBFA\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A6\0A+"A6\0A\xCC7A\xD8A\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A 6\0A+"A 6\0A\xCC7A\xCAA\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A(6\0A+"A(6\0A\xCC7A\xE9A\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A06\0A+"A06\0A\xCC7A\xE0A\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A86\0A+"A86\0A\xCC7A\x88 A\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A\xC0\x006\0A+"A\xC0\x006\0A\xCC7A\xC2\rA\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A\xC8\x006\0A+"A\xC8\x006\0A\xCC7A\x9B A\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A\xD0\x006\0A+"A\xD0\x006\0A\xCC7A\x9CA\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A\xD8\x006\0A+"A\xD8\x006\0A\xCC7A\x9CA\xE4\x93A\xEA7A \0A\xE4\x93A\xEE7A  \0A+"\0A\xE0\x006\0A+"A\xE0\x006\0A\xCC7A\xA9A\x9C3A\xF37A! \0A\x9C3A\xF77A" \0A+"\0A\xE8\x006\0A+"A\xE8\x006\0A\xCC7A\xE8A\xA46A\xFC7A# \0A\xA46A\x808A$ \0A+"\0A\x986\0A+"A\x986\0A\xCC7A\xF7A\xE86A\x858A% \0A\xE86A\x898A& \0A+"\0A\xE86\0A+"A\xE86\0A\xCC7A\xE2A\x9C3A\xF37A! \0A\x9C3A\xF77A" \0A+"\0A\xF06\0A+"A\xF06\0A\xCC7A\x89A\xE84A\x8E8A\' \0A\xE84A\x928A( \0A+"\0A\xF86\0A+"A\xF86\0A\xCC7A\xE0A\xEC5A\x978A) \0A\xEC5A\x9B8A* \0A\xCC7\rA\xA08A\xDF\vA\xBC8A+A\xBE8A,A+"\0A\x006\0A+"A\x006\0A\xA08A\xA3\rA\xE4\x93A\xC18A- \0A\xE4\x93A\xC58A. \0A+"\0A\b6\0A+"A\b6\0A\xA08A\xD2\rA\xE4\x93A\xC18A- \0A\xE4\x93A\xC58A. \0A+"\0A6\0A+"A6\0A\xA08A\xAFA\xE4\x93A\xC18A- \0A\xE4\x93A\xC58A. \0A+"\0A6\0A+"A6\0A\xA08A\x80\vA\xC8\x92A\xCA8A/ \0A\xC8\x92A\xCE8A0 \0A+"\0A6\0A+"A6\0A\xA08A\x8AA\xC44A\xD38A1 \0A\xC44A\xD78A2 \0A\xA08\rA\xDC8A\xEB!A\x839A3A\x859A4A+"\0A\x006\0A+"A\x006\0A\xDC8A\x88A\xE4\x93A\x889A5 \0A\xE4\x93A\x8C9A6 \0A+"\0A\b6\0A+"A\b6\0A\xDC8A\xBD\nA\xE4\x93A\x889A5 \0A\xE4\x93A\x8C9A6 \0A+"\0A6\0A+"A6\0A\xDC8A\xDD\bA\xE4\x93A\x889A5 \0A\xE4\x93A\x8C9A6 \0A+"\0A6\0A+"A6\0A\xDC8A\x83\bA\xE4\x93A\x889A5 \0A\xE4\x93A\x8C9A6 \0A+"\0A 6\0A+"A 6\0A\xDC8A\xBA\nA\xE4\x93A\x889A5 \0A\xE4\x93A\x8C9A6 \0A+"\0A(6\0A+"A(6\0A\xDC8A\x94\bA\xE4\x93A\x889A5 \0A\xE4\x93A\x8C9A6 \0A+"\0A06\0A+"A06\0A\xDC8A\x80\bA\xE4\x93A\x889A5 \0A\xE4\x93A\x8C9A6 \0A+"\0A86\0A+"A86\0A\xDC8A\xE4A\xE4\x93A\x889A5 \0A\xE4\x93A\x8C9A6 \0A+"\0A76\0A+"A86\0A\xDC8A\xBAA\x9C3A\x919A9 \0A\x9C3A\x959A: \0A+"\0A;6\0A+"A<6\0A\xDC8A\xA0\bA\x9C3A\x919A9 \0A\x9C3A\x959A: \0A\xDC8\rA\xA49A\x93\rA\xCD9A=A\xCF9A>A+"\0A\b6\0A+"A\b6\0A\xA49A\xCFA\xE4\x93A\xD29A? \0A\xE4\x93A\xD69A\xC0\0 \0A+"\0A\x006\0A+"A\x006\0A\xA49A\xE0\rA\xE4\x93A\xD29A? \0A\xE4\x93A\xD69A\xC0\0 \0A\xA49\rA\xDC9A\xC3!A\x85:A\xC1\0A\x87:A\xC2\0A+"\0A\x006\0A+"A\x006\0A\xDC9A\x88A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\b6\0A+"A\b6\0A\xDC9A\x90A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A6\0A+"A6\0A\xDC9A\xA3A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A6\0A+"A6\0A\xDC9A\xE4A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A 6\0A+"A 6\0A\xDC9A\xC8\rA\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A(6\0A+"A(6\0A\xDC9A\xB2\rA\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A06\0A+"A06\0A\xDC9A\xAA A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A86\0A+"A86\0A\xDC9A\xED\rA\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\xC0\x006\0A+"A\xC0\x006\0A\xDC9A\xC8 A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\xC8\x006\0A+"A\xC8\x006\0A\xDC9A\xF8\rA\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\xD0\x006\0A+"A\xD0\x006\0A\xDC9A\xD0 A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\xD8\x006\0A+"A\xD8\x006\0A\xDC9A\xEDA\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\xE0\x006\0A+"A\xE0\x006\0A\xDC9A\xF3A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\xE8\x006\0A+"A\xE8\x006\0A\xDC9A\x85!A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\xF0\x006\0A+"A\xF0\x006\0A\xDC9A\xFE A\xE4\x93A\x8A:A\xC3\0 \0A\xE4\x93A\x8E:A\xC4\0 \0A+"\0A\xF8\x006\0A+"A\xF8\x006\0A\xDC9A\xFCA\xC44A\x93:A\xC5\0 \0A\xC44A\x97:A\xC6\0 \0A\xDC9\rA\x9C:A\xACA\xB3:A\xC7\0A\xB5:A\xC8\0A+"\0A\x006\0A+"A\x006\0A\x9C:A\x96!A\xDC8A\xB8:A\xC9\0 \0A\xDC8A\xBC:A\xCA\0 \0A+"\0A\xC0\x006\0A+"A\xC0\x006\0A\x9C:A\x9F!A\xDC9A\xC1:A\xCB\0 \0A\xDC9A\xC5:A\xCC\0 \0A\x9C:\rA\xCC:A\x8D\vA\xDF:A\xCD\0A\xE1:A\xCE\0A+"\0A\x006\0A+"A\x006\0A\xCC:A\xBF\bA\x9C3A\xE4:A\xCF\0 \0A\x9C3A\xE8:A\xD0\0 \0A+"\0A\b6\0A+"A\b6\0A\xCC:A\xB9\bA\x9C3A\xE4:A\xCF\0 \0A\x9C3A\xE8:A\xD0\0 \0A+"\0A6\0A+"A6\0A\xCC:A\x83A\x984A\xED:A\xD1\0 \0A\x984A\xF1:A\xD2\0 \0A\xCC:\rA\xD0\x9E-\0\0E@A\xD0\x9EA:\0\0A\xF8:A\xD03\vA\xF4?A\xB8\xC0\0A\x84\xC1\0A\0A\xD1\xC1\0A\x93A\xD4\xC1\0A\0A\xD4\xC1\0A\0A\xD5\vA\xD6\xC1\0A\x94A\xF4?AA\xDC\xC1\0A\xE0\xC1\0A\x95A\x96A+"\0A\x976\0A\xF4?A\xF4AA\xE4\xC1\0A\xF0\xC1\0A\x98 \0A\0A\0A\0A+"\0A\x996\0A\xF4?A\x9C\x1BAA\x80\xC2\0A\x90\xC2\0A\x9A \0A\0A\0A\0A+"\0A\x9B6\0A\xF4?A\x9E\x1BAA\x98\xC2\0A\xA0\xC2\0A\x9C \0A\0A\0A\0A+"\0A\x9D6\0A\xF4?A\xA8AA\xAC\xC2\0A\xB8\xC2\0A\x9E \0A\0A\0A\0A+"\0A\x9F6\0A\xF4?A\xA4AA\xC0\xC2\0A\xD0\xC2\0A\xA0 \0A\0A\0A\0A\xDC\x9E-\0\0E@A\xDC\x9EA:\0\0A\xD8\xC2\0A\xA47\vA\xC4\xC6\0A\x84\xC7\0A\xCC\xC7\0A\0A\x93\xC8\0A\xA1A\xD4\xC1\0A\0A\xD4\xC1\0A\0A\xB4A\x96\xC8\0A\xA2A\xC4\xC6\0AA\x9C\xC8\0A\xA0\xC8\0A\xA3A\xA4A+"\0A\xA56\0A\xC4\xC6\0A\xF4AA\xA4\xC8\0A\xB0\xC8\0A\xA6 \0A\0A\0A\0A+"\0A\xA76\0A\xC4\xC6\0A\x9C\x1BAA\xC0\xC8\0A\xD0\xC8\0A\xA8 \0A\0A\0A\0A+"\0A\xA96\0A\xC4\xC6\0A\x9E\x1BAA\xD8\xC8\0A\xE0\xC8\0A\xAA \0A\0A\0A\0A+"\0A\xAB6\0A\xC4\xC6\0A\xA8AA\xEC\xC8\0A\xF8\xC8\0A\xAC \0A\0A\0A\0A+"\0A\xAD6\0A\xC4\xC6\0A\xA4AA\x80\xC9\0A\x90\xC9\0A\xAE \0A\0A\0A\0A\xC0\nAA\x98\xC9\0A\xA0\xC9\0A\xD3\0A\xD4\0A\0A\0\vA\xDBAA\xB0\xC9\0A\xC0\xC9\0A\xD5\0A\xD6\0A\0A\0\vA\x8DAA\xC8\xC9\0A\xD4\xC9\0A\xD7\0A\xD8\0A\0A\0\vA\xE7\x1BAA\xDC\xC9\0A\xE8\xC9\0A\xD9\0A\xDA\0A\0A\0\vA\xE0AA\x80\xCA\0A\x90\xCA\0A\xDB\0A\xDC\0A\0A\0\vA\xD3!AA\xA0\xCA\0A\xB8\xCA\0A\xDD\0A\xDE\0A\0A\0\vA\xA9!A\bA\xC0\xCA\0A\xE0\xCA\0A\xDF\0A\xE0\0A\0A\0\vA\xCAAA\xEC\xCA\0A\xF8\xCA\0A\xE1\0A\xE2\0A\0A\0\vA\xF4\bAA\xEC\xCA\0A\xF8\xCA\0A\xE1\0A\xE3\0A\0A\0\vA\xE6\nAA\xEC\xCA\0A\xF8\xCA\0A\xE1\0A\xE4\0A\0A\0\vA\xDF\x1BA\bA\x80\xCB\0A\xA0\xCB\0A\xE5\0A\xE6\0A\0A\0\vA\x97\fA\bA\x80\xCB\0A\xA0\xCB\0A\xE5\0A\xE7\0A\0A\0\vA\xA6\fAA\xB0\xCB\0A\xC8\xCB\0A\xE8\0A\xE9\0A\0A\0\vA\xD0\xCB\0A\xF0\xCB\0A\x98\xCC\0A\0A\xC1\xCC\0A\xEA\0A\xD4\xC1\0A\0A\xD4\xC1\0A\0A\xFDA\xC4\xCC\0A\xEB\0A\xD0\xCB\0AA\xC8\xCC\0A\xCC\xCC\0A\xEC\0A\xED\0A\xD0\xCB\0AA\xD0\xCC\0A\xE0\xCC\0A\xEE\0A\xEF\0A+"\0A\x006\0A+"A\x006\0A\xD0\xCB\0A\xE4\nA\xE4\x93A\xE6\xCC\0A\xF0\0 \0A\xE4\x93A\xEA\xCC\0A\xF1\0 A+"\0A\b6\0A+"A\b6\0A\xD0\xCB\0A\xB8\nA\xE4\x93A\xE6\xCC\0A\xF0\0 \0A\xE4\x93A\xEA\xCC\0A\xF1\0 A+"\0A6\0A+"A6\0A\xD0\xCB\0A\x92\bA\xE4\x93A\xE6\xCC\0A\xF0\0 \0A\xE4\x93A\xEA\xCC\0A\xF1\0 A\b+"\0A\x006 \0A\xF2\x006\0A\xD0\xCB\0A\xBAAA\xF0\xCC\0A\xFC\xCC\0A\xF3\0 \0A\0A\0A\0A\b+"\0A\x006 \0A\xF4\x006\0A\xD0\xCB\0A\xFA AA\xF0\xCC\0A\xFC\xCC\0A\xF3\0 \0A\0A\0A\0A\b+"\0A\x006 \0A\xF5\x006\0A\xD0\xCB\0A\xEFAA\x84\xCD\0A\x8C\xCD\0A\xF6\0 \0A\0A\0A\0A\b+"\0A\x006 \0A\xF7\x006\0A\xD0\xCB\0A\xAAAA\x90\xCD\0A\x9C\xCD\0A\xF8\0 \0A\0A\0A\0A\b+"\0A\x006 \0A\xF9\x006\0A\xD0\xCB\0A\xF8\nAA\x90\xCD\0A\x9C\xCD\0A\xF8\0 \0A\0A\0A\0A\b+"\0A\x006 \0A\xFA\x006\0A\xD0\xCB\0A\xB5\fAA\xA4\xCD\0A\xB0\xCD\0A\xFB\0 \0A\0A\0A\0A+"\0A\xFC\x006\0A\xD0\xCB\0A\xB9AA\xB8\xCD\0A\xC4\xCD\0A\xFD\0 \0A\0A\0A\0A+"\0A\xFE\x006\0A\xD0\xCB\0A\xF9 AA\xB8\xCD\0A\xC4\xCD\0A\xFD\0 \0A\0A\0A\0A+"\0A\xFF\x006\0A\xD0\xCB\0A\xA9AA\xCC\xCD\0A\xD8\xCD\0A\x80 \0A\0A\0A\0A+"\0A\x816\0A\xD0\xCB\0A\xF7\nAA\xCC\xCD\0A\xD8\xCD\0A\x80 \0A\0A\0A\0A\b+"\0A\x006 \0A\x826\0A\xD0\xCB\0A\xBEAA\xE0\xCD\0A\xF0\xCD\0A\x83 \0A\0A\0A\0A\b+"\0A\x006 \0A\x846\0A\xD0\xCB\0A\xACAA\xE0\xCD\0A\xF0\xCD\0A\x83 \0A\0A\0A\0A\b+"\0A\x006 \0A\x856\0A\xD0\xCB\0A\xEFAA\x80\xCE\0A\x98\xCE\0A\x86 \0A\0A\0A\0A\b+"\0A\x006 \0A\x876\0A\xD0\xCB\0A\xE1+A\nA\xA0\xCE\0A\xC8\xCE\0A\x88 \0A\0A\0A\0A\b+"\0A\x006 \0A\x896\0A\xD0\xCB\0A\xF8AA\xD4\xCE\0A\xDC\xCE\0A\x8A \0A\0A\0A\0A\b+"\0A\x006 \0A\x8B6\0A\xD0\xCB\0A\xEBAA\xD4\xCE\0A\xDC\xCE\0A\x8A \0A\0A\0A\0A\b+"\0A\x006 \0A\x8C6\0A\xD0\xCB\0A\xFFAA\x84\xCD\0A\x8C\xCD\0A\xF6\0 \0A\0A\0A\0A+"\0A\x8D6\0A\xD0\xCB\0A\xFEAA\xE0\xCE\0A\xE8\xCE\0A\x8E \0A\0A\0A\0A+"\0A\x8F6\0A\xD0\xCB\0A\xD7AA\xEC\xCE\0A\xBB\xCF\0A\x90 \0A\0A\0A\0A+"\0A\x916\0A\xD0\xCB\0A\xDB\bAA\xC0\xCF\0A\xC8\xCF\0A\x92 \0A\0A\0A\0\v\0A\b9 \0f"\0A\xA4\x996\0 \0A\xB0\x99A\0\v\x07\0 \0(\v)\x7F@ \0(\0A\fk"\0 \0(\bAk"6\b A\0N\r\0 \0-\v\v\0 \0A\xF4\x976\0 \0Aj\xFC \0\vL\x7F@ E\r\0 A\xA4\x91O"E\r\0 (\b \0(\bA\x7Fsq\r\0 \0(\f (\fA\0>E\r\0 \0( (A\0>!\v \v\x82\x7F \0("Aq!\x7F -\x007AF@ A\bu" E\r  (\0j(\0\f\v A\bu E\r\0  \0(\0(68 \0(!A\0!A\0\v! \0(\0"\0   j A Aq\x1B \0(\0(	\0\v\n\0 \0 A\0>\v\xB3\x7F#\0Ak"\x07$\0\x7F\x7F\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v" L"j"A\xF7\xFF\xFF\xFF\x07M@@ A\vI@ \0A\x006\b \0B\x007\0 \0 A\xFF\0q:\0\v\f\v A\vO\x7F A\bjAxq" Ak" A\vF\x1BA\n\vAj"+!\b \0 A\x80\x80\x80\x80xr6\b \0 \b6\0 \0 6\v \0\f\vG\0\v"\0-\0\vA\x07v@ \0(\0\f\v \0\v!\0\x7F -\0\vA\x07v@ (\0\f\v \v!@ E"\r\0 \r\0 \0  \xFC\n\0\0\v \0 j!\0@ E"\r\0 \r\0 \0  \xFC\n\0\0\v \0 jAA\0\xCC \x07Aj$\0\v7\x7F#\0Ak"$\0 Aj" \0A\xBF\x81\x7F -\0\vA\x07v@ (\0\f\vA\0\v=\0\v\xE9\x7F#\0A k"\b$\0A\xF7\xFF\xFF\xFF"	 A\x7Fsj O@\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v!\n A\xF3\xFF\xFF\xFFI@ \b At6 \b  j6#\0Ak"$\0 \bAj"	(\0 \bAj"\v(\0I!\f Aj$\0 \v 	 \f\x1B(\0"AO\x7F AjA~q" Ak" AF\x1BA\vAj!	\v \b \x006 \b \b(6 \bAj 	v \b(! \b( @@ E\r\0 At"	E\r\0  \n 	\xFC\n\0\0\v\v @ At j!	@ E\r\0 At"\vE\r\0 	 \x07 \v\xFC\n\0\0\v\v   j"	k!\x07  	G@ At" j Atj!	  \nj Atj!@ \x07E\r\0 \x07At"E\r\0 	  \xFC\n\0\0\v\v AG@ \n-\v \0 6\0 \0 \b(A\x80\x80\x80\x80xr6\b \0  j \x07j"\x006 \bA\x006\f  \0Atj \b(\f6\0\x7F \b("\0-\0\vA\x07v@ \0(\f\v \0-\0\v\v \bA j$\0\vG\0\v\xCD\x7F#\0A k"\b$\0A\xF7\xFF\xFF\xFF\x07"	 A\x7Fsj O@\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v!\n A\xF3\xFF\xFF\xFFI@ \b At6 \b  j6#\0Ak"$\0 \bAj"	(\0 \bAj"\v(\0I!\f Aj$\0 \v 	 \f\x1B(\0"A\vO\x7F A\bjAxq" Ak" A\vF\x1BA\n\vAj!	\v \b \x006 \b \b(6 \bAj 	\x83 \b(! \b( @@ E"	\r\0 	\r\0  \n \xFC\n\0\0\v\v @  j!	@ E"\v\r\0 \v\r\0 	 \x07 \xFC\n\0\0\v\v   j"	k!\x07  	G@  j j!  \nj j!@ \x07E"	\r\0 	\r\0   \x07\xFC\n\0\0\v\v A\nG@ \n-\v \0 6\0 \0 \b(A\x80\x80\x80\x80xr6\b \0  j \x07j"\x006 \bA\0:\0 \0 j \b-\0:\0\0\x7F \b("\0-\0\vA\x07v@ \0(\f\v \0-\0\v\v \bA j$\0\vG\0\v#\x7F \0!@ "Aj! (\0\r\0\v  \0kAu\v*\0#\0Ak"$\0@ \0 F@ \0A\0:\0x\f\v -\v Aj$\0\vI\x7F#\0Ak"$\0@@ AK\r\0 -\0xAq\r\0 A:\0x\f\v \x8D!\v Aj$\0 \0 6 \0 6\0\v[\x7F#\0Ak"\0$\0 \0A\xFF\xFF\xFF\xFF6\f \0A\xFF\xFF\xFF\xFF\x076\b#\0Ak"$\0 \0A\bj"(\0 \0A\fj"(\0I! Aj$\0   \x1B(\0 \0Aj$\0\v:\x7F#\0Ak"$\0  g6\f  g6\b \0 (\f6\0 \0 (\b6 Aj$\0\vO\x7F#\0Ak"$\0  6\b  \x006\f  6A\0! Aj"\0(\0 (\fO@ \0(\0 (\bI!\v Aj$\0 \v6\x7F#\0Ak"$\0  6\f  6\b \0 (\f6\0 \0 (\b6 Aj$\0\ve\x7F#\0Ak"$\0\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\v\v@ \0-\0\vA\x07v@ \0 6\f\v \0 A\xFF\0q:\0\v\v A\0:\0  j -\0:\0\0 Aj$\0\v\0 \0A\xFF\xFF\xFF\xFFK@=\0\v \0At+\v	\0 \0\xCE-\v\0 \0A\x90\xE46\0 \0Aj, \0\v\0 \0A\xE8\xE36\0 \0A\fj, \0\v\x8F\x7F@  "\0kAH\r\0\v@@ \0 O\r\0  \x07M\r\0 \0,\0\0"A\xFFq!\x7FA A\0N\r\0 ABI\r A_M@  \0kAH\r \0-\0A\xC0qA\x80G\rA\f\v AoM@  \0kAH\r \0-\0 \0,\0!@@ A\xEDG@ A\xE0G\r A`qA\xA0\x7FF\r\f\v A\xA0\x7FN\r\f\v A\xBF\x7FJ\r\vA\xC0qA\x80G\rA\f\v AtK\r  \0kAH\r \0-\0! \0-\0!\b \0,\0!@@@@ A\xF0k\0\v A\xF0\0jA\xFFqA0O\r\f\v A\x90\x7FN\r\f\v A\xBF\x7FJ\r\v \bA\xC0qA\x80G\r A\xC0qA\x80G\r A?q \bAtA\xC0q AtA\x80\x80\xF0\0q A?qA\ftrrrA\xFF\xFF\xC3\0K\rA\v! \x07Aj!\x07 \0 j!\0\f\v\v \0 k\v\xC7\x7F#\0Ak"\0$\0\x7F \0 6\f \0 6\b@  kAH\r\0\v@@@@  O\r\0  O\r\0 ,\0\0"\bA\xFFq!\x7F \bA\0N@ A\xFF\xFF\xC3\0K\rA\f\v \bABI\r \bA_M@A  kAH\rA!\b -\0"	A\xC0qA\x80G\r 	A?q AtA\xC0qr!A\f\v \bAoM@A!\b  k"\nAH\r ,\0!	@@ A\xEDG@ A\xE0G\r 	A`qA\xA0\x7FF\r\f\b\v 	A\xA0\x7FH\r\f\x07\v 	A\xBF\x7FJ\r\v \nAF\r -\0"\bA\xC0qA\x80G\r \bA?q A\ftA\x80\xE0q 	A?qAtrr!A\f\v \bAtK\rA!\b  k"\nAH\r ,\0!	@@@@ A\xF0k\0\v 	A\xF0\0jA\xFFqA0O\r\x07\f\v 	A\x90\x7FN\r\f\v 	A\xBF\x7FJ\r\v \nAF\r -\0"\vA\xC0qA\x80G\r \nAF\r -\0"\nA\xC0qA\x80G\rA!\b \nA?q \vAtA\xC0q AtA\x80\x80\xF0\0q 	A?qA\ftrrr"A\xFF\xFF\xC3\0K\rA\v!\b  6\0 \0  \bj"6\f \0 Aj"6\b\f\v\v  I!\b\v \b\f\vA\v  \0(\f6\0 \x07 \0(\b6\0 \0Aj$\0\v\xF6\0#\0Ak"\0$\0\x7F \0 6\f \0 6\b@@@  O@A\0!\f\vA! (\0"A\xFF\xFF\xC3\0K\r\0 A\x80pqA\x80\xB0F\r\0@ A\xFF\0M@A!  \0(\b"kA\0L\r \0 Aj6\b  :\0\0\f\v A\xFFM@  \0(\b"kAH\r \0 Aj6\b  AvA\xC0r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\f\v  \0(\b"k! A\xFF\xFFM@ AH\r \0 Aj6\b  A\fvA\xE0r:\0\0 \0 \0(\b"Aj6\b  AvA?qA\x80r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\f\v AH\r \0 Aj6\b  AvA\xF0r:\0\0 \0 \0(\b"Aj6\b  A\fvA?qA\x80r:\0\0 \0 \0(\b"Aj6\b  AvA?qA\x80r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\v \0 \0(\fAj"6\f\f\v\v \f\vA\v  \0(\f6\0 \x07 \0(\b6\0 \0Aj$\0\v\xA2\x7F@  "\0kAH\r\0\v@@ \0 O\r\0  M\r\0\x7F \0Aj \0-\0\0"\xC0A\0N\r\0 A\xC2I\r A\xDFM@  \0kAH\r \0-\0A\xC0qA\x80G\r \0Aj\f\v A\xEFM@  \0kAH\r \0-\0 \0,\0!@@ A\xEDG@ A\xE0G\r A`qA\xA0\x7FF\r\f\v A\xA0\x7FN\r\f\v A\xBF\x7FJ\r\vA\xC0qA\x80G\r \0Aj\f\v A\xF4K\r  \0kAH\r  kAI\r \0-\0!\x07 \0-\0!\b \0,\0!@@@@ A\xF0k\0\v A\xF0\0jA\xFFqA0O\r\f\v A\x90\x7FN\r\f\v A\xBF\x7FJ\r\v \bA\xC0qA\x80G\r \x07A\xC0qA\x80G\r \x07A?q \bAtA\xC0q AtA\x80\x80\xF0\0q A?qA\ftrrrA\xFF\xFF\xC3\0K\r Aj! \0Aj\v!\0 Aj!\f\v\v \0 k\v\x90\x7F#\0Ak"\0$\0\x7F \0 6\f \0 6\b@  kAH\r\0\v@@@@  O\r\0  O\r\0A!	 \0\x7F -\0\0"\xC0A\0N@  ;\0A\f\v A\xC2I\r A\xDFM@A  kAH\r -\0"\bA\xC0qA\x80G\r  \bA?q AtA\xC0qr;\0A\f\v A\xEFM@A!	  k"\nAH\r ,\0!\b@@ A\xEDG@ A\xE0G\r \bA`qA\xA0\x7FG\r\b\f\v \bA\xA0\x7FN\r\x07\f\v \bA\xBF\x7FJ\r\v \nAF\r -\0"	A\xC0qA\x80G\r  	A?q \bA?qAt A\ftrr;\0A\f\v A\xF4K\rA!	  k"\nAH\r -\0"\v\xC0!\b@@@@ A\xF0k\0\v \bA\xF0\0jA\xFFqA0O\r\x07\f\v \bA\x90\x7FN\r\f\v \bA\xBF\x7FJ\r\v \nAF\r -\0"\bA\xC0qA\x80G\r \nAF\r -\0"\nA\xC0qA\x80G\r  kAH\rA!	 \nA?q"\n \bAt"\fA\xC0q \vA\ftA\x80\xE0q A\x07q"AtrrrA\xFF\xFF\xC3\0K\r  \n \fA\xC0\x07qrA\x80\xB8r;  \bAvAq \vAt"	A\xC0q A\btr 	A<qrrA\xC0\xFF\0jA\x80\xB0r;\0 Aj!A\v j"6\f \0 Aj"6\b\f\v\v  I!	\v 	\f\vA\v  \0(\f6\0 \x07 \0(\b6\0 \0Aj$\0\v\xCB\x7F#\0Ak"\0$\0\x7F \0 6\f \0 6\b@@@  O@A\0!\f\vA!@@ /\0"A\xFF\0M@A!  \0(\b"kA\0L\r \0 Aj6\b  :\0\0\f\v A\xFFM@  \0(\b"kAH\r \0 Aj6\b  AvA\xC0r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\f\v A\xFF\xAFM@  \0(\b"kAH\r \0 Aj6\b  A\fvA\xE0r:\0\0 \0 \0(\b"Aj6\b  AvA?qA\x80r:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\f\v A\xFF\xB7M@A!  kAH\r /"\bA\x80\xF8qA\x80\xB8G\r  \0(\b"	kAH\r \bA\xFF\x07q A\ntA\x80\xF8q A\xC0\x07q"A\ntrrA\xFF\xFF?K\r \0 Aj6\f \0 	Aj6\b 	 AvAj"AvA\xF0r:\0\0 \0 \0(\b"Aj6\b  AtA0q AvAqrA\x80r:\0\0 \0 \0(\b"Aj6\b  \bAvAq AtA0qrA\x80r:\0\0 \0 \0(\b"Aj6\b  \bA?qA\x80r:\0\0\f\v A\x80\xC0I\r  \0(\b"kAH\r \0 Aj6\b  A\fvA\xE0r:\0\0 \0 \0(\b"Aj6\b  AvA\xBFq:\0\0 \0 \0(\b"Aj6\b  A?qA\x80r:\0\0\v \0 \0(\fAj"6\f\f\v\vA\f\v \f\vA\v  \0(\f6\0 \x07 \0(\b6\0 \0Aj$\0\vU\x7F#\0Ak"$\0  \x006\f A\bj A\fjSAAA\xA8\xA0(\0(\0\x1B!(\0"\0@A\xA8\xA0A\xB0\x9F \0 \0A\x7FF\x1B6\0\v Aj$\0 \v^\x7F#\0Ak"$\0  6\f A\bj A\fjS \0   \x90!(\0"\0@A\xA8\xA0(\0 \0@A\xA8\xA0A\xB0\x9F \0 \0A\x7FF\x1B6\0\v\v Aj$\0 \v\0  6\0 \x07 6\0A\v+\x7F \0A\xFC\xDA6\0@ \0(\b"E\r\0 \0-\0\fAqE\r\0 -\v \0\v\0 \v\'\x7F \0(\0(\0(\0A\xEC\xC1A\xEC\xC1(\0Aj"\x006\0 \x006\v\xC3\x7F \0A\xE8\xDA6\0 \0A\bj!@  ( (\0"kAuI@ At j(\0"@  (Ak"6 A\x7FF@  (\0(\b\0\v\v Aj!\f\v\v \0A\x90j,#\0Ak"$\0 A\fj" 6\0 (\0"(\0@ \xA0 (\0"A\fj (\0 (\b (\0kAu\x86\v Aj$\0 \0\v&\x7F \0(!@  G@ Ak!\f\v\v \0 6\vu\x7F#\0Ak"$\0 Aj" \x006\0  \0("\x006  \0 Atj6\b (!\0 (\b!@ \0 F@ (\0 (6 Aj$\0 \0A\x006\0  \0Aj"\x006\f\v\v\v\x7F \0( \0(\0! \0 \x9E\v \0 \0A\xB8\xE36\0 \0(\b7G@ \0(\b\xD6\v \0\v\0A\x7F\v\xA4\x07\x7F#\0Ak"$\0#\0A k"$\0 Aj \0 \x89 (! (!#\0Ak"$\0  6\f@  k"Au"\x07E\r\0 \x07At"\x07E\r\0   \x07\xFC\n\0\0\v   j6\b  (\f6  (\b6 Aj$\0 (#\0Ak"$\0  \x006\f A\fj"\0!	!\b \0(\0!#\0Ak"\0$\0 \0 6\f \0(\f! \0Aj$\0 	 \b kAu\xD1!\0 Aj$\0  \x006\f   ( kj6\b  (\f6\b  (\b6\f A j$\0 (\f Aj$\0\v\xEA\x07\n\x7F#\0Ak"$\0  \x006\0AA\0 \x07\x1B! A\x80q!@ AF@\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vAK@  \rJ6\f  A\fjA\xD1 \ri (\0\xA36\0\v A\xB0q"AG@  A F\x7F (\0 \0\v6\0\v Aj$\0@@@@@@ \b j-\0\0\0\v  (\x006\0\f\v  (\x006\0 A  (\0(,\0!\x07  (\0"Aj6\0  \x076\0\f\v\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vE\r\x7F \r-\0\vA\x07v@ \r(\0\f\v \r\v(\0!\x07  (\0"Aj6\0  \x076\0\f\v\x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE E\r\r  \fJ \fi (\0\xA36\0\f\v (\0  j"!\x07@@  \x07M\r\0 A\xC0\0 \x07(\0 (\0(\f\0E\r\0 \x07Aj!\x07\f\v\v A\0J@ (\0! !@@  \x07O\r\0 E\r\0 Ak! \x07Ak"\x07(\0!  Aj"6\0  6\0 !\f\v\v \x7F A0 (\0(,\0A\0\v! (\0!@ A\0J@  Aj"6\0  6\0 Ak! !\f\v\v  (\0"Aj6\0  	6\0\v@  \x07F@ A0 (\0(,\0!\x07  (\0"Aj6\0  \x076\0\f\v\x7F \v-\0\vA\x07v@ \v(\f\v \v-\0\vA\xFF\0q\v\x7F\x7F \v-\0\vA\x07v@ \v(\0\f\v \v\v,\0\0A\x7F\v!A\0!A\0!@  \x07F\r@  G@ !\f\v  (\0"Aj6\0  \n6\0A\0!\x7F \v-\0\vA\x07v@ \v(\f\v \v-\0\vA\xFF\0q\v Aj"M@ !\f\v\x7F \v-\0\vA\x07v@ \v(\0\f\v \v\v j-\0\0A\xFF\0F@A\x7F!\f\v\x7F \v-\0\vA\x07v@ \v(\0\f\v \v\v j,\0\0!\v \x07Ak"\x07(\0!  (\0"Aj6\0  6\0 Aj!\f\0\v\0\v (\0\xA1\v Aj!\f\v\v\v\x90\x7F#\0Ak"\n$\0\x7F \0@ A\x80\xC0.\f\v A\xF8\xBF.\v!\0@ @ \nAj" \0 \0(\0(,\0  \n(6\0\0  \0 \0(\0( \0\f\v \nAj" \0 \0(\0((\0  \n(6\0\0  \0 \0(\0(\0\v \b \x8C ,  \0 \0(\0(\f\0\x006\0  \0 \0(\0(\0\x006\0 \nAj" \0 \0(\0(\0  d ,  \0 \0(\0(\0 \x07 \x8C , 	 \0 \0(\0($\0\x006\0 \nAj$\0\v\x98\x07\x7F#\0Ak"$\0#\0A k"$\0 Aj \0 \x89 (! (!#\0Ak"$\0  6\f@  k"E"\x07\r\0 \x07\r\0   \xFC\n\0\0\v   j6\b  (\f6  (\b6 Aj$\0 (#\0Ak"$\0  \x006\f A\fj"\0!	!\b \0(\0!#\0Ak"\0$\0 \0 6\f \0(\f! \0Aj$\0 	 \b k\xD2!\0 Aj$\0  \x006\f   ( kj6\b  (\f6\b  (\b6\f A j$\0 (\f Aj$\0\v\xD0\x07\n\x7F#\0Ak"$\0  \x006\0 A\x80q!@ AF@\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vAK@  \rJ6\f  A\fjA\xD2 \rk (\0\xA66\0\v A\xB0q"AG@  A F\x7F (\0 \0\v6\0\v Aj$\0@@@@@@ \b j-\0\0\0\v  (\x006\0\f\v  (\x006\0 A  (\0(\0!  (\0"Aj6\0  :\0\0\f\v\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vE\r\x7F \r-\0\vA\x07v@ \r(\0\f\v \r\v-\0\0!  (\0"Aj6\0  :\0\0\f\v\x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE E\r\r  \fJ \fk (\0\xA66\0\f\v (\0  \x07j"!@@  M\r\0 ,\0\0"A\x80I\x7F (\b Atj(\0A\xC0\0qA\0GA\0\vE\r\0 Aj!\f\v\v "A\0J@@@  O\r\0 E\r\0 Ak! Ak"-\0\0!  (\0"Aj6\0  :\0\0\f\v\v \x7F A0 (\0(\0A\0\v!@  (\0"Aj6\0 A\0J@  :\0\0 Ak!\f\v\v  	:\0\0\v@  F@ A0 (\0(\0!  (\0"Aj6\0  :\0\0\f\v\x7F \v-\0\vA\x07v@ \v(\f\v \v-\0\vA\xFF\0q\v\x7F\x7F \v-\0\vA\x07v@ \v(\0\f\v \v\v,\0\0A\x7F\v!A\0!A\0!@  F\r@  G@ !\f\v  (\0"Aj6\0  \n:\0\0A\0!\x7F \v-\0\vA\x07v@ \v(\f\v \v-\0\vA\xFF\0q\v Aj"M@ !\f\v\x7F \v-\0\vA\x07v@ \v(\0\f\v \v\v j-\0\0A\xFF\0F@A\x7F!\f\v\x7F \v-\0\vA\x07v@ \v(\0\f\v \v\v j,\0\0!\v Ak"-\0\0!  (\0"Aj6\0  :\0\0 Aj!\f\0\v\0\v (\0q\v Aj!\f\v\v\v\x8E\x7F#\0Ak"\n$\0\x7F \0@ A\xF0\xBF.\f\v A\xE8\xBF.\v!\0@ @ \nAj" \0 \0(\0(,\0  \n(6\0\0  \0 \0(\0( \0\f\v \nAj" \0 \0(\0((\0  \n(6\0\0  \0 \0(\0(\0\v \b d ,  \0 \0(\0(\f\0\0:\0\0  \0 \0(\0(\0\0:\0\0 \nAj" \0 \0(\0(\0  d ,  \0 \0(\0(\0 \x07 d , 	 \0 \0(\0($\0\x006\0 \nAj$\0\v/\x7F@  \0k"Au"E\r\0 At"E\r\0  \0 \xFC\n\0\0\v  j\v\x9B\x7F#\0Ak"\x07$\0 \x07 \x006\b \x07 \x07(\b6\f#\0Ak"$\0@A\xF7\xFF\xFF\xFF k O@\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v!\b Aj" A\xF3\xFF\xFF\xFFI\x7F  At6\f   j6#\0Ak"$\0 (\0 A\fj"	(\0I!\n Aj$\0 	  \n\x1B(\0"AO\x7F AjA~q" Ak" AF\x1BA\vAjA\xF7\xFF\xFF\xFF\vv (! (\b @@ E\r\0 At"E\r\0  \b \xFC\n\0\0\v\v  G@ At" j!	  \bj!@  k"E\r\0 At"E\r\0 	  \xFC\n\0\0\v\v AG@ \b-\v \0 6\0 \0 (\bA\x80\x80\x80\x80xr6\b Aj$\0\f\vG\0\v \0 6\x7F \x07(\f"\0-\0\vA\x07v@ \0(\f\v \0-\0\v\v \x07Aj$\0\v\x7F (\0\xF4! \0 (\x006 \0 6\0\v\x94	\x7F#\0A\x90k"\v$\0 \v \n6\x88 \v 6\x8C@ \0 \vA\x8Cj5@  (\0Ar6\0A\0!\0\f\v \vA\xA76H \vA\xE8\0j" \vA\xF0\0j6\0  \vA\xC8\0j"(\x006 \v (\0"6d \v A\x90j6` A\x006\b B\x007\0 \vA<j"A\x006\b B\x007\0 \vA0j"\rA\x006\b \rB\x007\0 \vA$j"\fA\x006\b \fB\x007\0 \vAj"A\x006\b B\x007\0#\0Ak"$\0@ @ Aj"\n A\x80\xC0." (\0(,\0\f\v Aj"\n A\xF8\xBF." (\0(,\0\v \v (6\0\\ \n  (\0( \0 \f \n\x8C \n, \n  (\0(\0 \r \n\x8C \n, \v  (\0(\f\0\x006X \v  (\0(\0\x006T \n  (\0(\0  \nd \n, \n  (\0(\0  \n\x8C \n, \v  (\0($\0\x006 Aj$\0 	 \b(\x006\0 A\x80q!A\0!A\0!@ !@@@@ AF\r\0 \0 \vA\x8Cj5\r\0A\0!\n@@@@@@ \vA\xDC\0j j"-\0\0\0	\v AF\r\x07 \x07A\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \x07(\0(\f\0@ \vA\fj \0\xAB  \v(\f\xC9\f\v  (\0Ar6\0A\0!\0\f\v AF\r\v@ \0 \vA\x8Cj5\r \x07A\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \x07(\0(\f\0E\r \vA\fj \0\xAB  \v(\f\xC9\f\0\v\0\v@\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vE\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v\x7F \r-\0\vA\x07v@ \r(\0\f\v \r\v(\0G\r\0 \0? A\0:\0\0 \r \x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vAK\x1B!\f\v@\x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v\x7F \f-\0\vA\x07v@ \f(\0\f\v \f\v(\0G\r\0 \0? A:\0\0 \f \x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vAK\x1B!\f\v@\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vE\r\0\x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE\r\0  (\0Ar6\0A\0!\0\f\v\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vE@\x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE\r\v \x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE:\0\0\f\v@ \r\0 AI\r\0 \r\0A\0! AF \v-\0_A\0GqE\r\v \v J6\b \v \v(\b6\f@ E\r\0 Ak-\0\0AK\r\0@@ \v i6\b \v(\f" \v(\bF\r\0 \x07A (\0 \x07(\0(\f\0E\r\0 \v \v(\fAj6\f\f\v\v \v J6\b\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v \v(\f \vA\bj"(\0kAu"O@ \v i6\b A\0 k\xD1 i! J!\n#\0Ak"$\0g! g!  \ng  kA|q}E Aj$\0\r\v \v J6 \v \v(6\b \v \v(\b6\f\v \v \v(\f6\b@@ \v i6 \v(\b \v(F\r\0 \0 \vA\x8Cj5\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \v(\b(\0G\r\0 \0? \v \v(\bAj6\b\f\v\v E\r \v i6 \v(\b \v(F\r  (\0Ar6\0A\0!\0\f\v@@ \0 \vA\x8Cj5\r\0\x7F \x07A\xC0\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v" \x07(\0(\f\0@ 	(\0" \v(\x88F@ \b 	 \vA\x88jx 	(\0!\v 	 Aj6\0  6\0 \nAj\f\v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vE\r \nE\r  \v(TG\r \v(d" \v(`F@  \vA\xE4\0j \vA\xE0\0jx \v(d!\v \v Aj6d  \n6\0A\0\v!\n \0?\f\v\v@ \v(d" (\0F\r\0 \nE\r\0 \v(` F@  \vA\xE4\0j \vA\xE0\0jx \v(d!\v \v Aj6d  \n6\0\v@ \v(A\0L\r\0@ \0 \vA\x8Cj5E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \v(XF\r\v  (\0Ar6\0A\0!\0\f\v@ \0? \v(A\0L\r@ \0 \vA\x8Cj5E@ \x07A\xC0\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v \x07(\0(\f\0\r\v  (\0Ar6\0A\0!\0\f\v 	(\0 \v(\x88F@ \b 	 \vA\x88jx\v\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v! 	 	(\0"Aj6\0  6\0 \v \v(Ak6\f\0\v\0\v ! \b(\0 	(\0G\r  (\0Ar6\0A\0!\0\f\v@ E\r\0A!\n@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v \nM\r@ \0 \vA\x8Cj5E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v (\0\v\x7F -\0\vA\x07v@ (\0\f\v \v \nAtj(\0F\r\v  (\0Ar6\0A\0!\0\f\v \0? \nAj!\n\f\0\v\0\vA!\0 (\0 \v(dF\r\0A\0!\0 \vA\x006\f  (\0 \v(d \vA\fjC \v(\f@  (\0Ar6\0\f\vA!\0\v , \f, \r, , , (\0! A\x006\0 @  (\0\v\f\v !\v Aj!\f\0\v\0\v \vA\x90j$\0 \0\v<\x7F (\0! A\x006\0 \0(\0! \0 6\0 @  \0(\0\v \0 Aj(\x006\v\xEC\x7F#\0Ak"$\0 \0(!A\x7F (\0 \0(\0k"A\xFF\xFF\xFF\xFF\x07I@ At\f\vA\x7F\v" AM\x1B! (\0!\x07 \0(\0!\b A\xA7F\x7FA\0 \0(\0\v \xB5"@ A\xA7G@ \0(\0 \0A\x006\0\v A\xA66 A\bj" 6\0  (6 \0 \xAD (\0! A\x006\0 @  (\0\v  \0(\0 \x07 \bkj6\0   \0(\0j6\0 Aj$\0\v=\0\v \x7F (\0\xFA\xC0! \0 (\x006 \0 :\0\0\v\xF0	\x7F#\0A\x90k"\v$\0 \v \n6\x88 \v 6\x8C@ \0 \vA\x8Cj6@  (\0Ar6\0A\0!\0\f\v \vA\xA76L \vA\xE8\0j" \vA\xF0\0j6\0  \vA\xCC\0j"(\x006 \v (\0"6d \v A\x90j6` A\x006\b B\x007\0 \vA@k"A\x006\b B\x007\0 \vA4j"\rA\x006\b \rB\x007\0 \vA(j"\fA\x006\b \fB\x007\0 \vAj"A\x006\b B\x007\0#\0Ak"$\0@ @ Aj"\n A\xF0\xBF." (\0(,\0\f\v Aj"\n A\xE8\xBF." (\0(,\0\v \v (6\0\\ \n  (\0( \0 \f \nd \n, \n  (\0(\0 \r \nd \n, \v  (\0(\f\0\0:\0[ \v  (\0(\0\0:\0Z \n  (\0(\0  \nd \n, \n  (\0(\0  \nd \n, \v  (\0($\0\x006 Aj$\0 	 \b(\x006\0 A\x80q!A\0!A\0!@ !@@@@ AF\r\0 \0 \vA\x8Cj6\r\0A\0!\n@@@@@@ \vA\xDC\0j j"-\0\0\0	\v AF\r\x07\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\x80I\x7F \x07(\b Atj(\0AqA\0\v@ \vAj \0\xAF  \v,\0\xCB\f\v  (\0Ar6\0A\0!\0\f\v AF\r\v@ \0 \vA\x8Cj6\r\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\x80I\x7F \x07(\b Atj(\0AqA\0\vE\r \vAj \0\xAF  \v,\0\xCB\f\0\v\0\v@\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vE\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq\x7F \r-\0\vA\x07v@ \r(\0\f\v \r\v-\0\0G\r\0 \0@ A\0:\0\0 \r \x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vAK\x1B!\f\v@\x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq\x7F \f-\0\vA\x07v@ \f(\0\f\v \f\v-\0\0G\r\0 \0@ A:\0\0 \f \x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vAK\x1B!\f\v@\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vE\r\0\x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE\r\0  (\0Ar6\0A\0!\0\f\v\x7F \r-\0\vA\x07v@ \r(\f\v \r-\0\vA\xFF\0q\vE@\x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE\r\v \x7F \f-\0\vA\x07v@ \f(\f\v \f-\0\vA\xFF\0q\vE:\0\0\f\v@ \r\0 AI\r\0 \r\0A\0! AF \v-\0_A\0GqE\r\v \v J6\f \v \v(\f6@ E\r\0 Ak-\0\0AK\r\0@@ \v k6\f \v(" \v(\fF\r\0 ,\0\0"A\x80I\x7F \x07(\b Atj(\0AqA\0\vE\r\0 \v \v(Aj6\f\v\v \v J6\f\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v \v( \vA\fj"(\0k"O@ \v k6\f A\0 k\xD2 k! J!\n#\0Ak"$\0g! g!  \ng  k}E Aj$\0\r\v \v J6\b \v \v(\b6\f \v \v(\f6\v \v \v(6\f@@ \v k6\b \v(\f \v(\bF\r\0 \0 \vA\x8Cj6\r\0\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq \v(\f-\0\0G\r\0 \0@ \v \v(\fAj6\f\f\v\v E\r \v k6\b \v(\f \v(\bF\r  (\0Ar6\0A\0!\0\f\v@@ \0 \vA\x8Cj6\r\0\x7F\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\x80I\x7F \x07(\b Atj(\0A\xC0\0qA\0\v@ 	(\0" \v(\x88F@ \b 	 \vA\x88j\xAE 	(\0!\v 	 Aj6\0  :\0\0 \nAj\f\v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vE\r \nE\r \v-\0Z A\xFFqG\r \v(d" \v(`F@  \vA\xE4\0j \vA\xE0\0jx \v(d!\v \v Aj6d  \n6\0A\0\v!\n \0@\f\v\v@ \v(d" (\0F\r\0 \nE\r\0 \v(` F@  \vA\xE4\0j \vA\xE0\0jx \v(d!\v \v Aj6d  \n6\0\v@ \v(A\0L\r\0@ \0 \vA\x8Cj6E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq \v-\0[F\r\v  (\0Ar6\0A\0!\0\f\v@ \0@ \v(A\0L\r@ \0 \vA\x8Cj6E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0"A\x80I\x7F \x07(\b Atj(\0A\xC0\0qA\0\v\r\v  (\0Ar6\0A\0!\0\f\v 	(\0 \v(\x88F@ \b 	 \vA\x88j\xAE\v\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0! 	 	(\0"Aj6\0  :\0\0 \v \v(Ak6\f\0\v\0\v ! \b(\0 	(\0G\r  (\0Ar6\0A\0!\0\f\v@ E\r\0A!\n@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v \nM\r@ \0 \vA\x8Cj6E@\x7F \0(\0"(\f" (F@  (\0($\0\0\f\v -\0\0\v\xC0A\xFFq\x7F -\0\vA\x07v@ (\0\f\v \v \nj-\0\0F\r\v  (\0Ar6\0A\0!\0\f\v \0@ \nAj!\n\f\0\v\0\vA!\0 (\0 \v(dF\r\0A\0!\0 \vA\x006  (\0 \v(d \vAjC \v(@  (\0Ar6\0\f\vA!\0\v , \f, \r, , , (\0! A\x006\0 @  (\0\v\f\v !\v Aj!\f\0\v\0\v \vA\x90j$\0 \0\v\f\0 \0AA-\xBB\v\f\0 \0AA-\xBD\vn\x7F#\0Ak"$\0 A\0:\0  :\0  :\0\r A%:\0\f @ -\0\r!  -\0:\0\r  :\0\v   (\0 k A\fj  \0(\0\xD4 j6\0 Aj$\0\vA\0    AZ! -\0\0AqE@ \0 A\xD0j A\xECj  A\xE4\0I\x1B A\xC5\0H\x1BA\xECk6\0\v\v@\0   \0A\bj \0(\b(\0\0"\0 \0A\xA0j  A\0\xA7 \0k"\0A\x9FL@  \0A\fmA\fo6\0\v\v@\0   \0A\bj \0(\b(\0\0\0"\0 \0A\xA8j  A\0\xA7 \0k"\0A\xA7L@  \0A\fmA\x07o6\0\v\vA\0    A[! -\0\0AqE@ \0 A\xD0j A\xECj  A\xE4\0I\x1B A\xC5\0H\x1BA\xECk6\0\v\v@\0   \0A\bj \0(\b(\0\0"\0 \0A\xA0j  A\0\xA8 \0k"\0A\x9FL@  \0A\fmA\fo6\0\v\v@\0   \0A\bj \0(\b(\0\0\0"\0 \0A\xA8j  A\0\xA8 \0k"\0A\xA7L@  \0A\fmA\x07o6\0\v\v\0A\v\xF4\x7F#\0Ak"$\0@ A\xF7\xFF\xFF\xFFM@@ AI@ \0 A\xFF\0q:\0\v \0!\f\v A\bj AO\x7F AjA~q" Ak" AF\x1BA\vAjv (\f \0 (\b"6\0 \0 (\fA\x80\x80\x80\x80xr6\b \0 6\v#\0Ak"$\0  6\f ! !@ @  (\f6\0 Ak! Aj!\f\v\v Aj$\0 A\x006  Atj (6\0 Aj$\0\f\vG\0\v \0\v\x86\x07\n\x7F#\0Ak"\f$\0 A\xF0\xC1.!	 \fAj A\xB8\xC2."\r" (\0(\0  6\0@@ \0"\b-\0\0"A+k\0\0\v 	 \xC0 	(\0(,\0!  (\0"\x07Aj6\0 \x07 6\0 \0Aj!\b\v@@  \b"kAL\r\0 -\0\0A0G\r\0 -\0A rA\xF8\0G\r\0 	A0 	(\0(,\0!\x07  (\0"\bAj6\0 \b \x076\0 	 ,\0 	(\0(,\0!\x07  (\0"\bAj6\0 \b \x076\0 Aj"\b!@  M\r ,\0\0!\x077 \x07A0kA\nI \x07A rA\xE1\0kAIrE\r Aj!\f\0\v\0\v@  M\r ,\0\07A0kA\nO\r Aj!\f\0\v\0\v@\x7F \f-\0A\x07v@ \f(\b\f\v \f-\0A\xFF\0q\vE@ 	 \b  (\0 	(\0(0\0  (\0  \bkAtj6\0\f\v \b q \r \r(\0(\0\0! \b!\x07@  \x07M@  \b \0kAtj (\0\xA1@\x7F \fAj"\n-\0\vA\x07v@ \n(\0\f\v \n\v j,\0\0A\0L\r\0 \v\x7F \n-\0\vA\x07v@ \n(\0\f\v \n\v j,\0\0G\r\0  (\0"\vAj6\0 \v 6\0  \x7F \n-\0\vA\x07v@ \n(\f\v \n-\0\vA\xFF\0q\vAkIj!A\0!\v\v 	 \x07,\0\0 	(\0(,\0!\n  (\0"Aj6\0  \n6\0 \x07Aj!\x07 \vAj!\v\f\v\v\v@@@  M\r Aj!\x07 ,\0\0"A.G@ 	  	(\0(,\0!  (\0"\bAj6\0 \b 6\0 \x07!\f\v\v \r \r(\0(\f\0\0!  (\0"\bAj"\v6\0 \b 6\0\f\v (\0!\v !\x07\v 	 \x07  \v 	(\0(0\0  (\0  \x07kAtj"6\0     \0kAtj  F\x1B6\0 \fAj, \fAj$\0\v\xBA\x7F#\0Ak"$\0@ A\xF7\xFF\xFF\xFF\x07M@@ A\vI@ \0 A\xFF\0q:\0\v \0!\f\v A\bj A\vO\x7F A\bjAxq" Ak" A\vF\x1BA\n\vAj\x83 (\f \0 (\b"6\0 \0 (\fA\x80\x80\x80\x80xr6\b \0 6\v   \xCC A\0:\0\x07  j -\0\x07:\0\0 Aj$\0\f\vG\0\v \0\vG\x7F~#\0A k"$\0 (\0! )\0!  )\b7  7\b  6\0 \0   \x9E A j$\0\v:\x7F~#\0Ak"$\0 )\0!  )\b7\b  7\0 \0A   y Aj$\0\vH\x7F~#\0A k"$\0 (\0! )\0!  )\b7  7\b  6\0 \0A   y A j$\0\v\xF5\n\x7F#\0Ak"\v$\0 A\xF8\xC1.!	 \vAj A\xB0\xC2."\r" (\0(\0  6\0@@ \0"\b-\0\0"A+k\0\0\v 	 \xC0 	(\0(\0!  (\0"\x07Aj6\0 \x07 :\0\0 \0Aj!\b\v@@  \b"kAL\r\0 -\0\0A0G\r\0 -\0A rA\xF8\0G\r\0 	A0 	(\0(\0!\x07  (\0"\bAj6\0 \b \x07:\0\0 	 ,\0 	(\0(\0!\x07  (\0"\bAj6\0 \b \x07:\0\0 Aj"\b!@  M\r ,\0\0!\x077 \x07A0kA\nI \x07A rA\xE1\0kAIrE\r Aj!\f\0\v\0\v@  M\r ,\0\07A0kA\nO\r Aj!\f\0\v\0\v@\x7F \v-\0A\x07v@ \v(\b\f\v \v-\0A\xFF\0q\vE@ 	 \b  (\0 	(\0( \0  (\0  \bkj6\0\f\v \b q \r \r(\0(\0\0! \b!\x07@  \x07M@  \b \0kj (\0q@\x7F \vAj"\n-\0\vA\x07v@ \n(\0\f\v \n\v j,\0\0A\0L\r\0 \f\x7F \n-\0\vA\x07v@ \n(\0\f\v \n\v j,\0\0G\r\0  (\0"\fAj6\0 \f :\0\0  \x7F \n-\0\vA\x07v@ \n(\f\v \n-\0\vA\xFF\0q\vAkIj!A\0!\f\v 	 \x07,\0\0 	(\0(\0!\n  (\0"Aj6\0  \n:\0\0 \x07Aj!\x07 \fAj!\f\f\v\v\v@@@  M@ !\x07\f\v Aj!\x07 ,\0\0"A.G\r \r \r(\0(\f\0\0!  (\0"\bAj6\0 \b :\0\0\v 	 \x07  (\0 	(\0( \0  (\0  \x07kj"6\0     \0kj  F\x1B6\0 \vAj, \vAj$\0\v 	  	(\0(\0!  (\0"\bAj6\0 \b :\0\0 \x07!\f\0\v\0\v)\x7F#\0Ak"$\0  +\x009\0 \0   \x9E Aj$\0\v7\x7F#\0Ak"$\0 (\0!  +\x009\b  6\0 \0   \x9E Aj$\0\v*\x7F#\0Ak"$\0  +\x009\0 \0A   y Aj$\0\v8\x7F#\0Ak"$\0 (\0!  +\x009\b  6\0 \0A   y Aj$\0\v\x84\x7F#\0A\xD0k"\0$\0 \0 6\xC8 \0 6\xCC \\!  \0A\xD0j\x8E!\x07 \0A\xC4j  \0A\xC4j\x8D \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xCCj \0A\xC8j5\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xCCj"\b(\0"(\f"	 (F@  (\0($\0\0\f\v 	(\0\v   \0A\xB4j \0A\bj \0(\xC4 \0A\xC4j \0Aj \0A\fj \x07{\r\0 \b?\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xCC6\0 \0A\xC4j \0Aj \0(\f C \0A\xCCj \0A\xC8j5@  (\0Ar6\0\v \0(\xCC , \0A\xC4j, \0A\xD0j$\0\v\x81\x7F#\0Ak"$\0  (\x006\0#\0Ak"$\0  6\f  6\b Aj A\fjS \0A\xC6 (\b\xD9!\0(\0"@A\xA8\xA0(\0 @A\xA8\xA0A\xB0\x9F  A\x7FF\x1B6\0\v\v Aj$\0 Aj$\0 \0\v\xD9~\x7F#\0A k"\b$\0@@@  G@A\xD4\xA0(\0!\rA\xD4\xA0A\x006\0#\0Ak"	$\07#\0Ak"\n$\0#\0Ak"\v$\0#\0Ak"\f$\0 \f  \bAjA\xDC \f)\0! \v \f)\b7\b \v 7\0 \fAj$\0 \v)\0! \n \v)\b7\b \n 7\0 \vAj$\0 \n)\0! 	 \n)\b7\b 	 7\0 \nAj$\0 	)\0! \b 	)\b7 \b 7\b 	Aj$\0 \b)! \b)\b!A\xD4\xA0(\0"E\r \b( G\r ! !\x07 A\xC4\0G\r\f\v A6\0\f\vA\xD4\xA0 \r6\0 \b( F\r\v A6\0 ! \x07!\v \0 7\0 \0 7\b \bA j$\0\v\xC0\x7F|#\0Ak"$\0@@@ \0 G@A\xD4\xA0(\0!A\xD4\xA0A\x006\07#\0Ak"$\0  \0 A\fjA\xDC )\0 )\b\xE8! Aj$\0@A\xD4\xA0(\0"\0@ (\f F\r\f\vA\xD4\xA0 6\0 (\f G\r\f\v \0A\xC4\0G\r\f\v A6\0\f\vD\0\0\0\0\0\0\0\0!\v A6\0\v Aj$\0 \v\xBC\x7F}#\0Ak"$\0@@@ \0 G@A\xD4\xA0(\0!A\xD4\xA0A\x006\07#\0Ak"$\0  \0 A\fjA\0\xDC )\0 )\b\xDB! Aj$\0@A\xD4\xA0(\0"\0@ (\f F\r\f\vA\xD4\xA0 6\0 (\f G\r\f\v \0A\xC4\0G\r\f\v A6\0\f\vC\0\0\0\0!\v A6\0\v Aj$\0 \v\xC4\x7F~#\0Ak"$\0~@@ \0 G@@@ \0-\0\0"A-G\r\0 \0Aj"\0 G\r\0\f\vA\xD4\xA0(\0!A\xD4\xA0A\x006\07 \0 A\fj B\x7Fr!\x07@A\xD4\xA0(\0"\0@ (\f G\r \0A\xC4\0F\r\f\vA\xD4\xA0 6\0 (\f F\r\v\v\v A6\0B\0\f\v A6\0B\x7F\f\vB\0 \x07} \x07 A-F\x1B\v Aj$\0\v\xD5\x7F~#\0Ak"$\0\x7F@@@ \0 G@@@ \0-\0\0"A-G\r\0 \0Aj"\0 G\r\0\f\vA\xD4\xA0(\0!A\xD4\xA0A\x006\07 \0 A\fj B\x7Fr!\x07@A\xD4\xA0(\0"\0@ (\f G\r \0A\xC4\0F\r\f\vA\xD4\xA0 6\0 (\f F\r\v\v\v A6\0A\0\f\v \x07B\xFF\xFF\xFF\xFFX\r\v A6\0A\x7F\f\vA\0 \x07\xA7"\0k \0 A-F\x1B\v Aj$\0\v\xFA\x7F#\0A\x80k"\0$\0 \0 6\xF8 \0 6\xFC \\! \0A\xC4j  \0A\xF7j\x8F \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xFCj \0A\xF8j6\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xFCj"\x07(\0"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\v\xC0   \0A\xB4j \0A\bj \0,\0\xF7 \0A\xC4j \0Aj \0A\fjA\xF0\xD8|\r\0 \x07@\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xCC6\0 \0A\xC4j \0Aj \0(\f C \0A\xFCj \0A\xF8j6@  (\0Ar6\0\v \0(\xFC , \0A\xC4j, \0A\x80j$\0\v\xDA\x7F~#\0Ak"$\0\x7F@@@ \0 G@@@ \0-\0\0"A-G\r\0 \0Aj"\0 G\r\0\f\vA\xD4\xA0(\0!A\xD4\xA0A\x006\07 \0 A\fj B\x7Fr!\x07@A\xD4\xA0(\0"\0@ (\f G\r \0A\xC4\0F\r\f\vA\xD4\xA0 6\0 (\f F\r\v\v\v A6\0A\0\f\v \x07B\xFF\xFFX\r\v A6\0A\xFF\xFF\f\vA\0 \x07\xA7"\0k \0 A-F\x1B\v Aj$\0A\xFF\xFFq\v\xC1~\x7F#\0Ak"$\0@@ \0 G@A\xD4\xA0(\0!A\xD4\xA0A\x006\07 \0 A\fj B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7Fr!@A\xD4\xA0(\0"\0@ (\f G\r \0A\xC4\0F\r\f\vA\xD4\xA0 6\0 (\f F\r\v\v A6\0B\0!\f\v A6\0 B\0U@B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0!\f\vB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F!\v Aj$\0 \v\xCB\x7F~#\0Ak"$\0\x7F@@ \0 G@A\xD4\xA0(\0!A\xD4\xA0A\x006\07 \0 A\fj B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7Fr!@A\xD4\xA0(\0"\0@ (\f G\r \0A\xC4\0F\r\f\vA\xD4\xA0 6\0 (\f F\r\v\v A6\0A\0\f\v B\x80\x80\x80\x80xS\r\0 B\xFF\xFF\xFF\xFF\x07U\r\0 \xA7\f\v A6\0A\xFF\xFF\xFF\xFF\x07 B\0U\r\0A\x80\x80\x80\x80x\v Aj$\0\v\xBA\x7F@#\0Ak"$\0  kAu"A\xF7\xFF\xFF\xFFM@@ AI@ \0 A\xFF\0q:\0\v \0!\f\v A\bj AO\x7F AjA~q" Ak" AF\x1BA\vAjv (\f \0 (\b"6\0 \0 (\fA\x80\x80\x80\x80xr6\b \0 6\v   \xA9 A\x006 (6\0 Aj$\0\f\vG\0\v\v\x89\b\x7F (\0!@@@@@@@\x7F@@@@ E\r\0 (\0"E\r\0 \0E@ !\f\v A\x006\0 !\f\v@A\xA8\xA0(\0(\0E@ \0E\r E\r\f !@ ,\0\0"@ \0 A\xFF\xBFq6\0 \0Aj!\0 Aj! Ak"\r\f\v\v \0A\x006\0 A\x006\0  k\v ! \0E\r\f\v L\vA!\x07\f\vA\0\f\vA\v!\x07@ \x07E@ -\0\0Av"Ak Au jrA\x07K\r\x7F Aj" A\x80\x80\x80qE\r\0 ,\0\0A@N@ Ak!\f\x07\v Aj" A\x80\x80 qE\r\0 ,\0\0A@N@ Ak!\f\x07\v Aj\v! Ak!A!\x07\f\v@@ ,\0\0"A\0L\r\0 Aq\r\0 (\0"A\x81\x82\x84\bk rA\x80\x81\x82\x84xq\r\0@ Ak! "Aj! ("A\x81\x82\x84\bk rA\x80\x81\x82\x84xqE\r\0\v\v \xC0A\0J@ Ak! Aj!\f\v\v A\xFFqA\xC2k"A2K\r Aj! At(\xA0\xB5!A\0!\x07\f\0\v\0\v@ \x07E@ E\r\x07@@ -\0\0"\x07\xC0"A\0L\r\0@ AI\r\0 Aq\r\0@@ (\0"A\x81\x82\x84\bk rA\x80\x81\x82\x84xq\r \0 A\xFFq6\0 \0 -\06 \0 -\06\b \0 -\06\f \0Aj!\0 Aj! Ak"AK\r\0\v -\0\0!\v A\xFFq!\x07 \xC0A\0L\r\v \0 \x076\0 \0Aj!\0 Aj! Ak"\r\f	\v\v \x07A\xC2k"A2K\r Aj! At(\xA0\xB5!A!\x07\f\v -\0\0"\bAv"Ak  AujrA\x07K\r@@\x7F Aj" \bA\x80k Atr"\x07A\0N\r\0 -\0\0A\x80k"A?K\r  \x07At"\br!\x07 Aj" \bA\0N\r\0 -\0\0A\x80k"A?K\r  \x07Atr!\x07 Aj\v! \0 \x076\0 Ak! \0Aj!\0\f\vA\xD4\xA0A6\0 Ak!\f\vA\0!\x07\f\0\v\0\v Ak! \r -\0\0!\v A\xFFq\r\0 \0@ \0A\x006\0 A\x006\0\v  k\vA\xD4\xA0A6\0 \0E\r\v  6\0\vA\x7F\v  6\0 \v8\0 \0A\xD0k \0 \0A\x93\xF1\xFF\xFF\x07J\x1B"\0Aq@A\0\v \0A\xECj"\0A\xE4\0o@A\v \0A\x90oE\v\xA8\x7F~#\0A\x80k"\b$\0 @\x7F@@\x7F@@@ -\0\0"A%G@ \r \n\f\x07\vA\0!A!	@ -\0"\x07A-k\0\v \x07A\xDF\0F\r \x07\r\v \0 \nj :\0\0 \nAj\f\v \x07! -\0!\x07A!	\vA\0!@\x7F  	j \x07"A+Fj"\x07,\0\0A0kA	M@ \x07 \bA\fjA\nB\xFF\xFF\xFF\xFFr\xA7! \b(\f\f\v \b \x076\fA\0! \x07\v"	-\0\0"A\xC3\0k"\vAK\r\0A \vtA\x99\x80\x80qE\r\0 "\r\0 \x07 	G!\v\x7F@ A\xCF\0F\r\0 A\xC5\0F\r\0 	\f\v 	-\0! 	Aj\v! \bAj!\x07 !	A\0!#\0A\xD0\0k"\v$\0A\xB1\n!\rA0!A\xA8\x80\b!\f@ \b\x7F@@@@@@@\x7F@@@@@@@@@~@@@@@@@@@@@@@@@@@@@@@@@@@@ \xC0"A%kV!---------------------------\'-\x07\b	\n---\r---- ------\0&-\b-\v--\f--%-\x1B-\v ("AM\r"\f*\v ("AK\r) A\x87\x80\bj\f"\v ("A\vK\r( A\x8E\x80\bj\f!\v ("A\vK\r\' A\x9A\x80\bj\f \v 4B\xEC|B\xE4\0\x7F!\f#\vA\xDF\0!\v 4\f!\f!\vA\xDA !\r\f\v 4"B\xEC|!@ ("AL@  B\xEB| \xDDAF\x1B!\f\v A\xE9I\r\0 B\xED|  \xDDAF\x1B!\v A\xE7\0F\r\f \v 4\b!\f\vA! (\b"E@B\f!\f \v \xAC"B\f}  A\fJ\x1B!\f\v (Aj\xAC!A!\f\v (Aj\xAC!\f\x1B\v 4!\f\v \bA6|A\x8F3!\f\vA\xA7\x80\bA\xA6\x80\b (\bA\vJ\x1B\f\vA\x9A$!\r\f\vA\0!\fA\0!#\0Ak"$\0 4!~ ("\rA\fO@ \r \rA\fm"A\flk"A\fj  A\0H\x1B!\r  Auj\xAC |!\v A\fj! B}B\x88X@ \xA7"\fA\xC4\0kAu!@ \x7F \fAqE@ Ak! E\rA\f\v E\rA\0\v6\0\v \fA\x80\xE7\x84l A\x80\xA3ljA\x80\xD6\xAF\xE3\x07j\xAC\f\v B\xE4\0}" B\x90\x7F"B\x90~}"B?\x87\xA7 \xA7j!@@@ \xA7"A\x90j  B\0S\x1B"\x7F\x7F A\xC8N@ A\xACO@A!\f A\xACk\f\vA!\f A\xC8k\f\v A\xE4\0k  A\xE3\0J"\f\x1B\v"\rA\0A\v! \r\f\v Av! AqE! E\r\v  6\0\v B\x80\xE7\x84~  \fAl A\xE1\0ljj k\xACB\x80\xA3~|B\x80\xAA\xBA\xC3|\v! \rAtA\xD0\xD5j(\0"A\x80\xA3j  (\f\x1B  \rAJ\x1B! (\f! 4\b! 4! 4\0 Aj$\0  \xAC| Ak\xACB\x80\xA3~| B\x90~| B<~|| 4$}\f\b\v 4\0!\f\v \bA6|A\x913!\f\vA\xAD#!\r\f\v ("A\x07 \x1B\xAC\f\v ( (kA\x07jA\x07n\xAD!\f\v ( (AjA\x07pkA\x07jA\x07n\xAD!\f\v \xDD\xAD!\f\v 4\v!A!\f\vA\xA9\x80\b!\f\f\n\vA\xAA\x80\b!\f\f	\v 4B\xEC|B\xE4\0\x81" B?\x87"\x85 }!\f\n\v 4"B\xEC|! B\xA4?S\r\n \v 70 \b \x07A\xE4\0A\xC4 \vA0jm6| \x07!\f\v ( A\0H@ \bA\x006|A\x923!\f\v \v ($"A\x90m"A\xE4\0l  A\x90lk\xC1A<m\xC1j6@ \b \x07A\xE4\0A\xCA \vA@km6| \x07!\f\r\v ( A\0H@ \bA\x006|A\x923!\f\r\v ((A\xD4\xBE-\0\0AqE@A\xA8\xBEA\xAC\xBEA\xE0\xBEA\x80\xBFA\xB4\xBEA\x80\xBF6\0A\xB0\xBEA\xE0\xBE6\0A\xD4\xBEA:\0\0\v\f\v\v \bA6|A\xCF2!\f\v\v B\xE4\0\x81!\f\v A\x80\x80\br\v \xD5\f\x07\vA\xAB\x80\b!\f\v \f \xD5!\r\v \b \x07A\xE4\0 \r  \xD4"6| \x07A\0 \x1B!\f\vA!\f\vA!\v@ 	  	\x1B"A\xDF\0G@ A-G\r \v 7 \b \x07A\xE4\0A\xC5 \vAjm6| \x07!\f\v \v 7( \v 6  \b \x07A\xE4\0A\xBE \vA jm6| \x07!\f\v \v 7\b \v 6\0 \b \x07A\xE4\0A\xB7 \vm6| \x07!\f\vA\x8B2\v"L6|\v \vA\xD0\0j$\0 E\r@ E@ \b(|!	\f\v\x7F@@ -\0\0"A+k\0\0\v \b(|\f\v -\0! Aj! \b(|Ak\v!	@ A\xFFqA0G\r\0@ ,\0"\x07A0kA	K\r Aj! 	Ak!	 \x07A0F\r\0\v\v \b 	6|A\0!@ "\x07Aj!  \x07j,\0\0A0kA\nI\r\0\v  	 	 I\x1B!@ \0 \nj (A\x94qH\x7FA- A+G\r  	k \x07jAA \b(\f-\0\0A\xC3\0F\x1BI\rA+\v:\0\0 Ak! \nAj!\n\v  	M\r\0  \nM\r\0@ \0 \njA0:\0\0 \nAj!\n Ak" 	M\r  \nK\r\0\v\v \b 	  \nk"\x07 \x07 	K\x1B"\x076| \0 \nj  \x07^ \b(| \nj\v!\n Aj!  \nK\r\v\v Ak \n  \nF\x1B!\nA\0\v! \0 \njA\0:\0\0\v \bA\x80j$\0 \v\xBC\x7F \0AF@A\xDB+A\xC1$ (\0\x1B\v \0Au!@ \0A\xFF\xFFq"A\xFF\xFFG\r\0 AJ\r\0  Atj(\0"\0A\bjA\xA4& \0\x1B\vA\x923!\0@\x7F@@@ Ak\0\v AK\rA\x80\xD6\f\v A1K\rA\x90\xD6\f\v AK\rA\xD0\xD8\v!\0 E\r\0@ \0"Aj!\0 -\0\0\r\0 Ak"\r\0\v\v \0\v.\0 \0A\0G \0A\xE8\xB4Gq \0A\x80\xB5Gq \0A\xAC\xBDGq \0A\xC4\xBDGq@ \0-\v\v\xE6\x7F@ -\0\0\r\0A\xA0$\xBA"@ -\0\0\r\v \0A\flA\xF0\xBCj\xBA"@ -\0\0\r\vA\xDA$\xBA"@ -\0\0\r\vA\xD9+!\v@@@  j-\0\0"E\r\0 A/F\r\0A! Aj"AG\r\f\v\v !\vA\xD9+!@@@@@ -\0\0"A.F\r\0  j-\0\0\r\0 ! A\xC3\0G\r\v -\0E\r\v A\xD9+\xA9E\r\0 A\xC2"\xA9\r\v \0E@A\xC4\xB4! -\0A.F\r\vA\0\vA\xA8\xBD(\0"@@  A\bj\xA9E\r ( "\r\0\v\vA$<"@ A\xC4\xB4)\x007\0 A\bj"  ^  jA\0:\0\0 A\xA8\xBD(\x006 A\xA8\xBD 6\0\v A\xC4\xB4 \0 r\x1B!\v \v%\x7F#\0Ak"$\0  6\f \0A\x95\x1B \xD9 Aj$\0\v\x81\x7F~#\0A\x90k"$\0 A\0A\x90\xFC\v\0 A\x7F6L  \x006, A\xA56   \x006T ! !#\0A\xB0k"$\0 (L@@ (E@ \xB3 (E\r\v -\0\0"E\r@@@@@ A\xFFq"\0A F \0A	kAIr@@ "Aj! -\0"\0A F \0A	kAIr\r\0\v B\0U@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A F \0A	kAIr\r\0\v (! )pB\0Y@  Ak"6\v  (,k\xAC )x ||!\f\v\x7F@@ \0A%F@ -\0"\0A*F\r \0A%G\r\v B\0U@ -\0\0A%F@@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v""\0A F \0A	kAIr\r\0\v Aj!\f\v ("\0 (hG@  \0Aj6 \0-\0\0!\f\v 1!\v -\0\0 G@ )pB\0Y@  (Ak6\v A\0N\r\n \r\r\n\f	\v ( (,k\xAC )x ||! !\f\vA\0!\x07 Aj\f\v@ \0A0k"\0A	K\r\0 -\0A$G\r\0#\0Ak" 6\f   \0AtjAk  \0AK\x1B"\0Aj6\b \0(\0!\x07 Aj\f\v (\0!\x07 Aj! Aj\v!A\0!\vA\0! -\0\0"A0kA\xFFqA	M@@ A\nl A\xFFqjA0k! -\0! Aj! A0kA\xFFqA\nI\r\0\v\v A\xFFqA\xED\0G\x7F A\0!	 \x07A\0G!\v -\0!A\0!\n Aj\v"Aj!A!\0@@@@@@ A\xFFqA\xC1\0k:																								\0								\v Aj  -\0A\xE8\0F"\0\x1B!A~A\x7F \0\x1B!\0\f\v Aj  -\0A\xEC\0F"\0\x1B!AA \0\x1B!\0\f\vA!\0\f\vA!\0\f\vA\0!\0 !\vA \0 -\0\0"\0A/qAF"\x1B!@ \0A r \0 \x1B"\fA\xDB\0F\r\0@ \fA\xEE\0G@ \fA\xE3\0G\rA  AL\x1B!\f\v \x07  \xDA\f\v B\0U@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A F \0A	kAIr\r\0\v (! )pB\0Y@  Ak"6\v  (,k\xAC )x ||!\v  \xAC"U@ ("\0 (hG@  \0Aj6\f\v 1A\0H\r\v )pB\0Y@  (Ak6\vA!@@@@@@@@@@@@ \fA\xD8\0k!\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\v\0\v \fA\xC1\0k"\0AK\r\nA \0tA\xF1\0qE\r\n\v A\bj  A\0\xDD )xB\0 ( (,k\xAC}Q\r \x07E\r	 )! )\b! \x07	\v \fArA\xF3\0F@ A jA\x7FA\x81\xE9 A\0:\0  \fA\xF3\0G\r\b A\0:\0A A\0:\0. A\x006*\f\b\v A j -\0"\0A\xDE\0F"A\x81\xE9 A\0:\0  Aj Aj \x1B!\x7F@@ AA \x1Bj-\0\0"A-G@ A\xDD\0F\r \0A\xDE\0G!\b \f\v  \0A\xDE\0G"\b:\0N\f\v  \0A\xDE\0G"\b:\0~\v Aj\v!@@ -\0\0"\0A-G@ \0E\r \0A\xDD\0F\r\n\f\vA-!\0 -\0"E\r\0 A\xDD\0F\r\0 Aj!@  Ak-\0\0"M@ !\0\f\v@ Aj" A jj \b:\0\0  -\0\0"\0I\r\0\v\v !\v A j \0j \b:\0 Aj!\f\0\v\0\vA\b!\f\vA\n!\f\vA\0!\vB\0!A\0!A\0!A\0!#\0Ak"\b$\0@ AG A$MqE@A\xD4\xA0A6\0\f\v@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A F \0A	kAIr\r\0\v@@ \0A+k\0\0\vA\x7FA\0 \0A-F\x1B! ("\0 (hG@  \0Aj6 \0-\0\0!\0\f\v 1!\0\v@@@@@ A\0G AGq\r\0 \0A0G\r\0\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A_qA\xD8\0F@A!\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A\xE1\xBAj-\0\0AI\r )pB\0Y@  (Ak6\v B\0U\f\v \rA\b!\f\v A\n \x1B" \0A\xE1\xBAj-\0\0K\r\0 )pB\0Y@  (Ak6\v B\0UA\xD4\xA0A6\0\f\v A\nG\r\0 \0A0k"A	M@A\0!\0@ \0A\nl j"\0A\x99\xB3\xE6\xCCI\x7F (" (hG@  Aj6 -\0\0\f\v 1\vA0k"A	Mq\r\0\v \0\xAD!\v A	K\r B\n~! \xAD!@@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A0k"A	M  |"B\x9A\xB3\xE6\xCC\x99\xB3\xE6\xCCTqE@ A	M\r\f\v B\n~" \xAD"B\x7F\x85X\r\v\vA\n!\f\v@@  Akq@  \0A\xE1\xBAj-\0\0"K\r\f\v  \0A\xE1\xBAj-\0\0"M\r AlAvA\x07q,\0\xE1\xBC!@   t"r! \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A\xE1\xBAj-\0\0"M"E A\x80\x80\x80\xC0\0Iq\r\0\v \xAD! \rB\x7F \xAD"\x88" T\r@ \xADB\xFF\x83  \x86\x84! \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A\xE1\xBAj-\0\0"M\r  X\r\0\v\f\v@   lj! \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A\xE1\xBAj-\0\0"M"E A\xC7\xE3\xF18Iq\r\0\v \xAD! \r \xAD!@  ~" \xADB\xFF\x83"B\x7F\x85V\r  |! \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0A\xE1\xBAj-\0\0"M\r \b B\0 B\0A \b)\bP\r\0\v\v\v  \0A\xE1\xBAj-\0\0M\r\0@ \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\vA\xE1\xBAj-\0\0K\r\0\vA\xD4\xA0A\xC4\x006\0A\0!B\x7F!\v )pB\0Y@  (Ak6\v@ B\x7FR\r\0\v  \xAC"\x85 }!\v \bAj$\0 )xB\0 ( (,k\xAC}Q\r	@ \fA\xF0\0G\r\0 \x07E\r\0 \x07 >\0\f\v \x07  \xDA\f\v \x07  \xDB8\0\f\v \x07  \xE89\0\f\v \x07 7\0 \x07 7\b\f\vA Aj \fA\xE3\0G"\x1B!\b\x7F AF@ \x07! \v@ \bAt<"E\r\v B\x007\xA8A\0!@@@ !\0@ \x7F (" (hG@  Aj6 -\0\0\f\v 1\v"j-\0!E\r  :\0\x1B Aj A\x1BjA A\xA8j\x90"A~F\r\0 A\x7FF@A\0!	\f\v \0@ \0 Atj (6\0 Aj!\v \vE\r\0  \bG\r\0\v \0 \bAtAr"\bAt\xB5"\r\0\vA\0!	 \0!\nA!\v\f\b\vA\0!	 \0 A\xA8j\x7F (\xA8A\0\vE\r\v \0!\n\f\v \v@A\0! \b<"E\r@ !\0@ \x7F (" (hG@  Aj6 -\0\0\f\v 1\v"j-\0!E@ \0!	A\0\f\v \0 j :\0\0 Aj" \bG\r\0\v \0 \bAtAr"\b\xB5"\r\0\vA\0!\n \0!	A!\v\f\vA\0! \x07@@ \x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v"\0j-\0!@  \x07j \0:\0\0 Aj!\f \x07"\0!	A\0\f\v\0\v\0\v@\x7F ("\0 (hG@  \0Aj6 \0-\0\0\f\v 1\v j-\0!\r\0\vA\0!\0A\0!	A\0\v!\n (! )pB\0Y@  Ak"6\v )x  (,k\xAC|"P\r   QrE\r \v@ \x07 \x006\0\v \fA\xE3\0F\r\0 \n@ \n AtjA\x006\0\v 	E@A\0!	\f\v  	jA\0:\0\0\v ( (,k\xAC )x ||! \r \x07A\0Gj!\r\v Aj! -\0"\r\f\v\vA!\vA\0!	A\0!\n\v \rA\x7F \r\x1B!\r\v \vE\r 	- \n-\f\vA\x7F!\r\v A\xB0j$\0 A\x90j$\0 \r\vC\0@ \0E\r\0@@@@ Aj\0\v \0 <\0\0\v \0 =\0\v \0 >\0\v \0 7\0\v\v\xE6\x7F~#\0A k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!\x07@ B0\x88B\xFF\xFF\x83"\b\xA7"A\x81\xFF\0kA\xFDM@ \x07B\x88\xA7!@ \0P B\xFF\xFF\xFF\x83"\x07B\x80\x80\x80\bT \x07B\x80\x80\x80\bQ\x1BE@ Aj!\f\v \0 \x07B\x80\x80\x80\b\x85\x84B\0R\r\0 Aq j!\vA\0  A\xFF\xFF\xFFK"\x1B!A\x81\x81\x7FA\x80\x81\x7F \x1B j!\f\v@ \0 \x07\x84P\r\0 \bB\xFF\xFFR\r\0 \x07B\x88\xA7A\x80\x80\x80r!A\xFF!\f\v A\xFE\x80K@A\xFF!\f\vA\x80\xFF\0A\x81\xFF\0 \bP"\x1B" k"A\xF0\0J@A\0!A\0!\f\v \x07 \x07B\x80\x80\x80\x80\x80\x80\xC0\0\x84 \x1B!\x07A\0!  G@ Aj \0 \x07A\x80 kD ) )\x84B\0R!\v  \0 \x07 t )\b"\0B\x88\xA7!@ )\0 \xAD\x84"\x07P \0B\xFF\xFF\xFF\x83"\0B\x80\x80\x80\bT \0B\x80\x80\x80\bQ\x1BE@ Aj!\f\v \x07 \0B\x80\x80\x80\b\x85\x84B\0R\r\0 Aq j!\v A\x80\x80\x80s  A\xFF\xFF\xFFK"\x1B!\v A j$\0 B \x88\xA7A\x80\x80\x80\x80xq Atr r\xBE\v\x89\x7F~@@@@@\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \01\v"A+k\0\0\v A-F!\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \01\v"A:k! E\r AuK\r \0)pB\0S\r \0 \0(Ak6\f\v A:k! !\v AvI\r\0@ A0kA\nO\r\0A\0!@  A\nlj\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \01\v!A0k! A\xCC\x99\xB3\xE6\0H A0k"A	Mq\r\0\v \xAC! A\nO\r\0@ \xAD B\n~|!\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \01\v"A0k"A	M B0}"B\xAE\x8F\x85\xD7\xC7\xC2\xEB\xA3Sq\r\0\v A\nO\r\0@\x7F \0(" \0(hG@ \0 Aj6 -\0\0\f\v \01\vA0kA\nI\r\0\v\v \0)pB\0Y@ \0 \0(Ak6\vB\0 }  \x1B!\f\vB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F! \0)pB\0S\r\0 \0 \0(Ak6B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\v \v\xCF2\x7F\x07~|#\0A0k"\r$\0@@ AK\r\0 At"(\xCC\xBA! (\xC0\xBA!@\x7F (" (hG@  Aj6 -\0\0\f\v 1\v"A F A	kAIr\r\0\vA!\x07@@ A+k\0\0\vA\x7FA A-F\x1B!\x07 (" (hG@  Aj6 -\0\0!\f\v 1!\v@@ A_qA\xC9\0F@@ A\x07F\r\x7F (" (hG@  Aj6 -\0\0\f\v 1\v! ,\0\x98\b Aj! A rF\r\0\v\v AG@ A\bF"\f\r E\r AI\r \f\r\v )p"B\0Y@  (Ak6\v E\r\0 AI\r\0 B\0S!@ E@  (Ak6\v Ak"AK\r\0\v\vB\0!#\0Ak"$\0 \x07\xB2C\0\0\x80\x7F\x94\xBC"A\xFF\xFF\xFFq!\x07\x7F Av"A\xFFq"@ A\xFFG@ \x07\xADB\x86! A\xFFqA\x80\xFF\0j\f\v \x07\xADB\x86!A\xFF\xFF\f\vA\0 \x07E\r\0  \x07\xADB\0 \x07g"A\xD1\0jD )\bB\x80\x80\x80\x80\x80\x80\xC0\0\x85! )\0!A\x89\xFF\0 k\v! \r 7\0 \r \xADB0\x86 Av\xADB?\x86\x84 \x847\b Aj$\0 \r)\b! \r)\0!\f\v@@@@@@ \r\0A\0! A_qA\xCE\0G\r\0@ AF\r\x7F (" (hG@  Aj6 -\0\0\f\v 1\v! ,\0\xF7 Aj! A rF\r\0\v\v \0\v@\x7F (" (hG@  Aj6 -\0\0\f\v 1\vA(F@A!\f\vB\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0! )pB\0S\r  (Ak6\f\v@\x7F (" (hG@  Aj6 -\0\0\f\v 1\v"\x07A\xC1\0k!@@ \x07A0kA\nI\r\0 AI\r\0 \x07A\xDF\0F\r\0 \x07A\xE1\0kAO\r\v Aj!\f\v\vB\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0! \x07A)F\r )p"B\0Y@  (Ak6\v@ @ \r\f\vA\xD4\xA0A6\0B\0!\f\v@ B\0Y@  (Ak6\v Ak"\r\0\v\f\v )pB\0Y@  (Ak6\vA\xD4\xA0A6\0\v B\0U\f\v@ A0G\r\0\x7F (" (hG@  Aj6 -\0\0\f\v 1\vA_qA\xD8\0F@#\0A\xB0k"$\0\x7F (" (hG@  Aj6 -\0\0\f\v 1\v!@\x7F@ A0G@@ A.G\r (" (hF\r\0  Aj6 -\0\0\f\v (" (hG\x7FA!  Aj6 -\0\0A! 1\v!\f\v\v 1\v"A0G@A!\v\f\v@ B}!\x7F (" (hG@  Aj6 -\0\0\f\v 1\v"A0F\r\0\vA!\vA!\vB\x80\x80\x80\x80\x80\x80\xC0\xFF?!@@ !@@ A0k"\bA\nI\r\0 A.G"\f A r"A\xE1\0kAKq\r \f\r\0 \v\rA!\v !\f\v A\xD7\0k \b A9J\x1B!@ B\x07W@  	Atj!	\f\v BX@ A0j K A j  B\0B\x80\x80\x80\x80\x80\x80\xC0\xFD?8 Aj )0 )8 ) " )("8  ) )  H )\b! )\0!\f\v E\r\0 \n\r\0 A\xD0\0j  B\0B\x80\x80\x80\x80\x80\x80\x80\xFF?8 A@k )P )X  HA!\n )H! )@!\v B|!A!\v (" (hG\x7F  Aj6 -\0\0 1\v!\f\v\v~ E@@@ )pB\0Y@  ("Ak6 E\r  Ak6 \vE\r  Ak6\f\v \r\v B\0U\v A\xE0\0jD\0\0\0\0\0\0\0\0 \x07\xB7\xA6] )`! )h\f\v B\x07W@ !@ 	At!	 B|"B\bR\r\0\v\v@@@ A_qA\xD0\0F@  \xDC"B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FR\r @ )pB\0Y\r\f\vB\0! B\0UB\0\f\vB\0! )pB\0S\r\v  (Ak6\vB\0!\v 	E@ A\xF0\0jD\0\0\0\0\0\0\0\0 \x07\xB7\xA6] )p! )x\f\v   \v\x1BB\x86 |B }"A\0 k\xADU@A\xD4\xA0A\xC4\x006\0 A\xA0j \x07K A\x90j )\xA0 )\xA8B\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xBF\xFF\xFF\08 A\x80j )\x90 )\x98B\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xBF\xFF\xFF\08 )\x80! )\x88\f\v A\xE2k\xAC W@ 	A\0N@@ A\xA0j  B\0B\x80\x80\x80\x80\x80\x80\xC0\xFF\xBF\x7FH  B\x80\x80\x80\x80\x80\x80\x80\xFF?\xE2! A\x90j   )\xA0  A\0N"\x1B )\xA8  \x1BH  	At"r!	 B}! )\x98! )\x90! A\0N\r\0\v\v~ A  k\xAD|"\xA7"A\0 A\0J\x1B   \xADS\x1B"A\xF1\0O@ A\x80j \x07K )\x88! )\x80!B\0\f\v A\xE0jD\0\0\0\0\0\0\xF0?A\x90 ku] A\xD0j \x07K )\xD0! A\xF0j )\xE0 )\xE8 )\xD8"\xE1 )\xF8! )\xF0\v! A\xC0j 	 	AqE  B\0B\0sA\0G A Iqq"r~ A\xB0j   )\xC0 )\xC88 A\x90j )\xB0 )\xB8  H A\xA0j  B\0  \x1BB\0  \x1B8 A\x80j )\xA0 )\xA8 )\x90 )\x98H A\xF0j )\x80 )\x88  \xDE )\xF0" )\xF8"B\0B\0sE@A\xD4\xA0A\xC4\x006\0\v A\xE0j   \xA7\xE0 )\xE0! )\xE8\f\vA\xD4\xA0A\xC4\x006\0 A\xD0j \x07K A\xC0j )\xD0 )\xD8B\0B\x80\x80\x80\x80\x80\x80\xC0\08 A\xB0j )\xC0 )\xC8B\0B\x80\x80\x80\x80\x80\x80\xC0\08 )\xB0! )\xB8\v! \r 7 \r 7 A\xB0j$\0 \r)! \r)!\f\v )pB\0S\r\0  (Ak6\v !\b ! \x07!\f !\x07A\0!#\0A\x90\xC6\0k"$\0A\0 k" k!@\x7F@@ A0G@ A.G\r \b(" \b(hF\r \b Aj6 -\0\0\f\v \b(" \b(hG@ \b Aj6 -\0\0! \b1!\vA!\f\v\v \b1\v"A0F@@ B}!\x7F \b(" \b(hG@ \b Aj6 -\0\0\f\v \b1\v"A0F\r\0\vA!\vA!\v\v A\x006\x90 A0k!~@@@@@@ A.F"\r\0 A	M\r\0\f\v@@ Aq@ \vE@ !A!\v\f\v E!\f\v B|! 	A\xFCL@  \xA7 A0F\x1B! A\x90j 	Atj" \n\x7F  (\0A\nljA0k \v6\0A!A\0 \nAj" A	F"\x1B!\n  	j!	\f\v A0F\r\0  (\x80FAr6\x80FA\xDC\x8F!\v\x7F \b(" \b(hG@ \b Aj6 -\0\0\f\v \b1\v"A0k! A.F"\r\0 A\nI\r\0\v\v   \v\x1B!@ E\r\0 A_qA\xC5\0G\r\0@ \b \x07\xDC"B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FR\r\0 \x07E\rB\0! \b)pB\0S\r\0 \b \b(Ak6\v  |!\f\v E! A\0H\r\v \b)pB\0S\r\0 \b \b(Ak6\v E\rA\xD4\xA0A6\0\v \bB\0UB\0!B\0\f\v (\x90"E@ D\0\0\0\0\0\0\0\0 \f\xB7\xA6] )\b! )\0\f\v@ B	U\r\0  R\r\0 AMA\0  v\x1B\r\0 A0j \fK A j ~ Aj )0 )8 )  )(8 )! )\f\v Av\xAD S@A\xD4\xA0A\xC4\x006\0 A\xE0\0j \fK A\xD0\0j )` )hB\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xBF\xFF\xFF\08 A@k )P )XB\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xBF\xFF\xFF\08 )H! )@\f\v A\xE2k\xAC U@A\xD4\xA0A\xC4\x006\0 A\x90j \fK A\x80j )\x90 )\x98B\0B\x80\x80\x80\x80\x80\x80\xC0\08 A\xF0\0j )\x80 )\x88B\0B\x80\x80\x80\x80\x80\x80\xC0\08 )x! )p\f\v \n@ \nA\bL@ A\x90j 	Atj"(\0!@ A\nl! \nAj"\nA	G\r\0\v  6\0\v 	Aj!	\v \xA7!\n@ A	N\r\0 BU\r\0 \n H\r\0 B	Q@ A\xC0j \fK A\xB0j (\x90~ A\xA0j )\xC0 )\xC8 )\xB0 )\xB88 )\xA8! )\xA0\f\v B\bW@ A\x90j \fK A\x80j (\x90~ A\xF0j )\x90 )\x98 )\x80 )\x888 A\xE0jA\b \nkAt(\xA0\xBAK A\xD0j )\xF0 )\xF8 )\xE0 )\xE8\xDF )\xD8! )\xD0\f\v  \nA}ljA\x1Bj"ALA\0 (\x90" v\x1B\r\0 A\xE0j \fK A\xD0j ~ A\xC0j )\xE0 )\xE8 )\xD0 )\xD88 A\xB0j \nAtA\xF8\xB9j(\0K A\xA0j )\xC0 )\xC8 )\xB0 )\xB88 )\xA8! )\xA0\f\v@ 	"Ak!	 A\x90j Atj"Ak(\0E\r\0\vA\0!@ \nA	o"E@A\0!\f\v A	j  B\0S\x1B!@ E@A\0!A\0!\f\vA\x80\x94\xEB\xDCA\0 kAtA\xC0\xBAj(\0"\vm!\bA\0!A\0!A\0!@ A\x90j Atj"\x07  \x07(\0"	 \vn"\x07j"6\0 AjA\xFFq  E  Fq"\x1B! \nA	k \n \x1B!\n \b 	 \x07 \vlkl! Aj" G\r\0\v E\r\0  6\0 Aj!\v \n kA	j!\n\v@ A\x90j Atj! \nA$H!\b@@ \bE@ \nA$G\r (\0A\xD1\xE9\xF9O\r\v A\xFFj!	A\0!@ !\x07 \xAD A\x90j 	A\xFFq"\vAtj"5\0B\x86|"B\x81\x94\xEB\xDCT\x7FA\0  B\x80\x94\xEB\xDC\x80"B\x80\x94\xEB\xDC~}! \xA7\v!  >\0 \x07 \x07 \v \x07 P\x1B  \vF\x1B \v \x07AkA\xFFq"G\x1B! \vAk!	  \vG\r\0\v Ak! \x07! E\r\0\v AkA\xFFq" F@ A\x90j"\x07 A\xFEjA\xFFqAtj" (\0 At \x07j(\0r6\0 !\v \nA	j!\n A\x90j Atj 6\0\f\v\v@@ AjA\xFFq!\x07 A\x90j AkA\xFFqAtj!@A	A \nA-J\x1B!@@ !A\0!@@@  jA\xFFq" F\r\0 A\x90j Atj(\0"	 At(\x90\xBA"I\r\0  	I\r Aj"AG\r\v\v \nA$G\r\0B\0!A\0!B\0!@   jA\xFFq"F@ AjA\xFFq"At jA\x006\x8C\v A\x80j A\x90j Atj(\0~ A\xF0j  B\0B\x80\x80\x80\x80\xE5\x9A\xB7\x8E\xC0\08 A\xE0j )\xF0 )\xF8 )\x80 )\x88H )\xE8! )\xE0! Aj"AG\r\0\v A\xD0j \fK A\xC0j   )\xD0 )\xD88B\0! )\xC8! )\xC0! A\xF1\0j" k"	A\0 	A\0J\x1B  	 H"\x07\x1B"\bA\xF0\0M\r\f\v  j! !  F\r\0\vA\x80\x94\xEB\xDC v!\vA\x7F tA\x7Fs!A\0! !@ A\x90j"\b Atj"	  	(\0"	 vj"6\0 AjA\xFFq  E  Fq"\x1B! \nA	k \n \x1B!\n 	 q \vl! AjA\xFFq" G\r\0\v E\r  \x07G@ At \bj 6\0 \x07!\f\v  (\0Ar6\0\f\v\v\v A\x90jD\0\0\0\0\0\0\xF0?A\xE1 \bku] A\xB0j )\x90 )\x98 \xE1 )\xB8! )\xB0! A\x80jD\0\0\0\0\0\0\xF0?A\xF1\0 \bku] A\xA0j   )\x80 )\x88\xDE A\xF0j   )\xA0" )\xA8"\xDE A\xE0j   )\xF0 )\xF8H )\xE8! )\xE0!\v@ AjA\xFFq" F\r\0@ A\x90j Atj(\0"A\xFF\xC9\xB5\xEEM@ E@ AjA\xFFq F\r\v A\xF0j \f\xB7D\0\0\0\0\0\0\xD0?\xA2] A\xE0j   )\xF0 )\xF8H )\xE8! )\xE0!\f\v A\x80\xCA\xB5\xEEG@ A\xD0j \f\xB7D\0\0\0\0\0\0\xE8?\xA2] A\xC0j   )\xD0 )\xD8H )\xC8! )\xC0!\f\v \f\xB7!\x1B  AjA\xFFqF@ A\x90j \x1BD\0\0\0\0\0\0\xE0?\xA2] A\x80j   )\x90 )\x98H )\x88! )\x80!\f\v A\xB0j \x1BD\0\0\0\0\0\0\xE8?\xA2] A\xA0j   )\xB0 )\xB8H )\xA8! )\xA0!\v \bA\xEF\0K\r\0 A\xD0j  B\0B\x80\x80\x80\x80\x80\x80\xC0\xFF?\xDE )\xD0 )\xD8B\0B\0s\r\0 A\xC0j  B\0B\x80\x80\x80\x80\x80\x80\xC0\xFF?H )\xC8! )\xC0!\v A\xB0j    H A\xA0j )\xB0 )\xB8  \xDE )\xA8! )\xA0!@ Ak A\xFF\xFF\xFF\xFF\x07qN\r\0  B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x837\x98  7\x90 A\x80j  B\0B\x80\x80\x80\x80\x80\x80\x80\xFF?8 )\x90 )\x98B\x80\x80\x80\x80\x80\x80\x80\xB8\xC0\0\xE2! )\x88  A\0N"\x1B! )\x80  \x1B!  B\0B\0s!   j"A\xEE\0jN@ \x07 \b 	G A\0Hrq A\0GqE\r\vA\xD4\xA0A\xC4\x006\0\v A\xF0j   \xE0 )\xF8! )\xF0\v! \r 7( \r 7  A\x90\xC6\0j$\0 \r)(! \r) !\f\vB\0!\f\vB\0!\v \0 7\0 \0 7\b \rA0j$\0\v\xC0\x7F~#\0A\x80k"$\0@@@  B\0B\0sE\r\0\x7F B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!\n\x7F B0\x88\xA7A\xFF\xFFq"\x07A\xFF\xFFG@A \x07\rAA  \n\x84P\x1B\f\v  \n\x84P\v\vE\r\0 B0\x88\xA7"\bA\xFF\xFFq"A\xFF\xFFG\r\v Aj    8  )" )"  \xDF )\b! )\0!\f\v  B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"\n  B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"	sA\0L@  \n  	s@ !\f\v A\xF0\0j  B\0B\08 )x! )p!\f\v B0\x88\xA7A\xFF\xFFq!\x07 ~  A\xE0\0j  \nB\0B\x80\x80\x80\x80\x80\x80\xC0\xBB\xC0\08 )h"\nB0\x88\xA7A\xF8\0k! )`\v! \x07E@ A\xD0\0j  	B\0B\x80\x80\x80\x80\x80\x80\xC0\xBB\xC0\08 )X"	B0\x88\xA7A\xF8\0k!\x07 )P!\v 	B\xFF\xFF\xFF\xFF\xFF\xFF?\x83B\x80\x80\x80\x80\x80\x80\xC0\0\x84!\v \nB\xFF\xFF\xFF\xFF\xFF\xFF?\x83B\x80\x80\x80\x80\x80\x80\xC0\0\x84!\n  \x07J@@~ \n \v}  V\xAD}"	B\0Y@ 	  }"\x84P@ A j  B\0B\08 )(! ) !\f\v 	B\x86 B?\x88\x84\f\v \nB\x86 B?\x88\x84\v!\n B\x86! Ak" \x07J\r\0\v \x07!\v@ \n \v}  V\xAD}"	B\0S@ \n!	\f\v 	  }"\x84B\0R\r\0 A0j  B\0B\08 )8! )0!\f\v 	B\xFF\xFF\xFF\xFF\xFF\xFF?X@@ B?\x88 Ak! B\x86! 	B\x86\x84"	B\x80\x80\x80\x80\x80\x80\xC0\0T\r\0\v\v \bA\x80\x80q!\x07 A\0L@ A@k  	B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 A\xF8\0j \x07r\xADB0\x86\x84B\0B\x80\x80\x80\x80\x80\x80\xC0\xC3?8 )H! )@!\f\v 	B\xFF\xFF\xFF\xFF\xFF\xFF?\x83  \x07r\xADB0\x86\x84!\v \0 7\0 \0 7\b A\x80j$\0\v\x87\x7F~#\0A\xD0k"$\0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!\v B\xFF\xFF\xFF\xFF\xFF\xFF?\x83!\n  \x85B\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7F\x83!\f B0\x88\xA7A\xFF\xFFq!\x07@@ B0\x88\xA7A\xFF\xFFq"\bA\xFF\xFFkA\x82\x80~O@ \x07A\xFF\xFFkA\x81\x80~K\r\v P B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\f\f\v P B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1BE@ B\x80\x80\x80\x80\x80\x80 \x84!\f !\f\v  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@B\0!B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0!\f\f\v \fB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\fB\0!\f\v  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x85\x84P@B\0!\f\v  \x84P@B\x80\x80\x80\x80\x80\x80\xE0\xFF\xFF\0 \f  \x84P\x1B!\fB\0!\f\v  \x84P@ \fB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\fB\0!\f\v B\xFF\xFF\xFF\xFF\xFF\xFF?X@ A\xC0j  \n  \n \nP"\x1ByB\xC0\0B\0 \x1B|\xA7"AkDA k! )\xC8!\n )\xC0!\v B\xFF\xFF\xFF\xFF\xFF\xFF?V\r\0 A\xB0j  \v  \v \vP"	\x1ByB\xC0\0B\0 	\x1B|\xA7"	AkD  	jAk! )\xB8!\v )\xB0!\v A\xA0j \vB\x80\x80\x80\x80\x80\x80\xC0\0\x84"B\x86 B1\x88\x84"B\0B\x80\x80\x80\x80\xB0\xE6\xBC\x82\xF5\0 }"B\0A A\x90jB\0 )\xA8}B\0 B\0A A\x80j )\x98B\x86 )\x90B?\x88\x84"B\0 B\0A A\xF0j B\0B\0 )\x88}B\0A A\xE0j )\xF8B\x86 )\xF0B?\x88\x84"B\0 B\0A A\xD0j B\0B\0 )\xE8}B\0A A\xC0j )\xD8B\x86 )\xD0B?\x88\x84"B\0 B\0A A\xB0j B\0B\0 )\xC8}B\0A A\xA0j B\0 )\xB8B\x86 )\xB0B?\x88\x84B}"B\0A A\x90j B\x86B\0 B\0A A\xF0\0j B\0B\0 )\xA8 )\xA0" )\x98|" T\xAD| BV\xAD|}B\0A A\x80jB }B\0 B\0A  \b \x07kj"\bA\xFF\xFF\0j!~ )p"B\x86"\r )\x88"B\x86 )\x80B?\x88\x84|"B\xE7\xEC\0}"B \x88" \nB\x80\x80\x80\x80\x80\x80\xC0\0\x84"B\x86"B \x88"~" B\x86"B \x88"\v  V\xAD \r V\xAD )xB\x86 B?\x88\x84 B?\x88|||B}"B \x88"~|"\r T\xAD \r \r B\xFF\xFF\xFF\xFF\x83" B?\x88" \nB\x86\x84B\xFF\xFF\xFF\xFF\x83"\n~|"\rV\xAD|  ~|  ~" \n ~|" T\xADB \x86 B \x88\x84| \r B \x86|" \rT\xAD|   B\xFF\xFF\xFF\xFF\x83" \n~"\r  \v~|" \rT\xAD    B\xFE\xFF\xFF\xFF\x83"\r~|"V\xAD||"V\xAD|   ~" \r ~|"  \n~|"\n \v ~|"B \x88 \n V\xAD  T\xAD  \nV\xAD||B \x86\x84|" T\xAD|     \r~"\n \v ~|"B \x88  \nT\xADB \x86\x84|"\n T\xAD \n \n B \x86|"\nV\xAD||"V\xAD|   \n B \x86" \r ~| T\xADB\x7F\x85"V  \nRq\xAD|"V\xAD|"B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0X@  \x84! A\xD0\0j  B\x80\x80\x80\x80\x80\x80\xC0\0T"\x07\xAD"\v\x86"\n  \v\x86 B\x88 \x07A?s\xAD\x88\x84"  A \bA\xFE\xFF\0j  \x07\x1BAk! B1\x86 )X} )P"B\0R\xAD}!\vB\0 }\f\v A\xE0\0j B?\x86 B\x88\x84"\n B\x88"  A B0\x86 )h} )`"B\0R\xAD}!\v !B\0 }\v! A\xFF\xFFN@ \fB\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x84!\fB\0!\f\v~ A\0J@ \vB\x86 B?\x88\x84! B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 \xADB0\x86\x84!\v B\x86\f\v A\x8F\x7FL@B\0!\f\v A@k \n A kt A0j   A\xF0\0jD A j   )@"\n )H"\vA )8 )(B\x86 ) "B?\x88\x84} )0" B\x86"T\xAD}!  }\v! Aj  BB\0A   BB\0A \v \n  \nB\x83" |"T   T\xAD|" V  Q\x1B\xAD|" \nT\xAD|"   B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T  )V  )"V  Q\x1Bq\xAD|"V\xAD|"  B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0T  )\0V  )\b"V  Q\x1Bq\xAD|" T\xAD| \f\x84!\f\v \0 7\0 \0 \f7\b A\xD0j$\0\v\xBF\x7F#\0A\xD0\0k"$\0@ A\x80\x80N@ A j  B\0B\x80\x80\x80\x80\x80\x80\x80\xFF\xFF\08 )(! ) ! A\xFF\xFFI@ A\xFF\xFF\0k!\f\v Aj  B\0B\x80\x80\x80\x80\x80\x80\x80\xFF\xFF\08A\xFD\xFF  A\xFD\xFFO\x1BA\xFE\xFFk! )! )!\f\v A\x81\x80\x7FJ\r\0 A@k  B\0B\x80\x80\x80\x80\x80\x80\x8098 )H! )@! A\xF4\x80~K@ A\x8D\xFF\0j!\f\v A0j  B\0B\x80\x80\x80\x80\x80\x80\x8098A\xE8\x81}  A\xE8\x81}M\x1BA\x9A\xFEj! )8! )0!\v   B\0 A\xFF\xFF\0j\xADB0\x868 \0 )\b7\b \0 )\x007\0 A\xD0\0j$\0\v<\0 \0 7\0 \0 B\xFF\xFF\xFF\xFF\xFF\xFF?\x83 B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0\x83B0\x88\xA7 B0\x88\xA7A\x80\x80qr\xADB0\x86\x847\b\v\xC0\x7F~A\x7F!@ \0B\0R B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0V B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Q\x1B\r\0 B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83"B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0V B\x80\x80\x80\x80\x80\x80\xC0\xFF\xFF\0Rq\r\0 \0  \x84\x84P@A\0\v  \x83B\0Y@  R  Sq\r \0  \x85\x84B\0R\v \0B\0R  U  Q\x1B\r\0 \0  \x85\x84B\0R!\v \v\xE7\x7F#\0Ak"$\0A\xA8\xA0(\0! (L (HA\0L@ \xE1\vA\xA8\xA0 (\x886\0 (E@ \xB3 (E!\vA\x7F!@ \0A\x7FF\r\0 \r\0 A\fj \0\xB7"A\0H\r\0 (" (, jA\bkI\r\0@ \0A\xFF\0M@  Ak"6  \0:\0\0\f\v   k"6  A\fj ^\v  (\0Aoq6\0 \0!\vA\xA8\xA0 6\0 Aj$\0 A\x7FG\v\x87\x7F~#\0A k"$\0@ \0-\x004AF@ \0(0! E\r \0A\0:\x004 \0A\x7F60\f\v@ \0-\x005AF@\x7F \0( "(LA\0H@ \xED\f\v \xED\v"A\x7FG@  6\v A\x7FF\r (!@ E@  \0( \xE3E\r\f\v \0 60\v (!\f\v A6#\0Ak"$\0 Aj"(\0 \0A,j"(\0H!\x07 Aj$\0   \x07\x1B(\0"A\0 A\0J\x1B!@  G@ \0( \x91"A\x7FF\r Aj j :\0\0 Aj!\f\v\v Aj!@@@ \0((")\0!\b@ \0($"  Aj"  j" Aj Aj  A\fj (\0(\n\0Ak\0\v \0(( \b7\0 A\bF\r \0( \x91"A\x7FF\r  :\0\0 Aj!\f\v\v  ,\06\v@ E@@ A\0L\r Ak" Ajj,\0\0 \0( \x80A\x7FG\r\0\f\v\0\v \0 (60\v (!\f\vA\x7F!\v A j$\0 \v	\0 \0\xE3-\v\x84\x7F#\0Ak"$\0 Aj!@@ \0($" \0(( A\bj"  Aj (\0(\b\0!A\x7F! A ( k" \0( l G\r@ Ak\0\v\vA\x7FA\0 \0( \xB4\x1B!\v Aj$\0 \v\f\0 \0 \x80A\x7FG\v\xF6\x7F~#\0A k"$\0@ \0-\x004AF@ \0(0! E\r \0A\0:\x004 \0A\x7F60\f\v@ \0-\x005AF@ \0( \x91"A\x7FG@  :\0\v A\x7FF\r -\0!@ E@ ,\0  \0( \xE7E\r\f\v \0 60\v -\0!\f\v A6#\0Ak"$\0 Aj"(\0 \0A,j"(\0H!\x07 Aj$\0   \x07\x1B(\0"A\0 A\0J\x1B!@  G@ \0( \x91"A\x7FF\r Aj j :\0\0 Aj!\f\v\v Aj!@@@ \0((")\0!\b@ \0($"  Aj"  j" Aj Aj  A\fj (\0(\n\0Ak\0\v \0(( \b7\0 A\bF\r \0( \x91"A\x7FF\r  :\0\0 Aj!\f\v\v  -\0:\0\v@ E@@ A\0L\r Ak" Ajj-\0\0 \0( \x80A\x7FG\r\0\f\v\0\v \0 -\060\v -\0!\f\vA\x7F!\v A j$\0 \v	\0 \0\xE7-\v\x7F\x7F#\0Ak"$\0 \0\xF5"\0 6  \0A\xA4\xB96\0 A\fj" \0("6\0 A\xC0\xC0G@  (Aj6\v A\x88\xC2.! 0 \0 6( \0 6$ \0  (\0(\0\0:\0, Aj$\0\v\x7F\x7F#\0Ak"$\0 \0\x82"\0 6  \0A\xD8\xB76\0 A\fj" \0("6\0 A\xC0\xC0G@  (Aj6\v A\x80\xC2.! 0 \0 6( \0 6$ \0  (\0(\0\0:\0, Aj$\0\v\x83\x7F#\0Ak"$\0A\xA8\xA0(\0! (HA\0L@ \xE1\vA\xA8\xA0 (\x886\0@@@ \0A\xFF\0M@@ \0 (PF\r\0 (" (F\r\0  Aj6  \0:\0\0\f\v#\0Ak"$\0  \0:\0@@ ("\x7F  \xEB@A\x7F!\f\v (\v ("F\r\0 \0A\xFFq" (PF\r\0  Aj6  \0:\0\0\f\v  AjA ($\0AG@A\x7F!\f\v -\0!\v Aj$\0 !\0\f\v ( ("AjK@  \0\xB6"A\0H\r  ( j6\f\v A\fj" \0\xB6"A\0H\r   \xB8 I\r\v \0A\x7FG\r\v  (\0A r6\0A\x7F!\0\vA\xA8\xA0 6\0 Aj$\0 \0\v\xD1\x7FA\xA8\xA0(\0! \0(HA\0L@ \0\xE1\vA\xA8\xA0 \0(\x886\0#\0A k"$\0@@@ \0(" \0(\b"F\r\0 Aj   k\xEE"A\x7FF\r\0 \0 \0(A  AM\x1Bj6\f\v B\x007A\0!@ !@ \0(" \0(\bG@ \0 Aj6  -\0\0:\0\f\v  \0\xAB":\0 A\0N\r\0A\x7F! AqE\r \0 \0(\0A r6\0A\xD4\xA0A6\0\f\vA! Aj AjA Aj\x90"A~F\r\0\vA\x7F! A\x7FG\r\0 AqE\r \0 \0(\0A r6\0 -\0 \0\x80\f\v (!\v A j$\0A\xA8\xA0 6\0 \v\xBC\x7F E@A\0\v\x7F@ E\r\0 -\0\0"\xC0"A\0N@ \0@ \0 6\0\v A\0G\vA\xA8\xA0(\0(\0E@A \0E\r \0 A\xFF\xBFq6\0A\v A\xC2k"A2K\r\0 At(\xA0\xB5! AM@  AlAktA\0H\r\v -\0"Av"Ak  AujrA\x07K\r\0 A\x80k Atr"A\0N@A \0E\r \0 6\0A\v -\0A\x80k"A?K\r\0  At"r! A\0N@A \0E\r \0 6\0A\v -\0A\x80k"A?K\r\0A \0E\r \0  Atr6\0A\vA\xD4\xA0A6\0A\x7F\v\v \0 \0  \0(Er"6 \0( q@=\0\v\vK\x7F \0(\0"@\x7F (\f" (F@  (\0($\0\0\f\v (\0\vA\x7FG@ \0(\0E\v \0A\x006\0\vA\vK\x7F \0(\0"@\x7F (\f" (F@  (\0($\0\0\f\v -\0\0\vA\x7FG@ \0(\0E\v \0A\x006\0\vA\v\xD1\x7F@#\0Ak"$\0  k"A\xF7\xFF\xFF\xFF\x07M@@ A\vI@ \0 A\xFF\0q:\0\v \0!\f\v A\bj A\vO\x7F A\bjAxq" Ak" A\vF\x1BA\n\vAj\x83 (\f \0 (\b"6\0 \0 (\fA\x80\x80\x80\x80xr6\b \0 6\v@  k"\0E"\r\0 \r\0   \0\xFC\n\0\0\v A\0:\0\x07 \0 j -\0\x07:\0\0 Aj$\0\f\vG\0\v\vT\x7F@ \0(\0"E\r\0\x7F (" (F@   (\0(4\0\f\v  Aj6  6\0 \vA\x7FG\r\0 \0A\x006\0\v\v1\x7F \0(\f" \0(F@ \0 \0(\0((\0\0\v \0 Aj6\f (\0\v*\0 \0A\xB4\xAE6\0 \0Aj\xD0 \0B\x007 \0B\x007 \0B\x007\b \0\v\\\x7F@ \0(\0"E\r\0\x7F (" (F@  A\xFFq (\0(4\0\f\v  Aj6  :\0\0 A\xFFq\vA\x7FG\r\0 \0A\x006\0\v\v\0 \0 \0(\0A\fk(\0j\xE5\v\0 \0 \0(\0A\fk(\0j\xAD\v+\0  \0(\0j"\0("A	O@ \v \0 6 \0A\xC8\x9F6\0\v1\x7F \0(\f" \0(F@ \0 \0(\0((\0\0\v \0 Aj6\f -\0\0\v\0 \0 \0(\0A\fk(\0j\xE6\v\0 \0 \0(\0A\fk(\0j\xB0\v\x1B\0  \0(\0j("\0A	O@ \0	\v \0\v\0A\x7F\v\0 \0B\x7F7\b \0B\x007\0\v\0 \0B\x7F7\b \0B\x007\0\v\0 \0\v*\0 \0A\x94\xAD6\0 \0Aj\xD0 \0B\x007 \0B\x007 \0B\x007\b \0\v\f\0 \0\x81 \0-\v\x07\0 \0\x81\v\xAD\v\x07\x7F \0 j!@@ \0("Aq\r\0 AqE\r \0(\0" j!@@@ \0 k"\0A\xEC\xA0(\0G@ \0(\f! A\xFFM@  \0(\b"G\rA\xD8\xA0A\xD8\xA0(\0A~ Avwq6\0\f\v \0(! \0 G@ \0(\b" 6\f  6\b\f\v \0("\x7F \0Aj \0("E\r \0Aj\v!@ !\x07 "Aj! ("\r\0 Aj! ("\r\0\v \x07A\x006\0\f\v ("AqAG\rA\xE0\xA0 6\0  A~q6 \0 Ar6  6\0\v  6\f  6\b\f\vA\0!\v E\r\0@ \0("At"(\x88\xA3 \0F@ A\x88\xA3j 6\0 \rA\xDC\xA0A\xDC\xA0(\0A~ wq6\0\f\v@ \0 (F@  6\f\v  6\v E\r\v  6 \0("@  6  6\v \0("E\r\0  6  6\v@@@@ ("AqE@A\xF0\xA0(\0 F@A\xF0\xA0 \x006\0A\xE4\xA0A\xE4\xA0(\0 j"6\0 \0 Ar6 \0A\xEC\xA0(\0G\rA\xE0\xA0A\x006\0A\xEC\xA0A\x006\0\vA\xEC\xA0(\0"\b F@A\xEC\xA0 \x006\0A\xE0\xA0A\xE0\xA0(\0 j"6\0 \0 Ar6 \0 j 6\0\v Axq j! (\f! A\xFFM@ (\b" F@A\xD8\xA0A\xD8\xA0(\0A~ Avwq6\0\f\v  6\f  6\b\f\v (!  G@ (\b" 6\f  6\b\f\v ("\x7F Aj ("E\r Aj\v!@ !\x07 "Aj! ("\r\0 Aj! ("\r\0\v \x07A\x006\0\f\v  A~q6 \0 Ar6 \0 j 6\0\f\vA\0!\v E\r\0@ ("At"(\x88\xA3 F@ A\x88\xA3j 6\0 \rA\xDC\xA0A\xDC\xA0(\0A~ wq6\0\f\v@  (F@  6\f\v  6\v E\r\v  6 ("@  6  6\v ("E\r\0  6  6\v \0 Ar6 \0 j 6\0 \0 \bG\r\0A\xE0\xA0 6\0\v A\xFFM@ A\xF8qA\x80\xA1j!\x7FA\xD8\xA0(\0"A Avt"qE@A\xD8\xA0  r6\0 \f\v (\b\v!  \x006\b  \x006\f \0 6\f \0 6\b\vA! A\xFF\xFF\xFF\x07M@ A& A\bvg"kvAq AtrA>s!\v \0 6 \0B\x007 AtA\x88\xA3j!@@A\xDC\xA0(\0"A t"\x07qE@A\xDC\xA0  \x07r6\0  \x006\0 \0 6\f\v A AvkA\0 AG\x1Bt! (\0!@ "(Axq F\r Av! At!  Aqj"\x07("\r\0\v \x07 \x006 \0 6\v \0 \x006\f \0 \x006\b\v (\b" \x006\f  \x006\b \0A\x006 \0 6\f \0 6\b\v\v\x7FA+"\0B\x007\b \0B\x007\0 \0\v)\0  (\0A\x07jAxq"Aj6\0 \0 )\0 )\b\xE89\0\v\xBF\x7F|~#\0A\xB0k"\v$\0 \vA\x006,@ \xBD"B\0S@A!A\xD3\n! \x9A"\xBD!\f\v A\x80q@A!A\xD6\n!\f\vA\xD9\nA\xD4\n Aq"\x1B! E!\v@ B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0Q@ \0A   Aj" A\xFF\xFF{qE \0  B \0A\xF6A\x90$ A q"\x1BA\x8B\x1BA\xE9$ \x1B  b\x1BAB \0A    A\x80\xC0\0sE    J\x1B!\r\f\v \vAj!@@@  \vA,j\x8D" \xA0"D\0\0\0\0\0\0\0\0b@ \v \v(,"Ak6, A r"A\xE1\0G\r\f\v A r"A\xE1\0F\r \v(,!\f\f\v \v Ak"\f6, D\0\0\0\0\0\0\xB0A\xA2!\vA  A\0H\x1B!\n \vA0jA\xA0A\0 \fA\0N\x1Bj"!\x07@ \x07 \xFC"6\0 \x07Aj!\x07  \xB8\xA1D\0\0\0\0e\xCD\xCDA\xA2"D\0\0\0\0\0\0\0\0b\r\0\v@ \fA\0L@ \f!	 \x07! !\b\f\v !\b \f!	@A 	 	AO\x1B!@ \x07Ak" \bI\r\0 \xAD!\x1BB\0!@  5\0 \x1B\x86 |" B\x80\x94\xEB\xDC\x80"B\x80\x94\xEB\xDC~}>\0 Ak" \bO\r\0\v B\x80\x94\xEB\xDCT\r\0 \bAk"\b >\0\v@ \b \x07"I@ Ak"\x07(\0E\r\v\v \v \v(, k"	6, !\x07 	A\0J\r\0\v\v 	A\0H@ \nAjA	nAj! A\xE6\0F!@A	A\0 	k" A	O\x1B!\r@  \bM@A\0A \b(\0\x1B!\x07\f\vA\x80\x94\xEB\xDC \rv!A\x7F \rtA\x7Fs!A\0!	 \b!\x07@ \x07 \x07(\0" \rv 	j6\0  q l!	 \x07Aj"\x07 I\r\0\vA\0A \b(\0\x1B!\x07 	E\r\0  	6\0 Aj!\v \v \v(, \rj"	6,  \x07 \bj"\b \x1B" Atj   kAu J\x1B! 	A\0H\r\0\v\vA\0!	@  \bM\r\0  \bkAuA	l!	A\n!\x07 \b(\0"A\nI\r\0@ 	Aj!	  \x07A\nl"\x07O\r\0\v\v \n 	A\0 A\xE6\0G\x1Bk A\xE7\0F \nA\0Gqk"  kAuA	lA	kH@ \vA0jA\x84`A\xA4b \fA\0H\x1Bj A\x80\xC8\0j"\fA	m"Atj!\rA\n!\x07 \f A	lk"A\x07L@@ \x07A\nl!\x07 Aj"A\bG\r\0\v\v@ \r(\0"\f \f \x07n" \x07lk"E \rAj" Fq\r\0@ AqE@D\0\0\0\0\0\0@C! \x07A\x80\x94\xEB\xDCG\r \b \rO\r \rAk-\0\0AqE\r\vD\0\0\0\0\0@C!\vD\0\0\0\0\0\0\xE0?D\0\0\0\0\0\0\xF0?D\0\0\0\0\0\0\xF8?  F\x1BD\0\0\0\0\0\0\xF8?  \x07Av"F\x1B  K\x1B!@ \r\0 -\0\0A-G\r\0 \x9A! \x9A!\v \r \f k"6\0  \xA0 a\r\0 \r  \x07j"6\0 A\x80\x94\xEB\xDCO@@ \rA\x006\0 \b \rAk"\rK@ \bAk"\bA\x006\0\v \r \r(\0Aj"6\0 A\xFF\x93\xEB\xDCK\r\0\v\v  \bkAuA	l!	A\n!\x07 \b(\0"A\nI\r\0@ 	Aj!	  \x07A\nl"\x07O\r\0\v\v \rAj"   I\x1B!\v@ "\f \bM"\x07E@ Ak"(\0E\r\v\v@ A\xE7\0G@ A\bq!\f\v 	A\x7FsA\x7F \nA \n\x1B" 	J 	A{Jq"\x1B j!\nA\x7FA~ \x1B j! A\bq"\r\0Aw!@ \x07\r\0 \fAk(\0"E\r\0A\n!A\0! A\np\r\0@ "\x07Aj!  A\nl"pE\r\0\v \x07A\x7Fs!\v \f kAuA	l! A_qA\xC6\0F@A\0! \n  jA	k"A\0 A\0J\x1B"  \nJ\x1B!\n\f\vA\0! \n  	j jA	k"A\0 A\0J\x1B"  \nJ\x1B!\n\vA\x7F!\r \nA\xFD\xFF\xFF\xFF\x07A\xFE\xFF\xFF\xFF\x07 \n r"\x1BJ\r \n A\0GjAj!@ A_q"\x07A\xC6\0F@ 	 A\xFF\xFF\xFF\xFF\x07sJ\r 	A\0 	A\0J\x1B!\f\v  	 	Au"s k\xAD \x86"kAL@@ Ak"A0:\0\0  kAH\r\0\v\v Ak" :\0\0 AkA-A+ 	A\0H\x1B:\0\0  k" A\xFF\xFF\xFF\xFF\x07sJ\r\v  j" A\xFF\xFF\xFF\xFF\x07sJ\r \0A    j"	 E \0  B \0A0  	 A\x80\x80sE@@@ \x07A\xC6\0F@ \vAjA	r!  \b \b K\x1B"!\b@ \b5\0 \x86!@  \bG@  \vAjM\r@ Ak"A0:\0\0  \vAjK\r\0\v\f\v  G\r\0 Ak"A0:\0\0\v \0   kB \bAj"\b M\r\0\v @ \0A\x892AB\v \b \fO\r \nA\0L\r@ \b5\0 \x86" \vAjK@@ Ak"A0:\0\0  \vAjK\r\0\v\v \0 A	 \n \nA	N\x1BB \nA	k! \bAj"\b \fO\r \nA	J !\n\r\0\v\f\v@ \nA\0H\r\0 \f \bAj \b \fI\x1B! \vAjA	r!\f \b!\x07@ \f \x075\0 \f\x86"F@ Ak"A0:\0\0\v@ \x07 \bG@  \vAjM\r@ Ak"A0:\0\0  \vAjK\r\0\v\f\v \0 AB Aj! \n rE\r\0 \0A\x892AB\v \0  \f k" \n  \nH\x1BB \n k!\n \x07Aj"\x07 O\r \nA\0N\r\0\v\v \0A0 \nAjAA\0E \0   kB\f\v \n!\v \0A0 A	jA	A\0E\v \0A   	 A\x80\xC0\0sE  	  	J\x1B!\r\f\v  AtAuA	qj!	@ A\vK\r\0A\f k!D\0\0\0\0\0\x000@!@ D\0\0\0\0\0\x000@\xA2! Ak"\r\0\v 	-\0\0A-F@  \x9A \xA1\xA0\x9A!\f\v  \xA0 \xA1!\v  \v(,"\x07 \x07Au"s k\xAD \x86"F@ Ak"A0:\0\0 \v(,!\x07\v Ar!\n A q!\f Ak" Aj:\0\0 AkA-A+ \x07A\0H\x1B:\0\0 A\bqE A\0Lq!\b \vAj!\x07@ \x07" \xFC"A\xC0\xACj-\0\0 \fr:\0\0  \xB7\xA1D\0\0\0\0\0\x000@\xA2!@ \x07Aj"\x07 \vAjkAG\r\0 D\0\0\0\0\0\0\0\0a \bq\r\0 A.:\0 Aj!\x07\v D\0\0\0\0\0\0\0\0b\r\0\vA\x7F!\r A\xFD\xFF\xFF\xFF\x07 \n  k"\bj"kJ\r\0 \0A    Aj \x07 \vAj"k"\x07 \x07Ak H\x1B \x07 \x1B"j" E \0 	 \nB \0A0   A\x80\x80sE \0  \x07B \0A0  \x07kA\0A\0E \0  \bB \0A    A\x80\xC0\0sE    J\x1B!\r\v \vA\xB0j$\0 \r\v\xBA\0@@@@@@@@@@@ A	k\0\b	\n\b	\n	\n\n\b	\x07\v  (\0"Aj6\0 \0 (\x006\0\v  (\0"Aj6\0 \0 2\x007\0\v  (\0"Aj6\0 \0 3\x007\0\v  (\0"Aj6\0 \0 0\0\x007\0\v  (\0"Aj6\0 \0 1\0\x007\0\v  (\0A\x07jAxq"A\bj6\0 \0 +\x009\0\v \0 \x87\v\v  (\0"Aj6\0 \0 4\x007\0\v  (\0"Aj6\0 \0 5\x007\0\v  (\0A\x07jAxq"A\bj6\0 \0 )\x007\0\vo\x7F \0(\0",\0\0A0k"A	K@A\0\v@A\x7F! A\xCC\x99\xB3\xE6\0M@A\x7F  A\nl"j  A\xFF\xFF\xFF\xFF\x07sK\x1B!\v \0 Aj"6\0 ,\0 ! !A0k"A\nI\r\0\v \v\0   \0(\0\0\v\xF7\x7F~#\0A@j"$\0  6< A)j! A\'j! A(j!@@@@@A\0!@ !\v  \fA\xFF\xFF\xFF\xFF\x07sJ\r  \fj!\f@@@@ "-\0\0"	@@@@ 	A\xFFq"E@ !\f\v A%G\r !	@ 	-\0A%G@ 	!\f\v Aj! 	-\0 	Aj"!	A%F\r\0\v\v  \vk" \fA\xFF\xFF\xFF\xFF\x07s"J\r	 \0@ \0 \v B\v \r\x07  6< Aj!A\x7F!@ ,\0A0k"\bA	K\r\0 -\0A$G\r\0 Aj!A! \b!\v  6<A\0!\n@ ,\0\0"	A k"AK@ !\b\f\v !\bA t"A\x89\xD1qE\r\0@  Aj"\b6<  \nr!\n ,\0"	A k"A O\r \b!A t"A\x89\xD1q\r\0\v\v@ 	A*F@\x7F@ \b,\0A0k"A	K\r\0 \b-\0A$G\r\0\x7F \0E@  AtjA\n6\0A\0\f\v  Atj(\0\v!\r \bAj!A\f\v \r \bAj! \0E@  6<A\0!A\0!\r\f\v  (\0"Aj6\0 (\0!\rA\0\v!  6< \rA\0N\rA\0 \rk!\r \nA\x80\xC0\0r!\n\f\v A<j\x8A"\rA\0H\r\n (<!\vA\0!A\x7F!\x07\x7FA\0 -\0\0A.G\r\0 -\0A*F@\x7F@ ,\0A0k"\bA	K\r\0 -\0A$G\r\0 Aj!\x7F \0E@  \bAtjA\n6\0A\0\f\v  \bAtj(\0\v\f\v \r Aj!A\0 \0E\r\0  (\0"\bAj6\0 \b(\0\v!\x07  6< \x07A\0N\f\v  Aj6< A<j\x8A!\x07 (<!A\v!@ !A!\b ",\0\0"A\xFB\0kAFI\r\v Aj! A:l jA\xAF\xA8j-\0\0"AkA\xFFqA\bI\r\0\v  6<@ A\x1BG@ E\r\f A\0N@ \0E@  Atj 6\0\f\f\v   Atj)\x0070\f\v \0E\r\b A0j  \x89\f\v A\0N\r\vA\0! \0E\r\b\v \0-\0\0A q\r\v \nA\xFF\xFF{q"	 \n \nA\x80\xC0\0q\x1B!\nA\0!A\xC9\n! !\b@@\x7F@@@@@@\x7F@@@@@@@ -\0\0"\xC0"ASq  AqAF\x1B  \x1B"A\xD8\0k!	\n\0\v@ A\xC1\0k\x07\v\0\v A\xD3\0F\r\v\f\v )0!A\xC9\n\f\vA\0!@@@@@@@ \b\0\v (0 \f6\0\f\x1B\v (0 \f6\0\f\v (0 \f\xAC7\0\f\v (0 \f;\0\f\v (0 \f:\0\0\f\v (0 \f6\0\f\v (0 \f\xAC7\0\f\vA\b \x07 \x07A\bM\x1B!\x07 \nA\br!\nA\xF8\0!\v ! A q!\v )0""B\0R@@ Ak" \xA7Aq-\0\xC0\xAC \vr:\0\0 B\x88"B\0R\r\0\v\v !\v P\r \nA\bqE\r AvA\xC9\nj!A!\f\v ! )0""B\0R@@ Ak" \xA7A\x07qA0r:\0\0 B\x88"B\0R\r\0\v\v !\v \nA\bqE\r \x07  k"  \x07H\x1B!\x07\f\v )0"B\0S@ B\0 }"70A!A\xC9\n\f\v \nA\x80q@A!A\xCA\n\f\vA\xCB\nA\xC9\n \nAq"\x1B\v!  \x86!\v\v  \x07A\0Hq\r \nA\xFF\xFF{q \n \x1B!\n@ B\0R\r\0 \x07\r\0 !\vA\0!\x07\f\v \x07 P  \vkj"  \x07H\x1B!\x07\f\r\v -\x000!\f\v\v (0"A\x8D2 \x1B"\vA\0A\xFF\xFF\xFF\xFF\x07 \x07 \x07A\xFF\xFF\xFF\xFF\x07O\x1B"\xEA" \vk  \x1B" \vj!\b \x07A\0N@ 	!\n !\x07\f\f\v 	!\n !\x07 \b-\0\0\r\f\v\v )0"B\0R\rA\0!\f	\v \x07@ (0\f\vA\0! \0A  \rA\0 \nE\f\v A\x006\f  >\b  A\bj"60A\x7F!\x07 \v!	A\0!@@ 	(\0"\vE\r\0 Aj \v\xB6"\vA\0H\r \v \x07 kK\r\0 	Aj!	  \vj" \x07I\r\v\vA=!\b A\0H\r\f \0A  \r  \nE E@A\0!\f\vA\0!\b (0!	@ 	(\0"\vE\r Aj"\x07 \v\xB6"\v \bj"\b K\r \0 \x07 \vB 	Aj!	  \bK\r\0\v\v \0A  \r  \nA\x80\xC0\0sE \r   \rH\x1B!\f\b\v  \x07A\0Hq\r	A=!\b \0 +0 \r \x07 \n \x88"A\0N\r\x07\f\n\v -\0!	 Aj!\f\0\v\0\v \0\r	 E\rA!@  Atj(\0"\0@  Atj \0 \x89A!\f Aj"A\nG\r\f\v\v\v A\nO@A!\f\f\n\v@  Atj(\0\rA!\f Aj"A\nG\r\0\v\f	\vA!\b\f\v  :\0\'A!\x07 !\v 	!\n\v \x07 \b \vk"	 \x07 	J\x1B" A\xFF\xFF\xFF\xFF\x07sJ\rA=!\b \r  j"\x07 \x07 \rH\x1B" K\r \0A   \x07 \nE \0  B \0A0  \x07 \nA\x80\x80sE \0A0  	A\0E \0 \v 	B \0A   \x07 \nA\x80\xC0\0sE (<!\f\v\v\vA\0!\f\f\vA=!\b\vA\xD4\xA0 \b6\0\vA\x7F!\f\v A@k$\0 \f\v\x7F\x7F~ \0\xBD"B4\x88\xA7A\xFFq"A\xFFG| E@  \0D\0\0\0\0\0\0\0\0a\x7FA\0 \0D\0\0\0\0\0\0\xF0C\xA2 \x8D!\0 (\0A@j\v6\0 \0\v  A\xFE\x07k6\0 B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\x87\x80\x7F\x83B\x80\x80\x80\x80\x80\x80\x80\xF0?\x84\xBF \0\v\v\x9F|~\x7F \0\xBD"B\x80\x80\x80\x80\x80\xFF\xFF\xFF\xFF\0\x83B\x81\x80\x80\x80\xF0\x84\xE5\xF2?T"E@D-DT\xFB!\xE9? \0\x99\xA1D\x07\\3&\xA6\x81<  \x9A B\0Y"\x07\x1B\xA1\xA0!\0D\0\0\0\0\0\0\0\0!\v \0 \0 \0 \0\xA2"\xA2"DcUUUUU\xD5?\xA2    \xA2"    DsS`\xDB\xCBu\xF3\xBE\xA2D\xA6\x927\xA0\x88~?\xA0\xA2De\xF2\xF2\xD8DC?\xA0\xA2D(V\xC9"mm?\xA0\xA2D7\xD6\x84\xF4d\x96?\xA0\xA2Dz\xFE\xC1?\xA0      D\xD4z\xBFtp*\xFB>\xA2D\xE9\xA7\xF02\xB8?\xA0\xA2Dh\x8D\xF7&0?\xA0\xA2D\x83\xE0\xFE\xC8\xDBW?\xA0\xA2D\x93\x84n\xE9\xE3&\x82?\xA0\xA2D\xFEA\xB3\x1B\xBA\xA1\xAB?\xA0\xA2\xA0\xA2 \xA0\xA2 \xA0\xA0"\xA0! E@A Atk\xB7" \0   \xA2  \xA0\xA3\xA1\xA0"\0 \0\xA0\xA1"\0 \0\x9A \x07\x1B\v |D\0\0\0\0\0\0\xF0\xBF \xA3" \xBDB\x80\x80\x80\x80p\x83\xBF"  \xBDB\x80\x80\x80\x80p\x83\xBF" \0\xA1\xA1\xA2  \xA2D\0\0\0\0\0\0\xF0?\xA0\xA0\xA2 \xA0 \v\vN\x7F~\x7FA\0 \0B4\x88\xA7A\xFFq"A\xFF\x07I\r\0A A\xB3\bK\r\0A\0BA\xB3\b k\xAD\x86"B} \0\x83B\0R\r\0AA \0 \x83P\x1B\v\v\xF1|\x7F~ \0\xBD"B \x88\xA7A\xFF\xFF\xFF\xFF\x07q"A\x80\x80\xC0\xA0O@ \0D-DT\xFB!\xF9? \0\xA6 B\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0V\x1B\v@\x7F A\xFF\xFF\xEF\xFEM@A\x7F A\x80\x80\x80\xF2O\r\f\v \0\x99!\0 A\xFF\xFF\xCB\xFFM@ A\xFF\xFF\x97\xFFM@ \0 \0\xA0D\0\0\0\0\0\0\xF0\xBF\xA0 \0D\0\0\0\0\0\0\0@\xA0\xA3!\0A\0\f\v \0D\0\0\0\0\0\0\xF0\xBF\xA0 \0D\0\0\0\0\0\0\xF0?\xA0\xA3!\0A\f\v A\xFF\xFF\x8D\x80M@ \0D\0\0\0\0\0\0\xF8\xBF\xA0 \0D\0\0\0\0\0\0\xF8?\xA2D\0\0\0\0\0\0\xF0?\xA0\xA3!\0A\f\vD\0\0\0\0\0\0\xF0\xBF \0\xA3!\0A\v \0 \0\xA2" \xA2"    D/lj,D\xB4\xA2\xBF\xA2D\x9A\xFD\xDER-\xDE\xAD\xBF\xA0\xA2Dm\x9At\xAF\xF2\xB0\xB3\xBF\xA0\xA2Dq#\xFE\xC6q\xBC\xBF\xA0\xA2D\xC4\xEB\x98\x99\x99\x99\xC9\xBF\xA0\xA2!      D\xDA"\xE3:\xAD\x90?\xA2D\xEB\rv$K{\xA9?\xA0\xA2DQ=\xD0\xA0f\r\xB1?\xA0\xA2Dn L\xC5\xCDE\xB7?\xA0\xA2D\xFF\x83\0\x92$I\xC2?\xA0\xA2D\rUUUUU\xD5?\xA0\xA2! A\xFF\xFF\xEF\xFEM@ \0 \0  \xA0\xA2\xA1\vAt"+\x90` \0  \xA0\xA2 +\xB0`\xA1 \0\xA1\xA1"\0\x9A \0 B\0S\x1B!\0\v \0\v\x80\0A\xB0\x92A\xD1)A\xC8\x92A\xB2AA\0(A\xD4\x92A\xD1AA\x80\x7FA\xFF\0A\xEC\x92A\xCAAA\x80\x7FA\xFF\0A\xE0\x92A\xC8AA\0A\xFFA\xF8\x92A\x91\fAA\x80\x80~A\xFF\xFFA\x84\x93A\x88\fAA\0A\xFF\xFFA\x90\x93A\xD2\fAA\x80\x80\x80\x80xA\xFF\xFF\xFF\xFF\x07A\x9C\x93A\xC9\fAA\0A\x7FA\xA8\x93A\x8EAA\x80\x80\x80\x80xA\xFF\xFF\xFF\xFF\x07A\xB4\x93A\x85AA\0A\x7FA\xC0\x93A\xFBA\bB\x80\x80\x80\x80\x80\x80\x80\x80\x80\x7FB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\xCC\x93A\xF2A\bB\0B\x7FA\xD8\x93A\xC6AA\xE4\x93A\xA2A\bA\xF4\xCE\0A\xAD\'A\xA4\xDA\0AA\x93A\xEC\xDA\0AA\xB9A\xB8\xDB\0AA\xC8A\x9C3&A\x84\xDC\0A\0A\xFD)\bA\xAC\xDC\0A\0A\xC2*\bA\xD4\xDC\0AA\x9B*\bA\xFC\xDC\0AA\xCA&\bA\xA4\xDD\0AA\xE9&\bA\xCC\xDD\0AA\x91\'\bA\xF4\xDD\0AA\xAE\'\bA\x9C\xDE\0AA\xE7*\bA\xC4\xDE\0AA\x85+\bA\xAC\xDC\0A\0A\x94(\bA\xD4\xDC\0AA\xF3\'\bA\xFC\xDC\0AA\xD6(\bA\xA4\xDD\0AA\xB4(\bA\xCC\xDD\0AA\xDC)\bA\xF4\xDD\0AA\xBA)\bA\xEC\xDE\0A\bA\x99)\bA\x94\xDF\0A	A\xF7(\bA\xBC\xDF\0AA\xD4\'\bA\xE4\xDF\0A\x07A\xAC+\b\v\xEC\x7F \0(" \0(\b"I@  A\x80\xFC\n\0\0 \0 A\x80j6\v@  \0(\0"k"A\x07u"\x07Aj"A\x80\x80\x80I@ A\xFF\xFF\xFF  k"Au"   I\x1B A\x80\xFF\xFF\xFF\x07O\x1B"\x7F A\x80\x80\x80O\r A\x07t+A\0\v"j" A\x80\xFC\n\0\0  \x07A\x07tk! @   \xFC\n\0\0\v \0  A\x07tj6\b \0 A\x80j"6 \0 6\0 @ -\v \0 6\vP\0\vT\0\vh\x7F@ \0("\0(" \0(\0"\0G@  \0kA\x07u"Ak"A\0H\r  N\r \0 A\x07tj\vA\b9A\xBB.\xC0A\xE4\x99A\0\vA\b9A\xCB,\xC0A\xE4\x99A\0\v_\x7F#\0A\x80k"$\0 \0A\x8C\xD8\x006\0@ \0(\xC8(\0AF\r\0 \0+0 \0\x93+\0dE\r\0  \0(\b \0A0jA\0n! \0( \x92\v A\x80j$\0 \0\v\x87\x7F|#\0A0k"$\0 +\0!\x07 (@! +\b! +!  +9(  9   9 + ! +(!  +09  9\b  9\0 \0  \x07 Aj  +8 \x96 A0j$\0\v\xFA\x7F|#\0A0k"\x07$\0 \0 9\0 \0A\bjA\0A\xF0\0\xFC\v\0 \0 6x@@ (\x80E\r\0 +\b!	  +\0"\fD\xC8\xF4\xEC\xF8\xA7?\xA2 +\xC0\xA2\xA2!\n +\xD0"\vD\0\0\0\0\0\0\0\0b@ 	 \v +\x88D\xC8\xF4\xEC\xF8\xA7#\xBF\xA2 +\xC8\xA2\xA2D5\xEF8EG@@\xA3\xA2!\b\v@ \bD\0\0\0\0\0\0\0\0b\r\0 \nD\0\0\0\0\0\0\0\0b\r\0\f\v +!\v \x07 	 \b\xA09  \x07 \f9 \x07 \n \v\xA09(\f\v \x07 )7( \x07 )\b7  \x07 )\x007\v|D\0\0\0\0\0\0\0\0 +"\bD\0\0\0\0\0\0\0\0a\r\0D\0\0\0\0\0\0\0\0 +p"	D\0\0\0\0\0\0\0\0a\r\0 DH\xE1z\xAEG\xFD?\xB9 	D333333\xF3?\xA0D\0\0\0\0\0\0\xF4?\xA2\xA2" \x9A \bD\0\0\0\0\0\0\0\0d\x1BD\0\0\0\0\0\0(@\xA3\v!\b +! +\0!	 +\b!\n \0 \b \x07+(\xA098 A\x90j +\b \x07Aj \x07A\bj\x98 +\0!\v +\b!\r +\b!\f \x07+!\b \0  \xA2 	 	\xA2 \n \n\xA2\xA0\xA0\x9F"9 \0 \b9\b \0   \x07+\b D\0\0\0\0\0\0\0\0b\x1B\xA39 \0 \x07+ "9  \fM!	 \0  \fN"\n\xA2 \b 	\xA2\xA19( \0 \b \xF7 +\bD\0\0\0\0\0\0\0\0 \x07+"D\0\0\0\0\0\0\0\0b\x1B\xA190 \0  \0+8\xF79@ \x07+! \x07+ !\b \0 \r \v\xBB9P \0  \n\xA2 	 \b\xA2\xA09H \0 \x07+9X \0  \0+\xF89` \0  +( \xA2\xA2D\0\0\0\0\x80}\x1BA\xA39h \0   +(" \xA2 \xA2\xA2\xA2D\xDF\xC4Afcz=\xA29p \x07A0j$\0 \0\vf|@ AK\r\0@@@@@@@@ \b\0\x07\b\v \0+\0\v \0+8\v \0+\b\v \0+\v \0+\v \0+ \v \0+(\v \0+0!\v \v&\x7FA +"\0B\x007 \0B\x007 \0B\x007\b \0B\x007\0 \0\v\0 \0 \x9C"\0A\x88\xD6\x006\0 \0\v\xB1\b| \0(@E@ \0+\b" +\b\xA2 \0+\0" +\0" \0+("\b\xA2 +" \0+8"\x07\xA2\xA0\xA2\xA1D\xC8\xF4\xEC\xF8\xA7#\xBF\xA2"	 \0+0"\n\xA2 \x07  \0+ "\x07\xA2  \n\xA2\xA0" D\xC8\xF4\xEC\xF8\xA7#\xBF\xA2\xA2"\xA2\xA0!  \x9A\xA2D\xC8\xF4\xEC\xF8\xA7#\xBF\xA2! 	 \x07\xA2 \b \xA2\xA0!\v  9  9\b  9\0\v\xB6\x7F| + e@  (\fAj"6\f | ( (\0"kAu M@ B\x007( B\x007  B\x007D\0\0\0\0\x84\xD7\x97A\f\v  Atj"+\0! +\b! B\x007    M\xA29(   N\xA29 +\v9\v \0 )(7 \0 ) 7\b \0 )7\0\v\xD2\x7F \0(\b" \0(\0"kAu O@  \0(" k"AuK@  G@ @   \xFC\n\0\0\v \0(!\v   j"k!@  F\r\0 E\r\0   \xFC\n\0\0\v \0  j6\v  k!@  F\r\0 E\r\0   \xFC\n\0\0\v \0  j6\v @ \0 6 - \0A\x006\b \0B\x007\0A\0!\v@ A\x80\x80\x80\xC0\0O\r\0A\xFF\xFF\xFF? Au"   I\x1B A\xE0\xFF\xFF\xFF\x07O\x1B"A\x80\x80\x80\xC0\0O\r\0 \0 At"+"6 \0 6\0 \0  j6\b  k!@  F\r\0 E\r\0   \xFC\n\0\0\v \0  j6\vP\0\v\xA6\x7F \0(" \0(\b"I@  )7  )7  )\b7\b  )\x007\0 \0 A j6\v@  \0(\0"k"Au"\x07Aj"A\x80\x80\x80\xC0\0I@A\xFF\xFF\xFF?  k"Au"   I\x1B A\xE0\xFF\xFF\xFF\x07O\x1B"\x7F A\x80\x80\x80\xC0\0O\r At+A\0\v" j" )7  )7  )\b7\b  )\x007\0  \x07Atk! @   \xFC\n\0\0\v \0  Atj6\b \0 A j"6 \0 6\0 @ -\v \0 6\vP\0\vT\0\v\0    \0(\0\0\v\0    \0(\0\0\v\x7FA\f+"\0A\x006\b \0B\x007\0 \0\v(\x7F \0@ \0(\0"@ \0 6 \0(\b -\v \0-\v\v\x9C\x7F#\0A\x80k"$\0 A\x07:\0/ A\xC72(\0\x006$ A\xCA2(\0\x006\0\' A\0:\0+ Aj" +\0\xC8  A$j (  ,\0#"A\0H"\x1B (  \x1B\x8A"(\b68  )\x0070 B\x007\0 A\x006\b  A0jA\xF72\xCA"(\b6H  )\x007@ B\x007\0 A\x006\b A\fj" +\b\xC8  A@k (\f  ,\0"A\0H"\x1B (  \x1B\x8A"(\b6X  )\x007P B\x007\0 A\x006\b  A\xD0\0jA\xF72\xCA"(\b6h  )\x007` B\x007\0 A\x006\b  +\xC8  A\xE0\0j (\0  ,\0\v"A\0H"\x1B (  \x1B\x8A"(\b6x  )\x007p B\x007\0 A\x006\b \0 A\xF0\0jA\xC52\xCA"(\b6\b \0 )\x007\0 B\x007\0 A\x006\b ,\0{A\0H@ (x (p-\v ,\0\vA\0H@ (\b (\0-\v ,\0kA\0H@ (h (`-\v ,\0[A\0H@ (X (P-\v ,\0A\0H@ ( (\f-\v ,\0KA\0H@ (H (@-\v ,\0;A\0H@ (8 (0-\v ,\0#A\0H@ (  (-\v ,\0/A\0H@ (, ($-\v A\x80j$\0\v\f\0  \0(\0\0\v_| \0+" \xA2 \0+\0" \xA2 \0+\b" \xA2\xA0\xA0"D#B\x92\f\xA1\x9C\xC7;cE@ \0 D\0\0\0\0\0\0\xF0? \x9F\xA3"\xA29 \0  \xA29\b \0  \xA29\0\v\v}| +" \xA2 +\0" \xA2 +\b" \xA2\xA0\xA0"D#B\x92\f\xA1\x9C\xC7;c@ \0 )7 \0 )\b7\b \0 )\x007\0\v \0 D\0\0\0\0\0\0\xF0? \x9F\xA3"\xA29 \0  \xA29\b \0  \xA29\0\v$| \0+" \xA2 \0+\0" \xA2 \0+\b" \xA2\xA0\xA0\v5\x7F  \0("Auj! \0(\0!\0  Aq\x7F (\0 \0j(\0 \0\v \0\v%| \0+" \xA2 \0+\0" \xA2 \0+\b" \xA2\xA0\xA0\x9F\vk\x7F  \0("\nAuj! \0(\0!\0       \x07 \b 	 \nAq\x7F (\0 \0j(\0 \0\v+\0!\0A+" \0)7  \0)\b7\b  \0)\x007\0 \v|\0 \0 \x07+\0 \b\xA2 +\0 \xA2 +\0 \xA2  +\0\xA2\xA0\xA0\xA09\0 \0 \x07+\b \b\xA2 +\b \xA2 +\b \xA2  +\b\xA2\xA0\xA0\xA09\b \0 \x07+ \b\xA2 + \xA2 + \xA2  +\xA2\xA0\xA0\xA09 \0\vc\x7F  \0("Auj! \0(\0!\0      Aq\x7F (\0 \0j(\0 \0\v\0!\0A+" \0)7  \0)\b7\b  \0)\x007\0 \v;\x7FA8+"\0B\x0070 \0B\x007( \0B\x007  \0B\x007 \0B\x007 \0B\x007\b \0B\x007\0 \0\vF\0 \0 +\0 \xA2  +\0\xA2\xA09\0 \0 +\b \xA2  +\b\xA2\xA09\b \0 + \xA2  +\xA2\xA09 \0\v=\0 \0 \0+\0 +\0 \xA2\xA19\0 \0 \0+\b +\b \xA2\xA19\b \0 \0+ + \xA2\xA19 \0\v_\x7F  \0("Auj! \0(\0!\0    Aq\x7F (\0 \0j(\0 \0\v\0!\0A+" \0)7  \0)\b7\b  \0)\x007\0 \v=\0 \0 +\0 \xA2 \0+\0\xA09\0 \0 +\b \xA2 \0+\b\xA09\b \0 + \xA2 \0+\xA09 \0\vF\0 \x99D\xBB\xBD\xD7\xD9\xDF|\xDB=cE@ \0D\0\0\0\0\0\0\xF0? \xA3" \0+\0\xA29\0 \0  \0+\b\xA29\b \0  \0+\xA29\v\v\0   \0(\0\0\v)\0 \0  \0+\0\xA29\0 \0  \0+\b\xA29\b \0  \0+\xA29\v2\0 \0 \0+\0 +\0\xA19\0 \0 \0+\b +\b\xA19\b \0 \0+ +\xA19\v2\0 \0 +\0 \0+\0\xA09\0 \0 +\b \0+\b\xA09\b \0 + \0+\xA09\v7\x7F  \0("Auj! \0(\0!\0   Aq\x7F (\0 \0j(\0 \0\v\0\v%\0 \0+ +\xA2 \0+\0 +\0\xA2 \0+\b +\b\xA2\xA0\xA0\vn| \x99D\xBB\xBD\xD7\xD9\xDF|\xDB=c@ \0 )7 \0 )\b7\b \0 )\x007\0\v +\0! +\b! \0D\0\0\0\0\0\0\xF0? \xA3" +\xA29 \0  \xA29\b \0  \xA29\0\vp\x7F#\0A k"$\0  \0("Auj! \0(\0!\0 A\bj   Aq\x7F (\0 \0j(\0 \0\v\0A+"\0 )7 \0 )7\b \0 )\b7\0 A j$\0 \0\v3| +\0! +\b! \0  +\xA29 \0  \xA29\b \0  \xA29\0\vn\x7F#\0A k"$\0  \0("Auj! \0(\0!\0 A\bj  Aq\x7F (\0 \0j(\0 \0\v\0A+"\0 )7 \0 )7\b \0 )\b7\0 A j$\0 \0\v-| +\0! +\b! \0 +\x9A9 \0 \x9A9\b \0 \x9A9\0\vD| +\0! +\0! +\b! +\b! \0 + +\xA19 \0  \xA19\b \0  \xA19\0\vp\x7F#\0A k"$\0  \0("Auj! \0(\0!\0 A\bj   Aq\x7F (\0 \0j(\0 \0\v\0A+"\0 )7 \0 )7\b \0 )\b7\0 A j$\0 \0\vD| +\0! +\0! +\b! +\b! \0 + +\xA09 \0  \xA09\b \0  \xA09\0\v4\x7F|A+! \0+\0! +\0!  +\x009  9\b  9\0 \v=\x7F#\0A k"$\0  9  9  9\b Aj Aj A\bj \0\0 A j$\0\v\x7FA+"\0B\x007 \0B\x007\b \0B\x007\0 \0\v\f\0 \0\xC3 \0-\v\0A\x9F\v\0A\xE3 \v\0A\x9D\v\x1B\0 \0 (\b >@    \xC6\v\v8\0 \0 (\b >@    \xC6\v \0(\b"\0      \0(\0(\v\0\v\x92\x7F \0 (\b >@    \xC6\v -\x005 \0(\f! A\0:\x005 -\x004 A\0:\x004 \0Aj"	     \xC5 -\x004"\nr!\b -\x005"\vr!\x07@ AI\r\0 	 Atj!	 \0Aj!@ -\x006\r@ \nAq@ (AF\r \0-\0\bAq\r\f\v \vAqE\r\0 \0-\0\bAqE\r\v A\0;4      \xC5 -\x005"\v \x07rAq!\x07 -\x004"\n \brAq!\b A\bj" 	I\r\0\v\v  \x07Aq:\x005  \bAq:\x004\v\xA7\0 \0 (\b >@@  (G\r\0 (AF\r\0  6\v\v@ \0 (\0 >E\r\0@ ( G@  (G\r\v AG\r A6 \v  6  6   ((Aj6(@ ($AG\r\0 (AG\r\0 A:\x006\v A6,\v\v\x8B\0 \0 (\b >@@  (G\r\0 (AF\r\0  6\v\v@ \0 (\0 >@@ ( G@  (G\r\v AG\r A6 \v  6 @ (,AF\r\0 A\0;4 \0(\b"\0   A  \0(\0(\v\0 -\x005AF@ A6, -\x004E\r\f\v A6,\v  6  ((Aj6( ($AG\r (AG\r A:\x006\v \0(\b"\0     \0(\0(\r\0\v\v\xC4\x7F \0 (\b >@@  (G\r\0 (AF\r\0  6\v\v@@ \0 (\0 >@@ ( G@  (G\r\v AG\r A6 \v  6  (,AF\r \0Aj" \0(\fAtj!A\0!@@@ \x7F@  O\r\0 A\0;4    A \xC5 -\x006\r\0 -\x005AG\r -\x004AF@ (AF\rA!A!\x07 \0-\0\bAqE\r\f\vA! \0-\0\bAq\rA\f\vAA \x1B\v6, \x07\r\f\v A6,\f\v A\bj!\f\0\v\0\v \0(\f! \0Aj"    \x9B AI\r  Atj! \0Aj!@ \0(\b"\0AqE@ ($AG\r\v@ -\x006\r     \x9B A\bj" I\r\0\v\f\v \0AqE@@ -\x006\r ($AF\r     \x9B A\bj" I\r\0\f\v\0\v@ -\x006\r ($AF@ (AF\r\v     \x9B A\bj" I\r\0\v\f\v  6  ((Aj6( ($AG\r\0 (AG\r\0 A:\x006\v\v\0A\xD0\xCB\0\v\x8F\x7F#\0A@j"$\0@ A\xBC\x92A\0>@ A\x006\0A!\f\v@ \0  \0-\0\bAq\x7FA E\r A\x90\x90O"E\r -\0\bAqA\0G\v>!\v @A! (\0"\0E\r  \0(\x006\0\f\v@ E\r\0 A\xC0\x90O"E\r (\0"@  (\x006\0\v (\b" \0(\b"A\x7FsqA\x07q\r A\x7Fs qA\xE0\0q\rA! \0(\f (\fA\0>\r \0(\fA\xB0\x92A\0>@ (\f"\0E\r \0A\xF0\x90OE!\f\v \0(\f"E\r\0A\0! A\xC0\x90O"@ \0-\0\bAqE\r\x7F (\f!\0A\0!@@A\0 \0E\r \0A\xC0\x90O"E\r (\b (\bA\x7Fsq\rA (\f (\fA\0>\r -\0\bAqE\r (\f"\0E\r \0A\xC0\x90O"@ (\f!\0\f\v\v \0A\xA4\x91O"\0E\r\0 \0 (\f\xFE!\v \v!\f\v A\xA4\x91O"@ \0-\0\bAqE\r  (\f\xFE!\f\v A\xE0\x8FO"E\r (\f"\0E\r \0A\xE0\x8FO"\0E\r (\0! A\bjA\0A8\xFC\v\0  A\0G:\0; A\x7F6  6\f  \x006 A64 \0 Aj A \0(\0(	\0 ("\0AF@  (A\0 \x1B6\0\v \0AF!\f\vA\0!\v A@k$\0 \vo\x7F \0 (\bA\0>@   \xC7\v \0(\f! \0Aj"   \xFF@ AI\r\0  Atj! \0Aj!\0@ \0   \xFF -\x006\r \0A\bj"\0 I\r\0\v\v\v2\0 \0 (\bA\0>@   \xC7\v \0(\b"\0    \0(\0(	\0\v\0 \0 (\bA\0>@   \xC7\v\v\xC8\x7F#\0A\xD0\0k"$\0@\x7FA \0 A\0>\r\0A\0 E\r\0A\0 A\xE0\x8FO"E\r\0 (\0"E\r AjA\0A8\xFC\v\0 A:\0K A\x7F6   \x006  6 A6D  Aj A (\0(	\0 (,"\0AF@  ($6\0\v \0AF\v A\xD0\0j$\0\v A\xA6&6\b A\xE76 A\x936\0=\0\v\0      \0-\0\v\0       \x07 \0\0\v\0\0\v\v\0   \0\0\v=\x7F#\0A\x80k"\b$\0 \b       \x07 \0&\0A\x80+"\0 \bA\x80\xFC\n\0\0 \bA\x80j$\0 \0\v	\0A\xC0\xC3,\v$\0A\xCC\xC3-\0\0E@A\xC0\xC3A\xF8\xE5wA\xCC\xC3A:\0\0\vA\xC0\xC3\v	\0A\xB0\xC3,\v%\0A\xBC\xC3-\0\0E@A\xB0\xC3A\xBD\x82A\xBC\xC3A:\0\0\vA\xB0\xC3\v	\0A\xA0\xC3,\v$\0A\xAC\xC3-\0\0E@A\xA0\xC3A\xA4\xE5wA\xAC\xC3A:\0\0\vA\xA0\xC3\v	\0A\x90\xC3,\v\0      \0\x96\v%\0A\x9C\xC3-\0\0E@A\x90\xC3A\xA1"\x82A\x9C\xC3A:\0\0\vA\x90\xC3\v	\0A\x80\xC3,\v$\0A\x8C\xC3-\0\0E@A\x80\xC3A\x80\xE5wA\x8C\xC3A:\0\0\vA\x80\xC3\v	\0A\x90\x9E,\v\0A\xFD\xC2-\0\0E@A\xFD\xC2A:\0\0\vA\x90\x9E\v	\0A\xF0\xC2,\v$\0A\xFC\xC2-\0\0E@A\xF0\xC2A\xDC\xE4wA\xFC\xC2A:\0\0\vA\xF0\xC2\v	\0A\x84\x9E,\v\0A\xED\xC2-\0\0E@A\xED\xC2A:\0\0\vA\x84\x9E\v\x1B\0A\xC8\xCB!\0@ \0A\fk,"\0A\xB0\xCBG\r\0\v\v|\x7F#\0A@j"$\0       \0.\0A\xC0\0+"\0 )878 \0 )070 \0 )(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0 A@k$\0 \0\vT\0A\xEC\xC2-\0\0@A\xE8\xC2(\0\vA\xC8\xCB-\0\0E@A\xC8\xCBA:\0\0\vA\xB0\xCBA\x98\x8E3A\xBC\xCBA\xA4\x8E3A\xEC\xC2A:\0\0A\xE8\xC2A\xB0\xCB6\0A\xB0\xCB\v\x1B\0A\xA8\xCB!\0@ \0A\fk,"\0A\x90\xCBG\r\0\v\vR\0A\xE4\xC2-\0\0@A\xE0\xC2(\0\vA\xA8\xCB-\0\0E@A\xA8\xCBA:\0\0\vA\x90\xCBA\x97$4A\x9C\xCBA\x94$4A\xE4\xC2A:\0\0A\xE0\xC2A\x90\xCB6\0A\x90\xCB\v\x1B\0A\x80\xCB!\0@ \0A\fk,"\0A\xE0\xC8G\r\0\v\v\xB0\0A\xDC\xC2-\0\0@A\xD8\xC2(\0\vA\x80\xCB-\0\0E@A\x80\xCBA:\0\0\vA\xE0\xC8A\x90\x8A3A\xEC\xC8A\xB0\x8A3A\xF8\xC8A\xD4\x8A3A\x84\xC9A\xEC\x8A3A\x90\xC9A\x84\x8B3A\x9C\xC9A\x94\x8B3A\xA8\xC9A\xA8\x8B3A\xB4\xC9A\xBC\x8B3A\xC0\xC9A\xD8\x8B3A\xCC\xC9A\x80\x8C3A\xD8\xC9A\xA0\x8C3A\xE4\xC9A\xC4\x8C3A\xF0\xC9A\xE8\x8C3A\xFC\xC9A\xF8\x8C3A\x88\xCAA\x88\x8D3A\x94\xCAA\x98\x8D3A\xA0\xCAA\x84\x8B3A\xAC\xCAA\xA8\x8D3A\xB8\xCAA\xB8\x8D3A\xC4\xCAA\xC8\x8D3A\xD0\xCAA\xD8\x8D3A\xDC\xCAA\xE8\x8D3A\xE8\xCAA\xF8\x8D3A\xF4\xCAA\x88\x8E3A\xDC\xC2A:\0\0A\xD8\xC2A\xE0\xC86\0A\xE0\xC8\v\x1B\0A\xD0\xC8!\0@ \0A\fk,"\0A\xB0\xC6G\r\0\v\v\x98\0A\xD4\xC2-\0\0@A\xD0\xC2(\0\vA\xD0\xC8-\0\0E@A\xD0\xC8A:\0\0\vA\xB0\xC6A\xD3\b4A\xBC\xC6A\xCA\b4A\xC8\xC6A\xB94A\xD4\xC6A\xEE4A\xE0\xC6A\xAD\n4A\xEC\xC6A\x834A\xF8\xC6A\xE0\b4A\x84\xC7A\xCE\v4A\x90\xC7A\xB54A\x9C\xC7A\xA44A\xA8\xC7A\xAC4A\xB4\xC7A\xBF4A\xC0\xC7A\xFA4A\xCC\xC7A\x92!4A\xD8\xC7A\xE64A\xE4\xC7A\xF24A\xF0\xC7A\xAD\n4A\xFC\xC7A\xFF4A\x88\xC8A\xAE4A\x94\xC8A\xEE4A\xA0\xC8A\xB94A\xAC\xC8A\xC24A\xB8\xC8A\xF3\n4A\xC4\xC8A\xF2 4A\xD4\xC2A:\0\0A\xD0\xC2A\xB0\xC66\0A\xB0\xC6\v\x1B\0A\xA8\xC6!\0@ \0A\fk,"\0A\x80\xC5G\r\0\v\v\xCC\0A\xCC\xC2-\0\0@A\xC8\xC2(\0\vA\xA8\xC6-\0\0E@A\xA8\xC6A:\0\0\vA\x80\xC5A\xBC\x873A\x8C\xC5A\xD8\x873A\x98\xC5A\xF4\x873A\xA4\xC5A\x94\x883A\xB0\xC5A\xBC\x883A\xBC\xC5A\xE0\x883A\xC8\xC5A\xFC\x883A\xD4\xC5A\xA0\x893A\xE0\xC5A\xB0\x893A\xEC\xC5A\xC0\x893A\xF8\xC5A\xD0\x893A\x84\xC6A\xE0\x893A\x90\xC6A\xF0\x893A\x9C\xC6A\x80\x8A3A\xCC\xC2A:\0\0A\xC8\xC2A\x80\xC56\0A\x80\xC5\v\x1B\0A\xF8\xC4!\0@ \0A\fk,"\0A\xD0\xC3G\r\0\v\v\xF6\x7F|#\0A\xE0k"$\0 A\x006\xDC B\x007\xD4 A\xD8\xD6\x006\xD0#\0Ak"$\0 Aj$\0 "B\x007\xF8 B\x007\xF0 B\x007\xE8 B\x007\x88 B\x007\x80 B\x007\x98 B\x007\xA0 B\x007\xA8 B\x80\x80\x80\x80\xC0\xF0\xF5\xCB\xC1\x007\x90 A\x006\xC8  \x9A \0A\0A\xC0\xFC\v\0 (\0! +\0!\x07 \0A@k!#\0A\xB0k"$\0@@ (\xC8@ D\0\0\0\xD0\x88\xC3\0B A\x80j  \x07 A\xACj"\xF1" e A\xF0\0j! -\0E\r \0 \xF0")878 \0 )070 \0 )(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0    \0A\0nA\xFC\0\xFC\n\0\0 A\xB0j$\0\f\vA\b9A\x9A0fA\xC8\x98A\0\v (\x98"E@A\b9A\xD21\xC0A\xE4\x99A\0\v \0 A\xD8j  AtjAj AJ\x1B")878 \0 )070 \0 )(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0    \0A\0nA\xFC\0\xFC\n\0\0A\xC89 A\xA8\x1Bo\x9C"A\xF4\xD5\x006\0  \0)\x007\b  \0)\b7  \0)7  \0)7   \0) 7(  \0)(70  \0)078  \0)87@ A\xC8\0j A\x80\xFC\n\0\0 A\xA8\xD4\0A\xBC\0\v@ (\xC8"\0 A\xB8jF\x7FA \0E\rA\v! \0 \0(\0 j(\0\0\v A\xF0\0j\x87 A\xD0j\xF3 A\xE0j$\0\v\xBE\0A\xC4\xC2-\0\0@A\xC0\xC2(\0\vA\xF8\xC4-\0\0E@A\xF8\xC4A:\0\0\vA\xD0\xC3A\x98\n4A\xDC\xC3A\x9F\n4A\xE8\xC3A\xFD	4A\xF4\xC3A\x85\n4A\x80\xC4A\xF4	4A\x8C\xC4A\xA6\n4A\x98\xC4A\x8F\n4A\xA4\xC4A\xFB4A\xB0\xC4A\xE54A\xBC\xC4A\xDB\x1B4A\xC8\xC4A\xB54A\xD4\xC4A\xFC\n4A\xE0\xC4A\xFE4A\xEC\xC4A\xDC4A\xC4\xC2A:\0\0A\xC0\xC2A\xD0\xC36\0A\xD0\xC3\v\n\0 \0A\xC4\xE4w\v\v\0 \0A\xF1\x1B\x82\v\n\0 \0A\xB0\xE4w\v\v\0 \0A\xA3\x1B\x82\v\f\0 \0 Aj\xD4\v\f\0 \0 A\fj\xD4\v\x07\0 \0,\0	\vK\x7F#\0A\xD0k"$\0  6\f  9\0 Aj"  A\fj  \0	\0A\xC0+"\0 A\xC0\xFC\n\0\0 A\xD0j$\0 \0\v\x07\0 \0,\0\b\v	\0 \0\x8F-\v	\0 \0\x90-\v\x96	\x07\x7F|#\0A\x80k"$\0 \06 \0A\xC8\x9F6\0! \0A\x006 \0 6\f \0A\xC8\x9F6\b A\x006\xF0 B\x007\xE8 A\x006\xE4 B\x007\xDC A\xD8\xD6\x006\xD8#\0Ak"$\0 Aj$\0 A\bj"B\x007\xF8 B\x007\xF0 B\x007\xE8 B\x007\x88 B\x007\x80 B\x007\x98 B\x007\xA0 B\x007\xA8 B\x80\x80\x80\x80\xC0\xF0\xF5\xCB\xC1\x007\x90 A\x006\xC8  \x9A +\0!\v +\b!\n +!\f (! A\xE8j!\x07 \0Aj!\b A\xD8jA\0 -\0\x1B!	#\0A\xE0k"$\0@ (\xC8@ Aj" \v9(  \n9   \f9 B\x007  6\f  A\xF0\0j6\b  \x076 A\x8C\xD8\x006\0 A0jA\0A\x88\xFC\v\0 +x!\n  \b6\xC8  \n\xED9\xC0 A\xC4\xD6\x006\0 A+"6  Aj"\x076\f  6\0  \x076\b 	@A\b+"\x07 	6 \x07 (\x006\0  \x07A\bj"	6\f  \x076 -  	6\b\v  \v  \be \xF4 \x94 A\xE0j$\0\f\vA\b9A\x9A0fA\xC8\x98A\0\v (\xE8" (\xEC"G@@ \0(!\x07@A\xEC\x9E-\0\0Aq@A\xE8\x9E(\0!\f\vAA\xF0\xC9\0A\x07!A\xEC\x9EA:\0\0A\xE8\x9E 6\0\vA\x80+"\b A\x80\xFC\n\0\0  \b6\xF8 A\x006\xF4  \x07A\xB4 A\xF4j A\xF8j (\xF4"@ \v A\x80j" G\r\0\v\v@ -\0AG\r\0 (\xE0 (\xDCkAuA\0L\r\0A\0!@ (\xE0 (\xDC"kAu" Auq j"A\0N  HqE@A\b9A\xCE\xC0A\xE4\x99A\0\v  Atj! \0(\f!\x07@A\xF4\x9E-\0\0Aq@A\xF0\x9E(\0!\f\vAA\xF8\xC9\0A\x07!A\xF4\x9EA:\0\0A\xF0\x9E 6\0\vA\xC0\0+" )878  )070  )(7(  ) 7   )7  )7  )\b7\b  )\x007\0  6\xF8 A\x006\xF4  \x07A\xB4 A\xF4j A\xF8j (\xF4"@ \v Aj" (\xE0 (\xDCkAuH\r\0\v\v@ (\xC8"\0 A\xB8jF\x7FA \0E\rA\v! \0 \0(\0 j(\0\0\v A\xF0\0j\x87 A\xD8j\xF3 (\xE8"\0@  \x006\xEC (\xF0 \0-\v A\x80j$\0\v\0 \0(\b"\0E@A\v \0\x97\v\xB3\x7F@@  	M\r\0  F\r\0A!\b \0(\b!#\0Ak"\x07$\0 \x07 6\f \x07A\bj \x07A\fjSA\0   k A\x94\xBF \x1B\x90!(\0"@A\xA8\xA0(\0 @A\xA8\xA0A\xB0\x9F  A\x7FF\x1B6\0\v\v \x07Aj$\0@@ Aj\0\v !\b\v 	Aj!	 \b \nj!\n  \bj!\f\v\v \n\v\x7F\x7F \0(\b!#\0Ak"$\0  6\f A\bj A\fjSA\0A\0A\xEE!(\0"@A\xA8\xA0(\0 @A\xA8\xA0A\xB0\x9F  A\x7FF\x1B6\0\v\v Aj$\0 @A\x7F\v \0(\b"\0E@A\v \0\x97AF\v\x89\x7F#\0Ak"$\0  6\0\x7FA A\fj"A\0 \0(\b\xCF"\0AjAI\r\0A \0Ak"  (\0kK\r\0\x7F \x7F -\0\0!\0  (\0"Aj6\0  \0:\0\0 Ak! Aj!\fA\0\v\v\v Aj$\0\v\xE6\r\x7F#\0Ak"$\0 !	@@  	F@ !	\f\v 	-\0\0E\r\0 	Aj!	\f\v\v \x07 6\0  6\0@@\x7F@  F\r\0  F\r\0  )\x007\b \0(\b!\b#\0Ak"$\0  \b6\f A\bj A\fjS 	 k!A\0!\v#\0A\x90\bk"\r$\0 \r (\0"\b6\f  kAuA\x80 \x1B!\f  \rAj \x1B!@@@@ \bE\r\0 \fE\r\0@ Av!\n@ A\x83K\r\0 \n \fO\r\0 \b!\n\f\v  \rA\fj \n \f \n \fI\x1B \xD2! \r(\f!\n A\x7FF@A\0!\fA\x7F!\v\f\v \f A\0  \rAjG\x1B"k!\f  Atj! \b j \nkA\0 \n\x1B! \v j!\v \nE\r \n!\b \f\r\0\v\f\v \b!\n\v \nE\r\v \fE\r\0 E\r\0 \v!\b@@@  \n  \x90"\vAjAM@@@ \vAj\0\v \rA\x006\f\f\v A\x006\0\f\v \r \r(\f \vj"\n6\f \bAj!\b \fAk"\f\r\v \b!\v\f\v Aj!  \vk! \b!\v \r\0\v\v @  \r(\f6\0\v \rA\x90\bj$\0(\0"\b@A\xA8\xA0(\0 \b@A\xA8\xA0A\xB0\x9F \b \bA\x7FF\x1B6\0\v\v Aj$\0@@@@ \vA\x7FF@@ \x07 6\0  (\0F\rA!@@@   	 k A\bj \0(\b\x98"Aj\x07\0\v  6\0\f\v !\v  j! \x07(\0Aj!\f\0\v\0\v \x07 \x07(\0 \vAtj"6\0  F\r (\0!  	F\r  A  \0(\b\x98E\r\vA\f\v \x07 \x07(\0Aj"6\0  (\0Aj"6\0 !	@  	F\r 	-\0\0E\r 	Aj!	\f\0\v\0\v  6\0A\f\v (\0!\v  G\v Aj$\0\v !	\f\0\v\0\v\x9F\x7F#\0A k"$\0 A\fj   \0\0A+"\0 ("6 \0A\xC8\x9F6\0 A	O@ 	\v \0 ("6\f \0A\xC8\x9F6\b A	O@ 	 (!\v \0 (6 A	O@  A\x006\v ("A	O@ \v A j$\0 \0\v\xCF\f\x7F#\0Ak"$\0 !\b@@  \bF@ !\b\f\v \b(\0E\r\0 \bAj!\b\f\v\v \x07 6\0  6\0@@@@@  F\r\0  F\r\0  )\x007\bA! \b kAu!  "	k!\v \0(\b!\nA\0!\f#\0Ak"$\0  \n6\f A\bj A\fjS#\0Ak"$\0@ (\0"\nE\r\0 E\r\0 \vA\0 	\x1B!\v@ A\fj 	 \vAI\x1B \n(\0\xB7"\rA\x7FF@A\x7F!\f\f\v 	\x7F \vAM@ \v \rI\r 	 A\fj \r^\v \v \rk!\v 	 \rjA\0\v!	 \n(\0E@A\0!\n\f\v \f \rj!\f \nAj!\n Ak"\r\0\v\v 	@  \n6\0\v Aj$\0(\0"	@A\xA8\xA0(\0 	@A\xA8\xA0A\xB0\x9F 	 	A\x7FF\x1B6\0\v\v Aj$\0@@@@ \fAj\0\b\v \x07 6\0@  (\0F\r  (\0 \0(\b\xCF"A\x7FF\r \x07 \x07(\0 j"6\0 Aj!\f\0\v\0\v \x07 \x07(\0 \fj"6\0  F\r  \bF@ (\0! !\b\f\v Aj"A\0 \0(\b\xCF"\bA\x7FF\r  \x07(\0k \bI\r@ \b@ -\0\0! \x07 \x07(\0"	Aj6\0 	 :\0\0 \bAk!\b Aj!\f\v\v  (\0Aj"6\0 !\b@  \bF@ !\b\f\v \b(\0E\r \bAj!\b\f\0\v\0\v  6\0\f\v (\0!\v  G!\f\v \x07(\0!\f\v\vA!\v Aj$\0 \v	\0 \0\xA1-\vT\0#\0Ak"\0$\0 \0 6\f \0  k6\b#\0Ak"$\0 \0A\bj"(\0 \0A\fj"(\0I! Aj$\0   \x1B(\0 \0Aj$\0\v8\0@  G@  ,\0\0A\x80I\x7F -\0\0 \v:\0\0 Aj! Aj!\f\v\v \v\r\0   A\x80I\x1B\v*\0@  FE@  -\0\0:\0\0 Aj! Aj!\f\v\v \vE\0@  G@ \x7F ,\0\0"\0A\x80I@A\xC0\xC9(\0 \0Atj(\0\f\v -\0\0\v:\0\0 Aj!\f\v\v \v\0 A\x80I\x7FA\xC0\xC9(\0 Atj(\0 \v\xC0\v\xBF\v\x7F|#\0A\xD0k"$\0#\0Ak"$\0 Aj$\0 B\x007\xF8 B\x007\xF0 B\x007\xE8 B\x007\x88 B\x007\x80 B\x007\x98 B\x007\xA0 B\x007\xA8 B\x80\x80\x80\x80\xC0\xF0\xF5\xCB\xC1\x007\x90 A\x006\xC8  \0\x9A#\0A\xF0k"$\0#\0A\xD0\0k"\0$\0  9\xD0 A6\xC0  +x"\f9\xC8   \fM\xA2"9\xE0   \fN\xA2"\v9\xD8  +\xB8 +\xB0\x9A\xA2"\n9\xE8@ \x99"\x07D{\xAEG\xE1z\x84?c\r\0 +8! \n\x99"\b\xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0X@ \b  \b\xA5 \xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0V\x1B!\v \x07  \xA0c@   \n\xA0 \v\xBB9\xC8\f\v \fD-DT\xFB!\xF9\xBF\xA0\x99Da2U0*\xA93?c@  \0Aj\xF6 \0+ !\v +\xC8"\x07M! \0+ \x07N\xA2 \v \xA2\xA0"\x07 +\xD0cE\rA 9 \0AjA\xCEo +\xD0! +\xC8!\x9C"\0 9 \0 \x079 \0 9\b \0A\x9C\xD6\x006\0 \0A\x8C\xD5\0A\xBC\0\v A\x006\xC0\v \0A\xD0\0j$\0 +\xC8!	 (\xC0AG@ +\xD0!  +\xD8"D\0\0\0\0\0\0\xE0?\xA2 +\xE0\xA1"\x07 +P" \x99 \x07c\x1B9P  +\xC8" \x07\xA1 +h"  \xA1 \x07d\x1B9h +@" \xA0!@ (X"\0A\0L@D\0\0\0\xD0\x88\xC3\0B!\b\f\v 	M"\x9A!\fD\0\0\0\xD0\x88\xC3\0B!\b 	N!D\0\0\0\xD0\x88\xC3\0B!D\0\0\0\xD0\x88\xC3\0B!\vD\0\0\0\0\0\0\xF0?!\r@@@@   AjA  A\xBCj"\xF1" e -\0E\r \xF0"+\0D\0\0\0\0\0\0\0\0a\r +(!\n + !\x07 +! +\xA0! |@ +\b" \xA0 cE\r\0 D\0\0\0\0\0\0\0\0b\r\0D{\xAEG\xE1z\x84? 	D\0\0\0\0\0\0\xF8?c\r\v \n \x07\xBB!\x07  \xA2  \f\xA2\xA0"\b\x99!  \xA2  \xA2\xA0"\n \n  	\xA1\xED \x07 	\xA1\xED\xA2"\x07D\0\0\0\0\0\0\xF0?\xA0\xA2 \x07D\0\0\0\0\0\0\xE0\xBFc\x1B"\x07\x99D\x95\xD6&\xE8\v.>dE\r \b\x9A \x07\xA3!\x07@ \n \xA1\x99"\bD{\xAEG\xE1z\x84?d@ \b D\x8D\xED\xB5\xA0\xF7\xC6\xB0\xBE\xA0dE\rA 9 AjA\xEB\fo \b  +\xA0\xBFA\xBC\xD5\0A\xBC\0\v@  \vd@ \rDffffff\xE6?\xA2"\rD333333\xD3?c\r\x07   \xA1"9\xA0 !\x07\f\v \rD\0\0\0\0\0\0\xF0?cE\r\0D\0\0\0\0\0\0\xF0?!\r\v  dE\r\v !\v \b!  \x07 \r\xA2"\xA0\v9\xA0 Aj" \0G\r\0\v \0!\f\vA 9 AjA\xC9o   +\xA0\xBFA\xBC\xD5\0A\xBC\0\vA\b9 AjA\xA4o\x99A\xD8\xD4\0A\xBC\0\vA 9 AjA\xD6\fo   +\xA0\xBFA\xBC\xD5\0A\xBC\0\v  d \bD{\xAEG\xE1z\x84?dr@A 9 AjA\xB0o   +\xA0\xBFA\xBC\xD5\0A\xBC\0\v  9h  9P +\xA0!	\v A\xF0j$\0@ (\xC8" A\xB8jF\x7FA E\rA\v!\0  (\0 \0j(\0\0\v A\xF0\0j\x87 A\xD0j$\0 	\vE\0@  G@ \x7F ,\0\0"\0A\x80I@A\xB8\xBD(\0 \0Atj(\0\f\v -\0\0\v:\0\0 Aj!\f\v\v \v#\0 A\x80I\x7FA\xB8\xBD(\0 A\xFFqAtj(\0 \v\xC0\v	\0 \0\x9A-\v7\0@  G@  (\0"\0A\x80I\x7F \0 \v:\0\0 Aj! Aj!\f\v\v \v\0   A\x80I\x1B\xC0\v*\0@  FE@  ,\0\x006\0 Aj! Aj!\f\v\v \v@\0@  G@ "\0 (\0"A\x80I\x7FA\xC0\xC9(\0 Atj \0\v(\x006\0 \0Aj!\f\v\v \v\0 A\x80I\x7FA\xC0\xC9(\0 Atj(\0 \v\v\v\0   \0\0\v@\0@  G@ "\0 (\0"A\x80I\x7FA\xB8\xBD(\0 Atj \0\v(\x006\0 \0Aj!\f\v\v \v\0 A\x80I\x7FA\xB8\xBD(\0 Atj(\0 \v\v:\0@@  F\r\0 (\0"\0A\x80O\r\0 \0AtA\xB0\xDBj(\0 qE\r\0 Aj!\f\v\v \v:\0@@  F\r\0 (\0"\0A\x80I@ \0AtA\xB0\xDBj(\0 q\r\v Aj!\f\v\v \vB\0@  G@  (\0"\0A\x80I\x7F \0AtA\xB0\xDBj(\0A\0\v6\0 Aj! Aj!\f\v\v \v!\0 A\x80I\x7F AtA\xB0\xDBj(\0 qA\0GA\0\v\v\0 \0 \0(\0(\0\v	\0 \0\x9D-\v\xBE\x07\x7F	|#\0A\xD0k"\x07$\0#\0Ak"$\0 Aj$\0 \x07"B\x007\xF8 B\x007\xF0 B\x007\xE8 B\x007\x88 B\x007\x80 B\x007\x98 B\x007\xA0 B\x007\xA8 B\x80\x80\x80\x80\xC0\xF0\xF5\xCB\xC1\x007\x90 A\x006\xC8  \x9A#\0A\x80k"$\0@ +x"	D-DT\xFB!\xF9\xBF\xA0\x99Da2U0*\xA93?c@  A\bj\xF6 +!\n +! \0 	9\b 	M! \0 \n 	N\xA2  \xA2\xA09\0\f\v  +P"D\0\0\0\0\0\0\0\0 D\0\0\0\0\0\0\0\0a\x1B9P  +H"D\0\0\0\0\0\0\0\0 D\0\0\0\0\0\0\0\0a\x1B9H  D9\x9DR\xA2F\xDF\x91?\xA2"\r D9\x9DR\xA2F\xDF\x91?\xA2"\v\xA1"\nDa-\xA0\x91!r\xD8?\xA2 \v\xA0"9\xA0 D\0\0\0\xD0\x88\xC3\0B A\bj +x A\xFC\0j"\x95" e \nDP\xE9/7\xEF\xC6\xE3?\xA2 \v\xA0!D\0\0\0\0\0\0\0\0!	 -\0@ + !	\v  9\xA0 D\0\0\0\xD0\x88\xC3\0B A\bj +x A\xFC\0j"\x95" e -\0@ + !\f\v@ \nD\xF1h\xE3\x88\xB5\xF8\xE4>c\r\0@| 	 \fd@   \v\xA1"Da-\xA0\x91!r\xD8?\xA2 \v\xA0"\n9\xA0 D\0\0\0\xD0\x88\xC3\0B A\bj +x A\xFC\0j"\x95" e !\r -\0| + D\0\0\0\0\0\0\0\0\v\f\v  \r \xA1"DP\xE9/7\xEF\xC6\xE3?\xA2 \xA0"9\xA0 D\0\0\0\xD0\x88\xC3\0B A\bj +x A\xFC\0j"\x95" eD\0\0\0\0\0\0\0\0!	 -\0@ + !	\v !\v !\n ! \f\v \bA\xE2\0K\r \bAj!\b 	!\f!	 ! \n! D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0\v\v  \v \r\xA0D\0\0\0\0\0\0\xE0?\xA2"9\xA0 D\0\0\0\xD0\x88\xC3\0B A\bj +x A\xFC\0j"\x95" eD\0\0\0\0\0\0\0\0! -\0@ + !\v \0 9\b \0 9\0  9P  9H\v A\x80j$\0@ (\xC8" A\xB8jF\x7FA E\rA\v!\0  (\0 \0j(\0\0\v A\xF0\0j\x87 \x07A\xD0j$\0\v\xF2\0@ -\0\vA\x07vE@ \0 (\b6\b \0 )\x007\0 \0-\0\v\f\v (\0! (!#\0Ak"$\0@@@ AI@ \0" A\xFF\0q:\0\v\f\v A\xF7\xFF\xFF\xFFK\r A\bj AO\x7F AjA~q" Ak" AF\x1BA\vAjv (\f \0 (\b"6\0 \0 (\fA\x80\x80\x80\x80xr6\b \0 6\v@ Aj"\0E\r\0 \0At"\0E\r\0   \0\xFC\n\0\0\v Aj$\0\f\vG\0\v\v\v	\0 \0 \xD4\v;\x7F#\0Ak"$\0     \0/\0A+"\0 )\b7\b \0 )\x007\0 Aj$\0 \0\v\x8B\x07\x7F#\0A\xE0k"\0$\0 \0A\xDCj"	 ("6\0 A\xC0\xC0G@  (Aj6\v 	A\xF0\xC1.!\n\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v@\x7F -\0\vA\x07v@ (\0\f\v \v(\0 \nA- \n(\0(,\0F!\v\v \0A\xC4j"	A\x006\b 	B\x007\0 \0A\xB8j"\x07A\x006\b \x07B\x007\0 \0A\xACj"\bA\x006\b \bB\x007\0  \v \0A\xDCj \0A\xD8j \0A\xD4j \0A\xD0j 	 \x07 \b \0A\xA8j\xA5 \0A\xA66 \0A\x006\b \0 \0(6\f \0Aj!@\x7F\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v \0(\xA8J@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v!\f \0(\xA8"\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\v\x7F \b-\0\vA\x07v@ \b(\f\v \b-\0\vA\xFF\0q\v \f kAtjjjAj\f\v \0(\xA8\x7F \b-\0\vA\x07v@ \b(\f\v \b-\0\vA\xFF\0q\v\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vjjAj\v"A\xE5\0I\r\0 At<! \0(\b! \0 6\b @  \0(\f\0\v \0(\b"\r\0=\0\v  \0Aj \0 (\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAtj \n \v \0A\xD8j \0(\xD4 \0(\xD0 	 \x07 \b \0(\xA8\xA4   \0( \0(\0  b \0(\b! \0A\x006\b @  \0(\f\0\v \b, \x07, 	, \0A\xDCj0 \0A\xE0j$\0\v\xA7\x07\x7F#\0A\xA0\bk"\0$\0 \0 7\x98\b \0 7\x90\b \0 7\0 \0 7\b \0 \0A\xA0\x07j"\x076\x9C\x07 \x07A\xE4\0A\x8F\x1B \0m!	 \0A\xA66\x80 \0A\x006\xF8 \0 \0A\x80j"\v(\x006\xFC \0A\xA66\x80 \0A\x006\xF0 \0 \v(\x006\xF4@ 	A\xE4\0O@ \0A\x9C\x07j7A\x8F\x1B \0A\x90\bj\xA3"	A\x7FF\r \0(\xF8!\x07 \0 \0(\x9C\x076\xF8 \x07@ \x07 \0(\xFC\0\v 	At<!\b \0(\xF0!\x07 \0 \b6\xF0 \x07@ \x07 \0(\xF4\0\v \0(\xF0"\vE\r\v \0A\xECj"\b ("\x076\0 \x07A\xC0\xC0G@ \x07 \x07(Aj6\v \bA\xF0\xC1.""\x07 \0(\x9C\x07"\b \b 	j \v \x07(\0(0\0 	A\0J@ \0(\x9C\x07-\0\0A-F!\f\v  \f \0A\xECj \0A\xE8j \0A\xE4j \0A\xE0j \0A\xD4j"A\x006\b B\x007\0 "\r \0A\xC8j"\x07A\x006\b \x07B\x007\0 \x07 \0A\xBCj"\bA\x006\b \bB\x007\0 \b \0A\xB8j\xA5 \0A\xA66  \0A\x006 \0 \0( 6 \0A j!\x7F \0(\xB8"\n 	H@\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\v\x7F \b-\0\vA\x07v@ \b(\f\v \b-\0\vA\xFF\0q\v 	 \nkAtjj \njAj\f\v \0(\xB8\x7F \b-\0\vA\x07v@ \b(\f\v \b-\0\vA\xFF\0q\v\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vjjAj\v"\nA\xE5\0O@ \nAt<!\n \0(! \0 \n6 @  \0(\0\v \0("E\r\v  \0Aj \0Aj ( \v \v 	Atj  \f \0A\xE8j \0(\xE4 \0(\xE0 \r \x07 \b \0(\xB8\xA4   \0( \0(  b \0(! \0A\x006 @  \0(\0\v \b, \x07, \r, \0A\xECj0 \0(\xF0! \0A\x006\xF0 @  \0(\xF4\0\v \0(\xF8! \0A\x006\xF8 @  \0(\xFC\0\v \0A\xA0\bj$\0\v=\0\v\x85\x07\x7F#\0A\xB0k"\0$\0 \0A\xACj"	 ("6\0 A\xC0\xC0G@  (Aj6\v 	A\xF8\xC1.!\n\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v@\x7F -\0\vA\x07v@ (\0\f\v \v-\0\0 \nA- \n(\0(\0A\xFFqF!\v\v \0A\x98j"	A\x006\b 	B\x007\0 \0A\x8Cj"\x07A\x006\b \x07B\x007\0 \0A\x80j"\bA\x006\b \bB\x007\0  \v \0A\xACj \0A\xA8j \0A\xA7j \0A\xA6j 	 \x07 \b \0A\xFC\0j\xA8 \0A\xA66 \0A\x006\b \0 \0(6\f \0Aj!@\x7F\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v \0(|J@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v!\f \0(|"\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\v\x7F \b-\0\vA\x07v@ \b(\f\v \b-\0\vA\xFF\0q\v \f kAtjjjAj\f\v \0(|\x7F \b-\0\vA\x07v@ \b(\f\v \b-\0\vA\xFF\0q\v\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vjjAj\v"A\xE5\0I\r\0 <! \0(\b! \0 6\b @  \0(\f\0\v \0(\b"\r\0=\0\v  \0Aj \0 (\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vj \n \v \0A\xA8j \0,\0\xA7 \0,\0\xA6 	 \x07 \b \0(|\xA7   \0( \0(\0  c \0(\b! \0A\x006\b @  \0(\f\0\v \b, \x07, 	, \0A\xACj0 \0A\xB0j$\0\v\xDA\x7F#\0A\x90k"$\0#\0Ak"$\0 Aj$\0 A@k"B\x007\xF8 B\x007\xF0 B\x007\xE8 B\x007\x88 B\x007\x80 B\x007\x98 B\x007\xA0 B\x007\xA8 B\x80\x80\x80\x80\xC0\xF0\xF5\xCB\xC1\x007\x90 A\x006\xC8  \x9A  \xF6A! \0 A\xF0\0j" An@ (\xC8"\0 A\xB8jG@A! \0E\r\v \0 \0(\0 j(\0\0\v \x87 A\x90j$\0\v\x9E\x07\x7F#\0A\xC0k"\0$\0 \0 7\xB8 \0 7\xB0 \0 7\0 \0 7\b \0 \0A\xC0j"\x076\xBC \x07A\xE4\0A\x8F\x1B \0m!	 \0A\xA66\xD0 \0A\x006\xC8 \0 \0A\xD0j"\v(\x006\xCC \0A\xA66\xD0 \0A\x006\xC0 \0 \v(\x006\xC4@ 	A\xE4\0O@ \0A\xBCj7A\x8F\x1B \0A\xB0j\xA3"	A\x7FF\r \0(\xC8!\x07 \0 \0(\xBC6\xC8 \x07@ \x07 \0(\xCC\0\v 	<!\b \0(\xC0!\x07 \0 \b6\xC0 \x07@ \x07 \0(\xC4\0\v \0(\xC0"\vE\r\v \0A\xBCj"\b ("\x076\0 \x07A\xC0\xC0G@ \x07 \x07(Aj6\v \bA\xF8\xC1.""\x07 \0(\xBC"\b \b 	j \v \x07(\0( \0 	A\0J@ \0(\xBC-\0\0A-F!\f\v  \f \0A\xBCj \0A\xB8j \0A\xB7j \0A\xB6j \0A\xA8j"A\x006\b B\x007\0 "\r \0A\x9Cj"\x07A\x006\b \x07B\x007\0 \x07 \0A\x90j"\bA\x006\b \bB\x007\0 \b \0A\x8Cj\xA8 \0A\xA66  \0A\x006 \0 \0( 6 \0A j!\x7F \0(\x8C"\n 	H@\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\v\x7F \b-\0\vA\x07v@ \b(\f\v \b-\0\vA\xFF\0q\v 	 \nkAtjj \njAj\f\v \0(\x8C\x7F \b-\0\vA\x07v@ \b(\f\v \b-\0\vA\xFF\0q\v\x7F \x07-\0\vA\x07v@ \x07(\f\v \x07-\0\vA\xFF\0q\vjjAj\v"\nA\xE5\0O@ \n<!\n \0(! \0 \n6 @  \0(\0\v \0("E\r\v  \0Aj \0Aj ( \v 	 \vj  \f \0A\xB8j \0,\0\xB7 \0,\0\xB6 \r \x07 \b \0(\x8C\xA7   \0( \0(  c \0(! \0A\x006 @  \0(\0\v \b, \x07, \r, \0A\xBCj0 \0(\xC0! \0A\x006\xC0 @  \0(\xC4\0\v \0(\xC8! \0A\x006\xC8 @  \0(\xCC\0\v \0A\xC0j$\0\v=\0\v\xC1\b\x7F#\0A\xC0k"\0$\0 \0 6\xB8 \0 6\xBC \0A\xA76 \0Aj" \0A j6\0  \0Aj"	(\x006 \0Aj"\b ("\x076\0 \x07A\xC0\xC0G@ \x07 \x07(Aj6\v \bA\xF0\xC1.!\x07 \0A\0:\0 \0A\xBCj   \b (  \0Aj \x07  	 \0A\xB0j\xAC@#\0Ak"$\0\x7F -\0\vA\x07v@ (\f\v -\0\v\v@ -\0\vA\x07v@ (\0 A\x006\f (\f6\0 A\x006\f\v A\x006\b  (\b6\0 A\0:\0\v\v Aj$\0 \0-\0AF@  \x07A- \x07(\0(,\0\xC9\v \x07A0 \x07(\0(,\0! (\0! \0("Ak!\x07@@  \x07O\r\0 (\0 G\r\0 Aj!\f\v\v#\0Ak"\x07$\0\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\v!\b@  kAu"	E\r\0\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAtjAj \x8AE@ 	 \b kK@  \b  \bk 	j  \xAA\v  \x7F -\0\vA\x07v@ (\0\f\v \v Atj\xA9 \x07A\x006 \x07(6\0  	j!@ -\0\vA\x07v@  6\f\v  A\xFF\0q:\0\v\v\f\v \x07Aj"  \xD1\x7F -\0\vA\x07v@ (\0\f\v \v!	\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v!#\0Ak"\b$\0@  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\v"\n\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v"kM@ E\r\x7F -\0\vA\x07v@ (\0\f\v \v"\n Atj!\v@ E\r\0 At"\fE\r\0 \v 	 \f\xFC\n\0\0\v  j!@ -\0\vA\x07v@  6\f\v  A\xFF\0q:\0\v\v \bA\x006\f \n Atj \b(\f6\0\f\v  \n  \nk j  A\0  	\x83\v \bAj$\0 ,\v \x07Aj$\0\v \0A\xBCj \0A\xB8j5@  (\0Ar6\0\v \0(\xBC \0Aj0 (\0! A\x006\0 @  (\0\v \0A\xC0j$\0\v\xD1\x7F#\0A\xF0k"\0$\0 \0 6\xE8 \0 6\xEC \0A\xA76 \0A\xC8j"\x07 \0A\xD0j6\0 \x07 \0Aj"(\x006 \0A\xC0j"	 ("\b6\0 \bA\xC0\xC0G@ \b \b(Aj6\v 	A\xF0\xC1.!\b \0A\0:\0\xBF@ \0A\xECj   	 (  \0A\xBFj \b \x07 \0A\xC4j \0A\xE0j\xACE\r\0 \0A\xD5+(\0\x006\0\xB7 \0A\xCE+)\0\x007\xB0 \b \0A\xB0j \0A\xBAj \0A\x80j \b(\0(0\0 \0A\xA66 \0A\x006\b \0 (\x006\f !@ \0(\xC4 \x07(\0k"A\x89N@ AuAj<! \0(\b! \0 6\b @  \0(\f\0\v \0(\b"E\r\v \0-\0\xBFAF@ A-:\0\0 Aj!\v \x07(\0!@ \0(\xC4 M@@ A\0:\0\0 \0 6\0 \0Aj \0\xD8AG\r\0 \0(\b! \0A\x006\b @  \0(\f\0\v\f\v  \0A\xB0j \0A\x80j" A(j \xD5 kAuj-\0\0:\0\0 Aj! Aj!\f\v\v=\0\v=\0\v \0A\xECj \0A\xE8j5@  (\0Ar6\0\v \0(\xEC \0A\xC0j0 \x07(\0! \x07A\x006\0 @  \x07(\0\v \0A\xF0j$\0\v1\x7F#\0A\x80k"$\0   \0\0A\x80+"\0 A\x80\xFC\n\0\0 A\x80j$\0 \0\v\xE0\x7F#\0A\x90k"\0$\0 \0 6\x88 \0 6\x8C \0A\xA76 \0Aj"\b \0A j6\0 \b \0Aj"	(\x006 \0Aj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v \x07A\xF8\xC1.! \0A\0:\0 \0A\x8Cj   \x07 (  \0Aj  \b 	 \0A\x84j\xB0@#\0Ak"$\0\x7F -\0\vA\x07v@ (\f\v -\0\v\v@ -\0\vA\x07v@ (\0 A\0:\0 -\0:\0\0 A\x006\f\v A\0:\0  -\0:\0\0 A\0:\0\v\v Aj$\0 \0-\0AF@  A- (\0(\0\xCB\v A0 (\0(\0 \b(\0! \0("Ak!A\xFFq!@@  O\r\0 -\0\0 G\r\0 Aj!\f\v\v#\0Ak"$\0\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v!\x07@  k"	E\r\0\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vjAj \x8AE@ 	 \x07 kK@  \x07  \x07k 	j  \xD3\v\x7F -\0\vA\x07v@ (\0\f\v \v j!\x07@  k"E"\n\r\0 \n\r\0 \x07  \xFC\n\0\0\v A\0:\0  \x07j -\0:\0\0  	j!@ -\0\vA\x07v@  6\f\v  A\xFF\0q:\0\v\v\f\v   \xF2 \x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v\x8A ,\v Aj$\0\v \0A\x8Cj \0A\x88j6@  (\0Ar6\0\v \0(\x8C \0Aj0 \b(\0! \bA\x006\0 @  \b(\0\v \0A\x90j$\0\v\xC7\x7F#\0A\x90k"\0$\0 \0 6\x88 \0 6\x8C \0A\xA76 \0A\x98j"\x07 \0A\xA0j6\0 \x07 \0Aj"(\x006 \0A\x90j"	 ("\b6\0 \bA\xC0\xC0G@ \b \b(Aj6\v 	A\xF8\xC1.!\b \0A\0:\0\x8F@ \0A\x8Cj   	 (  \0A\x8Fj \b \x07 \0A\x94j \0A\x84j\xB0E\r\0 \0A\xD5+(\0\x006\0\x87 \0A\xCE+)\0\x007\x80 \b \0A\x80j \0A\x8Aj \0A\xF6\0j \b(\0( \0 \0A\xA66 \0A\x006\b \0 (\x006\f !@ \0(\x94 \x07(\0k"A\xE3\0N@ Aj<! \0(\b! \0 6\b @  \0(\f\0\v \0(\b"E\r\v \0-\0\x8FAF@ A-:\0\0 Aj!\v \x07(\0!@ \0(\x94 M@@ A\0:\0\0 \0 6\0 \0Aj \0\xD8AG\r\0 \0(\b! \0A\x006\b @  \0(\f\0\v\f\v  \0A\xF6\0j" A\nj \xD9 \0k \0j-\0\n:\0\0 Aj! Aj!\f\v\v=\0\v=\0\v \0A\x8Cj \0A\x88j6@  (\0Ar6\0\v \0(\x8C \0A\x90j0 \x07(\0! \x07A\x006\0 @  \x07(\0\v \0A\x90j$\0\v6\x7F \0@ \0(\f"A	O@  \0A\x006\f\v \0("A	O@ \v \0-\v\v\xBF\x7F#\0A\xA0k"\x07$\0 \x07 \x07A\xA0j"6\f#\0A\x90k"$\0  A\x84j6 \0A\bj A j"\b Aj   \xB3 B\x007  \b6\f \x07(\f \x07Aj"kAu! \0(\b!#\0Ak"\0$\0 \0 6\f \0A\bj \0A\fjS  A\fj  Aj\xD2!(\0"@A\xA8\xA0(\0 @A\xA8\xA0A\xB0\x9F  A\x7FF\x1B6\0\v\v \0Aj$\0 A\x7FF@=\0\v \x07  Atj6\f A\x90j$\0 \x07(\f!#\0Ak"$\0#\0A k"\0$\0 \0Aj  \x8B \0(! \0(!\x07#\0Ak"$\0  6\b  6\f@  \x07G@ A\fj (\0\xF3  Aj"6\b\f\v\v \0 (\b6 \0 (\f6 Aj$\0 \0  \0( kj6\f \0 \0(6\b  \0(\f6\b  \0(\b6\f \0A j$\0 (\f Aj$\0 $\0\v\x87\x7F#\0A\x80k"$\0  A\xF4\0j6\f \0A\bj Aj" A\fj   \xB3 (\f!#\0Ak"$\0#\0A k"\0$\0 \0Aj  \x8B \0(! \0(!\x07#\0Ak"$\0  6\b  6\f@  \x07G@ A\fj ,\0\0\xF6  Aj"6\b\f\v\v \0 (\b6 \0 (\f6 Aj$\0 \0  \0( kj6\f \0 \0(6\b  \0(\f6\b  \0(\b6\f \0A j$\0 (\f Aj$\0 A\x80j$\0\v\xBA\x7F#\0A0k"\x07$\0 \x07 6, A\x006\0 \x07 ("\b6\0 \bA\xC0\xC0G@ \b \b(Aj6\v \x07A\xF0\xC1.!\b \x070\x7F@@@@@@@@@@@@@@@@@@@@@@@@@@ A\xC1\0k9\0\x07\n\0\b	\v\f\r\v\v \0 Aj \x07A,j   \b\xB6\f\v \0 Aj \x07A,j   \b\xB5\f\v \0A\bj \0(\b(\f\0\0! \x07 \0 \x07(,    \x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAtj`6,\f\v \x07A,j   \bAZ! (\0!\0@@ AkAK\r\0 \0Aq\r\0  6\f\f\v  \0Ar6\0\v\f\v \x07A\xC8\xD9)\x007 \x07A\xC0\xD9)\x007 \x07A\xB8\xD9)\x007\b \x07A\xB0\xD9)\x007\0 \x07 \0      \x07 \x07A j`6,\f\v \x07A\xE8\xD9)\x007 \x07A\xE0\xD9)\x007 \x07A\xD8\xD9)\x007\b \x07A\xD0\xD9)\x007\0 \x07 \0      \x07 \x07A j`6,\f\v \x07A,j   \bAZ! (\0!\0@@ AJ\r\0 \0Aq\r\0  6\b\f\v  \0Ar6\0\v\f\v \x07A,j   \bAZ! (\0!\0@@ AkA\vK\r\0 \0Aq\r\0  6\b\f\v  \0Ar6\0\v\f\v \x07A,j   \bAZ! (\0!\0@@ A\xEDJ\r\0 \0Aq\r\0  6\f\v  \0Ar6\0\v\f\v \x07A,j   \bAZ!\0 (\0!@@ \0Ak"\0A\vK\r\0 Aq\r\0  \x006\f\v  Ar6\0\v\f\v \x07A,j   \bAZ! (\0!\0@@ A;J\r\0 \0Aq\r\0  6\f\v  \0Ar6\0\v\f\v \x07A,j!#\0Ak"$\0  6\f@@  A\fj5\r\0 \bA\x7F (\0"(\f"\0 (F@  (\0($\0\0\f\v \0(\0\v \b(\0(\f\0E\r\0 ?\f\v\v  A\fj5@  (\0Ar6\0\v Aj$\0\f\r\v \x07A,j!@\x7F \0A\bj \0(\b(\b\0\0"-\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vA\0\x7F -\0A\x07v@ (\f\v -\0A\xFF\0q\vkF@  (\0Ar6\0\f\v    Aj \b A\0\xA7!\0 (\b!@ \0 G\r\0 A\fG\r\0 A\x006\b\f\v@ \0 kA\fG\r\0 A\vJ\r\0  A\fj6\b\v\v\f\f\v \x07A\xF0\xD9A,\xFC\n\0\0 \x07 \0      \x07 \x07A,j`6,\f\v\v \x07A\xB0\xDA(\x006 \x07A\xA8\xDA)\x007\b \x07A\xA0\xDA)\x007\0 \x07 \0      \x07 \x07Aj`6,\f\n\v \x07A,j   \bAZ! (\0!\0@@ A<J\r\0 \0Aq\r\0  6\0\f\v  \0Ar6\0\v\f	\v \x07A\xD8\xDA)\x007 \x07A\xD0\xDA)\x007 \x07A\xC8\xDA)\x007\b \x07A\xC0\xDA)\x007\0 \x07 \0      \x07 \x07A j`6,\f\b\v \x07A,j   \bAZ! (\0!\0@@ AJ\r\0 \0Aq\r\0  6\f\v  \0Ar6\0\v\f\x07\v \0      \0(\0(\x07\0\f\x07\v \0A\bj \0(\b(\0\0! \x07 \0 \x07(,    \x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAtj`6,\f\v Aj \x07A,j   \b\xB4\f\v \x07A,j   \bAZ!\0 -\0\0AqE@  \0A\xECk6\v\f\v A%F\r\v  (\0Ar6\0\f\v#\0Ak"$\0  6\f@ \x7FA \x07A,j" A\fj"5\r\0A \b\x7F (\0"(\f"\0 (F@  (\0($\0\0\f\v \0(\0\vA\0 \b(\0(4\0A%G\r\0 ? 5E\rA\v (\0r6\0\v Aj$\0\v \x07(,\v \x07A0j$\0\v5\x7FA+"\06 \0A\xC8\x9F6\0! \0A\x006 \0 6\f \0A\xC8\x9F6\b \0\vi\x7F#\0Ak"\0$\0 \0 6\f \0A\bj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF0\xC1.! 0 Aj \0A\fj   \xB4 \0(\f \0Aj$\0\vk\x7F#\0Ak"$\0  6\f A\bj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v \x07A\xF0\xC1.! \x070 \0 Aj A\fj   \xB5 (\f Aj$\0\vk\x7F#\0Ak"$\0  6\f A\bj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v \x07A\xF0\xC1.! \x070 \0 Aj A\fj   \xB6 (\f Aj$\0\vp\0 \0     \x7F \0A\bj \0(\b(\0\0"\0-\0\vA\x07v@ \0(\0\f\v \0\v\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\vAtj`\vX\x7F#\0A k"$\0 A\xD8\xDA)\x007 A\xD0\xDA)\x007 A\xC8\xDA)\x007\b A\xC0\xDA)\x007\0 \0       A j"` $\0\v\xE4\x7F#\0Ak"\x07$\0 \x07 6\f A\x006\0 \x07 ("\b6\0 \bA\xC0\xC0G@ \b \b(Aj6\v \x07A\xF8\xC1.!\b \x070\x7F@@@@@@@@@@@@@@@@@@@@@@@@@@ A\xC1\0k9\0\x07\n\0\b	\v\f\r\v\v \0 Aj \x07A\fj   \b\xB9\f\v \0 Aj \x07A\fj   \b\xB8\f\v \0A\bj \0(\b(\f\0\0! \x07 \0 \x07(\f    \x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vja6\f\f\v \x07A\fj   \bA[! (\0!\0@@ AkAK\r\0 \0Aq\r\0  6\f\f\v  \0Ar6\0\v\f\v \x07B\xA5\xDA\xBD\xA9\xC2\xEC\xCB\x92\xF9\x007\0 \x07 \0      \x07 \x07A\bja6\f\f\v \x07B\xA5\xB2\xB5\xA9\xD2\xAD\xCB\x92\xE4\x007\0 \x07 \0      \x07 \x07A\bja6\f\f\v \x07A\fj   \bA[! (\0!\0@@ AJ\r\0 \0Aq\r\0  6\b\f\v  \0Ar6\0\v\f\v \x07A\fj   \bA[! (\0!\0@@ AkA\vK\r\0 \0Aq\r\0  6\b\f\v  \0Ar6\0\v\f\v \x07A\fj   \bA[! (\0!\0@@ A\xEDJ\r\0 \0Aq\r\0  6\f\v  \0Ar6\0\v\f\v \x07A\fj   \bA[!\0 (\0!@@ \0Ak"\0A\vK\r\0 Aq\r\0  \x006\f\v  Ar6\0\v\f\v \x07A\fj   \bA[! (\0!\0@@ A;J\r\0 \0Aq\r\0  6\f\v  \0Ar6\0\v\f\v \x07A\fj!#\0Ak"$\0  6\f@@  A\fj6\r\0\x7F (\0"(\f"\0 (F@  (\0($\0\0\f\v \0-\0\0\v\xC0"\0A\x80I\x7F \b(\b \0Atj(\0AqA\0\vE\r\0 @\f\v\v  A\fj6@  (\0Ar6\0\v Aj$\0\f\r\v \x07A\fj!@\x7F \0A\bj \0(\b(\b\0\0"-\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vA\0\x7F -\0A\x07v@ (\f\v -\0A\xFF\0q\vkF@  (\0Ar6\0\f\v    Aj \b A\0\xA8!\0 (\b!@ \0 G\r\0 A\fG\r\0 A\x006\b\f\v@ \0 kA\fG\r\0 A\vJ\r\0  A\fj6\b\v\v\f\f\v \x07A\x98\xD9(\0\x006\0\x07 \x07A\x91\xD9)\0\x007\0 \x07 \0      \x07 \x07A\vja6\f\f\v\v \x07A\xA0\xD9-\0\0:\0 \x07A\x9C\xD9(\0\x006\0 \x07 \0      \x07 \x07Aja6\f\f\n\v \x07A\fj   \bA[! (\0!\0@@ A<J\r\0 \0Aq\r\0  6\0\f\v  \0Ar6\0\v\f	\v \x07B\xA5\x90\xE9\xA9\xD2\xC9\xCE\x92\xD3\x007\0 \x07 \0      \x07 \x07A\bja6\f\f\b\v \x07A\fj   \bA[! (\0!\0@@ AJ\r\0 \0Aq\r\0  6\f\v  \0Ar6\0\v\f\x07\v \0      \0(\0(\x07\0\f\x07\v \0A\bj \0(\b(\0\0! \x07 \0 \x07(\f    \x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\0\f\v \v\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vja6\f\f\v Aj \x07A\fj   \b\xB7\f\v \x07A\fj   \bA[!\0 -\0\0AqE@  \0A\xECk6\v\f\v A%F\r\v  (\0Ar6\0\f\v#\0Ak"$\0  6\f@ \x7FA \x07A\fj" A\fj"6\r\0A \b\x7F (\0"(\f"\0 (F@  (\0($\0\0\f\v \0-\0\0\v\xC0A\0 \b(\0($\0A%G\r\0 @ 6E\rA\v (\0r6\0\v Aj$\0\v \x07(\f\v \x07Aj$\0\v\0  \0(\0j A\xFC\0\xFC\n\0\0\vi\x7F#\0Ak"\0$\0 \0 6\f \0A\bj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF8\xC1.! 0 Aj \0A\fj   \xB7 \0(\f \0Aj$\0\vk\x7F#\0Ak"$\0  6\f A\bj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v \x07A\xF8\xC1.! \x070 \0 Aj A\fj   \xB8 (\f Aj$\0\vk\x7F#\0Ak"$\0  6\f A\bj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v \x07A\xF8\xC1.! \x070 \0 Aj A\fj   \xB9 (\f Aj$\0\vm\0 \0     \x7F \0A\bj \0(\b(\0\0"\0-\0\vA\x07v@ \0(\0\f\v \0\v\x7F \0-\0\vA\x07v@ \0(\0\f\v \0\v\x7F \0-\0\vA\x07v@ \0(\f\v \0-\0\vA\xFF\0q\vja\v;\x7F#\0Ak"$\0 B\xA5\x90\xE9\xA9\xD2\xC9\xCE\x92\xD3\x007\b \0      A\bj Aj"a $\0\v \x7F \0(\0!\0A\x80+" \0 jA\x80\xFC\n\0\0 \v\xB0\x7F#\0A\xC0k"\0$\0 \0 6\xBC \0A\xA0j"  A7A\xC6 \0A\xBCjz"\bj" I!\x07 \0 ("6\0 A\xC0\xC0G@  (Aj6\v \0A\xF0\xC1.! \00    \0 (\0(0\0  \0 \0 \bAtj" \0 \x07 kAtj  \x07F\x1B   b \0A\xC0j$\0\v\xDC\x7F\x7F#\0A\xD0k"$\0  7\xC8  7\xC0 B%7\xB8 A\xB8j"\x07ArA\xBF$ (\xA4!	  A\x90j"\b6\x8C7!\0\x7F 	@  (\b6  \b \0 \x07 A j A\xC0j\xC0\f\v A\x90j \0 A\xB8j A\xC0j\xBF\v!\0 A\xA66  A\x006\x84  A j"\b(\x006\x88 A\x90j!\x07@ \0AN@7!\0\x7F 	@  (\b6  A\x8Cj \0 A\xB8j \b A\xC0j\xBE\f\v A\x8Cj \0 A\xB8j A\xC0j\xA3\v"\0A\x7FF\r (\x84!\x07  (\x8C6\x84 \x07@ \x07 (\x88\0\v (\x8C!\x07\v \x07 \0 \x07j"\n I!\v A\xA66  A\x006  A j"\x07(\x006@ (\x8C"	 A\x90jF@ \x07!\0\f\v \0At<"\0E\r (!\x07  \x006 \x07@ \x07 (\0\v (\x8C!	\v A\fj"\b ("\x076\0 \x07A\xC0\xC0G@ \x07 \x07(Aj6\v 	 \v \n \0 Aj Aj \b\xBC \b0  \0 ( (  b (!\0 A\x006 \0@ \0 (\0\v (\x84!\0 A\x006\x84 \0@ \0 (\x88\0\v A\xD0j$\0\f\v=\0\v\v\xD4\x7F\x7F#\0A\xC0k"$\0  9\xB8 B%7\xB0 A\xB0j"ArA\x923 (\xA4!\b  A\x90j"\x076\x8C7!\0\x7F \b@  (\b6  \x07 \0  A j A\xB8j\xC5\f\v A\x90j \0 A\xB0j A\xB8j\xC4\v!\0 A\xA66  A\x006\x84  A j"\x07(\x006\x88 A\x90j!@ \0AN@7!\0\x7F \b@  (\b6  A\x8Cj \0 A\xB0j \x07 A\xB8j\xC3\f\v A\x8Cj \0 A\xB0j A\xB8j\xC2\v"\0A\x7FF\r (\x84!  (\x8C6\x84 @  (\x88\0\v (\x8C!\v  \0 j"	 I!\n A\xA66  A\x006  A j"(\x006@ (\x8C"\b A\x90jF@ !\0\f\v \0At<"\0E\r (!  \x006 @  (\0\v (\x8C!\b\v A\fj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v \b \n 	 \0 Aj Aj \x07\xBC \x070  \0 ( (  b (!\0 A\x006 \0@ \0 (\0\v (\x84!\0 A\x006\x84 \0@ \0 (\x88\0\v A\xC0j$\0\f\v=\0\v\v\xBB\x7F#\0A\x80k"\0$\0 \0 7\xF8 \0B%7\xF0 \0A\xF0j"ArA\xEBA\0 (j \0A\xD0j" 7  \0A\xF8j\xA5 j"\b I!	 \0Aj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v  	 \b \0Aj" \0A\fj \0A\bj \x07\xA2 \x070   \0(\f \0(\b  b \0A\x80j$\0\v\xBC\x7F#\0A\x90k"\0$\0 \0 6\x8C \0B%7\x80 \0A\x80j"ArA\xF2A\0 (j \0A\xF3\0j" A\r7  \0A\x8Cjz j"\x07 I!\b \0Aj" ("6\0 A\xC0\xC0G@  (Aj6\v  \b \x07 \0Aj" \0A\fj \0A\bj \xA2 0   \0(\f \0(\b  b \0A\x90j$\0\vZ\0  \0(\0j"\0 )878 \0 )070 \0 )(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0\v\xBB\x7F#\0A\x80k"\0$\0 \0 7\xF8 \0B%7\xF0 \0A\xF0j"ArA\xEBA (j \0A\xD0j" 7  \0A\xF8j\xA5 j"\b I!	 \0Aj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v  	 \b \0Aj" \0A\fj \0A\bj \x07\xA2 \x070   \0(\f \0(\b  b \0A\x80j$\0\v\xBC\x7F#\0A\x90k"\0$\0 \0 6\x8C \0B%7\x80 \0A\x80j"ArA\xF2A (j \0A\xF3\0j" A\r7  \0A\x8Cjz j"\x07 I!\b \0Aj" ("6\0 A\xC0\xC0G@  (Aj6\v  \b \x07 \0Aj" \0A\fj \0A\bj \xA2 0   \0(\f \0(\b  b \0A\x90j$\0\v\xFD\x7F#\0A k"$\0  6@ (AqE@ \0     \0(\0(\b\0!\f\v Aj" ("\x006\0 \0A\xC0\xC0G@ \0 \0(Aj6\v A\xB8\xC2.!\0 0@ @  \0 \0(\0(\0\f\v Aj \0 \0(\0(\0\v  AjJ6\f@  Aj"\0i6\b (\f (\bF@ (! \0, Aj (\f(\0\xF3  (\fAj6\f\f\v\v\v A j$\0 \v\x07\0 \0(\f\v\xA8\x7F#\0A\xD0\0k"\0$\0 \0 6L \0A0j"  A7A\xC6 \0A\xCC\0jz"\bj" I!\x07 \0 ("6\0 A\xC0\xC0G@  (Aj6\v \0A\xF8\xC1.! \00    \0 (\0( \0  \0 \0 \bj" \0 \x07 kj  \x07F\x1B   c \0A\xD0\0j$\0\vg\x7F \0(\0!A\xC0\0+"\0  j")878 \0 )070 \0 )(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0 \0\v\xCF\x7F\x7F#\0A\xB0k"$\0  7\xA8  7\xA0 B%7\x98 A\x98j"\x07ArA\xBF$ (\xA4!	  A\xF0\0j"\b6l7!\0\x7F 	@  (\b6  \b \0 \x07 A j A\xA0j\xC0\f\v A\xF0\0j \0 A\x98j A\xA0j\xBF\v!\0 A\xA66  A\x006d  A j"\b(\x006h A\xF0\0j!\x07@ \0AN@7!\0\x7F 	@  (\b6  A\xEC\0j \0 A\x98j \b A\xA0j\xBE\f\v A\xEC\0j \0 A\x98j A\xA0j\xA3\v"\0A\x7FF\r (d!\x07  (l6d \x07@ \x07 (h\0\v (l!\x07\v \x07 \0 \x07j"\n I!\v A\xA66  A\x006  A j"\x07(\x006@ (l"	 A\xF0\0jF@ \x07!\0\f\v \0At<"\0E\r (!\x07  \x006 \x07@ \x07 (\0\v (l!	\v A\fj"\b ("\x076\0 \x07A\xC0\xC0G@ \x07 \x07(Aj6\v 	 \v \n \0 Aj Aj \b\xC1 \b0  \0 ( (  c (!\0 A\x006 \0@ \0 (\0\v (d!\0 A\x006d \0@ \0 (h\0\v A\xB0j$\0\f\v=\0\v\v\x7FA\xC0+"\0A\0A\xC0\xFC\v\0 \0\v\x07\0 \0(\b\v\xC7\x7F\x7F#\0A\xA0k"$\0  9\x98 B%7\x90 A\x90j"ArA\x923 (\xA4!\b  A\xF0\0j"\x076l7!\0\x7F \b@  (\b6  \x07 \0  A j A\x98j\xC5\f\v A\xF0\0j \0 A\x90j A\x98j\xC4\v!\0 A\xA66  A\x006d  A j"\x07(\x006h A\xF0\0j!@ \0AN@7!\0\x7F \b@  (\b6  A\xEC\0j \0 A\x90j \x07 A\x98j\xC3\f\v A\xEC\0j \0 A\x90j A\x98j\xC2\v"\0A\x7FF\r (d!  (l6d @  (h\0\v (l!\v  \0 j"	 I!\n A\xA66  A\x006  A j"(\x006@ (l"\b A\xF0\0jF@ !\0\f\v \0At<"\0E\r (!  \x006 @  (\0\v (l!\b\v A\fj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v \b \n 	 \0 Aj Aj \x07\xC1 \x070  \0 ( (  c (!\0 A\x006 \0@ \0 (\0\v (d!\0 A\x006d \0@ \0 (h\0\v A\xA0j$\0\f\v=\0\v\v\xB8\x7F#\0A\xF0\0k"\0$\0 \0 7h \0B%7` \0A\xE0\0j"ArA\xEBA\0 (j \0A@k" 7  \0A\xE8\0j\xA5 j"\b I!	 \0Aj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v  	 \b \0Aj" \0A\fj \0A\bj \x07\xA6 \x070   \0(\f \0(\b  c \0A\xF0\0j$\0\v\xB8\x7F#\0A\xD0\0k"\0$\0 \0 6L \0B%7@ \0A@k"ArA\xF2A\0 (j \0A3j" A\r7  \0A\xCC\0jz j"\x07 I!\b \0Aj" ("6\0 A\xC0\xC0G@  (Aj6\v  \b \x07 \0Aj" \0A\fj \0A\bj \xA6 0   \0(\f \0(\b  c \0A\xD0\0j$\0\v\xB8\x7F#\0A\xF0\0k"\0$\0 \0 7h \0B%7` \0A\xE0\0j"ArA\xEBA (j \0A@k" 7  \0A\xE8\0j\xA5 j"\b I!	 \0Aj"\x07 ("6\0 A\xC0\xC0G@  (Aj6\v  	 \b \0Aj" \0A\fj \0A\bj \x07\xA6 \x070   \0(\f \0(\b  c \0A\xF0\0j$\0\v\x7FA\x80+"\0A\0A\x80\xFC\v\0 \0\v\xB8\x7F#\0A\xD0\0k"\0$\0 \0 6L \0B%7@ \0A@k"ArA\xF2A (j \0A3j" A\r7  \0A\xCC\0jz j"\x07 I!\b \0Aj" ("6\0 A\xC0\xC0G@  (Aj6\v  \b \x07 \0Aj" \0A\fj \0A\bj \xA6 0   \0(\f \0(\b  c \0A\xD0\0j$\0\v\xFD\x7F#\0A k"$\0  6@ (AqE@ \0     \0(\0(\b\0!\f\v Aj" ("\x006\0 \0A\xC0\xC0G@ \0 \0(Aj6\v A\xB0\xC2.!\0 0@ @  \0 \0(\0(\0\f\v Aj \0 \0(\0(\0\v  AjJ6\f@  Aj"\0k6\b (\f (\bF@ (! \0, Aj (\f,\0\0\xF6  (\fAj6\f\f\v\v\v A j$\0 \v\x85\x7F#\0A\xC0k"\0$\0 \0 6\xB8 \0 6\xBC \0A\xC4j"\x07A\x006\b \x07B\x007\0 \0Aj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF0\xC1."A\xF0\xD8A\x8A\xD9 \0A\xD0j (\0(0\0 0 \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 6\f \0A\x006\b@@ \0A\xBCj \0A\xB8j5\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xBCj"(\0"(\f"\b (F@  (\0($\0\0\f\v \b(\0\vA  \0A\xB4j \0A\bjA\0 \x07 \0Aj \0A\fj \0A\xD0j{\r\0 ?\f\v\v  \0(\xB4 k/\x7F -\0\vA\x07v@ (\0\f\v \v7 \0 6 \0Aj\xC7AG@ A6\0\v \0A\xBCj \0A\xB8j5@  (\0Ar6\0\v \0(\xBC , \x07, \0A\xC0j$\0\v\xCD\x7F~\x7F#\0A\xF0k"\0$\0 \0 6\xE8 \0 6\xEC \0A\xDCj  \0A\xF0j \0A\xECj \0A\xE8j\xD7 \0A\xD0j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xCC \0 \0A j6 \0A\x006 \0A:\0 \0A\xC5\0:\0A\0!@@@@ \0A\xECj \0A\xE8j5\r\0 \0(\xCC\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xCC\v\x7F \0(\xEC"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v \0Aj \0Aj  \0A\xCCj \0(\xEC \0(\xE8 \0A\xDCj \0A j \0Aj \0Aj \0A\xF0j\xD6\r\0 \rA\0! \0(\xCC k"\x07A\0L\r@@ -\0\0"A+k"\b\0\0\v A.F\rA! A0kA\xFFqA\nI\r\f\v \x07AF\r@ \b\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@\x7F \0-\0\xE7A\x07v@ \0(\xE0\f\v \0-\0\xE7A\xFF\0q\vE\r\0 \0-\0AqE\r\0 \0(" \0A jkA\x9FJ\r\0 \0 Aj6  \0(6\0\v \0  \0(\xCC \xC8 \0)\0!	  \0)\b7\b  	7\0 \0A\xDCj \0A j \0( C \0A\xECj \0A\xE8j5@  (\0Ar6\0\v \0(\xEC , \0A\xDCj, \0A\xF0j$\0\f\vA!\v \0A\xECj?\f\0\v\0\v\v\xB6\x7F\x7F#\0A\xE0k"\0$\0 \0 6\xD8 \0 6\xDC \0A\xCCj  \0A\xE0j \0A\xDCj \0A\xD8j\xD7 \0A\xC0j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xBC \0 \0Aj6\f \0A\x006\b \0A:\0\x07 \0A\xC5\0:\0A\0!@@@@ \0A\xDCj \0A\xD8j5\r\0 \0(\xBC\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xBC\v\x7F \0(\xDC"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v \0A\x07j \0Aj  \0A\xBCj \0(\xDC \0(\xD8 \0A\xCCj \0Aj \0A\fj \0A\bj \0A\xE0j\xD6\r\0 \rA\0! \0(\xBC k"\x07A\0L\r@@ -\0\0"A+k"\b\0\0\v A.F\rA! A0kA\xFFqA\nI\r\f\v \x07AF\r@ \b\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@\x7F \0-\0\xD7A\x07v@ \0(\xD0\f\v \0-\0\xD7A\xFF\0q\vE\r\0 \0-\0\x07AqE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xBC \xC99\0 \0A\xCCj \0Aj \0(\f C \0A\xDCj \0A\xD8j5@  (\0Ar6\0\v \0(\xDC , \0A\xCCj, \0A\xE0j$\0\f\vA!\v \0A\xDCj?\f\0\v\0\v\v\xE7\x7F|#\0Ak"$\0 (A\xE4\n\f"\n! A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v A	O@ 	\v  6\b A\x006A\xB8\x9E(\0 A\0 Aj A\bj! ("@ \v \0 9  A	O@ \v (A\xB8\n\f"\n! A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v A	O@ 	\v  6\b A\x006A\xB8\x9E(\0 A\0 Aj A\bj! ("@ \v \0 9( A	O@ \v (A\x92\b\f"\n! A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v A	O@ 	\v  6\b A\x006A\xB8\x9E(\0 A\0 Aj A\bj! ("@ \v \0 90 A	O@ \v Aj$\0\v\xB6\x7F\x7F#\0A\xE0k"\0$\0 \0 6\xD8 \0 6\xDC \0A\xCCj  \0A\xE0j \0A\xDCj \0A\xD8j\xD7 \0A\xC0j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xBC \0 \0Aj6\f \0A\x006\b \0A:\0\x07 \0A\xC5\0:\0A\0!@@@@ \0A\xDCj \0A\xD8j5\r\0 \0(\xBC\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xBC\v\x7F \0(\xDC"(\f"\x07 (F@  (\0($\0\0\f\v \x07(\0\v \0A\x07j \0Aj  \0A\xBCj \0(\xDC \0(\xD8 \0A\xCCj \0Aj \0A\fj \0A\bj \0A\xE0j\xD6\r\0 \rA\0! \0(\xBC k"\x07A\0L\r@@ -\0\0"A+k"\b\0\0\v A.F\rA! A0kA\xFFqA\nI\r\f\v \x07AF\r@ \b\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@\x7F \0-\0\xD7A\x07v@ \0(\xD0\f\v \0-\0\xD7A\xFF\0q\vE\r\0 \0-\0\x07AqE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xBC \xCA8\0 \0A\xCCj \0Aj \0(\f C \0A\xDCj \0A\xD8j5@  (\0Ar6\0\v \0(\xDC , \0A\xCCj, \0A\xE0j$\0\f\vA!\v \0A\xDCj?\f\0\v\0\v\v\x84\x7F#\0A\xD0k"\0$\0 \0 6\xC8 \0 6\xCC \\!  \0A\xD0j\x8E!\x07 \0A\xC4j  \0A\xC4j\x8D \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xCCj \0A\xC8j5\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xCCj"\b(\0"(\f"	 (F@  (\0($\0\0\f\v 	(\0\v   \0A\xB4j \0A\bj \0(\xC4 \0A\xC4j \0Aj \0A\fj \x07{\r\0 \b?\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xCB7\0 \0A\xC4j \0Aj \0(\f C \0A\xCCj \0A\xC8j5@  (\0Ar6\0\v \0(\xCC , \0A\xC4j, \0A\xD0j$\0\v\x84\x7F#\0A\xD0k"\0$\0 \0 6\xC8 \0 6\xCC \\!  \0A\xD0j\x8E!\x07 \0A\xC4j  \0A\xC4j\x8D \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xCCj \0A\xC8j5\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xCCj"\b(\0"(\f"	 (F@  (\0($\0\0\f\v 	(\0\v   \0A\xB4j \0A\bj \0(\xC4 \0A\xC4j \0Aj \0A\fj \x07{\r\0 \b?\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xCE;\0 \0A\xC4j \0Aj \0(\f C \0A\xCCj \0A\xC8j5@  (\0Ar6\0\v \0(\xCC , \0A\xC4j, \0A\xD0j$\0\v\x84\x7F#\0A\xD0k"\0$\0 \0 6\xC8 \0 6\xCC \\!  \0A\xD0j\x8E!\x07 \0A\xC4j  \0A\xC4j\x8D \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xCCj \0A\xC8j5\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xCCj"\b(\0"(\f"	 (F@  (\0($\0\0\f\v 	(\0\v   \0A\xB4j \0A\bj \0(\xC4 \0A\xC4j \0Aj \0A\fj \x07{\r\0 \b?\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xCF7\0 \0A\xC4j \0Aj \0(\f C \0A\xCCj \0A\xC8j5@  (\0Ar6\0\v \0(\xCC , \0A\xC4j, \0A\xD0j$\0\v9\0 \06 \0A\xC8\x9F6\0 \0A\xE4\n A j\x88 \0A\xB8\n A(j\x88 \0A\x92\b A0j\x88\v\x84\x7F#\0A\xD0k"\0$\0 \0 6\xC8 \0 6\xCC \\!  \0A\xD0j\x8E!\x07 \0A\xC4j  \0A\xC4j\x8D \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xCCj \0A\xC8j5\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xCCj"\b(\0"(\f"	 (F@  (\0($\0\0\f\v 	(\0\v   \0A\xB4j \0A\bj \0(\xC4 \0A\xC4j \0Aj \0A\fj \x07{\r\0 \b?\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xD06\0 \0A\xC4j \0Aj \0(\f C \0A\xCCj \0A\xC8j5@  (\0Ar6\0\v \0(\xCC , \0A\xC4j, \0A\xD0j$\0\v\xBD\x7F#\0A k"$\0  6@ (AqE@ A\x7F6\0 \0      \0(\0(\x07\0!@@@ (\0\0\v A\0:\0\0\f\v A:\0\0\f\v A:\0\0 A6\0\f\v  ("\x006\0 \0A\xC0\xC0G@ \0 \0(Aj6\v A\xF0\xC1.! 0  ("\x006\0 \0A\xC0\xC0G@ \0 \0(Aj6\v A\xB8\xC2.!\0 0  \0 \0(\0(\0 A\fr \0 \0(\0(\0  Aj   Aj"  A\xA7 F:\0\0 (!@ A\fk," G\r\0\v\v A j$\0 \v\x86\x7F#\0A\x80k"\0$\0 \0 6\xF8 \0 6\xFC \0A\xC4j"\x07A\x006\b \x07B\x007\0 \0Aj" ("6\0 A\xC0\xC0G@  (Aj6\v A\xF8\xC1."A\xF0\xD8A\x8A\xD9 \0A\xD0j (\0( \0 0 \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 6\f \0A\x006\b@@ \0A\xFCj \0A\xF8j6\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xFCj"(\0"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\v\xC0A  \0A\xB4j \0A\bjA\0 \x07 \0Aj \0A\fj \0A\xD0j|\r\0 @\f\v\v  \0(\xB4 k/\x7F -\0\vA\x07v@ (\0\f\v \v7 \0 6 \0Aj\xC7AG@ A6\0\v \0A\xFCj \0A\xF8j6@  (\0Ar6\0\v \0(\xFC , \x07, \0A\x80j$\0\v\xCE\x7F~\x7F#\0A\x90k"\0$\0 \0 6\x88 \0 6\x8C \0A\xD0j  \0A\xE0j \0A\xDFj \0A\xDEj\xDB \0A\xC4j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xC0 \0 \0A j6 \0A\x006 \0A:\0 \0A\xC5\0:\0A\0!@@@@ \0A\x8Cj \0A\x88j6\r\0 \0(\xC0\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xC0\v\x7F \0(\x8C"(\f"\x07 (F@  (\0($\0\0\f\v \x07-\0\0\v\xC0 \0Aj \0Aj  \0A\xC0j \0,\0\xDF \0,\0\xDE \0A\xD0j \0A j \0Aj \0Aj \0A\xE0j\xDA\r\0 \rA\0! \0(\xC0 k"\x07A\0L\r@@ -\0\0"A+k"\b\0\0\v A.F\rA! A0kA\xFFqA\nI\r\f\v \x07AF\r@ \b\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@\x7F \0-\0\xDBA\x07v@ \0(\xD4\f\v \0-\0\xDBA\xFF\0q\vE\r\0 \0-\0AqE\r\0 \0(" \0A jkA\x9FJ\r\0 \0 Aj6  \0(6\0\v \0  \0(\xC0 \xC8 \0)\0!	  \0)\b7\b  	7\0 \0A\xD0j \0A j \0( C \0A\x8Cj \0A\x88j6@  (\0Ar6\0\v \0(\x8C , \0A\xD0j, \0A\x90j$\0\f\vA!\v \0A\x8Cj@\f\0\v\0\v\vH\x7F#\0Ak"$\0 \0(\0!\0  6\f A\xC8\x9F6\b  A\bj \0\0 (\f"\0A	O@ \0\v Aj$\0\v\xB7\x7F\x7F#\0A\x80k"\0$\0 \0 6\xF8 \0 6\xFC \0A\xC0j  \0A\xD0j \0A\xCFj \0A\xCEj\xDB \0A\xB4j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB0 \0 \0Aj6\f \0A\x006\b \0A:\0\x07 \0A\xC5\0:\0A\0!@@@@ \0A\xFCj \0A\xF8j6\r\0 \0(\xB0\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB0\v\x7F \0(\xFC"(\f"\x07 (F@  (\0($\0\0\f\v \x07-\0\0\v\xC0 \0A\x07j \0Aj  \0A\xB0j \0,\0\xCF \0,\0\xCE \0A\xC0j \0Aj \0A\fj \0A\bj \0A\xD0j\xDA\r\0 \rA\0! \0(\xB0 k"\x07A\0L\r@@ -\0\0"A+k"\b\0\0\v A.F\rA! A0kA\xFFqA\nI\r\f\v \x07AF\r@ \b\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@\x7F \0-\0\xCBA\x07v@ \0(\xC4\f\v \0-\0\xCBA\xFF\0q\vE\r\0 \0-\0\x07AqE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB0 \xC99\0 \0A\xC0j \0Aj \0(\f C \0A\xFCj \0A\xF8j6@  (\0Ar6\0\v \0(\xFC , \0A\xC0j, \0A\x80j$\0\f\vA!\v \0A\xFCj@\f\0\v\0\v\v\xB7\x7F\x7F#\0A\x80k"\0$\0 \0 6\xF8 \0 6\xFC \0A\xC0j  \0A\xD0j \0A\xCFj \0A\xCEj\xDB \0A\xB4j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB0 \0 \0Aj6\f \0A\x006\b \0A:\0\x07 \0A\xC5\0:\0A\0!@@@@ \0A\xFCj \0A\xF8j6\r\0 \0(\xB0\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB0\v\x7F \0(\xFC"(\f"\x07 (F@  (\0($\0\0\f\v \x07-\0\0\v\xC0 \0A\x07j \0Aj  \0A\xB0j \0,\0\xCF \0,\0\xCE \0A\xC0j \0Aj \0A\fj \0A\bj \0A\xD0j\xDA\r\0 \rA\0! \0(\xB0 k"\x07A\0L\r@@ -\0\0"A+k"\b\0\0\v A.F\rA! A0kA\xFFqA\nI\r\f\v \x07AF\r@ \b\0\0\v -\0"A.F\rA! A0kA\xFFqA	M\r\v@\x7F \0-\0\xCBA\x07v@ \0(\xC4\f\v \0-\0\xCBA\xFF\0q\vE\r\0 \0-\0\x07AqE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB0 \xCA8\0 \0A\xC0j \0Aj \0(\f C \0A\xFCj \0A\xF8j6@  (\0Ar6\0\v \0(\xFC , \0A\xC0j, \0A\x80j$\0\f\vA!\v \0A\xFCj@\f\0\v\0\v\v\xFA\x7F#\0A\x80k"\0$\0 \0 6\xF8 \0 6\xFC \\! \0A\xC4j  \0A\xF7j\x8F \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xFCj \0A\xF8j6\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xFCj"\x07(\0"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\v\xC0   \0A\xB4j \0A\bj \0,\0\xF7 \0A\xC4j \0Aj \0A\fjA\xF0\xD8|\r\0 \x07@\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xCB7\0 \0A\xC4j \0Aj \0(\f C \0A\xFCj \0A\xF8j6@  (\0Ar6\0\v \0(\xFC , \0A\xC4j, \0A\x80j$\0\v(\x7F#\0Ak"$\0 A\bj  \0(\0\0 (\f Aj$\0\v\xFA\x7F#\0A\x80k"\0$\0 \0 6\xF8 \0 6\xFC \\! \0A\xC4j  \0A\xF7j\x8F \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xFCj \0A\xF8j6\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xFCj"\x07(\0"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\v\xC0   \0A\xB4j \0A\bj \0,\0\xF7 \0A\xC4j \0Aj \0A\fjA\xF0\xD8|\r\0 \x07@\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xCE;\0 \0A\xC4j \0Aj \0(\f C \0A\xFCj \0A\xF8j6@  (\0Ar6\0\v \0(\xFC , \0A\xC4j, \0A\x80j$\0\v\xFA\x7F#\0A\x80k"\0$\0 \0 6\xF8 \0 6\xFC \\! \0A\xC4j  \0A\xF7j\x8F \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xFCj \0A\xF8j6\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xFCj"\x07(\0"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\v\xC0   \0A\xB4j \0A\bj \0,\0\xF7 \0A\xC4j \0Aj \0A\fjA\xF0\xD8|\r\0 \x07@\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xCF7\0 \0A\xC4j \0Aj \0(\f C \0A\xFCj \0A\xF8j6@  (\0Ar6\0\v \0(\xFC , \0A\xC4j, \0A\x80j$\0\v\xFA\x7F#\0A\x80k"\0$\0 \0 6\xF8 \0 6\xFC \\! \0A\xC4j  \0A\xF7j\x8F \0A\xB8j"A\x006\b B\x007\0  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0\x7F -\0\vA\x07v@ (\0\f\v \v"6\xB4 \0 \0Aj6\f \0A\x006\b@@ \0A\xFCj \0A\xF8j6\r\0 \0(\xB4\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v jF@\x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\v! \x7F -\0\vA\x07v@ (\f\v -\0\vA\xFF\0q\vAt/  -\0\vA\x07v\x7F (\bA\xFF\xFF\xFF\xFF\x07qAkA\n\v/ \0 \x7F -\0\vA\x07v@ (\0\f\v \v"j6\xB4\v\x7F \0A\xFCj"\x07(\0"(\f"\b (F@  (\0($\0\0\f\v \b-\0\0\v\xC0   \0A\xB4j \0A\bj \0,\0\xF7 \0A\xC4j \0Aj \0A\fjA\xF0\xD8|\r\0 \x07@\f\v\v@\x7F \0-\0\xCFA\x07v@ \0(\xC8\f\v \0-\0\xCFA\xFF\0q\vE\r\0 \0(\f" \0AjkA\x9FJ\r\0 \0 Aj6\f  \0(\b6\0\v   \0(\xB4  \xD06\0 \0A\xC4j \0Aj \0(\f C \0A\xFCj \0A\xF8j6@  (\0Ar6\0\v \0(\xFC , \0A\xC4j, \0A\x80j$\0\v\xE7\x7F|#\0Ak"$\0 (A\xE4\n\f"\n! A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v A	O@ 	\v  6\b A\x006A\xB8\x9E(\0 A\0 Aj A\bj! ("@ \v \0 9\b A	O@ \v (A\xB8\n\f"\n! A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v A	O@ 	\v  6\b A\x006A\xB8\x9E(\0 A\0 Aj A\bj! ("@ \v \0 9 A	O@ \v (A\x92\b\f"\n! A	O@ \vA\xBC\x9E-\0\0AqE@AA\xC03A\x07!A\xBC\x9EA:\0\0A\xB8\x9E 6\0\v A	O@ 	\v  6\b A\x006A\xB8\x9E(\0 A\0 Aj A\bj! ("@ \v \0 9 A	O@ \v Aj$\0\v\xBD\x7F#\0A k"$\0  6@ (AqE@ A\x7F6\0 \0      \0(\0(\x07\0!@@@ (\0\0\v A\0:\0\0\f\v A:\0\0\f\v A:\0\0 A6\0\f\v  ("\x006\0 \0A\xC0\xC0G@ \0 \0(Aj6\v A\xF8\xC1.! 0  ("\x006\0 \0A\xC0\xC0G@ \0 \0(Aj6\v A\xB0\xC2.!\0 0  \0 \0(\0(\0 A\fr \0 \0(\0(\0  Aj   Aj"  A\xA8 F:\0\0 (!@ A\fk," G\r\0\v\v A j$\0 \v@\x7FA\0!\0\x7F  F\x7F \0 (\0 \0Atj"\0A\x80\x80\x80\x80\x7Fq"Av r \0s!\0 Aj!\f\v\v\v\v\0 \0  \xD1\vT\x7F@@  G@A\x7F!\0  F\r (\0" (\0"H\r  J@A Aj! Aj!\f\v\0\v\v  G!\0\v \0\v@\x7FA\0!\0\x7F  F\x7F \0 ,\0\0 \0Atj"\0A\x80\x80\x80\x80\x7Fq"Av r \0s!\0 Aj!\f\v\v\v\v\0 \0  \xF2\v^\x7F   kj!@@  G@A\x7F!\0  F\r ,\0\0" ,\0\0"\x07H\r  \x07J@A Aj! Aj!\f\v\0\v\v  G!\0\v \0\v9\0 \06 \0A\xC8\x9F6\0 \0A\xE4\n A\bj\x88 \0A\xB8\n Aj\x88 \0A\x92\b Aj\x88\vC\x7FA\xC0\0+"\0B\x0078 \0B\x0070 \0B\x007( \0B\x007  \0B\x007 \0B\x007 \0B\x007\b \0B\x007\0 \0\vT\x7F  \0(T" A\0 A\x80j"\xEA" k  \x1B"   K\x1B"^ \0  j"6T \0 6\b \0  j6 \v\0  \0(\0j :\0\0\v\r\0  \0(\0j-\0\0\v\x93\x7F#\0A k"$\0\x7F@@ A\x7FF\r\0  6 \0-\0,AF@\x7F \0( "\0(LA\0H@  \0\xEC\f\v  \0\xEC\vA\x7FF\r\f\v  Aj"6 A j! Aj!@ \0($" \0((   A\fj Aj  Aj (\0(\f\n\0! (\f F\r AF@ AA \0( lAF\r\f\v AK\r Aj"A ( k" \0( l G\r (\f! AF\r\0\v\v A\0 A\x7FG\x1B\f\vA\x7F\v A j$\0\ve\x7F@ \0-\0,E@ A\0 A\0J\x1B!@  F\r \0 (\0 \0(\0(4\0A\x7FF@  Aj! Aj!\f\v\0\v\0\v A  \0( l!\v \v1\0 \0 \0(\0(\0\0 \0 A\x88\xC2."6$ \0  (\0(\0\0:\0,\v\x9F\x7F#\0A k"$\0@ A\x7FF@ \0-\x004\r \0 \0(0"A\x7FG:\x004\f\v \0-\x004!@@@ \0-\x005AG\r\0 AqE\r\0 \0(0 \0( \xE3\r\f\v AqE\r\0  \0(06@@ \0($" \0(( Aj Aj" A\fj Aj A j  (\0(\f\n\0Ak\0\v \0(0!  Aj6  :\0\v@ (" AjM\r  Ak"6 ,\0\0 \0( \x80A\x7FG\r\0\v\f\v \0A:\x004 \0 60\f\vA\x7F!\v A j$\0 \v	\0 \0A\xE4\vP\0  \0(\0j"\0 )070 \0 )(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0\v	\0 \0A\0\xE4\vH\0 \0 A\x88\xC2."6$ \0  (\0(\0\x006, \0 \0($" (\0(\0\0:\x005 \0(,A	N@=\0\v\v\x9E\x7F#\0A k"$\0\x7F@@ A\x7FF\r\0  \xC0":\0 \0-\0,AF@ \0( !#\0Ak"\0$\0 \0 :\0 \0AjAA l \0Aj$\0AG\r\f\v  Aj"6 A j! Aj!@ \0($" \0((   A\fj Aj  Aj (\0(\f\n\0! (\f F\r AF@ AA \0( lAF\r\f\v AK\r Aj"A ( k" \0( l G\r (\f! AF\r\0\v\v A\0 A\x7FG\x1B\f\vA\x7F\v A j$\0\ve\x7F@ \0-\0,E@ A\0 A\0J\x1B!@  F\r \0 -\0\0 \0(\0(4\0A\x7FF@  Aj! Aj!\f\v\0\v\0\v A  \0( l!\v \v1\0 \0 \0(\0(\0\0 \0 A\x80\xC2."6$ \0  (\0(\0\0:\0,\v\xA0\x7F#\0A k"$\0@ A\x7FF@ \0-\x004\r \0 \0(0"A\x7FG:\x004\f\v \0-\x004!@@@ \0-\x005AG\r\0 AqE\r\0 \0(0 \0( \xE7\r\f\v AqE\r\0  \0(0\xC0:\0@@ \0($" \0(( Aj Aj" A\fj Aj A j  (\0(\f\n\0Ak\0\v \0(0!  Aj6  :\0\v@ (" AjM\r  Ak"6 ,\0\0 \0( \x80A\x7FG\r\0\v\f\v \0A:\x004 \0 60\f\vA\x7F!\v A j$\0 \v	\0 \0A\xE8\v\\\x7F \0(\0!A8+"\0  j")070 \0 )(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0 \0\v	\0 \0A\0\xE8\vH\0 \0 A\x80\xC2."6$ \0  (\0(\0\x006, \0 \0($" (\0(\0\0:\x005 \0(,A	N@=\0\v\v\0A\xAC\xB6\xAFA\x8C\xB9\xAFA\x84\xB7\xE2A\xE4\xB9\xE2\v\0  \0(\0j A\xD0\0\xFC\n\0\0\v\0A\0\v\0B\0\v \x7F \0(\0!\0A\xD0\0+" \0 jA\xD0\0\xFC\n\0\0 \v	\0 \0\x81-\vF\0  \0(\0j"\0 )(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0\v\xEA\x7F#\0Ak"$\0@@  L\r\0 \0(" \0("O\x7F \0 (\0 \0(\0(4\0A\x7FF\r Aj! Aj   kAu6\f   k6\b#\0Ak"$\0 A\bj"(\0 A\fj"\x07(\0H!\b Aj$\0  \x07 \b\x1B! \0(!@ (\0"E\r\0 At"\x07E\r\0   \x07\xFC\n\0\0\v \0 At" \0(j6  j!  j\v!\f\v\v Aj$\0 \v,\0 \0 \0(\0($\0\0A\x7FF@A\x7F\v \0 \0(\f"\0Aj6\f \0(\0\v\xA5\x7F#\0Ak"$\0@@  \x07L\r\0\x7F \0(\f" \0("I@ A\xFF\xFF\xFF\xFF\x076\f   kAu6\b   \x07k6#\0Ak"$\0 Aj"(\0 A\bj"(\0H!\b Aj$\0   \b\x1B!#\0Ak"$\0 (\0 A\fj"(\0H!\b Aj$\0   \b\x1B! \0(\f!@ (\0"E\r\0 At"E\r\0   \xFC\n\0\0\v \0 At" \0(\fj6\f  j\f\v \0 \0(\0((\0\0"A\x7FF\r  6\0A! Aj\v!  \x07j!\x07\f\v\v Aj$\0 \x07\vR\x7F \0(\0!A0+"\0  j")(7( \0 ) 7  \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0 \0\v\f\0 \0\xE3 \0-\v\xDE\x7F#\0Ak"$\0@@  L\r\0 \0(" \0("O\x7F \0 -\0\0 \0(\0(4\0A\x7FF\r Aj! Aj   k6\f   k6\b#\0Ak"$\0 A\bj"(\0 A\fj"\x07(\0H!\b Aj$\0  \x07 \b\x1B! \0(!@ (\0"E"\x07\r\0 \x07\r\0   \xFC\n\0\0\v \0  \0(j6  j!  j\v!\f\v\v Aj$\0 \v,\0 \0 \0(\0($\0\0A\x7FF@A\x7F\v \0 \0(\f"\0Aj6\f \0-\0\0\v\x95\x7F#\0Ak"$\0@@  \x07L\r\0@ \0(\f" \0("I@ A\xFF\xFF\xFF\xFF\x076\f   k6\b   \x07k6#\0Ak"$\0 Aj"(\0 A\bj"(\0H!\b Aj$\0   \b\x1B!#\0Ak"$\0 (\0 A\fj"(\0H!\b Aj$\0   \b\x1B! \0(\f!@ (\0"E"\r\0 \r\0   \xFC\n\0\0\v \0 \0(\f j6\f\f\v \0 \0(\0((\0\0"A\x7FF\r  \xC0:\0\0A!\v  j!  \x07j!\x07\f\v\v Aj$\0 \x07\v\f\0 \0\xE7 \0-\v8\x7F \0@ \0(\xEC"A	O@  \0A\x006\xEC\v \0(d"A	O@ \v \0-\v\v\0\0\v\0 \0(< "\0\x7FA\xD4\xA0 \x006\0A\x7FA\0\v\v\xE3\x7F#\0A k"$\0  6   \0(0"A\0Gk6 \0(,!  6  6@@ \0 \0(< AjA A\fj!"\x7FA\xD4\xA0 6\0A\x7FA\0\v\x7FA  (\f"A\0J\rA A \x1B\v \0(\0r6\0\f\v (" "O\r\0 \0 \0(,"6 \0   kj6\b \0(0@ \0 Aj6  jAk -\0\0:\0\0\v !\v A j$\0 \v\xF4\x07\x7F#\0A k"$\0  \0("6 \0(!  6  6   k"6  j!A!\x07\x7F@@@ \0(< Aj"A A\fj"\x7FA\xD4\xA0 6\0A\x7FA\0\v@ !\f\v@  (\f"F\r A\0H@ !\f\v A\bA\0  ("\bK"	\x1Bj"  \bA\0 	\x1Bk"\b (\0j6\0 A\fA 	\x1Bj" (\0 \bk6\0  k! \0(< " \x07 	k"\x07 A\fj"\x7FA\xD4\xA0 6\0A\x7FA\0\vE\r\0\v\v A\x7FG\r\v \0 \0(,"6 \0 6 \0  \0(0j6 \f\v \0A\x006 \0B\x007 \0 \0(\0A r6\0A\0 \x07AF\r\0  (k\v A j$\0\vK\x7F \0(<#\0Ak"\0$\0  A\xFFq \0A\bj""\x7FA\xD4\xA0 6\0A\x7FA\0\v! \0)\b! \0Aj$\0B\x7F  \x1B\v7\x7FA\xB0+"\0A\0A\xB0\xFC\v\0 \0A6\xEC \0A\xC8\x9F6\xE8 \0A6d \0A\xC8\x9F6` \0\v\0A\xD7\v\xA8\x7F \0(T"(\0! (" \0( \0("\x07k"  I\x1B"@  \x07 ^  (\0 j"6\0  ( k"6\v    K\x1B"@   ^  (\0 j"6\0  ( k6\v A\0:\0\0 \0 \0(,"6 \0 6 \v	\0 \0 6@\v$\x7F \0("\0LAj"<"\x7F  \0 ^A\0\v\v\xE9	|\x7F \0-\0E@ \0-\0hE@ \0 )87` \0 )07X \0 )(7P \0 ) 7H \0 )7@ \0 )78 \0 )\b70 \0 )\x007( \0A:\0h\v@ \0+8" \0+\b"\xA2 \0+0" \0+"\x07\xA2\xA1"\bD\0\0\0\0\0\0\0\0dE\r\0 +"	 \xA2 +\b"\n \x07\xA2\xA1"D\0\0\0\0\0\0\0\0eE\r\0D\0\0\0\0\0\0\xF0?! \0A:\0 \b \xA1"D\0\0\0\0\0\0\0\0b@ \b \xA3"D\0\0\0\0\0\0\xF0?\xA4D\0\0\0\0\0\0\xF0? \xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0X\x1B"D\0\0\0\0\0\0\0\0\xA5D\0\0\0\0\0\0\0\0 \xBDB\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x83B\x80\x80\x80\x80\x80\x80\x80\xF8\xFF\0X\x1B!\v \0  \n \xA1\xA2 \xA0 \xA2 \x07  	 \xA1\xA2 \xA0\xA2\xA09  \0(l"\vE\r\0 \vA6\0AA\xBEA\xD3A\x9BA\xB8A\0p\v \0 )87` \0 )07X \0 )(7P \0 ) 7H \0 )7@ \0 )78 \0 )\b70 \0 )\x007(\v\v\n\0 \0(@A\0G\v\xC7\x7F|@ \0-\0\r\0 \0A\xD8\0j!@ \0(\x98"AN@  \0)\xD078  \0)\xC870  \0)\xC07(  \0)\xB87   \0)\xB07  \0)\xA87  \0)\xA07\b  \0)\x987\0 \0 \0)\xD87\x98 \0 \0)\xE07\xA0 \0 \0)\xE87\xA8 \0 \0)\xF07\xB0 \0 \0)\xF87\xB8 \0 \0)\x807\xC0 \0 \0)\x887\xC8 \0 \0)\x907\xD0 \0 )87\x90 \0 )07\x88 \0 )(7\x80 \0 ) 7\xF8 \0 )7\xF0 \0 )7\xE8 \0 )\b7\xE0 \0 )\x007\xD8\f\v  Atj" )878  )070  )(7(  ) 7   )7  )7  )\b7\b  )\x007\0 \0 \0(\x98"Aj6\x98 AH\r\v \0-\0\x9C\r\0 \0A\x98j" \0(\x97! \0A\xD8j" \0(\x97! \0+\b" f  eqE@  fE\r  eE\r\v \0A:\0\x9C \0(  \0A\xD8\0j   \0Aj\x96 \0A:\0 \0(\xA0"\0E\r\0 \0A6\0AA\xBEA\xE3A\x9BA\x82A\0p\v\v\xAE|\x7F@ \0(8"(\0\r\0A! \0 \0("Aj6@ AN@ +\b \0+\bd\r\vA! \0+ +0" \xA2 + " \xA2 +(" \xA2\xA0\xA0\x9Fd\r\0 +" \0+ c@A!\f\v D\0\0\0\0\0\0\0\0eE\r \0+(  \0+0\xA0dE\rA!\v  6\0\v\v\xB8 \x7F| !#\0A\x90k"$\0 A\x006\x8C B\x007\x84@@ \0"+p"D\0\0\0\0\0\0\0\0fE\r\0 +0"D\0\0\0\0\0\0\0\0fE\r\0  cE\r\0  +\0"c!\n\f\v +\0!\v A\xF0\0j!\f@ D\0\0\0\0\0\0\0\0a@@ (\f"AqE\r\0 (\bA\x90j + A\x80j A\x80j\x98 (\f! +\x80 +0" \xA2 + " \xA2 +(" \xA2\xA0\xA0\x9FdE\r\0  A{q"6\f\v@ AqE\r\0  +"D\0\0\0\0\0\0\0\0f\x7FA~ D\0\0\0\0\0\0\0\0cE\r (\b"\0+0 \0+\beE\rA\\\v q6\f\v + ! +!  )87\xB8  )07\xB0  )(7\xA8  ) 7\xA0  )7\x98  )7\x90  )\b7\x88  )\x007\x80 A\bA\bA\0 D\0\0\0\0\0\0\0\0b\x1B D\0\0\0\0\0\0\0\0d\x1B"\b6\xC0 +\x80! (\x84"	! 	 (\x88"G@  	kA\xC8\0m!\x07@  \x07Av"A\xC8\0lj"\0A\xC8\0j  \0+\0 c"\0\x1B! \x07 A\x7Fsj  \0\x1B"\x07\r\0\v\v@  F\r\0 +\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0  (@ \br6@\f\v@  	F\r\0 A\xC8\0k+\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0 A\bk"\0 \0(\0 \br6\0\f\v A\x84j  A\x80j\xBC\f\v@ + "D\0\0\0\0\0\0\0\0dE\r\0 +\b" +\xB0" \xA0"D\x8D\xED\xB5\xA0\xF7\xC6\xB0\xBE\xA0fE\r\0 A0j!@ B\x007\xB8 B\x007\xB0 B\x007\xA8 B\x007\xA0 B\x007\x98 B\x007\x90 B\x007\x88 B\x007\x80 +(D\x8D\xED\xB5\xA0\xF7\xC6\xB0>\xA0 c@ B\x80\x80\x80\x80\x80\x80\x80\xF8\xBF\x7F7 \f\v@  \xA1\x99D\x8D\xED\xB5\xA0\xF7\xC6\xB0>c@  )87\xB8  )07\xB0  )(7\xA8  ) 7\xA0  )7\x98  )7\x90  )\b7\x88  )\x007\x80\f\v \nE\rA  \f   A\x80j\x96 +\xB0! + !\v   \xA0"9\xB0  )\x807\x80  )\xB87\xB8  )\xB07\xB0  )\xA87\xA8  )\xA07\xA0  )\x987\x98  )\x907\x90  )\x887\x88 A\b6\xC0 +\x80! (\x84"	! 	 (\x88"\bG@ \b 	kA\xC8\0m!\x07@  \x07Av"A\xC8\0lj"\0A\xC8\0j  \0+\0 c"\0\x1B! \x07 A\x7Fsj  \0\x1B"\x07\r\0\v\v@@  \bF\r\0 +\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0  (@A\br6@\f\v@  	F\r\0 A\xC8\0k+\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0 A\bk"\0 \0(\0A\br6\0\f\v A\x84j  A\x80j\xBC + ! +\xB0!\v  +\x809 +\b"  \xA0"D\x8D\xED\xB5\xA0\xF7\xC6\xB0\xBE\xA0f\r\0\v\v \nE\r\0@ +"D\0\0\0\0\0\0\0\0dE\r\0 +\0 + \xA0"D\x8D\xED\xB5\xA0\xF7\xC6\xB0\xBE\xA0fE\r\0 A0j!@  9 B\x007\xB8 B\x007\xB0 B\x007\xA8 B\x007\xA0 B\x007\x98 B\x007\x90 B\x007\x88 B\x007\x80A\0  \f   A\x80j\x96  )\x807\x80  )\xB87\xB8  )\xB07\xB0  )\xA87\xA8  )\xA07\xA0  )\x987\x98  )\x907\x90  )\x887\x88 A\b6\xC0 +\x80! (\x84"	! 	 (\x88"\bG@ \b 	kA\xC8\0m!\x07@  \x07Av"A\xC8\0lj"\0A\xC8\0j  \0+\0 c"\0\x1B! \x07 A\x7Fsj  \0\x1B"\x07\r\0\v\v@@  \bF\r\0 +\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0  (@A\br6@\f\v@  	F\r\0 A\xC8\0k+\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0 A\bk"\0 \0(\0A\br6\0\f\v A\x84j  A\x80j\xBC\v +\0 + +\xA0"D\x8D\xED\xB5\xA0\xF7\xC6\xB0\xBE\xA0f\r\0\v\v -\0\fAqE\r\0 +XD\0\0\0\0\0\0\0\0dE\r\0 +(D\0\0\0\0\0\0\0\0eE\r\0 B\x007\xB8 B\x007\xB0 B\x007\xA8 B\x007\xA0 B\x007\x98 B\x007\x90 B\x007\x88 B\x007\x80AD\0\0\0\0\0\0\0\0 \f A0j  A\x80j\x96  )\x807\x80  )\xB87\xB8  )\xB07\xB0  )\xA87\xA8  )\xA07\xA0  )\x987\x98  )\x907\x90  )\x887\x88 A6\xC0 +\x80! (\x84"\b! \b (\x88"G@  \bkA\xC8\0m!\x07@  \x07Av"A\xC8\0lj"\0A\xC8\0j  \0+\0 c"\0\x1B! \x07 A\x7Fsj  \0\x1B"\x07\r\0\v\v@@  F\r\0 +\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0  (@Ar6@\f\v@  \bF\r\0 A\xC8\0k+\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0 A\bk"\0 \0(\0Ar6\0\f\v A\x84j  A\x80j\xBC\v  (\fAoq6\f\v (\x84" (\x88"	G@@ (\b!\r@@@@ ("\x07("\0 \x07(\b"I@ \0 \r \x95A\x80j!\f\v \0 \x07(\0"\0k"\bA\x07uAj"A\x80\x80\x80O\r \bA\xFF\xFF\xFF  \0k"Au"\0  \0 K\x1B A\x80\xFF\xFF\xFF\x07O\x1B"\v\x7F \vA\x80\x80\x80O\r \vA\x07t+A\0\v"j \r \x95"\0 \x07( \x07(\0"\rk"k!\b @ \b \r \xFC\n\0\0\v \x07 \0A\x80j"6 \x07 \b6\0 \x07(\b \x07  \vA\x07tj6\b \rE\r\0 \r-\v \x07 6\f\vP\0\vT\0\v A\xC8\0j" 	G\r\0\v\v@ \nE\r\0A\0!\x07A!\n@ (\f"AqE\r\0 +8 +0" \xA2 + " \xA2 +(" \xA2\xA0\xA0\x9FdE\r\0  A{q"6\fA!\x07A\0!\n\v@@ AqE\r\0 +\b +\xC0\xA2!A!\0 \x7F Aq@ + fE\rA~\f\vA!\0 AqE\r + cE\rA|\v q6\f \0 \x07r!\x07\f\v \n\r\vA\0!\n A\x80j (\b A\0n! A\x80j (\b A0jA\0n! A\x80j (\b \fA\0n!\0A\0! \x07Aq@ AD\0\0\0\0\0\0\xF0?   \0AA\0\xF2A\x80+" A\x80\xFC\n\0\0 A\x80j!\n\v@@@\x7F \x07AqE@ !\0 \n\f\v AD\0\0\0\0\0\0\0\0   \0 \x07A\0\xF2 \n k"\bA\x07u"Aj"A\x80\x80\x80O\rA\xFF\xFF\xFF \bAv"\0  \0 K\x1B \bA\x80\xFF\xFF\xFF\x07O\x1B"\0\x7F \0A\x80\x80\x80O\r \0A\x07t+A\0\v \bj" A\x80\xFC\n\0\0  A\x07tk!\0 \b@ \0  \b\xFC\n\0\0\v @ -\v A\x80j\v"\r \0F\r \0!\n@ \n+\0! ("(\0"\v! \v ("	G@ 	 \vkA\x07u!\x07@  \x07Av"\bA\x07tj"A\x80j  +\0 c"\x1B! \x07 \bA\x7Fsj \b \x1B"\x07\r\0\v\v@@  	F\r\0 +\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0  \n(x (xr6x\f\v@  \vF\r\0 A\x80k+\0 \xA1\x99D\xF1h\xE3\x88\xB5\xF8\xE4>cE\r\0 A\bk" \n(x (\0r6\0\f\vA\0!@ "\b(" \b(\b"I@  F@  \nA\x80\xFC\n\0\0 \b A\x80j6\f\v !  A\x80k"	K@  	A\x80\xFC\n\0\0 A\x80j!\v \b 6  \nA\x80A\0 A\x80j"	 G\x7F  	k"	Ak"@  	k  \xFC\n\0\0\v \b( \v \nK\x1BA\0  \nM\x1BjA\xFC\0\xFC\n\0\0\f\v@  \b(\0"\x07kA\x07uAj"\vA\x80\x80\x80I@A\xFF\xFF\xFF  \x07k"	Au" \v  \vK\x1B 	A\x80\xFF\xFF\xFF\x07O\x1B"\x7F A\x80\x80\x80O\r A\x07t"+A\0\v"\v j! \v  \x07k"	j!@ 	 G\r\0  \x07G@  	A\x07uAjA~mA\x07tj!\f\vA\x80+"A\x80j! \vE\r\0 \v- \b(!\v  \nA\x80\xFC\n\0\0 A\x80j!\x07  k"@ \x07  \xFC\n\0\0\v \b(! \b 6   \b(\0"k"\vk!	 \v@ 	  \v\xFC\n\0\0\v \b \x07  kj6 \b(\0! \b 	6\0 \b(\b \b 6\b @ -\v\f\vP\0\vT\0\v\v \nA\x80j"\n \rG\r\0\v\f\vP\0\vT\0\v \0E\r\0 \0-\v \f )h78 \f )`70 \f )X7( \f )P7  \f )H7 \f )@7 \f )87\b \f )07\0  )\x0070  )\b78  )7@  )7H  ) 7P  )(7X  )07`  )87h (\x84"\0@  \x006\x88 (\x8C \0-\v A\x90j$\0\va\x7F#\0A\x80k"$\0 \0A\x8C\xD8\x006\0@ \0(\xC8(\0AF\r\0 \0+0 \0\x93+\0dE\r\0  \0(\b \0A0jA\0n! \0( \x92\v \0- A\x80j$\0\v\x7FA\xD0\0+"\0A\0A\xD0\0\xFC\v\0 \0\v\xF9\x7F@ \0(\b" \0(\f"I@  )878  )070  )(7(  ) 7   )7  )7  )\b7\b  )\x007\0 \0 A@k6\b\f\v@  \0("k"Au"\x07Aj"A\x80\x80\x80 I@A\xFF\xFF\xFF  k"Au"   I\x1B A\xC0\xFF\xFF\xFF\x07O\x1B"\x7F A\x80\x80\x80 O\r At+A\0\v" j" )878  )070  )(7(  ) 7   )7  )7  )\b7\b  )\x007\0  \x07Atk! @   \xFC\n\0\0\v \0  Atj6\f \0 A@k"6\b \0 6 @ -\v \0 6\b\f\vP\0\vT\0\v\v,\x7F \0A\xD8\xD6\x006\0 \0("@ \0 6\b \0(\f -\v \0-\v9\x7F \0(" \0(\b"\0G@@ (\0"  (\0(\b\0 Aj" \0G\r\0\v\v\v,\x7F \0A\xC4\xD6\x006\0 \0("@ \0 6\b \0(\f -\v \0-\v\xB5	\x7F#|#\0A\x80k"$\0 B\x007x B\x007p A\x006\0 \0A\x006 \0+`!   \0A\x80j")(7  ) 7\b  )7\0 +! +\b! +\0! \0+\xD0! \0+\xD8!\n B\x007X  \0+\xB0"	 \0+\xB8\x9A\xA2"9`  	 \0+\xC0\x9A\xA29h \0+\xA0"\vM! \0+\xA8!	  \n \xA29H  \n \vN"\v 	M\xA2\xA29P  \n \v 	N\xA2\xA29@D\0\0\0\0\0\0\0\0!\n (\0E@ \0A\xF0\0j! D\0\0\0\0\0\0\xE0?\xA2! \0A\xB0j! \0A\x80j!\x07 D\0\0\0\0\0\0@\xA3"	 	\xA0!\v@ \0 \0(Aj6 \0+\x90 e@   \x9B +! +\b! +\0! +`!\v \x07 \0+\xC8 \xA0 A\xF8\0j A\xF0\0j\x98    A\xD8\0j A@k"\b +p\xBD (\0(\b\0D\0\0\0\0\0\0\0\0! +x!\r D\0\0\0\0\0\0\xF0? +p"\n\xA3D\0\0\0\0\0\0\xF0? \nD\0\0\0\0\0\0\0\0b\x1B +P \xA1" \xA2 +@ \xA1" \xA2 +H \xA1" \xA2\xA0\xA0\x9F"\f\xA2\xF8! B\x007 B\x007\b B\x007\0  !\nD\0\0\0\0\0\0\0\0! \0(\xF0E@  \b \x9A +D\0\0\0\0\0\0\0\0\xA0! +\0D\0\0\0\0\0\0\0\0\xA0! \n +\b\xA0!\n\v     \f \r \x9A\xA2"\xA2"\r\xA2 \xA0"! \xA2" \xA0"\f   \r\xA2 \xA0"" \xA2"# \xA0" \xA2 \f \f\xA2  \r\xA2 \n\xA0"$ \xA2"\x1B \xA0"\r \r\xA2\xA0\xA0\x9F\xA2"\f\xA2\xA0"% \xA2" \xA0"    \f\xA2\xA0"& \xA2"\' \xA0" \xA2  \xA2 \n \r \f\xA2\xA0"( \xA2" \xA0"\f \f\xA2\xA0\xA0\x9F\xA2"\xA2\xA0") \xA2"* +@"\r\xA0 	\xA2  \r\xA0 \v\xA2  \r\xA0 \v\xA2 \r 	\xA2 +X\xA0\xA0\xA0\xA0"9X  \n \f \xA2\xA0" \xA2"+ +H"\f\xA0 	\xA2  \f\xA0 \v\xA2 \x1B \f\xA0 \v\xA2 \f 	\xA2 +`\xA0\xA0\xA0\xA0"9`    \xA2\xA0" \xA2"\x1B +P"\xA0 	\xA2 \' \xA0 \v\xA2 # \xA0 \v\xA2  	\xA2 +h\xA0\xA0\xA0\xA09h   \x1B \xA0"   \xA2 * \xA0" \xA2 + \xA0" \xA2\xA0\xA0\x9F\xA2"\xA2\xA0 	\xA2  \v\xA2 & \v\xA2  " 	\xA2\xA0\xA0\xA0\xA09P  \n  \xA2\xA0 	\xA2  \v\xA2 ( \v\xA2 \f $ 	\xA2\xA0\xA0\xA0\xA09H    \xA2\xA0 	\xA2 ) \v\xA2 % \v\xA2 \r ! 	\xA2\xA0\xA0\xA0\xA09@  \xA0! (\0E\r\0\v +p!\n\v    A\xD8\0j A@k \n\xBD (\0(\b\0 A\x80j$\0\vs| \0 \xA1  \xA1"\xA3"\0 \0\xA2"D\0\0\0\0\0\0\b@\xA2"\b \0 \xA2"\x07 \x07\xA0"\x07\xA1 \xA2 \x07 \b\xA1D\0\0\0\0\0\0\xF0?\xA0 \xA2  \0D\0\0\0\0\0\0\0\xC0\xA0 \xA2 \0\xA0 \xA2 \0D\0\0\0\0\0\0\xF0\xBF\xA0 \xA2 \xA2\xA0\xA2\xA0\xA0\v\xB3\x7F\f|#\0A\xA0k"$\0 B\x007\x98 B\x007\x90 \0+\xD0! A\x006\0 \0A\x006 \0+`!  \0A\x80j")(7  ) 7  )7\b +! +! +\b! \0+\xD8!\v B\x007x  \0+\xB0"\f \0+\xB8\x9A\xA2"\n9\x80  \f \0+\xC0\x9A\xA29\x88 \0+\xA0"	M!\r \0+\xA8!\f  \v \r\xA29h  \v 	N"	 \fM\xA2\xA29p  \v 	 \fN\xA2\xA29` \0A\x80j" \n \0+\xC8\xA0 A\x98j A\x90j\x98D\0\0\0\0\0\0\0\0!\f (\0E@ \0A\xF0\0j! \0A\xB0j!\x07D\0\0\0\0\0\0\0\0!	@ \0 \0(Aj6 \0+\x90 	e@ A\bj  	\x9B +! +! +\b! +\x80!\n\v  \0+\xC8 \n\xA0 A\x98j A\x90j\x98  A\bj \f A\xF8\0j A\xE0\0j"\b +\x90\xBD (\0(\b\0  +p \xA1"	 	\xA2 +` \xA1" \xA2 +h \xA1" \xA2\xA0\xA0\x9F"\nD\0\0\0\0\0\0\xF0? \nD\0\0\0\0\0\0\xF0?d\x1B\xA3!\v 	 +\x98  \n +\x90\xA3\xF8\xA2 \n\x9A\xA2"	\xA2D\0\0\0\0\0\0\0\0\xA0!\r   	\xA2\xA0!\n  	\xA2D\0\0\0\0\0\0\0\0\xA0!	  \0(\xF0| 	 \x07 \b A\xC8\0j\x9A \r +X\xA0!\r \n +P\xA0!\n 	 +H\xA0\v \v\xA2 +`\xA0"	9`  	 \v\xA2 +x\xA0"	9x  \n \v\xA2 +h\xA0"\n9h  \n \v\xA2 +\x80\xA0"\n9\x80  \r \v\xA2 +p\xA0"\r9p  \r \v\xA2 +\x88\xA09\x88 \f \v\xA0!\f (\0E\r\0\v\v  A\bj \f A\xF8\0j A\xE0\0j +\x90\xBD (\0(\b\0 A\xA0j$\0\v4\x7FA0+"\0B\x007( \0B\x007  \0B\x007 \0B\x007 \0B\x007\b \0B\x007\0 \0\v\0   \0 \0\xA2 \xA2\xA2\xA2D\xDF\xC4Afcz=\xA2\v\0  \0 \xA2\xA2D\0\0\0\0\x80}\x1BA\xA3\v\0A\xB8\xD2\0\v\0 \0AjA\0 (A\xC8\xD2\0F\x1B\v\0    \0(\0\v\0 A\xD4\xCF\x006\0  \0(6\v\x7FA\b+"A\xD4\xCF\x006\0  \0(6 \v#\0 \0(\0 Atj"\0 )\b7\b \0 )\x007\0A\v\xC8\x7F#\0A@j"$\0 A\bj   \0(\0\0  )7(  )\b7 A!\0@ -\0AqE\r\0A\xE4\x9E-\0\0AqE@AA\xE4\xC8\0A\x07!\0A\xE4\x9EA:\0\0A\xE0\x9E \x006\0\vA+"\0 )(7\b \0 ) 7\0  \x0068 A\x0064A\xE0\x9E(\0A\0A\0 A4j A8j\xFC!\0 (4"E\r\0 \v A@k$\0 \0\vJ\0 ( (\0"kAu K@ \0  Atj")\b7\b \0 )\x007\0 \0A:\0\v \0A\0:\0\0 \0A\0:\0\v\0 \0( \0(\0kAu\v\x8F\b\x7F \0( \0(\0"kAu" I@@  k" \0"(\b" \0("kAuM@@ E\r\0 !\0 At"Ak"A0qA0G@ AvAjAq!\b@ \0 )\b7\b \0 )\x007\0 \0Aj!\0 Aj" \bG\r\0\v\v  j! A0I\r\0@ \0 )\b7\b \0 )\x007\0 \0 )\b7 \0 )\x007 \0 )\b7( \0 )\x007  \0 )\x0070 \0 )\b78 \0A@k"\0 G\r\0\v\v  6\f\v@  (\0"\x07k"	Au j"\0A\x80\x80\x80\x80I@A\xFF\xFF\xFF\xFF\0  \x07k"Au"\x07 \0 \0 \x07I\x1B A\xF0\xFF\xFF\xFF\x07O\x1B"@ A\x80\x80\x80\x80O\r At+!\b\v \b 	j"\x07!\0 At"	Ak"A0qA0G@ AvAjAq!\n@ \0 )\b7\b \0 )\x007\0 \0Aj!\0 Aj" \nG\r\0\v\v \x07 	j! A0O@@ \0 )\b7\b \0 )\x007\0 \0 )\b7 \0 )\x007 \0 )\b7( \0 )\x007  \0 )\x0070 \0 )\b78 \0A@k"\0 G\r\0\v\v \x07  (\0"\0k"k! @  \0 \xFC\n\0\0\v  \b Atj6\b  6  6\0 \0@ \0-\v\f\vP\0\vT\0\v\v  I@ \0  Atj6\v\v8\x7F#\0Ak"$\0 \0(\0!\0  )\b7\b  )\x007\0   \0\0 Aj$\0\v\x84\x7F@ \0(" \0(\b"I@  )\b7\b  )\x007\0 \0 Aj6\f\v@  \0(\0"k"Au"\x07Aj"A\x80\x80\x80\x80I@A\xFF\xFF\xFF\xFF\0  k"Au"   I\x1B A\xF0\xFF\xFF\xFF\x07O\x1B"\x7F A\x80\x80\x80\x80O\r At+A\0\v" j" )\b7\b  )\x007\0  \x07Atk! @   \xFC\n\0\0\v \0  Atj6\b \0 Aj"6 \0 6\0 @ -\v \0 6\f\vP\0\vT\0\v\v\0A\xC4\xC6\0\v7\0 \0(\0 Atj"\0 )7 \0 )7 \0 )\b7\b \0 )\x007\0A\v\xF4\x7F#\0A\xE0\0k"$\0 A\bj   \0(\0\0  ) 7H  )7@  )78  )\b70A!\0@ -\0(AqE\r\0A\xD8\x9E-\0\0AqE@AA\xA4\xC2\0A\x07!\0A\xD8\x9EA:\0\0A\xD4\x9E \x006\0\vA +"\0 )H7 \0 )@7 \0 )87\b \0 )07\0  \x006X A\x006TA\xD4\x9E(\0A\0A\0 A\xD4\0j A\xD8\0j\xFC!\0 (T"E\r\0 \v A\xE0\0j$\0 \0\v^\0 ( (\0"kAu K@ \0  Atj")7 \0 )7 \0 )\b7\b \0 )\x007\0 \0A:\0 \v \0A\0:\0\0 \0A\0:\0 \v\0 \0( \0(\0kAu\v\xDE\b\x7F \0( \0(\0"kAu" I@@  k" \0"(\b" \0("kAuM@@ E\r\0 !\0 At"A k"A\xE0\0qA\xE0\0G@ AvAjAq!\b@ \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0 \0A j!\0 Aj" \bG\r\0\v\v  j! A\xE0\0I\r\0@ \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0 \0 )78 \0 )70 \0 )\b7( \0 )\x007  \0 )7X \0 )7P \0 )\b7H \0 )\x007@ \0 )\x007` \0 )\b7h \0 )7p \0 )7x \0A\x80j"\0 G\r\0\v\v  6\f\v@  (\0"\x07k"	Au j"\0A\x80\x80\x80\xC0\0I@A\xFF\xFF\xFF?  \x07k"Au"\x07 \0 \0 \x07I\x1B A\xE0\xFF\xFF\xFF\x07O\x1B"@ A\x80\x80\x80\xC0\0O\r At+!\b\v \b 	j"\x07!\0 At"	A k"A\xE0\0qA\xE0\0G@ AvAjAq!\n@ \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0 \0A j!\0 Aj" \nG\r\0\v\v \x07 	j! A\xE0\0O@@ \0 )7 \0 )7 \0 )\b7\b \0 )\x007\0 \0 )78 \0 )70 \0 )\b7( \0 )\x007  \0 )7X \0 )7P \0 )\b7H \0 )\x007@ \0 )\x007` \0 )\b7h \0 )7p \0 )7x \0A\x80j"\0 G\r\0\v\v \x07  (\0"\0k"k! @  \0 \xFC\n\0\0\v  \b Atj6\b  6  6\0 \0@ \0-\v\f\vP\0\vT\0\v\v  I@ \0  Atj6\v\vL\x7F#\0A k"$\0 \0(\0!\0  )7  )7  )\b7\b  )\x007\0   \0\0 A j$\0\v	\0 \0 \x9D\v\0A\xF4?\vG\x7F#\0A k"$\0 A\bj  \0(\0\0A+"\0 )7 \0 )7\b \0 )\b7\0 A j$\0 \0\v \0 \0 )7 \0 )\b7\b \0 )\x007\0\vy\x7F#\0Ak"$\0 Aj"  \0(\0\0 (\b ,\0" A\0H"\x1B"\0Aj<" \x006\0 (! \0@ Aj   \x1B \0\xFC\n\0\0\v A\0H@ (\f -\v Aj$\0 \vA\x7F#\0Ak"$\0 \0     A\bj\xF5@A\b9A\x81\x92A\xA8\x98A\0\v +\b Aj$\0\v\xAA\b\x7F#\0Ak"$\0@ A\fj A\bj%\r\0A\x8C\x9F (\fAtAj<"\x006\0 \0E\r\0 (\b<"@A\x8C\x9F(\0"\0 (\fAtjA\x006\0 \0 $E\r\vA\x8C\x9FA\x006\0\v Aj$\0A\xA1\xBD-\0\0E@A\xA0\xB4(\0"!\0#\0Ak"$\0A\xC0\xBA\x82"A\xF8\xBA6(  \x006  A\xF4\xB66\0 A\0:\x004 A\x7F60 A\fj"\0 ("6\0 A\xC0\xC0G@  (Aj6\v  \0 (\0(\b\0 \00 Aj$\0A\x98\xB5A\x006\0A\xFC\xB4A\xFC\xB36\0A\xFC\xB4A\xD4\xAF6\0A\xF4\xB4A\xD8\xAD6\0A\xFC\xB4A\xEC\xAD6\0A\xF8\xB4A\x006\0A\xCC\xAD(\0A\xF4\xB4jA\xC0\xBA\xAAA\x80\xBBA\xA4\xB4(\0"A\xB0\xBB\xEBA\xAC\xB6A\x80\xBB\xE0A\xB8\xBBA\xA8\xB4(\0"A\xE8\xBB\xEBA\xDC\xB7A\xB8\xBB\xE0A\x8C\xB9A\xDC\xB7(\0A\fk(\0A\xDC\xB7j(\xE0A\xF4\xB4(\0A\fk(\0A\xF4\xB4j"\0(H \0A\xAC\xB66HA\xDC\xB7(\0A\fk(\0A\xDC\xB7j"\0 \0(A\x80\xC0\0r6A\xDC\xB7(\0A\fk(\0A\xDC\xB7j"\0(H \0A\xAC\xB66H#\0Ak"$\0A\xF0\xBB\xF5"A\xA8\xBC6(  6  A\xC0\xB86\0 A\0:\x004 A\x7F60 A\fj"\0 ("6\0 A\xC0\xC0G@  (Aj6\v  \0 (\0(\b\0 \00 Aj$\0A\xF4\xB5A\x006\0A\xD8\xB5A\xFC\xB36\0A\xD8\xB5A\xE8\xB16\0A\xD0\xB5A\xF8\xAE6\0A\xD8\xB5A\x8C\xAF6\0A\xD4\xB5A\x006\0A\xEC\xAE(\0A\xD0\xB5jA\xF0\xBB\xAAA\xB0\xBC A\xE0\xBC\xEAA\x84\xB7A\xB0\xBC\xDFA\xE8\xBC A\x98\xBD\xEAA\xB4\xB8A\xE8\xBC\xDFA\xE4\xB9A\xB4\xB8(\0A\fk(\0A\xB4\xB8j(\xDFA\xD0\xB5(\0A\fk(\0A\xD0\xB5j"\0(H \0A\x84\xB76HA\xB4\xB8(\0A\fk(\0A\xB4\xB8j"\0 \0(A\x80\xC0\0r6A\xB4\xB8(\0A\fk(\0A\xB4\xB8j"\0(H \0A\x84\xB76HA\xA1\xBDA:\0\0\vA\xA0\x9EA\xB16\0A\xA4\x9EA\x006\0\xF9A\xA4\x9EA\x80\x9F(\x006\0A\x80\x9FA\xA0\x9E6\0A\x84\x9FA\xD26\0A\x88\x9FA\x006\0\x91A\x88\x9FA\x80\x9F(\x006\0A\x80\x9FA\x84\x9F6\0A\xA8\xA0A\xB0\x9F6\0A\x80\xA0A\x80\x806\0A\xFC\x9FA\x80\xCE6\0A\xE0\x9FA*6\0A\x84\xA0A\xC0\x9A(\x006\0\v\v\xBC\xFB\xB3\0A\x80\b\v\xF49vz\0pz\0cos_az\0sin_az\0vy\0infinity\0velocity\0minimumVelocity\0dense_trajectory\0February\0January\0copy\0July\0flat_fire_only\0calculateEnergy\0Cannot interpolate by unsupported key\0_TrajectoryDataInterpKey\0_BaseTrajDataInterpKey\0zeroFindingAccuracy\0Array\0Thursday\0Tuesday\0Wednesday\0Saturday\0Sunday\0Monday\0Friday\0May\0%m/%d/%y\0vx\0px\0findApex\0-+   0X0x\0-0X+0X 0X-0x+0x 0x\0calculateOgw\0Nov\0idiv\0Thu\0dense_output\0_HitOutput\0unsupported locale for standard input\0_ShotPropsInput\0August\0_WindList\0_TrajectoryRequest\0cross_east\0range_east\0unsigned short\0interpolate3pt\0interpolate2pt\0dot\0_DragTablePoint\0unsigned int\0Error non-convergent\0Distance non-convergent\0gravityConstant\0_MaxRangeResult\0range_limit_ft\0slant_height_ft\0sight_height_ft\0range_step_ft\0max_range_ft\0windage_ft\0slant_distance_ft\0until_distance_ft\0alt0_ft\0set\0get\0fusedMultiplySubtract\0Oct\0float\0cos_lat\0sin_lat\0Sat\0integrateRawAt\0BCLIBC_Curve requires at least 2 data points\0muzzle_velocity_fps\0Zero finding failed to converge after maximum iterations\0maxIterations\0coriolis\0_Coriolis\0filter_flags\0Degenerate interpolation segment: duplicate key values\0Index out of bounds\0winds\0%s:%d: %s\0Apr\0vector\0_Vector\0money_get error\0stepMultiplier\0October\0November\0September\0December\0unsigned char\0ios_base::clear\0Mar\0lib/py-ballisticcalc/py_ballisticcalc.exts/py_ballisticcalc_exts/src/base_types.cpp\0lib/py-ballisticcalc/py_ballisticcalc.exts/py_ballisticcalc_exts/src/traj_filter.cpp\0/emsdk/emscripten/system/lib/libcxxabi/src/private_typeinfo.cpp\0lib/py-ballisticcalc/py_ballisticcalc.exts/py_ballisticcalc_exts/src/engine.cpp\0maximumDrop\0time_step\0Sep\0%I:%M:%S %p\0Correction denominator is zero\0atmo\0density_ratio\0Sun\0Jun\0reason\0_TerminationReason\0std::exception\0_Interception\0position\0BCLIBC_getCorrection\0Target point not found during integration\0BCLIBC_SinglePointHandler requested early termination\0BCLIBC_ZeroCrossingHandler requested early termination\0linearCombination\0Zero division error during interpolation\0: no conversion\0Linear interpolation failed: zero division\0Mon\0weight_grain\0nan\0Jan\0inorm\0\x1B[36m\0\x1B[1;35m\0\x1B[34m\0\x1B[33m\0\x1B[31m\0\x1B[0m\0imul\0Jul\0bool\0Curve data is undefined or null\0std::bad_function_call\0April\0push_back\0Fri\0stoi\0cross_north\0range_north\0bad_array_new_length\0push\0March\0twist_inch\0diameter_inch\0length_inch\0mach\0Mach\0Aug\0unsigned long long\0unsigned long\0std::wstring\0basic_string\0std::string\0std::u16string\0std::u32string\0toString\0config\0_Config\0neg\0drag\0mag\0flag\0_TrajFlag\0inf\0%.0Lf\0%Lf\0%f\0resize\0true\0Intercept point not found for target key and value\0Tue\0hermite\0integrate\0false\0_Atmosphere\0June\0time\0findZeroAngle\0handle\0double\0drag_table\0_DragTable\0: out of range\0Out of range\0findMaxRange\0update_density_factor_and_mach_for_altitude\0minimumAltitude\0Failed to interpolate trajectory at target distance\0Unknown integration method\0Invalid interpolation method\0_InterpMethod\0_IntegrationMethod\0_Wind\0%0*lld\0%*lld\0+%lld\0%+.4ld\0void\0locale not supported\0magSquared\0recursive_mutex constructor failed\0recursive_mutex lock failed\0Wed\0iadd\0fusedMultiplyAdd\0angle_at_max_rad\0barrel_elevation_rad\0direction_from_rad\0barrel_azimuth_rad\0cant_angle_rad\0drop_angle_rad\0look_angle_rad\0windage_angle_rad\0%Y-%m-%d\0std::bad_alloc\0Dec\0bc\0isub\0ogw_lb\0energy_ft_lb\0Feb\0raw_data\0full_data\0interpolateTrajectoryData\0_TrajectoryData\0interpolateBasetrajData\0_BaseTrajData\0POS_Z\0VEL_Z\0POS_Y\0VEL_Y\0VELOCITY\0ENERGY\0%a %b %d %H:%M:%S %Y\0POS_X\0VEL_X\0POSIX\0APEX\0OGW\0MRT\0SLANT_HEIGHT\0NOTSET\0ALLOWED_ZERO_ERROR_FEET\0MAX_DISTANCE_FEET\0APEX_IS_MAX_RANGE_RADIANS\0%H:%M:%S\0ERROR\0EULER\0LINEAR\0ZERO_UP\0HANDLER_REQUESTED_STOP\0PCHIP\0ZERO\0DENSITY_RATIO\0INFO\0ZERO_DOWN\0NAN\0PM\0AM\0%H:%M\0LC_ALL\0BCLIBC_LOG_LEVEL\0CRITICAL\0ASCII\0MACH\0DEBUG\0WARNING\0LANG\0DRAG\0FLAG\0INF\0NO_TERMINATE\0NONE\0TIME\0DROP_ANGLE\0WINDAGE_ANGLE\0RANGE\0WINDAGE\0SLANT_DISTANCE\0MINIMUM_VELOCITY_REACHED\0MAXIMUM_DROP_REACHED\0TARGET_RANGE_REACHED\0MINIMUM_ALTITUDE_REACHED\0CD\0cLowestTempC\0catching a class without an object?\0emscripten::memory_view<short>\0emscripten::memory_view<unsigned short>\0emscripten::memory_view<int>\0emscripten::memory_view<unsigned int>\0emscripten::memory_view<float>\0emscripten::memory_view<uint8_t>\0emscripten::memory_view<int8_t>\0emscripten::memory_view<uint16_t>\0emscripten::memory_view<int16_t>\0emscripten::memory_view<uint64_t>\0emscripten::memory_view<int64_t>\0emscripten::memory_view<uint32_t>\0emscripten::memory_view<int32_t>\0emscripten::memory_view<char>\0emscripten::memory_view<unsigned char>\0emscripten::memory_view<signed char>\0emscripten::memory_view<long>\0emscripten::memory_view<unsigned long>\0emscripten::memory_view<double>\0:\x000123456789\0C.UTF-8\0linearCombination4\0RK4\0t0\0p0\0a0\0Invalid drag curve data: requires at least 2 points and consistent sizes.\0Index is out of bounds.\0Division by zero in BCLIBC_getCorrection.\0Division by zero in stability coefficient calculation.\0Division by zero in ftp calculation.\0Density request for altitude above troposphere. Atmospheric model not valid here.\0Cannot get record from empty trajectory data.\0Reached minimum temperature limit. Adjusted to %.2f \xC2\xB0C.\0Invalid temperature %.2f \xC2\xB0C. Adjusted to %.2f \xC2\xB0C.\0Value error (Barrel elevation must be greater than 0 to find apex).\0Invalid integrate_func: std::function is empty (no callable object assigned).\0Integration completed successfully: (%d).\0Integration completed with acceptable termination reason: (%d).\0Cannot get last point: the handler is empty (count = 0).\0-\0(null)\0Runtime error (No apex flagged in trajectory data)\0Vector(\0%\0Pure virtual function called!\0 in \0: \0, \0Log formatting error.\n\0	\0\0\x9C\x89\0\0\x9C\0\0`\x8A\0\0\xA4\0\0N10emscripten3valE\0\0\x9C\0\0\x9C\x89\0\0\xE4\x89\0\0\x9C\0\0\xD0\0\0\x9C\0\0`\x8A\0\0\xD8\0\0N6bclibc11BCLIBC_WindE\0\0\x8A\0\0\xF8\0\0N6bclibc19BCLIBC_InterpMethodE\0\0\x8A\0\0 \0\0N6bclibc24BCLIBC_TerminationReasonE\0\x8A\0\0L\0\0N6bclibc15BCLIBC_TrajFlagE\0\0\x8A\0\0p\0\x0017IntegrationMethod\0\x8A\0\0\x8C\0\0N6bclibc29BCLIBC_BaseTrajData_InterpKeyE\0\0\0\0\x8A\0\0\xC0\0\0N6bclibc31BCLIBC_TrajectoryData_InterpKeyE\0\0`\x8A\0\0\xF4\0\0N6bclibc13BCLIBC_ConfigE\0p\0vp\0dpp\0vppd\0ipp\0vppi\0`\x8A\0\0,\x1B\0\0N6bclibc17BCLIBC_AtmosphereE\0p\0vp\0dpp\0vppd\0p\0vp\0dpp\0vppd\0\0\0\0`\x8A\0\0p\x1B\0\0N6bclibc15BCLIBC_CoriolisE\0p\0vp\0dpp\0vppd\0ipp\0vppi\0\0\0`\x8A\0\0\xAC\x1B\0\x0014DragTablePoint\0p\0vp\0dpp\0vppd\0\0`\x8A\0\0\xD4\x1B\0\x0014ShotPropsInput\0p\0vp\0dpp\0vppd\0ppp\0vppp\0ppp\0vppp\0ppp\0vppp\0ipp\0vppi\0ppp\0vppp\0`\x8A\0\0(\0\x0017TrajectoryRequest\0p\0vp\0dpp\0vppd\0ipp\0vppi\0ipp\0vppi\0`\x8A\0\0d\0\0N6bclibc19BCLIBC_BaseTrajDataE\0p\0vp\0dpp\0vppd\0ppp\0vppp\0\0\0\x9C\0\0\xE4\x89\0\0`\x8A\0\0\xAC\0\0N6bclibc21BCLIBC_MaxRangeResultE\0p\0vp\0dpp\0vppd\0\0`\x8A\0\0\xE4\0\0N6bclibc21BCLIBC_TrajectoryDataE\0p\0vp\0dpp\0vppd\0ipp\0vppi\0`\x8A\0\0$\0\x0012Interception\0p\0vp\0ppp\0vppp\0ppp\0vppp\0\0\0`\x8A\0\0T\0\x009HitOutput\0p\0vp\0ppp\0vppp\0ipp\0vppi\0\0\0\xE4\x8A\0\0\xA0\0\0\0\0\0\0\0\0\0\xCC\0\0\0\0\0\0\x90\0\0\0\0\0\0\xC0\0\0\0\0\0\0NSt3__28optionalIN6bclibc11BCLIBC_WindEEE\0\0\0\x88\x8A\0\0\xD8\0\0\0\0NSt3__227__optional_move_assign_baseIN6bclibc11BCLIBC_WindELb1EEE\0\0\0\x88\x8A\0\0(\0\0l\0\0NSt3__227__optional_copy_assign_baseIN6bclibc11BCLIBC_WindELb1EEE\0\0\0\x88\x8A\0\0x\0\0\xB4\0\0NSt3__220__optional_move_baseIN6bclibc11BCLIBC_WindELb1EEE\0\0\x88\x8A\0\0\xC0\0\0\xFC\0\0NSt3__220__optional_copy_baseIN6bclibc11BCLIBC_WindELb1EEE\0\0\x88\x8A\0\0\b\0\0H\0\0NSt3__223__optional_storage_baseIN6bclibc11BCLIBC_WindELb0EEE\0\0\0`\x8A\0\0P\0\0NSt3__224__optional_destruct_baseIN6bclibc11BCLIBC_WindELb1EEE\0\0`\x8A\0\0\x98\0\0NSt3__218__sfinae_ctor_baseILb1ELb1EEE\0\0`\x8A\0\0\xC8\0\0NSt3__220__sfinae_assign_baseILb1ELb1EEE\0\0\0\0`\x8A\0\0\xFC\0\0NSt3__26vectorIN6bclibc11BCLIBC_WindENS_9allocatorIS2_EEEE\0\0@\x8B\0\0H \0\0\0\0\0\0\xF4\0\0PNSt3__26vectorIN6bclibc11BCLIBC_WindENS_9allocatorIS2_EEEE\0@\x8B\0\0\x94 \0\0\0\0\0\xF4\0\0PKNSt3__26vectorIN6bclibc11BCLIBC_WindENS_9allocatorIS2_EEEE\0pp\0v\0vp\0\0\0\x008 \0\0pp\0\x000\x89\0\0\xF4\0\0\xD0\0\0vppp\0A\x80\xC2\0\v\xB40\x89\0\0\xF4\0\0\x9C\x89\0\0\xD0\0\0vppip\0\0\0\x9C\x89\0\0\xF4\0\0ipp\0\x9C\0\0\xD0\0\0x\0\0\xF4\0\0\x9C\x89\0\0pppi\0\0\0\0H\x89\0\0\xF4\0\0\x9C\x89\0\0\xD0\0\0ippip\0\0\0\xE4\x8A\0\0\x80!\0\0\0\0\0\0\0\0\0\xA4!\0\0\0\0\0\0\x90\0\0\0\0\0\0\xC0\0\0\0\0\0\0NSt3__28optionalI14DragTablePointEE\0\x88\x8A\0\0\xB0!\0\0\xEC!\0\0NSt3__227__optional_move_assign_baseI14DragTablePointLb1EEE\0\x88\x8A\0\0\xF8!\0\x004"\0\0NSt3__227__optional_copy_assign_baseI14DragTablePointLb1EEE\0\x88\x8A\0\0@"\0\0x"\0\0NSt3__220__optional_move_baseI14DragTablePointLb1EEE\0\0\0\0\x88\x8A\0\0\x84"\0\0\xBC"\0\0NSt3__220__optional_copy_baseI14DragTablePointLb1EEE\0\0\0\0\x88\x8A\0\0\xC8"\0\0\0#\0\0NSt3__223__optional_storage_baseI14DragTablePointLb0EEE\0`\x8A\0\0\b#\0\0NSt3__224__optional_destruct_baseI14DragTablePointLb1EEE\0\0\0\0`\x8A\0\0L#\0\0NSt3__26vectorI14DragTablePointNS_9allocatorIS1_EEEE\0\0\0\0@\x8B\0\0\x94#\0\0\0\0\0\0D#\0\0PNSt3__26vectorI14DragTablePointNS_9allocatorIS1_EEEE\0\0\0@\x8B\0\0\xDC#\0\0\0\0\0D#\0\0PKNSt3__26vectorI14DragTablePointNS_9allocatorIS1_EEEE\0pp\0vp\0\0\0\0\x84#\0\0pp\0\x000\x89\0\0D#\0\0\xA4\x1B\0\0vppp\0A\xC0\xC8\0\vc0\x89\0\0D#\0\0\x9C\x89\0\0\xA4\x1B\0\0vppip\0\0\0\x9C\x89\0\0D#\0\0ipp\0\x9C\0\0\xA4\x1B\0\0X!\0\0D#\0\0\x9C\x89\0\0pppi\0\0\0\0H\x89\0\0D#\0\0\x9C\x89\0\0\xA4\x1B\0\0ippip\0\0\0\xDC\0\0\xCC\x1B\0\0ppp\0A\xB0\xC9\0\ve\xA4\0\0\xCC\x1B\0\0\xE4\x89\0\0\xE4\x89\0\0pppdd\0\0\0\xE4\x89\0\0\xCC\x1B\0\0\xE4\x89\0\0dppd\0\0\0\0L\0\0\xCC\x1B\0\0 \0\0pppp\0\0\0\x000\x89\0\0\xDC\0\x000\x89\0\0\\\0\0\0\0\xCC\x1B\0\0\x84\0\0\xE4\x89\0\0pppid\0A\xA0\xCA\0\v\xD5\\\0\0\x84\0\0\xE4\x89\0\0\\\0\0\\\0\0\\\0\0ppidppp\0\xDC\0\0\xB8\0\0\xE4\x89\0\0\xDC\0\0\xDC\0\0\xDC\0\0D\0\0\xF0\0\0ppidpppii\0\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0dpdd\0\0\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0dpddddddd\0\0\0\0\0\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0dpddddd\0`\x8A\0\0\xD8%\0\0N6bclibc11BCLIBC_V3dTE\0\0@\x8B\0\0\0&\0\0\0\0\0\0\xD0%\0\0PN6bclibc11BCLIBC_V3dTE\0@\x8B\0\0(&\0\0\0\0\0\xD0%\0\0PKN6bclibc11BCLIBC_V3dTE\0pp\0vp\0\0\xF0%\0\0pp\0\0\xF0%\0\0\xE4\x89\0\0\xE4\x89\0\0\xE4\x89\0\0ppddd\0dpp\0vppd\0\0\xD0%\0\0&\0\0\xD0%\0\0pppp\0\0\0\0\xD0%\0\0&\0\0ppp\0\xD0%\0\0&\0\0\xE4\x89\0\0pppd\0\0\0\0\xE4\x89\0\0&\0\0\xD0%\0\0dppp\0\0\0\x000\x89\0\0\xD0%\0\0\xD0%\0\0vppp\0\0\0\x000\x89\0\0\xD0%\0\0\xE4\x89\0\0vppd\0\0\0\0\xD0%\0\0\xF0%\0\0\xD0%\0\0\xE4\x89\0\0ppppd\0A\x80\xCE\0\v\xF0\xD0%\0\0\xF0%\0\0\xD0%\0\0\xE4\x89\0\0\xD0%\0\0\xE4\x89\0\0ppppdpd\0\xD0%\0\0\xF0%\0\0\xD0%\0\0\xE4\x89\0\0\xD0%\0\0\xE4\x89\0\0\xD0%\0\0\xE4\x89\0\0\xD0%\0\0\xE4\x89\0\0ppppdpdpdpd\0\xE4\x89\0\0&\0\0dpp\x000\x89\0\0\xD0%\0\0vpp\0t\'\0\0\xD0%\0\0`\x8A\0\0|\'\0\0NSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE\0ppp\0\0\xD0%\0\0\xD0%\0\0ppp\0\0\0\0\0\xF8\'\0\0\xB2\0\0\0\xB3\0\0\0\xB4\0\0\0\xB5\0\0\0\xB6\0\0\0\xB7\0\0\0\xB8\0\0\0\xB9\0\0\0\xBA\0\0\0\x88\x8A\0\0(\0\0\xA4(\0\0NSt3__210__function6__funcIPFvRN6bclibc17BCLIBC_BaseEngineERNS2_35BCLIBC_BaseTrajDataHandlerInterfaceERNS2_24BCLIBC_TerminationReasonEENS_9allocatorISA_EES9_EE\0`\x8A\0\0\xAC(\0\0NSt3__210__function6__baseIFvRN6bclibc17BCLIBC_BaseEngineERNS2_35BCLIBC_BaseTrajDataHandlerInterfaceERNS2_24BCLIBC_TerminationReasonEEEE\0\0\0\0@\x8B\0\0H)\0\0\0\0\0\0\xB4)\0\0PFvRN6bclibc17BCLIBC_BaseEngineERNS_35BCLIBC_BaseTrajDataHandlerInterfaceERNS_24BCLIBC_TerminationReasonEE\0\0\xF8\x89\0\0\xBC)\0\0FvRN6bclibc17BCLIBC_BaseEngineERNS_35BCLIBC_BaseTrajDataHandlerInterfaceERNS_24BCLIBC_TerminationReasonEE\0\0\0\x88\x8A\0\x004*\0\0X*\0\0N6bclibc24BCLIBC_InterceptionErrorE\0\x88\x8A\0\0d*\0\0\x8D\0\0N6bclibc25BCLIBC_SolverRuntimeErrorE\0\0\0\0\x88\x8A\0\0\x98*\0\0X*\0\0N6bclibc22BCLIBC_OutOfRangeErrorE\0\0\0\x88\x8A\0\0\xC8*\0\0X*\0\0N6bclibc23BCLIBC_ZeroFindingErrorE\0\0\0\0\0\0(*\0\0\xBC\0\0\0\xBD\0\0\0\xBE\0\0\0\0\0\0\0X*\0\0\xBC\0\0\0\xBF\0\0\0\xBE\0\0\0\0\0\0\0\x8C*\0\0\xBC\0\0\0\xC0\0\0\0\xBE\0\0\0\0\0\0\0\xBC*\0\0\xBC\0\0\0\xC1\0\0\0\xBE\0\0\0\0\0\0\0d+\0\0\xC2\0\0\0\xC3\0\0\0\xC4\0\0\0\0\0\0\0\xD8+\0\0\xC5\0\0\0\xC6\0\0\0\xC7\0\0\0\x88\x8A\0\0p+\0\0\xA0+\0\0N6bclibc36BCLIBC_BaseTrajDataHandlerCompositorE\0`\x8A\0\0\xA8+\0\0N6bclibc35BCLIBC_BaseTrajDataHandlerInterfaceE\0\0\x88\x8A\0\0\xE4+\0\0\xA0+\0\0N6bclibc18BCLIBC_BaseTrajSeqE\0\0\0\0\0\0\0T,\0\0\xC8\0\0\0\xC9\0\0\0\xCA\0\0\0\0\0\0\0\x88,\0\0\xCB\0\0\0\xCC\0\0\0\xCD\0\0\0\0\0\0\0\xBC,\0\0\xCB\0\0\0\xCE\0\0\0\xCF\0\0\0\0\0\0\0\xF0,\0\0\xCB\0\0\0\xD0\0\0\0\xD1\0\0\0\x88\x8A\0\0`,\0\0\xA0+\0\0N6bclibc27BCLIBC_TrajectoryDataFilterE\0\0\x88\x8A\0\0\x94,\0\0\xA0+\0\0N6bclibc27BCLIBC_EssentialTerminatorsE\0\0\x88\x8A\0\0\xC8,\0\0\xA0+\0\0N6bclibc25BCLIBC_SinglePointHandlerE\0\0\0\0\x88\x8A\0\0\xFC,\0\0\xA0+\0\0N6bclibc26BCLIBC_ZeroCrossingHandlerE\0\0\0`\x8A\0\0,-\0\0NSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEEE\0\0`\x8A\0\0t-\0\0NSt3__212basic_stringIDsNS_11char_traitsIDsEENS_9allocatorIDsEEEE\0\0\0`\x8A\0\0\xC0-\0\0NSt3__212basic_stringIDiNS_11char_traitsIDiEENS_9allocatorIDiEEEE\0\0\0`\x8A\0\0\f.\0\0N10emscripten11memory_viewIcEE\0\0`\x8A\0\x004.\0\0N10emscripten11memory_viewIaEE\0\0`\x8A\0\0\\.\0\0N10emscripten11memory_viewIhEE\0\0`\x8A\0\0\x84.\0\0N10emscripten11memory_viewIsEE\0\0`\x8A\0\0\xAC.\0\0N10emscripten11memory_viewItEE\0\0`\x8A\0\0\xD4.\0\0N10emscripten11memory_viewIiEE\0\0`\x8A\0\0\xFC.\0\0N10emscripten11memory_viewIjEE\0\0`\x8A\0\0$/\0\0N10emscripten11memory_viewIlEE\0\0`\x8A\0\0L/\0\0N10emscripten11memory_viewImEE\0\0`\x8A\0\0t/\0\0N10emscripten11memory_viewIxEE\0\0`\x8A\0\0\x9C/\0\0N10emscripten11memory_viewIyEE\0\0`\x8A\0\0\xC4/\0\0N10emscripten11memory_viewIfEE\0\0`\x8A\0\0\xEC/\0\0N10emscripten11memory_viewIdEE\0\0\0\0\0\0O\xBBag\xAC\xDD?-DT\xFB!\xE9?\x9B\xF6\x81\xD2\vs\xEF?-DT\xFB!\xF9?\xE2e/"\x7F+z<\x07\\3&\xA6\x81<\xBD\xCB\xF0z\x88\x07p<\x07\\3&\xA6\x91<-DT\xFB!\xE9?-DT\xFB!\xE9\xBF\xD2!3\x7F|\xD9@\xD2!3\x7F|\xD9\xC0\0A\xFF\xE0\0\v\xE8\x80-DT\xFB!	@-DT\xFB!	\xC0\0\0\0\0\0\0\0\0\0\0\0\0\x83\xF9\xA2\0DNn\0\xFC)\0\xD1W\'\0\xDD4\xF5\0b\xDB\xC0\0<\x99\x95\0A\x90C\0cQ\xFE\0\xBB\xDE\xAB\0\xB7a\xC5\0:n$\0\xD2MB\0I\xE0\0	\xEA.\0\x92\xD1\0\xEB\xFE\0)\xB1\0\xE8>\xA7\0\xF55\x82\0D\xBB.\0\x9C\xE9\x84\0\xB4&p\0A~_\0\xD6\x919\0S\x839\0\x9C\xF49\0\x8B_\x84\0(\xF9\xBD\0\xF8;\0\xDE\xFF\x97\0\x98\0/\xEF\0\nZ\x8B\0mm\0\xCF~6\0	\xCB\'\0FO\xB7\0\x9Ef?\0-\xEA_\0\xBA\'u\0\xE5\xEB\xC7\0={\xF1\0\xF79\x07\0\x92R\x8A\0\xFBk\xEA\0\xB1_\0\b]\x8D\x000V\0{\xFCF\0\xF0\xABk\0 \xBC\xCF\x006\xF4\x9A\0\xE3\xA9\0^a\x91\0\b\x1B\xE6\0\x85\x99e\0\xA0_\0\x8D@h\0\x80\xD8\xFF\0\'sM\01\0\xCAV\0\xC9\xA8s\0{\xE2`\0k\x8C\xC0\0\xC4G\0\xCDg\xC3\0	\xE8\xDC\0Y\x83*\0\x8Bv\xC4\0\xA6\x96\0D\xAF\xDD\0W\xD1\0\xA5>\0\x07\xFF\x003~?\0\xC22\xE8\0\x98O\xDE\0\xBB}2\0&=\xC3\0k\xEF\0\x9F\xF8^\x005:\0\x7F\xF2\xCA\0\xF1\x87\0|\x90!\0j$|\0\xD5n\xFA\x000-w\0;C\0\xB5\xC6\0\xC3\x9D\0\xAD\xC4\xC2\0,MA\0\f\0]\0\x86}F\0\xE3q-\0\x9B\xC6\x9A\x003b\0\0\xB4\xD2|\0\xB4\xA7\x97\x007U\xD5\0\xD7>\xF6\0\xA3\0Mv\xFC\0d\x9D*\0p\xD7\xAB\0c|\xF8\0z\xB0W\0\xE7\0\xC0IV\0;\xD6\xD9\0\xA7\x848\0$#\xCB\0\xD6\x8Aw\0ZT#\0\0\xB9\0\xF1\n\x1B\0\xCE\xDF\0\x9F1\xFF\0fj\0\x99Wa\0\xAC\xFBG\0~\x7F\xD8\0"e\xB7\x002\xE8\x89\0\xE6\xBF`\0\xEF\xC4\xCD\0l6	\0]?\xD4\0\xDE\xD7\0X;\xDE\0\xDE\x9B\x92\0\xD2"(\0(\x86\xE8\0\xE2XM\0\xC6\xCA2\0\b\xE3\0\xE0}\xCB\0\xC0P\0\xF3\xA7\0\xE0[\0.4\0\x83b\0\x83H\0\xF5\x8E[\0\xAD\xB0\x7F\0\xE9\xF2\0HJC\0g\xD3\0\xAA\xDD\xD8\0\xAE_B\0ja\xCE\0\n(\xA4\0\xD3\x99\xB4\0\xA6\xF2\0\\w\x7F\0\xA3\xC2\x83\0a<\x88\0\x8Asx\0\xAF\x8CZ\0o\xD7\xBD\0-\xA6c\0\xF4\xBF\xCB\0\x8D\x81\xEF\0&\xC1g\0U\xCAE\0\xCA\xD96\0(\xA8\xD2\0\xC2a\x8D\0\xC9w\0&\0F\x9B\0\xC4Y\xC4\0\xC8\xC5D\0M\xB2\x91\0\0\xF3\0\xD4C\xAD\0)I\xE5\0\xFD\xD5\0\0\xBE\xFC\0\x94\xCC\0p\xCE\xEE\0>\xF5\0\xEC\xF1\x80\0\xB3\xE7\xC3\0\xC7\xF8(\0\x93\x94\0\xC1q>\0.	\xB3\0\vE\xF3\0\x88\x9C\0\xAB {\0.\xB5\x9F\0G\x92\xC2\0{2/\0\fUm\0r\xA7\x90\0k\xE7\x001\xCB\x96\0yJ\0Ay\xE2\0\xF4\xDF\x89\0\xE8\x94\x97\0\xE2\xE6\x84\0\x991\x97\0\x88\xEDk\0__6\0\xBB\xFD\0H\x9A\xB4\0g\xA4l\0qrB\0\x8D]2\0\x9F\xB8\0\xBC\xE5	\0\x8D1%\0\xF7t9\x000\0\r\f\0K\bh\0,\xEEX\0G\xAA\x90\0t\xE7\0\xBD\xD6$\0\xF7}\xA6\0nHr\0\x9F\xEF\0\x8E\x94\xA6\0\xB4\x91\xF6\0\xD1SQ\0\xCF\n\xF2\0 \x983\0\xF5K~\0\xB2ch\0\xDD>_\0@]\0\x85\x89\x7F\0UR)\x007d\xC0\0m\xD8\x002H2\0[Lu\0Nq\xD4\0ETn\0\v	\xC1\0*\xF5i\0f\xD5\0\'\x07\x9D\0]P\0\xB4;\xDB\0\xEAv\xC5\0\x87\xF9\0Ik}\0\'\xBA\0\x96i)\0\xC6\xCC\xAC\0\xADT\0\x90\xE2j\0\x88\xD9\x89\0,rP\0\xA4\xBE\0w\x07\x94\0\xF30p\0\0\xFC\'\0\xEAq\xA8\0f\xC2I\0d\xE0=\0\x97\xDD\x83\0\xA3?\x97\0C\x94\xFD\0\r\x86\x8C\x001A\xDE\0\x929\x9D\0\xDDp\x8C\0\xB7\xE7\0\b\xDF;\07+\0\\\x80\xA0\0Z\x80\x93\0\x92\0\xE8\xD8\0l\x80\xAF\0\xDB\xFFK\x008\x90\0Yv\0b\xA5\0a\xCB\xBB\0\xC7\x89\xB9\0@\xBD\0\xD2\xF2\0Iu\'\0\xEB\xB6\xF6\0\xDB"\xBB\0\n\xAA\0\x89&/\0d\x83v\0	;3\0\x94\0Q:\xAA\0\xA3\xC2\0\xAF\xED\xAE\0\\&\0m\xC2M\0-z\x9C\0\xC0V\x97\0?\x83\0	\xF0\xF6\0+@\x8C\0m1\x99\x009\xB4\x07\0\f \0\xD8\xC3[\0\xF5\x92\xC4\0\xC6\xADK\0N\xCA\xA5\0\xA77\xCD\0\xE6\xA96\0\xAB\x92\x94\0\xDDBh\0c\xDE\0v\x8C\xEF\0h\x8BR\0\xFC\xDB7\0\xAE\xA1\xAB\0\xDF1\0\0\xAE\xA1\0\f\xFB\xDA\0dMf\0\xED\xB7\0)e0\0WV\xBF\0G\xFF:\0j\xF9\xB9\0u\xBE\xF3\0(\x93\xDF\0\xAB\x800\0f\x8C\xF6\0\xCB\0\xFA"\0\xD9\xE4\0=\xB3\xA4\0W\x1B\x8F\x006\xCD	\0NB\xE9\0\xBE\xA4\x003#\xB5\0\xF0\xAA\0Oe\xA8\0\xD2\xC1\xA5\0\v?\0[x\xCD\0#\xF9v\0{\x8B\0\x89r\0\xC6\xA6S\0on\xE2\0\xEF\xEB\0\0\x9BJX\0\xC4\xDA\xB7\0\xAAf\xBA\0v\xCF\xCF\0\xD1\0\xB1\xF1-\0\x8C\x99\xC1\0\xC3\xADw\0\x86H\xDA\0\xF7]\xA0\0\xC6\x80\xF4\0\xAC\xF0/\0\xDD\xEC\x9A\0?\\\xBC\0\xD0\xDEm\0\x90\xC7\0*\xDB\xB6\0\xA3%:\0\0\xAF\x9A\0\xADS\x93\0\xB6W\0)-\xB4\0K\x80~\0\xDA\x07\xA7\0v\xAA\0{Y\xA1\0*\0\xDC\xB7-\0\xFA\xE5\xFD\0\x89\xDB\xFE\0\x89\xBE\xFD\0\xE4vl\0\xA9\xFC\0>\x80p\0\x85n\0\xFD\x87\xFF\0(>\x07\0ag3\0*\x86\0M\xBD\xEA\0\xB3\xE7\xAF\0\x8Fmn\0\x95g9\x001\xBF[\0\x84\xD7H\x000\xDF\0\xC7-C\0%a5\0\xC9p\xCE\x000\xCB\xB8\0\xBFl\xFD\0\xA4\0\xA2\0l\xE4\0Z\xDD\xA0\0!oG\0b\xD2\0\xB9\\\x84\0paI\0kV\xE0\0\x99R\0PU7\0\xD5\xB7\x003\xF1\xC4\0n_\0]0\xE4\0\x85.\xA9\0\xB2\xC3\0\xA126\0\b\xB7\xA4\0\xEA\xB1\xD4\0\xF7!\0\x8Fi\xE4\0\'\xFFw\0\f\x80\0\x8D@-\0O\xCD\xA0\0 \xA5\x99\0\xB3\xA2\xD3\0/]\n\0\xB4\xF9B\0\xDA\xCB\0}\xBE\xD0\0\x9B\xDB\xC1\0\xAB\xBD\0\xCA\xA2\x81\0\bj\\\0.U\0\'\0U\0\x7F\xF0\0\xE1\x07\x86\0\vd\0\x96A\x8D\0\x87\xBE\xDE\0\xDA\xFD*\0k%\xB6\0{\x894\0\xF3\xFE\0\xB9\xBF\x9E\0hjO\0J*\xA8\0O\xC4Z\0-\xF8\xBC\0\xD7Z\x98\0\xF4\xC7\x95\0\rM\x8D\0 :\xA6\0\xA4W_\0?\xB1\0\x808\x95\0\xCC \0q\xDD\x86\0\xC9\xDE\xB6\0\xBF`\xF5\0Me\0\x07k\0\x8C\xB0\xAC\0\xB2\xC0\xD0\0QUH\0\xFB\0\x95r\xC3\0\xA3;\0\xC0@5\0\xDC{\0\xE0E\xCC\0N)\xFA\0\xD6\xCA\xC8\0\xE8\xF3A\0|d\xDE\0\x9Bd\xD8\0\xD9\xBE1\0\xA4\x97\xC3\0wX\xD4\0i\xE3\xC5\0\xF0\xDA\0\xBA:<\0FF\0Uu_\0\xD2\xBD\xF5\0n\x92\xC6\0\xAC.]\0D\xED\0>B\0a\xC4\x87\0)\xFD\xE9\0\xE7\xD6\xF3\0"|\xCA\0o\x915\0\b\xE0\xC5\0\xFF\xD7\x8D\0nj\xE2\0\xB0\xFD\xC6\0\x93\b\xC1\0|]t\0k\xAD\xB2\0\xCDn\x9D\0>r{\0\xC6j\0\xF7\xCF\xA9\0)s\xDF\0\xB5\xC9\xBA\0\xB7\0Q\0\xE2\xB2\r\0t\xBA$\0\xE5}`\0t\xD8\x8A\0\r,\0\x81\f\0~f\x94\0)\0\x9Fzv\0\xFD\xFD\xBE\0VE\xEF\0\xD9~6\0\xEC\xD9\0\x8B\xBA\xB9\0\xC4\x97\xFC\x001\xA8\'\0\xF1n\xC3\0\x94\xC56\0\xD8\xA8V\0\xB4\xA8\xB5\0\xCF\xCC\0\x89-\0oW4\0,V\x89\0\x99\xCE\xE3\0\xD6 \xB9\0k^\xAA\0>*\x9C\0_\xCC\0\xFD\vJ\0\xE1\xF4\xFB\0\x8E;m\0\xE2\x86,\0\xE9\xD4\x84\0\xFC\xB4\xA9\0\xEF\xEE\xD1\0.5\xC9\0/9a\x008!D\0\x1B\xD9\xC8\0\x81\xFC\n\0\xFBJj\0/\xD8\0S\xB4\x84\0N\x99\x8C\0T"\xCC\0*U\xDC\0\xC0\xC6\xD6\0\v\x96\0p\xB8\0i\x95d\0&Z`\0?R\xEE\0\x7F\0\xF4\xB5\0\xFC\xCB\xF5\x004\xBC-\x004\xBC\xEE\0\xE8]\xCC\0\xDD^`\0g\x8E\x9B\0\x923\xEF\0\xC9\xB8\0aX\x9B\0\xE1W\xBC\0Q\x83\xC6\0\xD8>\0\xDDqH\0-\xDD\0\xAF\xA1\0!,F\0Y\xF3\xD7\0\xD9z\x98\0\x9ET\xC0\0O\x86\xFA\0V\xFC\0\xE5y\xAE\0\x89"6\x008\xAD"\0g\x93\xDC\0U\xE8\xAA\0\x82&8\0\xCA\xE7\x9B\0Q\r\xA4\0\x993\xB1\0\xA9\xD7\0iH\0e\xB2\xF0\0\x7F\x88\xA7\0\x88L\x97\0\xF9\xD16\0!\x92\xB3\0{\x82J\0\x98\xCF!\0@\x9F\xDC\0\xDCGU\0\xE1t:\0g\xEBB\0\xFE\x9D\xDF\0^\xD4_\0{g\xA4\0\xBA\xACz\0U\xF6\xA2\0+\x88#\0A\xBAU\0Yn\b\0!*\x86\x009G\x83\0\x89\xE3\xE6\0\xE5\x9E\xD4\0I\xFB@\0\xFFV\xE9\0\xCA\0\xC5Y\x8A\0\x94\xFA+\0\xD3\xC1\xC5\0\xC5\xCF\0\xDBZ\xAE\0G\xC5\x86\0\x85Cb\0!\x86;\0,y\x94\0a\x87\0*L{\0\x80,\0C\xBF\0\x88&\x90\0x<\x89\0\xA8\xC4\xE4\0\xE5\xDB{\0\xC4:\xC2\0&\xF4\xEA\0\xF7g\x8A\0\r\x92\xBF\0e\xA3+\0=\x93\xB1\0\xBD|\v\0\xA4Q\xDC\0\'\xDDc\0i\xE1\xDD\0\x9A\x94\0\xA8)\x95\0h\xCE(\0	\xED\xB4\0D\x9F \0N\x98\xCA\0p\x82c\0~|#\0\xB92\0\xA7\xF5\x8E\0V\xE7\0!\xF1\b\0\xB5\x9D*\0o~M\0\xA5Q\0\xB5\xF9\xAB\0\x82\xDF\xD6\0\x96\xDDa\06\0\xC4:\x9F\0\x83\xA2\xA1\0r\xEDm\x009\x8Dz\0\x82\xB8\xA9\0k2\\\0F\'[\0\x004\xED\0\xD2\0w\0\xFC\xF4U\0YM\0\xE0q\x80\0A\xF3\xF6\0\v\xAD@\xFB!\xF9?\0\0\0\0-Dt>\0\0\0\x80\x98F\xF8<\0\0\0`Q\xCCx;\0\0\0\x80\x83\x1B\xF09\0\0\0@ %z8\0\0\0\x80"\x82\xE36\0\0\0\0\xF3i5\xFE\x82+eGg@\0\0\0\0\0\x008C\0\0\xFA\xFEB.v\xBF:;\x9E\xBC\x9A\xF7\f\xBD\xBD\xFD\xFF\xFF\xFF\xFF\xDF?<TUUUU\xC5?\x91+\xCFUU\xA5?\xD0\xA4g\x81?\0\0\0\0\0\0\xC8B\xEF9\xFA\xFEB.\xE6?$\xC4\x82\xFF\xBD\xBF\xCE?\xB5\xF4\f\xD7\bk\xAC?\xCCPF\xD2\xAB\xB2\x83?\x84:N\x9B\xE0\xD7U?\0A\xAE\xF8\0\v\xC2\xF0?n\xBF\x88O;\x9B<53\xFB\xA9=\xF6\xEF?]\xDC\xD8\x9C`q\xBCa\x80w>\x9A\xEC\xEF?\xD1f\x87z^\x90\xBC\x85\x7Fn\xE8\xE3\xEF?\xF6g5R\xD2\x8C<t\x85\xD3\xB0\xD9\xEF?\xFA\x8E\xF9#\x80\xCE\x8B\xBC\xDE\xF6\xDD)k\xD0\xEF?a\xC8\xE6aN\xF7`<\xC8\x9BuE\xC7\xEF?\x99\xD33[\xE4\xA3\x90<\x83\xF3\xC6\xCA>\xBE\xEF?m{\x83]\xA6\x9A\x97<\x89\xF9lX\xB5\xEF?\xFC\xEF\xFD\x92\xB5\x8E<\xF7Gr+\x92\xAC\xEF?\xD1\x9C/p=\xBE><\xA2\xD1\xD32\xEC\xA3\xEF?\vn\x90\x894j\xBC\x1B\xD3\xFE\xAFf\x9B\xEF?\xBD/*RV\x95\xBCQ[\xD0\x93\xEF?U\xEAN\x8C\xEF\x80P\xBC\xCC1l\xC0\xBD\x8A\xEF?\xF4\xD5\xB9#\xC9\x91\xBC\xE0-\xA9\xAE\x9A\x82\xEF?\xAFU\\\xE9\xE3\xD3\x80<Q\x8E\xA5\xC8\x98z\xEF?H\x93\xA5\xEA\x1B\x80\xBC{Q}<\xB8r\xEF?=2\xDEU\xF0\x8F\xBC\xEA\x8D\x8C8\xF9j\xEF?\xBFS?\x8C\x89\x8B<u\xCBo\xEB[c\xEF?&\xEBv\x9C\xD9\x96\xBC\xD4\\\x84\xE0[\xEF?`/:>\xF7\xEC\x9A<\xAA\xB9h1\x87T\xEF?\x9D8\x86\xCB\x82\xE7\x8F\xBC\xD9\xFC"PM\xEF?\x8D\xC3\xA6DAo\x8A<\xD6\x8Cb\x88;F\xEF?}\xE4\xB0z\x80<\x96\xDC}\x91I?\xEF?\x94\xA8\xA8\xE3\xFD\x8E\x96<8bunz8\xEF?}Ht\xF2^\x87<?\xA6\xB2O\xCE1\xEF?\xF2\xE7\x98+G\x80<\xDD|\xE2eE+\xEF?^\bq?{\xB8\x96\xBC\x81c\xF5\xE1\xDF$\xEF?1\xAB	m\xE1\xF7\x82<\xE1\xDE\xF5\x9D\xEF?\xFA\xBFo\x9B!=\xBC\x90\xD9\xDA\xD0\x7F\xEF?\xB4\n\fr\x827\x8B<\v\xE4\xA6\x85\xEF?\x8F\xCB\xCE\x89\x92n<V/>\xA9\xAF\f\xEF?\xB6\xAB\xB0MuM\x83<\xB71\n\xFE\xEF?Lt\xAC\xE2B\x86<1\xD8L\xFCp\xEF?J\xF8\xD3]9\xDD\x8F<\xFFd\xB2\b\xFC\xEE?[\x8E;\x80\xA3\x86\xBC\xF1\x9F\x92_\xC5\xF6\xEE?hPK\xCC\xEDJ\x92\xBC\xCB\xA9:7\xA7\xF1\xEE?\x8E-Q\x1B\xF8\x07\x99\xBCf\xD8m\xAE\xEC\xEE?\xD26\x94>\xE8\xD1q\xBC\xF7\x9F\xE54\xDB\xE7\xEE?\x1B\xCE\xB3\x99\xBC\xE5\xA8\xC3-\xE3\xEE?mL*\xA7H\x9F\x85<"4L\xA6\xDE\xEE?\x8Ai(z`\x93\xBC\x80\xACE\xDA\xEE?[\x89H\x8F\xA7X\xBC*.\xF7!\n\xD6\xEE?\x1B\x9AIg\x9B,|\xBC\x97\xA8P\xD9\xF5\xD1\xEE?\xAC\xC2`\xEDcC<-\x89a`\b\xCE\xEE?\xEFd;	f\x96<W\0\xEDA\xCA\xEE?y\xA1\xDA\xE1\xCCn<\xD0<\xC1\xB5\xA2\xC6\xEE?0?\x8E\xFF\x93<\xDE\xD3\xD7\xF0*\xC3\xEE?\xB0\xAFz\xBB\xCE\x90v<\'*6\xD5\xDA\xBF\xEE?w\xE0T\xEB\xBD\x93<\r\xDD\xFD\x99\xB2\xBC\xEE?\x8E\xA3q\x004\x94\x8F\xBC\xA7,\x9Dv\xB2\xB9\xEE?I\xA3\x93\xDC\xCC\xDE\x87\xBCBf\xCF\xA2\xDA\xB6\xEE?_8\xBD\xC6\xDEx\xBC\x82O\x9DV+\xB4\xEE?\xF6\\{\xECF\x86\xBC\x92]\xCA\xA4\xB1\xEE?\x8E\xD7\xFD5\x93<\xDA\'\xB56G\xAF\xEE?\x9B\x8A/\xB7\x98{<\xFD\xC7\x97\xD4\xAD\xEE?	T\xE2\xE1c\x90<)TH\xDD\x07\xAB\xEE?\xEA\xC6P\x85\xC74<\xB7FY\x8A&\xA9\xEE?5\xC0d+\xE62\x94<H!\xADo\xA7\xEE?\x9Fv\x99aJ\xE4\x8C\xBC	\xDCv\xB9\xE1\xA5\xEE?\xA8M\xEF;\xC53\x8C\xBC\x85U:\xB0~\xA4\xEE?\xAE\xE9+\x89xS\x84\xBC \xC3\xCC4F\xA3\xEE?XXVx\xDD\xCE\x93\xBC%"U\x828\xA2\xEE?d~\x80\xAAW<s\xA9L\xD4U\xA1\xEE?("^\xBF\xEF\xB3\x93\xBC\xCD;\x7Ff\x9E\xA0\xEE?\x82\xB94\x87\xADj\xBC\xBF\xDA\vu\xA0\xEE?\xEE\xA9m\xB8\xEFgc\xBC/e<\xB2\x9F\xEE?Q\x88\xE0T=\xDC\x80\xBC\x84\x94Q\xF9}\x9F\xEE?\xCF>Z~dx\xBCt_\xEC\xE8u\x9F\xEE?\xB0}\x8B\xC0J\xEE\x86\xBCt\x81\xA5H\x9A\x9F\xEE?\x8A\xE6U2\x86\xBC\xC9gBV\xEB\x9F\xEE?\xD3\xD4	^\xCB\x9C\x90<?]\xDEOi\xA0\xEE?\xA5M\xB9\xDC2{\xBC\x87\xEBs\xA1\xEE?k\xC0gT\xFD\xEC\x94<2\xC10\xED\xA1\xEE?Ul\xD6\xAB\xE1\xEBe<bN\xCF6\xF3\xA2\xEE?B\xCF\xB3/\xC5\xA1\x88\xBC>T\'\xA4\xEE?47;\xF1\xB6i\x93\xBC\xCEL\x99\x89\xA5\xEE?\xFF:\x84^\x80\xBC\xAD\xC7#F\xA7\xEE?nWr\xD8P\xD4\x94\xBC\xED\x92D\x9B\xD9\xA8\xEE?\0\x8A[g\xAD\x90<\x99f\x8A\xD9\xC7\xAA\xEE?\xB4\xEA\xF0\xC1/\xB7\x8D<\xDB\xA0*B\xE5\xAC\xEE?\xFF\xE7\xC5\x9C`\xB6e\xBC\x8CD\xB52\xAF\xEE?D_\xF3Y\x83\xF6{<6w\x99\xAE\xB1\xEE?\x83=\xA7	\x93\xBC\xC6\xFF\x91\v[\xB4\xEE?)l\x8B\xB8\xA9]\xBC\xE5\xC5\xCD\xB07\xB7\xEE?Y\xB9\x90|\xF9#l\xBCR\xC8\xCBD\xBA\xEE?\xAA\xF9\xF4"CC\x92\xBCPN\xDE\x9F\x82\xBD\xEE?K\x8Ef\xD7l\xCA\x85\xBC\xBA\x07\xCAp\xF1\xC0\xEE?\'\xCE\x91+\xFC\xAFq<\x90\xF0\xA3\x82\x91\xC4\xEE?\xBBs\n\xE15\xD2m<##\xE3c\xC8\xEE?c"b"\xC5\x87\xBCe\xE5]{f\xCC\xEE?\xD51\xE2\xE3\x86\x8B<3-J\xEC\x9B\xD0\xEE?\xBB\xBC\xD3\xD1\xBB\x91\xBC]%>\xB2\xD5\xEE?\xD21\xEE\x9C1\xCC\x90<X\xB30\x9E\xD9\xEE?\xB3Zsn\x84i\x84<\xBF\xFDyUk\xDE\xEE?\xB4\x9D\x8E\x97\xCD\xDF\x82\xBCz\xF3\xD3\xBFk\xE3\xEE?\x873\xCB\x92w\x8C<\xAD\xD3Z\x99\x9F\xE8\xEE?\xFA\xD9\xD1J\x8F{\x90\xBCf\xB6\x8D)\x07\xEE\xEE?\xBA\xAE\xDCV\xD9\xC3U\xBC\xFBO\xB8\xA2\xF3\xEE?@\xF6\xA6=\xA4\x90\xBC:Y\xE5\x8Dr\xF9\xEE?4\x93\xAD8\xF4\xD6h\xBCG^\xFB\xF2v\xFF\xEE?5\x8AXk\xE2\xEE\x91\xBCJ\xA10\xB0\xEF?\xCD\xDD_\n\xD7\xFFt<\xD2\xC1K\x90\f\xEF?\xAC\x98\x92\xFA\xFB\xBD\x91\xBC	\xD7[\xC2\xEF?\xB3\f\xAF0\xAEns<\x9CR\x85\xDD\x9B\xEF?\x94\xFD\x9F\\2\xE3\x8E<z\xD0\xFF_\xAB \xEF?\xACY	\xD1\x8F\xE0\x84<K\xD1W.\xF1\'\xEF?gN8\xAF\xCDc<\xB5\xE7\x94m/\xEF?h\x92l,kg<i\x90\xEF\xDC 7\xEF?\xD2\xB5\xCC\x83\x8A\x80\xBC\xFA\xC3]U\v?\xEF?o\xFA\xFF?]\xAD\x8F\xBC|\x89\x07J-G\xEF?I\xA9u8\xAE\r\x90\xBC\xF2\x89\r\b\x87O\xEF?\xA7\x07=\xA6\x85\xA3t<\x87\xA4\xFB\xDCX\xEF?"@ \x9E\x91\x82\xBC\x98\x83\xC9\xE3`\xEF?\xAC\x92\xC1\xD5PZ\x8E<\x852\xDB\xE6i\xEF?Kk\xACY:\x84<`\xB4\xF3!s\xEF?>\xB4\x07!\xD5\x82\xBC_\x9B{3\x97|\xEF?\xC9\rG;\xB9*\x89\xBC)\xA1\xF5F\x86\xEF?\xD3\x88:`\xB6t<\xF6?\x8B\xE7.\x90\xEF?qr\x9DQ\xEC\xC5\x83<\x83L\xC7\xFBQ\x9A\xEF?\xF0\x91\xD3\x8F\xF7\x8F\xBC\xDA\x90\xA4\xA2\xAF\xA4\xEF?}t#\xE2\x98\xAE\x8D\xBC\xF1g\x8E-H\xAF\xEF?\b \xAAA\xBC\xC3\x8E<\'Za\xEE\x1B\xBA\xEF?2\xEB\xA9\xC3\x94+\x84<\x97\xBAk7+\xC5\xEF?\xEE\x85\xD11\xA9d\x8A<@En[v\xD0\xEF?\xED\xE3;\xE4\xBA7\x8E\xBC\xBE\x9C\xAD\xFD\xDB\xEF?\x9D\xCD\x91M;\x89w<\xD8\x90\x9E\x81\xC1\xE7\xEF?\x89\xCC`A\xC1S<\xF1q\x8F+\xC2\xF3\xEF?\x008\xFA\xFEB.\xE6?0g\xC7\x93W\xF3.=\0\0\0\0\0\0\xE0\xBF`UUUUU\xE5\xBF\0\0\0\0\0\xE0?NUY\x99\x99\x99\xE9?z\xA4)UUU\xE5\xBF\xE9EH\x9B[I\xF2\xBF\xC3?&\x8B+\0\xF0?\0\0\0\0\0\xA0\xF6?\0A\xF9\x88\v\xC8\xB9\xF2\x82,\xD6\xBF\x80V7($\xB4\xFA<\0\0\0\0\0\x80\xF6?\0A\x99\x89\v\bX\xBF\xBD\xD1\xD5\xBF \xF7\xE0\xD8\b\xA5\xBD\0\0\0\0\0`\xF6?\0A\xB9\x89\vXEwv\xD5\xBFmP\xB6\xD5\xA4b#\xBD\0\0\0\0\0@\xF6?\0A\xD9\x89\v\xF8-\x87\xAD\xD5\xBF\xD5g\xB0\x9E\xE4\x84\xE6\xBC\0\0\0\0\0 \xF6?\0A\xF9\x89\vxw\x95_\xBE\xD4\xBF\xE0>)\x93i\x1B\xBD\0\0\0\0\0\0\xF6?\0A\x99\x8A\v`\xC2\x8Ba\xD4\xBF\xCC\x84LH/\xD8=\0\0\0\0\0\xE0\xF5?\0A\xB9\x8A\v\xA8\x86\x860\xD4\xBF:\v\x82\xED\xF3B\xDC<\0\0\0\0\0\xC0\xF5?\0A\xD9\x8A\vHiUL\xA6\xD3\xBF`\x94Q\x86\xC6\xB1 =\0\0\0\0\0\xA0\xF5?\0A\xF9\x8A\v\x80\x98\x9A\xDDG\xD3\xBF\x92\x80\xC5\xD4MY%=\0\0\0\0\0\x80\xF5?\0A\x99\x8B\v \xE1\xBA\xE2\xE8\xD2\xBF\xD8+\xB7\x99{&=\0\0\0\0\0`\xF5?\0A\xB9\x8B\v\x88\xDEZ\x89\xD2\xBF?\xB0\xCF\xB6\xCA=\0\0\0\0\0`\xF5?\0A\xD9\x8B\v\x88\xDEZ\x89\xD2\xBF?\xB0\xCF\xB6\xCA=\0\0\0\0\0@\xF5?\0A\xF9\x8B\vx\xCF\xFBA)\xD2\xBFv\xDAS($Z\xBD\0\0\0\0\0 \xF5?\0A\x99\x8C\v\x98i\xC1\x98\xC8\xD1\xBFT\xE7h\xBC\xAF\xBD\0\0\0\0\0\0\xF5?\0A\xB9\x8C\v\xA8\xAB\xAB\\g\xD1\xBF\xF0\xA8\x823\xC6=\0\0\0\0\0\xE0\xF4?\0A\xD9\x8C\vH\xAE\xF9\x8B\xD1\xBFfZ\xFD\xC4\xA8&\xBD\0\0\0\0\0\xC0\xF4?\0A\xF9\x8C\v\x90s\xE2$\xA3\xD0\xBF\xF4~\xEEk\f\xBD\0\0\0\0\0\xA0\xF4?\0A\x99\x8D\v\xD0\xB4\x94%@\xD0\xBF\x7F-\xF4\x9E\xB86\xF0\xBC\0\0\0\0\0\xA0\xF4?\0A\xB9\x8D\v\xD0\xB4\x94%@\xD0\xBF\x7F-\xF4\x9E\xB86\xF0\xBC\0\0\0\0\0\x80\xF4?\0A\xD9\x8D\v@^m\xB9\xCF\xBF\x87<\x99\xAB*W\r=\0\0\0\0\0`\xF4?\0A\xF9\x8D\v`\xDC\xCB\xAD\xF0\xCE\xBF$\xAF\x86\x9C\xB7&+=\0\0\0\0\0@\xF4?\0A\x99\x8E\v\xF0*n\x07\'\xCE\xBF\xFF?TO/\xBD\0\0\0\0\0 \xF4?\0A\xB9\x8E\v\xC0Ok!\\\xCD\xBF\x1Bh\xCA\xBB\x91\xBA!=\0\0\0\0\0\0\xF4?\0A\xD9\x8E\v\xA0\x9A\xC7\xF7\x8F\xCC\xBF4\x84\x9FhOy\'=\0\0\0\0\0\0\xF4?\0A\xF9\x8E\v\xA0\x9A\xC7\xF7\x8F\xCC\xBF4\x84\x9FhOy\'=\0\0\0\0\0\xE0\xF3?\0A\x99\x8F\v\x90-t\x86\xC2\xCB\xBF\x8F\xB7\x8B1\xB0N=\0\0\0\0\0\xC0\xF3?\0A\xB9\x8F\v\xC0\x80N\xC9\xF3\xCA\xBFf\x90\xCD?cN\xBA<\0\0\0\0\0\xA0\xF3?\0A\xD9\x8F\v\xB0\xE2\xBC#\xCA\xBF\xEA\xC1F\xDCd\x8C%\xBD\0\0\0\0\0\xA0\xF3?\0A\xF9\x8F\v\xB0\xE2\xBC#\xCA\xBF\xEA\xC1F\xDCd\x8C%\xBD\0\0\0\0\0\x80\xF3?\0A\x99\x90\vP\xF4\x9CZR\xC9\xBF\xE3\xD4\xC1\xD9\xD1*\xBD\0\0\0\0\0`\xF3?\0A\xB9\x90\v\xD0 e\xA0\x7F\xC8\xBF	\xFA\xDB\x7F\xBF\xBD+=\0\0\0\0\0@\xF3?\0A\xD9\x90\v\xE0\x89\xAB\xC7\xBFXJSr\x90\xDB+=\0\0\0\0\0@\xF3?\0A\xF9\x90\v\xE0\x89\xAB\xC7\xBFXJSr\x90\xDB+=\0\0\0\0\0 \xF3?\0A\x99\x91\v\xD0\xE7\xD6\xC6\xBFf\xE2\xB2\xA3j\xE4\xBD\0\0\0\0\0\0\xF3?\0A\xB9\x91\v\x90\xA7p0\xFF\xC5\xBF9P\x9FC\x9E\xBD\0\0\0\0\0\0\xF3?\0A\xD9\x91\v\x90\xA7p0\xFF\xC5\xBF9P\x9FC\x9E\xBD\0\0\0\0\0\xE0\xF2?\0A\xF9\x91\v\xB0\xA1\xE3\xE5&\xC5\xBF\x8F[\x07\x90\x8B\xDE \xBD\0\0\0\0\0\xC0\xF2?\0A\x99\x92\v\x80\xCBl+M\xC4\xBF<x5a\xC1\f=\0\0\0\0\0\xC0\xF2?\0A\xB9\x92\v\x80\xCBl+M\xC4\xBF<x5a\xC1\f=\0\0\0\0\0\xA0\xF2?\0A\xD9\x92\v\x90 \xFCq\xC3\xBF:T\'M\x86x\xF1<\0\0\0\0\0\x80\xF2?\0A\xF9\x92\v\xF0\xF8R\x95\xC2\xBF\b\xC4q0\x8D$\xBD\0\0\0\0\0`\xF2?\0A\x99\x93\v`/\xD5*\xB7\xC1\xBF\x96\xA3\xA4\x80.\xBD\0\0\0\0\0`\xF2?\0A\xB9\x93\v`/\xD5*\xB7\xC1\xBF\x96\xA3\xA4\x80.\xBD\0\0\0\0\0@\xF2?\0A\xD9\x93\v\x90\xD0|~\xD7\xC0\xBF\xF4[\xE8\x88\x96i\n=\0\0\0\0\0@\xF2?\0A\xF9\x93\v\x90\xD0|~\xD7\xC0\xBF\xF4[\xE8\x88\x96i\n=\0\0\0\0\0 \xF2?\0A\x99\x94\v\xE0\xDB1\x91\xEC\xBF\xBF\xF23\xA3\\Tu%\xBD\0\0\0\0\0\0\xF2?\0A\xBA\x94\v+n\x07\'\xBE\xBF<\0\xF0*,4*=\0\0\0\0\0\0\xF2?\0A\xDA\x94\v+n\x07\'\xBE\xBF<\0\xF0*,4*=\0\0\0\0\0\xE0\xF1?\0A\xF9\x94\v\xC0[\x8FT^\xBC\xBF\xBE_XW\f\xBD\0\0\0\0\0\xC0\xF1?\0A\x99\x95\v\xE0J:m\x92\xBA\xBF\xC8\xAA[\xE859%=\0\0\0\0\0\xC0\xF1?\0A\xB9\x95\v\xE0J:m\x92\xBA\xBF\xC8\xAA[\xE859%=\0\0\0\0\0\xA0\xF1?\0A\xD9\x95\v\xA01\xD6E\xC3\xB8\xBFhV/M)|=\0\0\0\0\0\xA0\xF1?\0A\xF9\x95\v\xA01\xD6E\xC3\xB8\xBFhV/M)|=\0\0\0\0\0\x80\xF1?\0A\x99\x96\v`\xE5\x8A\xD2\xF0\xB6\xBF\xDAs3\xC97\x97&\xBD\0\0\0\0\0`\xF1?\0A\xB9\x96\v ?\x07\x1B\xB5\xBFW^\xC6a[=\0\0\0\0\0`\xF1?\0A\xD9\x96\v ?\x07\x1B\xB5\xBFW^\xC6a[=\0\0\0\0\0@\xF1?\0A\xF9\x96\v\xE0\x1B\x96\xD7A\xB3\xBF\xDF\xF9\xCC\xDA^,=\0\0\0\0\0@\xF1?\0A\x99\x97\v\xE0\x1B\x96\xD7A\xB3\xBF\xDF\xF9\xCC\xDA^,=\0\0\0\0\0 \xF1?\0A\xB9\x97\v\x80\xA3\xEE6e\xB1\xBF	\xA3\x8Fv^|=\0\0\0\0\0\0\xF1?\0A\xD9\x97\v\x80\xC00\n\xAF\xBF\x91\x8E6\x83\x9EY-=\0\0\0\0\0\0\xF1?\0A\xF9\x97\v\x80\xC00\n\xAF\xBF\x91\x8E6\x83\x9EY-=\0\0\0\0\0\xE0\xF0?\0A\x99\x98\v\x80q\xDDB\xAB\xBFLp\xD6\xE5z\x82=\0\0\0\0\0\xE0\xF0?\0A\xB9\x98\v\x80q\xDDB\xAB\xBFLp\xD6\xE5z\x82=\0\0\0\0\0\xC0\xF0?\0A\xD9\x98\v\xC02\xF6Xt\xA7\xBF\xEE\xA1\xF24F\xFC,\xBD\0\0\0\0\0\xC0\xF0?\0A\xF9\x98\v\xC02\xF6Xt\xA7\xBF\xEE\xA1\xF24F\xFC,\xBD\0\0\0\0\0\xA0\xF0?\0A\x99\x99\v\xC0\xFE\xB9\x87\x9E\xA3\xBF\xAA\xFE&\xF5\xB7\xF5<\0\0\0\0\0\xA0\xF0?\0A\xB9\x99\v\xC0\xFE\xB9\x87\x9E\xA3\xBF\xAA\xFE&\xF5\xB7\xF5<\0\0\0\0\0\x80\xF0?\0A\xDA\x99\vx\x9B\x82\x9F\xBF\xE4	~|&\x80)\xBD\0\0\0\0\0\x80\xF0?\0A\xFA\x99\vx\x9B\x82\x9F\xBF\xE4	~|&\x80)\xBD\0\0\0\0\0`\xF0?\0A\x99\x9A\v\x80\xD5\x07\x1B\xB9\x97\xBF9\xA6\xFA\x93T\x8D(\xBD\0\0\0\0\0@\xF0?\0A\xBA\x9A\v\xFC\xB0\xA8\xC0\x8F\xBF\x9C\xA6\xD3\xF6|\xDF\xBC\0\0\0\0\0@\xF0?\0A\xDA\x9A\v\xFC\xB0\xA8\xC0\x8F\xBF\x9C\xA6\xD3\xF6|\xDF\xBC\0\0\0\0\0 \xF0?\0A\xFA\x9A\vk*\xE0\x7F\xBF\xE4@\xDA\r?\xE2\xBD\0\0\0\0\0 \xF0?\0A\x9A\x9B\vk*\xE0\x7F\xBF\xE4@\xDA\r?\xE2\xBD\0\0\0\0\0\0\xF0?\0A\xCE\x9B\v\xF0?\0A\xED\x9B\v\xC0\xEF?\0A\xFA\x9B\v\x89u\x80?\xE8+\x9D\x99k\xC7\xBD\0\0\0\0\0\x80\xEF?\0A\x99\x9C\v\x80\x93XV \x90?\xD2\xF7\xE2[\xDC#\xBD\0\0\0\0\0@\xEF?\0A\xBA\x9C\v\xC9(%I\x98?4\fZ2\xBA\xA0*\xBD\0\0\0\0\0\0\xEF?\0A\xD9\x9C\v@\xE7\x89]A\xA0?S\xD7\xF1\\\xC0=\0\0\0\0\0\xC0\xEE?\0A\xFA\x9C\v.\xD4\xAEf\xA4?(\xFD\xBDus,\xBD\0\0\0\0\0\x80\xEE?\0A\x99\x9D\v\xC0\x9F\xAA\x94\xA8?}&Z\xD0\x95y\xBD\0\0\0\0\0@\xEE?\0A\xB9\x9D\v\xC0\xDD\xCDs\xCB\xAC?\x07(\xD8G\xF2h\xBD\0\0\0\0\0 \xEE?\0A\xD9\x9D\v\xC0\xC01\xEA\xAE?{;\xC9O>\xBD\0\0\0\0\0\xE0\xED?\0A\xF9\x9D\v`F\xD1;\x97\xB1?\x9B\x9E\rV]2%\xBD\0\0\0\0\0\xA0\xED?\0A\x99\x9E\v\xE0\xD1\xA7\xF5\xBD\xB3?\xD7N\xDB\xA5^\xC8,=\0\0\0\0\0`\xED?\0A\xB9\x9E\v\xA0\x97MZ\xE9\xB5?]<i,\xBD\0\0\0\0\0@\xED?\0A\xD9\x9E\v\xC0\xEA\n\xD3\0\xB7?2\xED\x9D\xA9\x8D\xEC<\0\0\0\0\0\0\xED?\0A\xF9\x9E\v@Y]^3\xB9?\xDAG\xBD:\\#=\0\0\0\0\0\xC0\xEC?\0A\x99\x9F\v`\xAD\x8D\xC8j\xBB?\xE5h\xF7+\x80\x90\xBD\0\0\0\0\0\xA0\xEC?\0A\xB9\x9F\v@\xBCX\x88\xBC?\xD3\xACZ\xC6\xD1F&=\0\0\0\0\0`\xEC?\0A\xD9\x9F\v \n\x839\xC7\xBE?\xE0E\xE6\xAFh\xC0-\xBD\0\0\0\0\0@\xEC?\0A\xF9\x9F\v\xE0\xDB9\x91\xE8\xBF?\xFD\n\xA1O\xD64%\xBD\0\0\0\0\0\0\xEC?\0A\x99\xA0\v\xE0\'\x82\x8E\xC1?\xF2\x07-\xCEx\xEF!=\0\0\0\0\0\xE0\xEB?\0A\xB9\xA0\v\xF0#~+\xAA\xC1?4\x998D\x8E\xA7,=\0\0\0\0\0\xA0\xEB?\0A\xD9\xA0\v\x80\x86\fa\xD1\xC2?\xA1\xB4\x81\xCBl\x9D=\0\0\0\0\0\x80\xEB?\0A\xF9\xA0\v\x90\xB0\xFCe\xC3?\x89rK#\xA8/\xC6<\0\0\0\0\0@\xEB?\0A\x99\xA1\v\xB03\x83=\x91\xC4?x\xB6\xFDTy\x83%=\0\0\0\0\0 \xEB?\0A\xB9\xA1\v\xB0\xA1\xE4\xE5\'\xC5?\xC7}i\xE5\xE83&=\0\0\0\0\0\xE0\xEA?\0A\xD9\xA1\v\x8C\xBENW\xC6?x.<,\x8B\xCF=\0\0\0\0\0\xC0\xEA?\0A\xF9\xA1\vpu\x8B\xF0\xC6?\xE1!\x9C\xE5\x8D%\xBD\0\0\0\0\0\xA0\xEA?\0A\x99\xA2\vPD\x85\x8D\x89\xC7?C\x91pf\xBD\0\0\0\0\0`\xEA?\0A\xBA\xA2\v9\xEB\xAF\xBE\xC8?\xD1,\xE9\xAAT=\x07\xBD\0\0\0\0\0@\xEA?\0A\xDA\xA2\v\xF7\xDCZZ\xC9?o\xFF\xA0X(\xF2\x07=\0\0\0\0\0\0\xEA?\0A\xF9\xA2\v\xE0\x8A<\xED\x93\xCA?i!VPCr(\xBD\0\0\0\0\0\xE0\xE9?\0A\x99\xA3\v\xD0[W\xD81\xCB?\xAA\xE1\xACN\x8D5\f\xBD\0\0\0\0\0\xC0\xE9?\0A\xB9\xA3\v\xE0;8\x87\xD0\xCB?\xB6TY\xC4K-\xBD\0\0\0\0\0\xA0\xE9?\0A\xD9\xA3\v\xF0\xC6\xFBo\xCC?\xD2+\x96\xC5r\xEC\xF1\xBC\0\0\0\0\0`\xE9?\0A\xF9\xA3\v\x90\xD4\xB0=\xB1\xCD?5\xB0\xF7*\xFF*\xBD\0\0\0\0\0@\xE9?\0A\x99\xA4\v\xE7\xFFS\xCE?0\xF4A`\'\xC2<\0\0\0\0\0 \xE9?\0A\xBA\xA4\v\xDD\xE4\xAD\xF5\xCE?\x8E\xBBe!\xCA\xBC\0\0\0\0\0\0\xE9?\0A\xD9\xA4\v\xB0\xB3l\x99\xCF?0\xDF\f\xCA\xEC\xCB\x1B=\0\0\0\0\0\xC0\xE8?\0A\xF9\xA4\vXM`8q\xD0?\x91N\xED\xDB\x9C\xF8<\0\0\0\0\0\xA0\xE8?\0A\x99\xA5\v`ag-\xC4\xD0?\xE9\xEA<\x8B\'=\0\0\0\0\0\x80\xE8?\0A\xB9\xA5\v\xE8\'\x82\x8E\xD1?\xF0\xA5c!,\xBD\0\0\0\0\0`\xE8?\0A\xD9\xA5\v\xF8\xAC\xCB\\k\xD1?\x81\xA5\xF7\xCD\x9A+=\0\0\0\0\0@\xE8?\0A\xF9\xA5\vhZc\x99\xBF\xD1?\xB7\xBDGQ\xED\xA6,=\0\0\0\0\0 \xE8?\0A\x99\xA6\v\xB8mE\xD2?\xEA\xBAF\xBA\xDE\x87\n=\0\0\0\0\0\xE0\xE7?\0A\xB9\xA6\v\x90\xDC|\xF0\xBE\xD2?\xF4PJ\xFA\x9C*=\0\0\0\0\0\xC0\xE7?\0A\xD9\xA6\v`\xD3\xE1\xF1\xD3?\xB8<!\xD3z\xE2(\xBD\0\0\0\0\0\xA0\xE7?\0A\xF9\xA6\v\xBEvgk\xD3?\xC8w\xF1\xB0\xCDn=\0\0\0\0\0\x80\xE7?\0A\x99\xA7\v03wR\xC2\xD3?\\\xBD\xB6T;=\0\0\0\0\0`\xE7?\0A\xB9\xA7\v\xE8\xD5#\xB4\xD4?\x9D\xE0\x90\xEC6\xE4\b=\0\0\0\0\0@\xE7?\0A\xD9\xA7\v\xC8q\xC2\x8Dq\xD4?u\xD6g	\xCE\'/\xBD\0\0\0\0\0 \xE7?\0A\xF9\xA7\v0\x9E\xE0\xC9\xD4?\xA4\xD8\n\x1B\x89 .\xBD\0\0\0\0\0\0\xE7?\0A\x99\xA8\v\xA08\x07\xAE"\xD5?Y\xC7d\x81p\xBE.=\0\0\0\0\0\xE0\xE6?\0A\xB9\xA8\v\xD0\xC8S\xF7{\xD5?\xEF@]\xEE\xED\xAD=\0\0\0\0\0\xC0\xE6?\0A\xD9\xA8\vX`Y\xDF\xBD\xD5\xD5?\xDCe\xA4\b*\v\n\xBD\0\0\0\0\0\0\0\0\0\v\0\0\0\0\0\0\0\0\0\0\0	\0\0\0\0\v\0\0\0\0\0\0\0\0\0\n\n\n\x07\0\0	\v\0\0	\v\0\0\v\0\0\0\0\0A\xC1\xA9\v!\0\0\0\0\0\0\0\0\0\v\r\0\r\0\0\0	\0\0\0	\0\0\0\0A\xFB\xA9\v\f\0A\x87\xAA\v\0\0\0\0\0\0\0\0	\f\0\0\0\0\0\f\0\0\f\0A\xB5\xAA\v\0A\xC1\xAA\v\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0A\xEF\xAA\v\0A\xFB\xAA\v\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0\0\0\0\0\0A\xB2\xAB\v\0\0\0\0\0\0\0\0\0	\0A\xE3\xAB\v\0A\xEF\xAB\v\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0A\x9D\xAC\v\0A\xA9\xAC\v\xAA\b\0\0\0\0\0\0\0\0	\0\0\0\0\0\0\0\0\x000123456789ABCDEF\0\0\0\0dV\0\0\xBB\0\0\0\xD6\0\0\0\xD7\0\0\0\x88\x8A\0\0pV\0\0\x90\x8B\0\0NSt3__217bad_function_callE\0\0\0\0\0X\0\0\xD8\0\0\0\xD9\0\0\0\xDA\0\0\0\xDB\0\0\0\xDC\0\0\0\xDD\0\0\0\xDE\0\0\0\xDF\0\0\0\xE0\0\0\0\xE1\0\0\0\xE2\0\0\0\xE3\0\0\0\xE4\0\0\0\xE5\0\0\0\b\0\0\0\0\0\0\0PX\0\0\xE6\0\0\0\xE7\0\0\0\xF8\xFF\xFF\xFF\xF8\xFF\xFF\xFFPX\0\0\xE8\0\0\0\xE9\0\0\0\xD8V\0\0\xECV\0\0\0\0\0\0\0\0\0\x98X\0\0\xEA\0\0\0\xEB\0\0\0\xFC\xFF\xFF\xFF\xFC\xFF\xFF\xFF\x98X\0\0\xEC\0\0\0\xED\0\0\0\bW\0\0W\0\0\0\0\0\0(Y\0\0\xEE\0\0\0\xEF\0\0\0\xF0\0\0\0\xF1\0\0\0\xF2\0\0\0\xF3\0\0\0\xF4\0\0\0\xF5\0\0\0\xF6\0\0\0\xF7\0\0\0\xF8\0\0\0\xF9\0\0\0\xFA\0\0\0\xFB\0\0\0\b\0\0\0\0\0\0\0dY\0\0\xFC\0\0\0\xFD\0\0\0\xF8\xFF\xFF\xFF\xF8\xFF\xFF\xFFdY\0\0\xFE\0\0\0\xFF\0\0\0xW\0\0\x8CW\0\0\0\0\0\0\0\0\0\xACY\0\0\0\0\0\0\0\xFC\xFF\xFF\xFF\xFC\xFF\xFF\xFF\xACY\0\0\0\0\0\0\xA8W\0\0\xBCW\0\0\0\0\0\0\xDCW\0\0\0\0\0\0\x88\x8A\0\0\xE8W\0\0Z\0\0NSt3__29basic_iosIcNS_11char_traitsIcEEEE\0\0\0`\x8A\0\0X\0\0NSt3__215basic_streambufIcNS_11char_traitsIcEEEE\0\0\0\0\xE4\x8A\0\0hX\0\0\0\0\0\0\0\0\0\xDCW\0\0\xF4\xFF\xFFNSt3__213basic_istreamIcNS_11char_traitsIcEEEE\0\0\xE4\x8A\0\0\xB0X\0\0\0\0\0\0\0\0\0\xDCW\0\0\xF4\xFF\xFFNSt3__213basic_ostreamIcNS_11char_traitsIcEEEE\0\0\0\0\0\0\xF0X\0\0\0\0\x07\0\0\x88\x8A\0\0\xFCX\0\0Z\0\0NSt3__29basic_iosIwNS_11char_traitsIwEEEE\0\0\0`\x8A\0\x000Y\0\0NSt3__215basic_streambufIwNS_11char_traitsIwEEEE\0\0\0\0\xE4\x8A\0\0|Y\0\0\0\0\0\0\0\0\0\xF0X\0\0\xF4\xFF\xFFNSt3__213basic_istreamIwNS_11char_traitsIwEEEE\0\0\xE4\x8A\0\0\xC4Y\0\0\0\0\0\0\0\0\0\xF0X\0\0\xF4\xFF\xFFNSt3__213basic_ostreamIwNS_11char_traitsIwEEEE\0\0\0\0\0\0Z\0\0\b\0\0	\0\0`\x8A\0\0\fZ\0\0NSt3__28ios_baseE\0\0\0H\x8D\0\0\xD8\x8D\0\0p\x8E\0\0\0\0\0\0\xDE\x95\0\0\0\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF0Z\0\0\0\0\0C.UTF-8\0A\x80\xB5\vDZ\0A\xA0\xB5\v\xE0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\x07\0\0\xC0\b\0\0\xC0	\0\0\xC0\n\0\0\xC0\v\0\0\xC0\f\0\0\xC0\r\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\x1B\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\xC0\0\0\0\xB3\0\0\xC3\0\0\xC3\0\0\xC3\0\0\xC3\0\0\xC3\0\0\xC3\x07\0\0\xC3\b\0\0\xC3	\0\0\xC3\n\0\0\xC3\v\0\0\xC3\f\0\0\xC3\r\0\0\xD3\0\0\xC3\0\0\xC3\0\0\f\xBB\0\f\xC3\0\f\xC3\0\f\xC3\0\f\xDB\0\0\0\0\xAC[\0\0\xD8\0\0\0\0\0\0\0\xDB\0\0\0\xDC\0\0\0\xDD\0\0\0\xDE\0\0\0\xDF\0\0\0\xE0\0\0\0\0\0\0\0\0\0\xE4\0\0\0\xE5\0\0\0\x88\x8A\0\0\xB8[\0\0X\0\0NSt3__210__stdinbufIcEE\0\0\0\0\0\\\0\0\xD8\0\0\0\0\0\0\0\xDB\0\0\0\xDC\0\0\0\xDD\0\0\0\0\0\xDF\0\0\0\xE0\0\0\0\xE1\0\0\0\xE2\0\0\0\xE3\0\0\0\0\0\0\0\x88\x8A\0\0\\\0\0X\0\0NSt3__211__stdoutbufIcEE\0\0\0\0\0\0\0\0x\\\0\0\xEE\0\0\0\x1B\0\0\0\0\xF1\0\0\0\xF2\0\0\0\xF3\0\0\0\xF4\0\0\0\xF5\0\0\0\xF6\0\0\0\0\0\0\0\0\0\xFA\0\0\0\xFB\0\0\0\x88\x8A\0\0\x84\\\0\0(Y\0\0NSt3__210__stdinbufIwEE\0\0\0\0\0\xDC\\\0\0\xEE\0\0\0 \0\0!\0\0\xF1\0\0\0\xF2\0\0\0\xF3\0\0\0"\0\0\xF5\0\0\0\xF6\0\0\0\xF7\0\0\0\xF8\0\0\0\xF9\0\0\0#\0\0$\0\0\x88\x8A\0\0\xE8\\\0\0(Y\0\0NSt3__211__stdoutbufIwEE\0A\x90\xBA\v\xAA\xD1t\x9E\0W\x9D\xBD*\x80pR\xFF\xFF>\'\n\0\0\0d\0\0\0\xE8\0\0\'\0\0\xA0\x86\0@B\0\x80\x96\x98\0\0\xE1\xF5\0\0\x005\0\0\0q\0\0\0k\xFF\xFF\xFF\xCE\xFB\xFF\xFF\x92\xBF\xFF\xFF\0\0\0\0\0\0\0\0\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x07\b	\xFF\xFF\xFF\xFF\xFF\xFF\xFF\n\v\f\r\x1B !"#\xFF\xFF\xFF\xFF\xFF\xFF\n\v\f\r\x1B !"#\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0\x07\0\0\0\0\0\0\0LC_CTYPE\0\0\0\0LC_NUMERIC\0\0LC_TIME\0\0\0\0\0LC_COLLATE\0\0LC_MONETARY\0LC_MESSAGES\0\xC0`\0A\xC4\xC1\v\xF9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\b\0\0\0	\0\0\0\n\0\0\0\v\0\0\0\f\0\0\0\r\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x1B\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0 \0\0\0!\0\0\0"\0\0\0#\0\0\0$\0\0\0%\0\0\0&\0\0\0\'\0\0\0(\0\0\0)\0\0\0*\0\0\0+\0\0\0,\0\0\0-\0\0\0.\0\0\0/\0\0\x000\0\0\x001\0\0\x002\0\0\x003\0\0\x004\0\0\x005\0\0\x006\0\0\x007\0\0\x008\0\0\x009\0\0\0:\0\0\0;\0\0\0<\0\0\0=\0\0\0>\0\0\0?\0\0\0@\0\0\0A\0\0\0B\0\0\0C\0\0\0D\0\0\0E\0\0\0F\0\0\0G\0\0\0H\0\0\0I\0\0\0J\0\0\0K\0\0\0L\0\0\0M\0\0\0N\0\0\0O\0\0\0P\0\0\0Q\0\0\0R\0\0\0S\0\0\0T\0\0\0U\0\0\0V\0\0\0W\0\0\0X\0\0\0Y\0\0\0Z\0\0\0[\0\0\0\\\0\0\0]\0\0\0^\0\0\0_\0\0\0`\0\0\0A\0\0\0B\0\0\0C\0\0\0D\0\0\0E\0\0\0F\0\0\0G\0\0\0H\0\0\0I\0\0\0J\0\0\0K\0\0\0L\0\0\0M\0\0\0N\0\0\0O\0\0\0P\0\0\0Q\0\0\0R\0\0\0S\0\0\0T\0\0\0U\0\0\0V\0\0\0W\0\0\0X\0\0\0Y\0\0\0Z\0\0\0{\0\0\0|\0\0\0}\0\0\0~\0\0\0\x7F\0A\xC0\xC9\v\xD0f\0A\xD4\xCD\v\xF9\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\b\0\0\0	\0\0\0\n\0\0\0\v\0\0\0\f\0\0\0\r\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x1B\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0 \0\0\0!\0\0\0"\0\0\0#\0\0\0$\0\0\0%\0\0\0&\0\0\0\'\0\0\0(\0\0\0)\0\0\0*\0\0\0+\0\0\0,\0\0\0-\0\0\0.\0\0\0/\0\0\x000\0\0\x001\0\0\x002\0\0\x003\0\0\x004\0\0\x005\0\0\x006\0\0\x007\0\0\x008\0\0\x009\0\0\0:\0\0\0;\0\0\0<\0\0\0=\0\0\0>\0\0\0?\0\0\0@\0\0\0a\0\0\0b\0\0\0c\0\0\0d\0\0\0e\0\0\0f\0\0\0g\0\0\0h\0\0\0i\0\0\0j\0\0\0k\0\0\0l\0\0\0m\0\0\0n\0\0\0o\0\0\0p\0\0\0q\0\0\0r\0\0\0s\0\0\0t\0\0\0u\0\0\0v\0\0\0w\0\0\0x\0\0\0y\0\0\0z\0\0\0[\0\0\0\\\0\0\0]\0\0\0^\0\0\0_\0\0\0`\0\0\0a\0\0\0b\0\0\0c\0\0\0d\0\0\0e\0\0\0f\0\0\0g\0\0\0h\0\0\0i\0\0\0j\0\0\0k\0\0\0l\0\0\0m\0\0\0n\0\0\0o\0\0\0p\0\0\0q\0\0\0r\0\0\0s\0\0\0t\0\0\0u\0\0\0v\0\0\0w\0\0\0x\0\0\0y\0\0\0z\0\0\0{\0\0\0|\0\0\0}\0\0\0~\0\0\0\x7F\0A\xD4\xD5\v-\x80\xDE(\0\x80\xC8M\0\0\xA7v\0\x004\x9E\0\x80\xC7\0\x80\x9F\xEE\0\0~\x80\\@\x80\xE9g\0\xC8\x90\0U\xB8.\0A\x90\xD6\v\xD2Sun\0Mon\0Tue\0Wed\0Thu\0Fri\0Sat\0Sunday\0Monday\0Tuesday\0Wednesday\0Thursday\0Friday\0Saturday\0Jan\0Feb\0Mar\0Apr\0May\0Jun\0Jul\0Aug\0Sep\0Oct\0Nov\0Dec\0January\0February\0March\0April\0May\0June\0July\0August\0September\0October\0November\0December\0AM\0PM\0%a %b %e %T %Y\0%m/%d/%y\0%H:%M:%S\0%I:%M:%S %p\0\0\0%m/%d/%y\x000123456789\0%a %b %e %T %Y\0%H:%M:%S\0\0\0\0\0^[yY]\0^[nN]\0yes\0no\0A\xF0\xD8\v10123456789abcdefABCDEFxX+-pPiInN\0%I:%M:%S %p%H:%M\0A\xB0\xD9\v\x81%\0\0\0m\0\0\0/\0\0\0%\0\0\0d\0\0\0/\0\0\0%\0\0\0y\0\0\0%\0\0\0Y\0\0\0-\0\0\0%\0\0\0m\0\0\0-\0\0\0%\0\0\0d\0\0\0%\0\0\0I\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0 \0\0\0%\0\0\0p\0\0\0\0\0\0\0%\0\0\0H\0\0\0:\0\0\0%\0\0\0M\0A\xC0\xDA\vf%\0\0\0H\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0\0\0\0\0\xA0v\0\x007\0\x008\0\x009\0\0\0\0\0\0w\0\0:\0\0;\0\x009\0\0<\0\0=\0\0>\0\0?\0\0@\0\0A\0\0B\0\0C\0A\xB0\xDB\v\xFD\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0B\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0*\0\0*\0\0*\0\0*\0\0*\0\0*\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0*\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\x002\0\x002\0\x002\0\x002\0\x002\0\x002\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\x002\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\x82\0\0\0\0A\xB4\xE3\v\xED\\v\0\0D\0\0E\0\x009\0\0F\0\0G\0\0H\0\0I\0\0J\0\0K\0\0L\0\0\0\0\0\x008w\0\0M\0\0N\0\x009\0\0O\0\0P\0\0Q\0\0R\0\0S\0\0\0\0\0\0\\w\0\0T\0\0U\0\x009\0\0V\0\0W\0\0X\0\0Y\0\0Z\0\0t\0\0\0r\0\0\0u\0\0\0e\0\0\0\0\0\0\0f\0\0\0a\0\0\0l\0\0\0s\0\0\0e\0\0\0\0\0\0\0%\0\0\0m\0\0\0/\0\0\0%\0\0\0d\0\0\0/\0\0\0%\0\0\0y\0\0\0\0\0\0\0%\0\0\0H\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0\0\0\0\0%\0\0\0a\0\0\0 \0\0\0%\0\0\0b\0\0\0 \0\0\0%\0\0\0d\0\0\0 \0\0\0%\0\0\0H\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0 \0\0\0%\0\0\0Y\0\0\0\0\0\0\0%\0\0\0I\0\0\0:\0\0\0%\0\0\0M\0\0\0:\0\0\0%\0\0\0S\0\0\0 \0\0\0%\0\0\0p\0A\xAC\xE6\v\xFD\'<s\0\0[\0\0\\\0\x009\0\0\x88\x8A\0\0Hs\0\0\x8C\x87\0\0NSt3__26locale5facetE\0\0\0\0\0\0\0\xA4s\0\0[\0\0]\0\x009\0\0^\0\0_\0\0`\0\0a\0\0b\0\0c\0\0d\0\0e\0\0f\0\0g\0\0h\0\0i\0\0\xE4\x8A\0\0\xC4s\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xD8s\0\0\0\0\0NSt3__25ctypeIwEE\0\0\0`\x8A\0\0\xE0s\0\0NSt3__210ctype_baseE\0\0\0\0\0\0\0\0(t\0\0[\0\0j\0\x009\0\0k\0\0l\0\0m\0\0n\0\0o\0\0p\0\0q\0\0\xE4\x8A\0\0Ht\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0lt\0\0\0\0\0NSt3__27codecvtIcc11__mbstate_tEE\0\0\0`\x8A\0\0tt\0\0NSt3__212codecvt_baseE\0\0\0\0\0\0\xBCt\0\0[\0\0r\0\x009\0\0s\0\0t\0\0u\0\0v\0\0w\0\0x\0\0y\0\0\xE4\x8A\0\0\xDCt\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0lt\0\0\0\0\0NSt3__27codecvtIDsc11__mbstate_tEE\0\0\0\0\0\x000u\0\0[\0\0z\0\x009\0\0{\0\0|\0\0}\0\0~\0\0\x7F\0\0\x80\0\0\x81\0\0\xE4\x8A\0\0Pu\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0lt\0\0\0\0\0NSt3__27codecvtIDsDu11__mbstate_tEE\0\0\0\0\0\xA4u\0\0[\0\0\x82\0\x009\0\0\x83\0\0\x84\0\0\x85\0\0\x86\0\0\x87\0\0\x88\0\0\x89\0\0\xE4\x8A\0\0\xC4u\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0lt\0\0\0\0\0NSt3__27codecvtIDic11__mbstate_tEE\0\0\0\0\0\0v\0\0[\0\0\x8A\0\x009\0\0\x8B\0\0\x8C\0\0\x8D\0\0\x8E\0\0\x8F\0\0\x90\0\0\x91\0\0\xE4\x8A\0\x008v\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0lt\0\0\0\0\0NSt3__27codecvtIDiDu11__mbstate_tEE\0\xE4\x8A\0\0|v\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0lt\0\0\0\0\0NSt3__27codecvtIwc11__mbstate_tEE\0\0\0\x88\x8A\0\0\xACv\0\0<s\0\0NSt3__26locale5__impE\0\0\0\x88\x8A\0\0\xD0v\0\0<s\0\0NSt3__27collateIcEE\0\x88\x8A\0\0\xF0v\0\0<s\0\0NSt3__27collateIwEE\0\xE4\x8A\0\0$w\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xD8s\0\0\0\0\0NSt3__25ctypeIcEE\0\0\0\x88\x8A\0\0Dw\0\0<s\0\0NSt3__28numpunctIcEE\0\0\0\0\x88\x8A\0\0hw\0\0<s\0\0NSt3__28numpunctIwEE\0\0\0\0\0\0\0\0\xC4v\0\0\x92\0\0\x93\0\x009\0\0\x94\0\0\x95\0\0\x96\0\0\0\0\0\0\xE4v\0\0\x97\0\0\x98\0\x009\0\0\x99\0\0\x9A\0\0\x9B\0\0\0\0\0\0\0x\0\0[\0\0\x9C\0\x009\0\0\x9D\0\0\x9E\0\0\x9F\0\0\xA0\0\0\xA1\0\0\xA2\0\0\xA3\0\0\xA4\0\0\xA5\0\0\xA6\0\0\xA7\0\0\xE4\x8A\0\0 x\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0dx\0\0\0\0\0\0NSt3__27num_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\xE4\x8A\0\0|x\0\0\0\0\0\0\0\0\0\x94x\0\0\0\0\0\0NSt3__29__num_getIcEE\0\0\0`\x8A\0\0\x9Cx\0\0NSt3__214__num_get_baseE\0\0\0\0\0\0\0\0\xF8x\0\0[\0\0\xA8\0\x009\0\0\xA9\0\0\xAA\0\0\xAB\0\0\xAC\0\0\xAD\0\0\xAE\0\0\xAF\0\0\xB0\0\0\xB1\0\0\xB2\0\0\xB3\0\0\xE4\x8A\0\0y\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\\y\0\0\0\0\0\0NSt3__27num_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\xE4\x8A\0\0ty\0\0\0\0\0\0\0\0\0\x94x\0\0\0\0\0\0NSt3__29__num_getIwEE\0\0\0\0\0\0\0\xC0y\0\0[\0\0\xB4\0\x009\0\0\xB5\0\0\xB6\0\0\xB7\0\0\xB8\0\0\xB9\0\0\xBA\0\0\xBB\0\0\xBC\0\0\xE4\x8A\0\0\xE0y\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0$z\0\0\0\0\0\0NSt3__27num_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\xE4\x8A\0\0<z\0\0\0\0\0\0\0\0\0Tz\0\0\0\0\0\0NSt3__29__num_putIcEE\0\0\0`\x8A\0\0\\z\0\0NSt3__214__num_put_baseE\0\0\0\0\0\0\0\0\xACz\0\0[\0\0\xBD\0\x009\0\0\xBE\0\0\xBF\0\0\xC0\0\0\xC1\0\0\xC2\0\0\xC3\0\0\xC4\0\0\xC5\0\0\xE4\x8A\0\0\xCCz\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0{\0\0\0\0\0\0NSt3__27num_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\xE4\x8A\0\0({\0\0\0\0\0\0\0\0\0Tz\0\0\0\0\0\0NSt3__29__num_putIwEE\0\0\0\0\0\0\0\x94{\0\0\xC6\0\0\xC7\0\x009\0\0\xC8\0\0\xC9\0\0\xCA\0\0\xCB\0\0\xCC\0\0\xCD\0\0\xCE\0\0\xF8\xFF\xFF\xFF\x94{\0\0\xCF\0\0\xD0\0\0\xD1\0\0\xD2\0\0\xD3\0\0\xD4\0\0\xD5\0\0\xE4\x8A\0\0\xBC{\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0|\0\0\0\0\0 |\0\0\0\b\0\0NSt3__28time_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\0\0\0`\x8A\0\0\f|\0\0NSt3__29time_baseE\0\0`\x8A\0\0(|\0\0NSt3__220__time_get_c_storageIcEE\0\0\0\0\0\0\0\xA0|\0\0\xD6\0\0\xD7\0\x009\0\0\xD8\0\0\xD9\0\0\xDA\0\0\xDB\0\0\xDC\0\0\xDD\0\0\xDE\0\0\xF8\xFF\xFF\xFF\xA0|\0\0\xDF\0\0\xE0\0\0\xE1\0\0\xE2\0\0\xE3\0\0\xE4\0\0\xE5\0\0\xE4\x8A\0\0\xC8|\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0|\0\0\0\0\0}\0\0\0\b\0\0NSt3__28time_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\0\0\0`\x8A\0\0}\0\0NSt3__220__time_get_c_storageIwEE\0\0\0\0\0\0\0T}\0\0\xE6\0\0\xE7\0\x009\0\0\xE8\0\0\xE4\x8A\0\0t}\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xBC}\0\0\0\b\0\0NSt3__28time_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\0\0\0`\x8A\0\0\xC4}\0\0NSt3__210__time_putE\0\0\0\0\0\0\0\0\xF4}\0\0\xE9\0\0\xEA\0\x009\0\0\xEB\0\0\xE4\x8A\0\0~\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xBC}\0\0\0\b\0\0NSt3__28time_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\0\0\0\0\0\0\0\x94~\0\0[\0\0\xEC\0\x009\0\0\xED\0\0\xEE\0\0\xEF\0\0\xF0\0\0\xF1\0\0\xF2\0\0\xF3\0\0\xF4\0\0\xF5\0\0\xE4\x8A\0\0\xB4~\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xD0~\0\0\0\0\0NSt3__210moneypunctIcLb0EEE\0`\x8A\0\0\xD8~\0\0NSt3__210money_baseE\0\0\0\0\0\0\0\0(\x7F\0\0[\0\0\xF6\0\x009\0\0\xF7\0\0\xF8\0\0\xF9\0\0\xFA\0\0\xFB\0\0\xFC\0\0\xFD\0\0\xFE\0\0\xFF\0\0\xE4\x8A\0\0H\x7F\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xD0~\0\0\0\0\0NSt3__210moneypunctIcLb1EEE\0\0\0\0\0\x9C\x7F\0\0[\0\0\0\0\x009\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\b\0\0	\0\0\xE4\x8A\0\0\xBC\x7F\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xD0~\0\0\0\0\0NSt3__210moneypunctIwLb0EEE\0\0\0\0\0\x80\0\0[\0\0\n\0\x009\0\0\v\0\0\f\0\0\r\0\0\0\0\0\0\0\0\0\0\0\0\0\0\xE4\x8A\0\x000\x80\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xD0~\0\0\0\0\0NSt3__210moneypunctIwLb1EEE\0\0\0\0\0h\x80\0\0[\0\0\0\x009\0\0\0\0\0\0\xE4\x8A\0\0\x88\x80\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xD0\x80\0\0\0\0\0\0NSt3__29money_getIcNS_19istreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\0\0`\x8A\0\0\xD8\x80\0\0NSt3__211__money_getIcEE\0\0\0\0\0\0\0\0\x81\0\0[\0\0\0\x009\0\0\0\0\0\0\xE4\x8A\0\x000\x81\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0x\x81\0\0\0\0\0\0NSt3__29money_getIwNS_19istreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\0\0`\x8A\0\0\x80\x81\0\0NSt3__211__money_getIwEE\0\0\0\0\0\0\0\0\xB8\x81\0\0[\0\0\0\x009\0\0\x1B\0\0\0\0\xE4\x8A\0\0\xD8\x81\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0 \x82\0\0\0\0\0\0NSt3__29money_putIcNS_19ostreambuf_iteratorIcNS_11char_traitsIcEEEEEE\0\0\0`\x8A\0\0(\x82\0\0NSt3__211__money_putIcEE\0\0\0\0\0\0\0\0`\x82\0\0[\0\0\0\x009\0\0\0\0\0\0\xE4\x8A\0\0\x80\x82\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0\xC8\x82\0\0\0\0\0\0NSt3__29money_putIwNS_19ostreambuf_iteratorIwNS_11char_traitsIwEEEEEE\0\0\0`\x8A\0\0\xD0\x82\0\0NSt3__211__money_putIwEE\0\0\0\0\0\0\0\0\f\x83\0\0[\0\0 \0\x009\0\0!\0\0"\0\0#\0\0\xE4\x8A\0\0,\x83\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0D\x83\0\0\0\0\0NSt3__28messagesIcEE\0\0\0\0`\x8A\0\0L\x83\0\0NSt3__213messages_baseE\0\0\0\0\0\x84\x83\0\0[\0\0$\0\x009\0\0%\0\0&\0\0\'\0\0\xE4\x8A\0\0\xA4\x83\0\0\0\0\0\0\0\0\0<s\0\0\0\0\0D\x83\0\0\0\0\0NSt3__28messagesIwEE\0\0\0\0S\0\0\0u\0\0\0n\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0M\0\0\0o\0\0\0n\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0T\0\0\0u\0\0\0e\0\0\0s\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0W\0\0\0e\0\0\0d\0\0\0n\0\0\0e\0\0\0s\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0T\0\0\0h\0\0\0u\0\0\0r\0\0\0s\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0F\0\0\0r\0\0\0i\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0S\0\0\0a\0\0\0t\0\0\0u\0\0\0r\0\0\0d\0\0\0a\0\0\0y\0\0\0\0\0\0\0S\0\0\0u\0\0\0n\0\0\0\0\0\0\0M\0\0\0o\0\0\0n\0\0\0\0\0\0\0T\0\0\0u\0\0\0e\0\0\0\0\0\0\0W\0\0\0e\0\0\0d\0\0\0\0\0\0\0T\0\0\0h\0\0\0u\0\0\0\0\0\0\0F\0\0\0r\0\0\0i\0\0\0\0\0\0\0S\0\0\0a\0\0\0t\0\0\0\0\0\0\0J\0\0\0a\0\0\0n\0\0\0u\0\0\0a\0\0\0r\0\0\0y\0\0\0\0\0\0\0F\0\0\0e\0\0\0b\0\0\0r\0\0\0u\0\0\0a\0\0\0r\0\0\0y\0\0\0\0\0\0\0M\0\0\0a\0\0\0r\0\0\0c\0\0\0h\0\0\0\0\0\0\0A\0\0\0p\0\0\0r\0\0\0i\0\0\0l\0\0\0\0\0\0\0M\0\0\0a\0\0\0y\0\0\0\0\0\0\0J\0\0\0u\0\0\0n\0\0\0e\0\0\0\0\0\0\0J\0\0\0u\0\0\0l\0\0\0y\0\0\0\0\0\0\0A\0\0\0u\0\0\0g\0\0\0u\0\0\0s\0\0\0t\0\0\0\0\0\0\0S\0\0\0e\0\0\0p\0\0\0t\0\0\0e\0\0\0m\0\0\0b\0\0\0e\0\0\0r\0\0\0\0\0\0\0O\0\0\0c\0\0\0t\0\0\0o\0\0\0b\0\0\0e\0\0\0r\0\0\0\0\0\0\0N\0\0\0o\0\0\0v\0\0\0e\0\0\0m\0\0\0b\0\0\0e\0\0\0r\0\0\0\0\0\0\0D\0\0\0e\0\0\0c\0\0\0e\0\0\0m\0\0\0b\0\0\0e\0\0\0r\0\0\0\0\0\0\0J\0\0\0a\0\0\0n\0\0\0\0\0\0\0F\0\0\0e\0\0\0b\0\0\0\0\0\0\0M\0\0\0a\0\0\0r\0\0\0\0\0\0\0A\0\0\0p\0\0\0r\0\0\0\0\0\0\0J\0\0\0u\0\0\0n\0\0\0\0\0\0\0J\0\0\0u\0\0\0l\0\0\0\0\0\0\0A\0\0\0u\0\0\0g\0\0\0\0\0\0\0S\0\0\0e\0\0\0p\0\0\0\0\0\0\0O\0\0\0c\0\0\0t\0\0\0\0\0\0\0N\0\0\0o\0\0\0v\0\0\0\0\0\0\0D\0\0\0e\0\0\0c\0\0\0\0\0\0\0A\0\0\0M\0\0\0\0\0\0\0P\0\0\0M\0A\xB4\x8E\v\x84\f |\0\0\xCF\0\0\xD0\0\0\xD1\0\0\xD2\0\0\xD3\0\0\xD4\0\0\xD5\0\0\0\0\0\0}\0\0\xDF\0\0\xE0\0\0\xE1\0\0\xE2\0\0\xE3\0\0\xE4\0\0\xE5\0\0\0\0\0\0\x8C\x87\0\0(\0\0)\0\0*\0\0`\x8A\0\0\x94\x87\0\0NSt3__214__shared_countE\0\0\0\0\x88\x8A\0\0\xBC\x87\0\0$\x8D\0\0N10__cxxabiv116__shim_type_infoE\0\0\0\0\x88\x8A\0\0\xEC\x87\0\0\xB0\x87\0\0N10__cxxabiv117__class_type_infoE\0\0\0\x88\x8A\0\0\x88\0\0\xB0\x87\0\0N10__cxxabiv117__pbase_type_infoE\0\0\0\x88\x8A\0\0L\x88\0\0\x88\0\0N10__cxxabiv119__pointer_type_infoE\0\x88\x8A\0\0|\x88\0\0\xB0\x87\0\0N10__cxxabiv120__function_type_infoE\0\0\0\0\x88\x8A\0\0\xB0\x88\0\0\x88\0\0N10__cxxabiv129__pointer_to_member_type_infoE\0\0\0\0\0\0\0\xFC\x88\0\0+\0\0,\0\0-\0\0.\0\0/\0\0\x88\x8A\0\0\b\x89\0\0\xB0\x87\0\0N10__cxxabiv123__fundamental_type_infoE\0\xE8\x88\0\x008\x89\0\0v\0\0\0\xE8\x88\0\0D\x89\0\0Dn\0\0\xE8\x88\0\0P\x89\0\0b\0\0\0\xE8\x88\0\0\\\x89\0\0c\0\0\0\xE8\x88\0\0h\x89\0\0h\0\0\0\xE8\x88\0\0t\x89\0\0a\0\0\0\xE8\x88\0\0\x80\x89\0\0s\0\0\0\xE8\x88\0\0\x8C\x89\0\0t\0\0\0\xE8\x88\0\0\x98\x89\0\0i\0\0\0\xE8\x88\0\0\xA4\x89\0\0j\0\0\0\xE8\x88\0\0\xB0\x89\0\0l\0\0\0\xE8\x88\0\0\xBC\x89\0\0m\0\0\0\xE8\x88\0\0\xC8\x89\0\0x\0\0\0\xE8\x88\0\0\xD4\x89\0\0y\0\0\0\xE8\x88\0\0\xE0\x89\0\0f\0\0\0\xE8\x88\0\0\xEC\x89\0\0d\0\0\0\0\0\0\0p\x88\0\0+\0\x000\0\0-\0\0.\0\x001\0\0\0\0\0\0(\x8A\0\0+\0\x002\0\0-\0\0.\0\x003\0\0\x88\x8A\0\x004\x8A\0\0\xB0\x87\0\0N10__cxxabiv116__enum_type_infoE\0\0\0\0\0\0\0\0\xE0\x87\0\0+\0\x004\0\0-\0\0.\0\x005\0\x006\0\x007\0\x008\0\0\0\0\0\0\xA8\x8A\0\0+\0\x009\0\0-\0\0.\0\x005\0\0:\0\0;\0\0<\0\0\x88\x8A\0\0\xB4\x8A\0\0\xE0\x87\0\0N10__cxxabiv120__si_class_type_infoE\0\0\0\0\0\0\0\0\x8B\0\0+\0\0=\0\0-\0\0.\0\x005\0\0>\0\0?\0\0@\0\0\x88\x8A\0\0\x8B\0\0\xE0\x87\0\0N10__cxxabiv121__vmi_class_type_infoE\0\0\0\0\0\0\0@\x88\0\0+\0\0A\0\0-\0\0.\0\0B\0\0\0\0\0\0\xA8\x8B\0\0\0\0\0C\0\0D\0\0\0\0\0\0\xC4\x8B\0\0\0\0\0E\0\0F\0\0\0\0\0\0\x90\x8B\0\0\0\0\0G\0\0H\0\0`\x8A\0\0\x98\x8B\0\0St9exception\0\0\0\0\x88\x8A\0\0\xB4\x8B\0\0\x90\x8B\0\0St9bad_alloc\0\0\0\0\x88\x8A\0\0\xD0\x8B\0\0\xA8\x8B\0\0St20bad_array_new_length\0\0\0\0\0\0\0\0H\x8C\0\0\0\0\0I\0\0J\0\0\0\0\0\0\x8D\0\0\xBC\0\0\0K\0\0\xBE\0\0\0\0\0\0\0(\x8C\0\0\0\0\0L\0\0J\0\0\x88\x8A\0\x004\x8C\0\0H\x8C\0\0St12domain_error\0\0\0\0\x88\x8A\0\0T\x8C\0\0\x90\x8B\0\0St11logic_error\0\0\0\0\0x\x8C\0\0\0\0\0M\0\0J\0\0\x88\x8A\0\0\x84\x8C\0\0H\x8C\0\0St16invalid_argument\0\0\0\0\0\0\0\0\xB0\x8C\0\0\0\0\0N\0\0J\0\0\x88\x8A\0\0\xBC\x8C\0\0H\x8C\0\0St12length_error\0\0\0\0\0\0\0\0\xE4\x8C\0\0\0\0\0O\0\0J\0\0\x88\x8A\0\0\xF0\x8C\0\0H\x8C\0\0St12out_of_range\0\0\0\0\x88\x8A\0\0\x8D\0\0\x90\x8B\0\0St13runtime_error\0\0\0`\x8A\0\0,\x8D\0\0St9type_info\0A\xC1\x9A\v\b \0\0\0\xA7\0	\0A\xD4\x9A\v\n\0A\xE8\x9A\v\v\0\0\0\0\0\0\f\0\0X\x92\0\0\0\0A\x94\x9B\v\xFF\xFF\xFF\xFF\0A\xD8\x9B\v\0A\xE4\x9B\v\r\0A\xFC\x9B\v\0\0\0\0h\x96\0\0\0\0A\x94\x9C\v\0A\xA4\x9C\v\xFF\xFF\xFF\xFF\n\0A\xE8\x9C\v	\xD8\x8D\0\0\0\0\0\0\0A\xFC\x9C\v\n\0A\x94\x9D\v\n\0\0\f\0\0p\x9A\0A\xAC\x9D\v\0A\xBC\x9D\v\b\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF\0A\x80\x9E\vp\x8E\0\0%m/%d/%y\0\0\0\b%H:%M:%S\0\0\0\b');
  }
  function getBinarySync(file) {
    return file;
  }
  async function getWasmBinary(binaryFile) {
    return getBinarySync(binaryFile);
  }
  async function instantiateArrayBuffer(binaryFile, imports) {
    try {
      var binary = await getWasmBinary(binaryFile);
      var instance = await WebAssembly.instantiate(binary, imports);
      return instance;
    } catch (reason) {
      err(`failed to asynchronously prepare wasm: ${reason}`);
      abort(reason);
    }
  }
  async function instantiateAsync(binary, binaryFile, imports) {
    return instantiateArrayBuffer(binaryFile, imports);
  }
  function getWasmImports() {
    var imports = { a: wasmImports };
    return imports;
  }
  async function createWasm() {
    function receiveInstance(instance, module2) {
      wasmExports = instance.exports;
      assignWasmExports(wasmExports);
      updateMemoryViews();
      return wasmExports;
    }
    function receiveInstantiationResult(result2) {
      return receiveInstance(result2["instance"]);
    }
    var info = getWasmImports();
    if (Module2["instantiateWasm"]) {
      return new Promise((resolve, reject) => {
        Module2["instantiateWasm"](info, (inst, mod) => {
          resolve(receiveInstance(inst, mod));
        });
      });
    }
    wasmBinaryFile ?? (wasmBinaryFile = findWasmBinary());
    var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
    var exports2 = receiveInstantiationResult(result);
    return exports2;
  }
  class ExitStatus {
    constructor(status) {
      __publicField(this, "name", "ExitStatus");
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  }
  var callRuntimeCallbacks = (callbacks) => {
    while (callbacks.length > 0) {
      callbacks.shift()(Module2);
    }
  };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);
  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);
  var noExitRuntime = true;
  class ExceptionInfo {
    constructor(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - 24;
    }
    set_type(type) {
      HEAPU32[this.ptr + 4 >> 2] = type;
    }
    get_type() {
      return HEAPU32[this.ptr + 4 >> 2];
    }
    set_destructor(destructor) {
      HEAPU32[this.ptr + 8 >> 2] = destructor;
    }
    get_destructor() {
      return HEAPU32[this.ptr + 8 >> 2];
    }
    set_caught(caught) {
      caught = caught ? 1 : 0;
      HEAP8[this.ptr + 12] = caught;
    }
    get_caught() {
      return HEAP8[this.ptr + 12] != 0;
    }
    set_rethrown(rethrown) {
      rethrown = rethrown ? 1 : 0;
      HEAP8[this.ptr + 13] = rethrown;
    }
    get_rethrown() {
      return HEAP8[this.ptr + 13] != 0;
    }
    init(type, destructor) {
      this.set_adjusted_ptr(0);
      this.set_type(type);
      this.set_destructor(destructor);
    }
    set_adjusted_ptr(adjustedPtr) {
      HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
    }
    get_adjusted_ptr() {
      return HEAPU32[this.ptr + 16 >> 2];
    }
  }
  var exceptionLast = 0;
  var uncaughtExceptionCount = 0;
  var ___cxa_throw = (ptr, type, destructor) => {
    var info = new ExceptionInfo(ptr);
    info.init(type, destructor);
    exceptionLast = ptr;
    uncaughtExceptionCount++;
    throw exceptionLast;
  };
  var __abort_js = () => abort("");
  var structRegistrations = {};
  var runDestructors = (destructors) => {
    while (destructors.length) {
      var ptr = destructors.pop();
      var del = destructors.pop();
      del(ptr);
    }
  };
  function readPointer(pointer) {
    return this.fromWireType(HEAPU32[pointer >> 2]);
  }
  var awaitingDependencies = {};
  var registeredTypes = {};
  var typeDependencies = {};
  var InternalError = class InternalError extends Error {
    constructor(message) {
      super(message);
      this.name = "InternalError";
    }
  };
  var throwInternalError = (message) => {
    throw new InternalError(message);
  };
  var whenDependentTypesAreResolved = (myTypes, dependentTypes, getTypeConverters) => {
    myTypes.forEach((type) => typeDependencies[type] = dependentTypes);
    function onComplete(typeConverters2) {
      var myTypeConverters = getTypeConverters(typeConverters2);
      if (myTypeConverters.length !== myTypes.length) {
        throwInternalError("Mismatched type converter count");
      }
      for (var i2 = 0; i2 < myTypes.length; ++i2) {
        registerType(myTypes[i2], myTypeConverters[i2]);
      }
    }
    var typeConverters = new Array(dependentTypes.length);
    var unregisteredTypes = [];
    var registered = 0;
    for (let [i2, dt] of dependentTypes.entries()) {
      if (registeredTypes.hasOwnProperty(dt)) {
        typeConverters[i2] = registeredTypes[dt];
      } else {
        unregisteredTypes.push(dt);
        if (!awaitingDependencies.hasOwnProperty(dt)) {
          awaitingDependencies[dt] = [];
        }
        awaitingDependencies[dt].push(() => {
          typeConverters[i2] = registeredTypes[dt];
          ++registered;
          if (registered === unregisteredTypes.length) {
            onComplete(typeConverters);
          }
        });
      }
    }
    if (0 === unregisteredTypes.length) {
      onComplete(typeConverters);
    }
  };
  var __embind_finalize_value_object = (structType) => {
    var reg = structRegistrations[structType];
    delete structRegistrations[structType];
    var rawConstructor = reg.rawConstructor;
    var rawDestructor = reg.rawDestructor;
    var fieldRecords = reg.fields;
    var fieldTypes = fieldRecords.map((field) => field.getterReturnType).concat(fieldRecords.map((field) => field.setterArgumentType));
    whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes2) => {
      var fields = {};
      for (var [i2, field] of fieldRecords.entries()) {
        const getterReturnType = fieldTypes2[i2];
        const getter = field.getter;
        const getterContext = field.getterContext;
        const setterArgumentType = fieldTypes2[i2 + fieldRecords.length];
        const setter = field.setter;
        const setterContext = field.setterContext;
        fields[field.fieldName] = { read: (ptr) => getterReturnType.fromWireType(getter(getterContext, ptr)), write: (ptr, o) => {
          var destructors = [];
          setter(setterContext, ptr, setterArgumentType.toWireType(destructors, o));
          runDestructors(destructors);
        }, optional: getterReturnType.optional };
      }
      return [{ name: reg.name, fromWireType: (ptr) => {
        var rv = {};
        for (var i3 in fields) {
          rv[i3] = fields[i3].read(ptr);
        }
        rawDestructor(ptr);
        return rv;
      }, toWireType: (destructors, o) => {
        for (var fieldName in fields) {
          if (!(fieldName in o) && !fields[fieldName].optional) {
            throw new TypeError(`Missing field: "${fieldName}"`);
          }
        }
        var ptr = rawConstructor();
        for (fieldName in fields) {
          fields[fieldName].write(ptr, o[fieldName]);
        }
        if (destructors !== null) {
          destructors.push(rawDestructor, ptr);
        }
        return ptr;
      }, readValueFromPointer: readPointer, destructorFunction: rawDestructor }];
    });
  };
  var AsciiToString = (ptr) => {
    var str = "";
    while (1) {
      var ch = HEAPU8[ptr++];
      if (!ch) return str;
      str += String.fromCharCode(ch);
    }
  };
  var BindingError = class BindingError extends Error {
    constructor(message) {
      super(message);
      this.name = "BindingError";
    }
  };
  var throwBindingError = (message) => {
    throw new BindingError(message);
  };
  function sharedRegisterType(rawType, registeredInstance, options = {}) {
    var name = registeredInstance.name;
    if (!rawType) {
      throwBindingError(`type "${name}" must have a positive integer typeid pointer`);
    }
    if (registeredTypes.hasOwnProperty(rawType)) {
      if (options.ignoreDuplicateRegistrations) {
        return;
      } else {
        throwBindingError(`Cannot register type '${name}' twice`);
      }
    }
    registeredTypes[rawType] = registeredInstance;
    delete typeDependencies[rawType];
    if (awaitingDependencies.hasOwnProperty(rawType)) {
      var callbacks = awaitingDependencies[rawType];
      delete awaitingDependencies[rawType];
      callbacks.forEach((cb) => cb());
    }
  }
  function registerType(rawType, registeredInstance, options = {}) {
    return sharedRegisterType(rawType, registeredInstance, options);
  }
  var integerReadValueFromPointer = (name, width, signed) => {
    switch (width) {
      case 1:
        return signed ? (pointer) => HEAP8[pointer] : (pointer) => HEAPU8[pointer];
      case 2:
        return signed ? (pointer) => HEAP16[pointer >> 1] : (pointer) => HEAPU16[pointer >> 1];
      case 4:
        return signed ? (pointer) => HEAP32[pointer >> 2] : (pointer) => HEAPU32[pointer >> 2];
      case 8:
        return signed ? (pointer) => HEAP64[pointer >> 3] : (pointer) => HEAPU64[pointer >> 3];
      default:
        throw new TypeError(`invalid integer width (${width}): ${name}`);
    }
  };
  var __embind_register_bigint = (primitiveType, name, size, minRange, maxRange) => {
    name = AsciiToString(name);
    const isUnsignedType = minRange === 0n;
    let fromWireType = (value) => value;
    if (isUnsignedType) {
      const bitSize = size * 8;
      fromWireType = (value) => BigInt.asUintN(bitSize, value);
      maxRange = fromWireType(maxRange);
    }
    registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => {
      if (typeof value == "number") {
        value = BigInt(value);
      }
      return value;
    }, readValueFromPointer: integerReadValueFromPointer(name, size, !isUnsignedType), destructorFunction: null });
  };
  var __embind_register_bool = (rawType, name, trueValue, falseValue) => {
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: function(wt) {
      return !!wt;
    }, toWireType: function(destructors, o) {
      return o ? trueValue : falseValue;
    }, readValueFromPointer: function(pointer) {
      return this.fromWireType(HEAPU8[pointer]);
    }, destructorFunction: null });
  };
  var shallowCopyInternalPointer = (o) => ({ count: o.count, deleteScheduled: o.deleteScheduled, preservePointerOnDelete: o.preservePointerOnDelete, ptr: o.ptr, ptrType: o.ptrType, smartPtr: o.smartPtr, smartPtrType: o.smartPtrType });
  var throwInstanceAlreadyDeleted = (obj) => {
    function getInstanceTypeName(handle) {
      return handle.$$.ptrType.registeredClass.name;
    }
    throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
  };
  var finalizationRegistry = false;
  var detachFinalizer = (handle) => {
  };
  var runDestructor = ($$) => {
    if ($$.smartPtr) {
      $$.smartPtrType.rawDestructor($$.smartPtr);
    } else {
      $$.ptrType.registeredClass.rawDestructor($$.ptr);
    }
  };
  var releaseClassHandle = ($$) => {
    $$.count.value -= 1;
    var toDelete = 0 === $$.count.value;
    if (toDelete) {
      runDestructor($$);
    }
  };
  var attachFinalizer = (handle) => {
    if (!globalThis.FinalizationRegistry) {
      attachFinalizer = (handle2) => handle2;
      return handle;
    }
    finalizationRegistry = new FinalizationRegistry((info) => {
      releaseClassHandle(info.$$);
    });
    attachFinalizer = (handle2) => {
      var $$ = handle2.$$;
      var hasSmartPtr = !!$$.smartPtr;
      if (hasSmartPtr) {
        var info = { $$ };
        finalizationRegistry.register(handle2, info, handle2);
      }
      return handle2;
    };
    detachFinalizer = (handle2) => finalizationRegistry.unregister(handle2);
    return attachFinalizer(handle);
  };
  var deletionQueue = [];
  var flushPendingDeletes = () => {
    while (deletionQueue.length) {
      var obj = deletionQueue.pop();
      obj.$$.deleteScheduled = false;
      obj["delete"]();
    }
  };
  var delayFunction;
  var init_ClassHandle = () => {
    let proto = ClassHandle.prototype;
    Object.assign(proto, { isAliasOf(other) {
      if (!(this instanceof ClassHandle)) {
        return false;
      }
      if (!(other instanceof ClassHandle)) {
        return false;
      }
      var leftClass = this.$$.ptrType.registeredClass;
      var left = this.$$.ptr;
      other.$$ = other.$$;
      var rightClass = other.$$.ptrType.registeredClass;
      var right = other.$$.ptr;
      while (leftClass.baseClass) {
        left = leftClass.upcast(left);
        leftClass = leftClass.baseClass;
      }
      while (rightClass.baseClass) {
        right = rightClass.upcast(right);
        rightClass = rightClass.baseClass;
      }
      return leftClass === rightClass && left === right;
    }, clone() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.preservePointerOnDelete) {
        this.$$.count.value += 1;
        return this;
      } else {
        var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } }));
        clone.$$.count.value += 1;
        clone.$$.deleteScheduled = false;
        return clone;
      }
    }, delete() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError("Object already scheduled for deletion");
      }
      detachFinalizer(this);
      releaseClassHandle(this.$$);
      if (!this.$$.preservePointerOnDelete) {
        this.$$.smartPtr = void 0;
        this.$$.ptr = void 0;
      }
    }, isDeleted() {
      return !this.$$.ptr;
    }, deleteLater() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError("Object already scheduled for deletion");
      }
      deletionQueue.push(this);
      if (deletionQueue.length === 1 && delayFunction) {
        delayFunction(flushPendingDeletes);
      }
      this.$$.deleteScheduled = true;
      return this;
    } });
    const symbolDispose = Symbol.dispose;
    if (symbolDispose) {
      proto[symbolDispose] = proto["delete"];
    }
  };
  function ClassHandle() {
  }
  var createNamedFunction = (name, func) => Object.defineProperty(func, "name", { value: name });
  var registeredPointers = {};
  var ensureOverloadTable = (proto, methodName, humanName) => {
    if (void 0 === proto[methodName].overloadTable) {
      var prevFunc = proto[methodName];
      proto[methodName] = function(...args) {
        if (!proto[methodName].overloadTable.hasOwnProperty(args.length)) {
          throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`);
        }
        return proto[methodName].overloadTable[args.length].apply(this, args);
      };
      proto[methodName].overloadTable = [];
      proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
    }
  };
  var exposePublicSymbol = (name, value, numArguments) => {
    if (Module2.hasOwnProperty(name)) {
      if (void 0 === numArguments || void 0 !== Module2[name].overloadTable && void 0 !== Module2[name].overloadTable[numArguments]) {
        throwBindingError(`Cannot register public name '${name}' twice`);
      }
      ensureOverloadTable(Module2, name, name);
      if (Module2[name].overloadTable.hasOwnProperty(numArguments)) {
        throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`);
      }
      Module2[name].overloadTable[numArguments] = value;
    } else {
      Module2[name] = value;
      Module2[name].argCount = numArguments;
    }
  };
  var char_0 = 48;
  var char_9 = 57;
  var makeLegalFunctionName = (name) => {
    name = name.replace(/[^a-zA-Z0-9_]/g, "$");
    var f = name.charCodeAt(0);
    if (f >= char_0 && f <= char_9) {
      return `_${name}`;
    }
    return name;
  };
  function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
    this.name = name;
    this.constructor = constructor;
    this.instancePrototype = instancePrototype;
    this.rawDestructor = rawDestructor;
    this.baseClass = baseClass;
    this.getActualType = getActualType;
    this.upcast = upcast;
    this.downcast = downcast;
    this.pureVirtualFunctions = [];
  }
  var upcastPointer = (ptr, ptrClass, desiredClass) => {
    while (ptrClass !== desiredClass) {
      if (!ptrClass.upcast) {
        throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`);
      }
      ptr = ptrClass.upcast(ptr);
      ptrClass = ptrClass.baseClass;
    }
    return ptr;
  };
  var embindRepr = (v) => {
    if (v === null) {
      return "null";
    }
    var t = typeof v;
    if (t === "object" || t === "array" || t === "function") {
      return v.toString();
    } else {
      return "" + v;
    }
  };
  function constNoSmartPtrRawPointerToWireType(destructors, handle) {
    if (handle === null) {
      if (this.isReference) {
        throwBindingError(`null is not a valid ${this.name}`);
      }
      return 0;
    }
    if (!handle.$$) {
      throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
    }
    if (!handle.$$.ptr) {
      throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    return ptr;
  }
  function genericPointerToWireType(destructors, handle) {
    var ptr;
    if (handle === null) {
      if (this.isReference) {
        throwBindingError(`null is not a valid ${this.name}`);
      }
      if (this.isSmartPointer) {
        ptr = this.rawConstructor();
        if (destructors !== null) {
          destructors.push(this.rawDestructor, ptr);
        }
        return ptr;
      } else {
        return 0;
      }
    }
    if (!handle || !handle.$$) {
      throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
    }
    if (!handle.$$.ptr) {
      throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
    }
    if (!this.isConst && handle.$$.ptrType.isConst) {
      throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    if (this.isSmartPointer) {
      if (void 0 === handle.$$.smartPtr) {
        throwBindingError("Passing raw pointer to smart pointer is illegal");
      }
      switch (this.sharingPolicy) {
        case 0:
          if (handle.$$.smartPtrType === this) {
            ptr = handle.$$.smartPtr;
          } else {
            throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name} to parameter type ${this.name}`);
          }
          break;
        case 1:
          ptr = handle.$$.smartPtr;
          break;
        case 2:
          if (handle.$$.smartPtrType === this) {
            ptr = handle.$$.smartPtr;
          } else {
            var clonedHandle = handle["clone"]();
            ptr = this.rawShare(ptr, Emval.toHandle(() => clonedHandle["delete"]()));
            if (destructors !== null) {
              destructors.push(this.rawDestructor, ptr);
            }
          }
          break;
        default:
          throwBindingError("Unsupporting sharing policy");
      }
    }
    return ptr;
  }
  function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
    if (handle === null) {
      if (this.isReference) {
        throwBindingError(`null is not a valid ${this.name}`);
      }
      return 0;
    }
    if (!handle.$$) {
      throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`);
    }
    if (!handle.$$.ptr) {
      throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`);
    }
    if (handle.$$.ptrType.isConst) {
      throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`);
    }
    var handleClass = handle.$$.ptrType.registeredClass;
    var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
    return ptr;
  }
  var downcastPointer = (ptr, ptrClass, desiredClass) => {
    if (ptrClass === desiredClass) {
      return ptr;
    }
    if (void 0 === desiredClass.baseClass) {
      return null;
    }
    var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
    if (rv === null) {
      return null;
    }
    return desiredClass.downcast(rv);
  };
  var registeredInstances = {};
  var getBasestPointer = (class_, ptr) => {
    if (ptr === void 0) {
      throwBindingError("ptr should not be undefined");
    }
    while (class_.baseClass) {
      ptr = class_.upcast(ptr);
      class_ = class_.baseClass;
    }
    return ptr;
  };
  var getInheritedInstance = (class_, ptr) => {
    ptr = getBasestPointer(class_, ptr);
    return registeredInstances[ptr];
  };
  var makeClassHandle = (prototype, record) => {
    if (!record.ptrType || !record.ptr) {
      throwInternalError("makeClassHandle requires ptr and ptrType");
    }
    var hasSmartPtrType = !!record.smartPtrType;
    var hasSmartPtr = !!record.smartPtr;
    if (hasSmartPtrType !== hasSmartPtr) {
      throwInternalError("Both smartPtrType and smartPtr must be specified");
    }
    record.count = { value: 1 };
    return attachFinalizer(Object.create(prototype, { $$: { value: record, writable: true } }));
  };
  function RegisteredPointer_fromWireType(ptr) {
    var rawPointer = this.getPointee(ptr);
    if (!rawPointer) {
      this.destructor(ptr);
      return null;
    }
    var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
    if (void 0 !== registeredInstance) {
      if (0 === registeredInstance.$$.count.value) {
        registeredInstance.$$.ptr = rawPointer;
        registeredInstance.$$.smartPtr = ptr;
        return registeredInstance["clone"]();
      } else {
        var rv = registeredInstance["clone"]();
        this.destructor(ptr);
        return rv;
      }
    }
    function makeDefaultHandle() {
      if (this.isSmartPointer) {
        return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: rawPointer, smartPtrType: this, smartPtr: ptr });
      } else {
        return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this, ptr });
      }
    }
    var actualType = this.registeredClass.getActualType(rawPointer);
    var registeredPointerRecord = registeredPointers[actualType];
    if (!registeredPointerRecord) {
      return makeDefaultHandle.call(this);
    }
    var toType;
    if (this.isConst) {
      toType = registeredPointerRecord.constPointerType;
    } else {
      toType = registeredPointerRecord.pointerType;
    }
    var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
    if (dp === null) {
      return makeDefaultHandle.call(this);
    }
    if (this.isSmartPointer) {
      return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp, smartPtrType: this, smartPtr: ptr });
    } else {
      return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp });
    }
  }
  var init_RegisteredPointer = () => {
    Object.assign(RegisteredPointer.prototype, { getPointee(ptr) {
      if (this.rawGetPointee) {
        ptr = this.rawGetPointee(ptr);
      }
      return ptr;
    }, destructor(ptr) {
      this.rawDestructor?.(ptr);
    }, readValueFromPointer: readPointer, fromWireType: RegisteredPointer_fromWireType });
  };
  function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
    this.name = name;
    this.registeredClass = registeredClass;
    this.isReference = isReference;
    this.isConst = isConst;
    this.isSmartPointer = isSmartPointer;
    this.pointeeType = pointeeType;
    this.sharingPolicy = sharingPolicy;
    this.rawGetPointee = rawGetPointee;
    this.rawConstructor = rawConstructor;
    this.rawShare = rawShare;
    this.rawDestructor = rawDestructor;
    if (!isSmartPointer && registeredClass.baseClass === void 0) {
      if (isConst) {
        this.toWireType = constNoSmartPtrRawPointerToWireType;
        this.destructorFunction = null;
      } else {
        this.toWireType = nonConstNoSmartPtrRawPointerToWireType;
        this.destructorFunction = null;
      }
    } else {
      this.toWireType = genericPointerToWireType;
    }
  }
  var replacePublicSymbol = (name, value, numArguments) => {
    if (!Module2.hasOwnProperty(name)) {
      throwInternalError("Replacing nonexistent public symbol");
    }
    if (void 0 !== Module2[name].overloadTable && void 0 !== numArguments) {
      Module2[name].overloadTable[numArguments] = value;
    } else {
      Module2[name] = value;
      Module2[name].argCount = numArguments;
    }
  };
  var wasmTableMirror = [];
  var getWasmTableEntry = (funcPtr) => {
    var func = wasmTableMirror[funcPtr];
    if (!func) {
      wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
    }
    return func;
  };
  var embind__requireFunction = (signature, rawFunction, isAsync = false) => {
    signature = AsciiToString(signature);
    function makeDynCaller() {
      var rtn = getWasmTableEntry(rawFunction);
      return rtn;
    }
    var fp = makeDynCaller();
    if (typeof fp != "function") {
      throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`);
    }
    return fp;
  };
  class UnboundTypeError extends Error {
  }
  var getTypeName = (type) => {
    var ptr = ___getTypeName(type);
    var rv = AsciiToString(ptr);
    _free(ptr);
    return rv;
  };
  var throwUnboundTypeError = (message, types) => {
    var unboundTypes = [];
    var seen = {};
    function visit(type) {
      if (seen[type]) {
        return;
      }
      if (registeredTypes[type]) {
        return;
      }
      if (typeDependencies[type]) {
        typeDependencies[type].forEach(visit);
        return;
      }
      unboundTypes.push(type);
      seen[type] = true;
    }
    types.forEach(visit);
    throw new UnboundTypeError(`${message}: ` + unboundTypes.map(getTypeName).join([", "]));
  };
  var __embind_register_class = (rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) => {
    name = AsciiToString(name);
    getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
    upcast && (upcast = embind__requireFunction(upcastSignature, upcast));
    downcast && (downcast = embind__requireFunction(downcastSignature, downcast));
    rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
    var legalFunctionName = makeLegalFunctionName(name);
    exposePublicSymbol(legalFunctionName, function() {
      throwUnboundTypeError(`Cannot construct ${name} due to unbound types`, [baseClassRawType]);
    });
    whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], (base) => {
      var _a;
      base = base[0];
      var baseClass;
      var basePrototype;
      if (baseClassRawType) {
        baseClass = base.registeredClass;
        basePrototype = baseClass.instancePrototype;
      } else {
        basePrototype = ClassHandle.prototype;
      }
      var constructor = createNamedFunction(name, function(...args) {
        if (Object.getPrototypeOf(this) !== instancePrototype) {
          throw new BindingError(`Use 'new' to construct ${name}`);
        }
        if (void 0 === registeredClass.constructor_body) {
          throw new BindingError(`${name} has no accessible constructor`);
        }
        var body = registeredClass.constructor_body[args.length];
        if (void 0 === body) {
          throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`);
        }
        return body.apply(this, args);
      });
      var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } });
      constructor.prototype = instancePrototype;
      var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
      if (registeredClass.baseClass) {
        (_a = registeredClass.baseClass).__derivedClasses ?? (_a.__derivedClasses = []);
        registeredClass.baseClass.__derivedClasses.push(registeredClass);
      }
      var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
      var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
      var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
      registeredPointers[rawType] = { pointerType: pointerConverter, constPointerType: constPointerConverter };
      replacePublicSymbol(legalFunctionName, constructor);
      return [referenceConverter, pointerConverter, constPointerConverter];
    });
  };
  var heap32VectorToArray = (count, firstElement) => {
    var array = [];
    for (var i2 = 0; i2 < count; i2++) {
      array.push(HEAPU32[firstElement + i2 * 4 >> 2]);
    }
    return array;
  };
  function usesDestructorStack(argTypes) {
    for (var i2 = 1; i2 < argTypes.length; ++i2) {
      if (argTypes[i2] !== null && argTypes[i2].destructorFunction === void 0) {
        return true;
      }
    }
    return false;
  }
  function createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync) {
    var needsDestructorStack = usesDestructorStack(argTypes);
    var argCount = argTypes.length - 2;
    var argsList = [];
    var argsListWired = ["fn"];
    if (isClassMethodFunc) {
      argsListWired.push("thisWired");
    }
    for (var i2 = 0; i2 < argCount; ++i2) {
      argsList.push(`arg${i2}`);
      argsListWired.push(`arg${i2}Wired`);
    }
    argsList = argsList.join(",");
    argsListWired = argsListWired.join(",");
    var invokerFnBody = `return function (${argsList}) {
`;
    if (needsDestructorStack) {
      invokerFnBody += "var destructors = [];\n";
    }
    var dtorStack = needsDestructorStack ? "destructors" : "null";
    var args1 = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "fromRetWire", "toClassParamWire"];
    if (isClassMethodFunc) {
      invokerFnBody += `var thisWired = toClassParamWire(${dtorStack}, this);
`;
    }
    for (var i2 = 0; i2 < argCount; ++i2) {
      var argName = `toArg${i2}Wire`;
      invokerFnBody += `var arg${i2}Wired = ${argName}(${dtorStack}, arg${i2});
`;
      args1.push(argName);
    }
    invokerFnBody += (returns || isAsync ? "var rv = " : "") + `invoker(${argsListWired});
`;
    if (needsDestructorStack) {
      invokerFnBody += "runDestructors(destructors);\n";
    } else {
      for (var i2 = isClassMethodFunc ? 1 : 2; i2 < argTypes.length; ++i2) {
        var paramName = i2 === 1 ? "thisWired" : "arg" + (i2 - 2) + "Wired";
        if (argTypes[i2].destructorFunction !== null) {
          invokerFnBody += `${paramName}_dtor(${paramName});
`;
          args1.push(`${paramName}_dtor`);
        }
      }
    }
    if (returns) {
      invokerFnBody += "var ret = fromRetWire(rv);\nreturn ret;\n";
    } else {
    }
    invokerFnBody += "}\n";
    return new Function(args1, invokerFnBody);
  }
  function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
    var argCount = argTypes.length;
    if (argCount < 2) {
      throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
    }
    var isClassMethodFunc = argTypes[1] !== null && classType !== null;
    var needsDestructorStack = usesDestructorStack(argTypes);
    var returns = !argTypes[0].isVoid;
    var retType = argTypes[0];
    var instType = argTypes[1];
    var closureArgs = [humanName, throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, retType.fromWireType.bind(retType), instType?.toWireType.bind(instType)];
    for (var i2 = 2; i2 < argCount; ++i2) {
      var argType = argTypes[i2];
      closureArgs.push(argType.toWireType.bind(argType));
    }
    if (!needsDestructorStack) {
      for (var i2 = isClassMethodFunc ? 1 : 2; i2 < argTypes.length; ++i2) {
        if (argTypes[i2].destructorFunction !== null) {
          closureArgs.push(argTypes[i2].destructorFunction);
        }
      }
    }
    let invokerFactory = createJsInvoker(argTypes, isClassMethodFunc, returns, isAsync);
    var invokerFn = invokerFactory(...closureArgs);
    return createNamedFunction(humanName, invokerFn);
  }
  var __embind_register_class_constructor = (rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) => {
    var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
    invoker = embind__requireFunction(invokerSignature, invoker);
    whenDependentTypesAreResolved([], [rawClassType], (classType) => {
      classType = classType[0];
      var humanName = `constructor ${classType.name}`;
      if (void 0 === classType.registeredClass.constructor_body) {
        classType.registeredClass.constructor_body = [];
      }
      if (void 0 !== classType.registeredClass.constructor_body[argCount - 1]) {
        throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount - 1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
      }
      classType.registeredClass.constructor_body[argCount - 1] = () => {
        throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`, rawArgTypes);
      };
      whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
        argTypes.splice(1, 0, null);
        classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
        return [];
      });
      return [];
    });
  };
  var getFunctionName = (signature) => {
    signature = signature.trim();
    const argsIndex = signature.indexOf("(");
    if (argsIndex === -1) return signature;
    return signature.slice(0, argsIndex);
  };
  var __embind_register_class_function = (rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual, isAsync, isNonnullReturn) => {
    var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
    methodName = AsciiToString(methodName);
    methodName = getFunctionName(methodName);
    rawInvoker = embind__requireFunction(invokerSignature, rawInvoker, isAsync);
    whenDependentTypesAreResolved([], [rawClassType], (classType) => {
      classType = classType[0];
      var humanName = `${classType.name}.${methodName}`;
      if (methodName.startsWith("@@")) {
        methodName = Symbol[methodName.substring(2)];
      }
      if (isPureVirtual) {
        classType.registeredClass.pureVirtualFunctions.push(methodName);
      }
      function unboundTypesHandler() {
        throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`, rawArgTypes);
      }
      var proto = classType.registeredClass.instancePrototype;
      var method = proto[methodName];
      if (void 0 === method || void 0 === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
        unboundTypesHandler.argCount = argCount - 2;
        unboundTypesHandler.className = classType.name;
        proto[methodName] = unboundTypesHandler;
      } else {
        ensureOverloadTable(proto, methodName, humanName);
        proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
      }
      whenDependentTypesAreResolved([], rawArgTypes, (argTypes) => {
        var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
        if (void 0 === proto[methodName].overloadTable) {
          memberFunction.argCount = argCount - 2;
          proto[methodName] = memberFunction;
        } else {
          proto[methodName].overloadTable[argCount - 2] = memberFunction;
        }
        return [];
      });
      return [];
    });
  };
  var validateThis = (this_, classType, humanName) => {
    if (!(this_ instanceof Object)) {
      throwBindingError(`${humanName} with invalid "this": ${this_}`);
    }
    if (!(this_ instanceof classType.registeredClass.constructor)) {
      throwBindingError(`${humanName} incompatible with "this" of type ${this_.constructor.name}`);
    }
    if (!this_.$$.ptr) {
      throwBindingError(`cannot call emscripten binding method ${humanName} on deleted object`);
    }
    return upcastPointer(this_.$$.ptr, this_.$$.ptrType.registeredClass, classType.registeredClass);
  };
  var __embind_register_class_property = (classType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) => {
    fieldName = AsciiToString(fieldName);
    getter = embind__requireFunction(getterSignature, getter);
    whenDependentTypesAreResolved([], [classType], (classType2) => {
      classType2 = classType2[0];
      var humanName = `${classType2.name}.${fieldName}`;
      var desc = { get() {
        throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`, [getterReturnType, setterArgumentType]);
      }, enumerable: true, configurable: true };
      if (setter) {
        desc.set = () => throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`, [getterReturnType, setterArgumentType]);
      } else {
        desc.set = (v) => throwBindingError(humanName + " is a read-only property");
      }
      Object.defineProperty(classType2.registeredClass.instancePrototype, fieldName, desc);
      whenDependentTypesAreResolved([], setter ? [getterReturnType, setterArgumentType] : [getterReturnType], (types) => {
        var getterReturnType2 = types[0];
        var desc2 = { get() {
          var ptr = validateThis(this, classType2, humanName + " getter");
          return getterReturnType2.fromWireType(getter(getterContext, ptr));
        }, enumerable: true };
        if (setter) {
          setter = embind__requireFunction(setterSignature, setter);
          var setterArgumentType2 = types[1];
          desc2.set = function(v) {
            var ptr = validateThis(this, classType2, humanName + " setter");
            var destructors = [];
            setter(setterContext, ptr, setterArgumentType2.toWireType(destructors, v));
            runDestructors(destructors);
          };
        }
        Object.defineProperty(classType2.registeredClass.instancePrototype, fieldName, desc2);
        return [];
      });
      return [];
    });
  };
  var __embind_register_constant = (name, type, value) => {
    name = AsciiToString(name);
    whenDependentTypesAreResolved([], [type], (type2) => {
      type2 = type2[0];
      Module2[name] = type2.fromWireType(value);
      return [];
    });
  };
  var emval_freelist = [];
  var emval_handles = [0, 1, , 1, null, 1, true, 1, false, 1];
  var __emval_decref = (handle) => {
    if (handle > 9 && 0 === --emval_handles[handle + 1]) {
      emval_handles[handle] = void 0;
      emval_freelist.push(handle);
    }
  };
  var Emval = { toValue: (handle) => {
    if (!handle) {
      throwBindingError(`Cannot use deleted val. handle = ${handle}`);
    }
    return emval_handles[handle];
  }, toHandle: (value) => {
    switch (value) {
      case void 0:
        return 2;
      case null:
        return 4;
      case true:
        return 6;
      case false:
        return 8;
      default: {
        const handle = emval_freelist.pop() || emval_handles.length;
        emval_handles[handle] = value;
        emval_handles[handle + 1] = 1;
        return handle;
      }
    }
  } };
  var EmValType = { name: "emscripten::val", fromWireType: (handle) => {
    var rv = Emval.toValue(handle);
    __emval_decref(handle);
    return rv;
  }, toWireType: (destructors, value) => Emval.toHandle(value), readValueFromPointer: readPointer, destructorFunction: null };
  var __embind_register_emval = (rawType) => registerType(rawType, EmValType);
  var enumReadValueFromPointer = (name, width, signed) => {
    switch (width) {
      case 1:
        return signed ? function(pointer) {
          return this.fromWireType(HEAP8[pointer]);
        } : function(pointer) {
          return this.fromWireType(HEAPU8[pointer]);
        };
      case 2:
        return signed ? function(pointer) {
          return this.fromWireType(HEAP16[pointer >> 1]);
        } : function(pointer) {
          return this.fromWireType(HEAPU16[pointer >> 1]);
        };
      case 4:
        return signed ? function(pointer) {
          return this.fromWireType(HEAP32[pointer >> 2]);
        } : function(pointer) {
          return this.fromWireType(HEAPU32[pointer >> 2]);
        };
      default:
        throw new TypeError(`invalid integer width (${width}): ${name}`);
    }
  };
  var __embind_register_enum = (rawType, name, size, isSigned) => {
    name = AsciiToString(name);
    function ctor() {
    }
    ctor.values = {};
    registerType(rawType, { name, constructor: ctor, fromWireType: function(c) {
      return this.constructor.values[c];
    }, toWireType: (destructors, c) => c.value, readValueFromPointer: enumReadValueFromPointer(name, size, isSigned), destructorFunction: null });
    exposePublicSymbol(name, ctor);
  };
  var requireRegisteredType = (rawType, humanName) => {
    var impl = registeredTypes[rawType];
    if (void 0 === impl) {
      throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`);
    }
    return impl;
  };
  var __embind_register_enum_value = (rawEnumType, name, enumValue) => {
    var enumType = requireRegisteredType(rawEnumType, "enum");
    name = AsciiToString(name);
    var Enum = enumType.constructor;
    var Value = Object.create(enumType.constructor.prototype, { value: { value: enumValue }, constructor: { value: createNamedFunction(`${enumType.name}_${name}`, function() {
    }) } });
    Enum.values[enumValue] = Value;
    Enum[name] = Value;
  };
  var floatReadValueFromPointer = (name, width) => {
    switch (width) {
      case 4:
        return function(pointer) {
          return this.fromWireType(HEAPF32[pointer >> 2]);
        };
      case 8:
        return function(pointer) {
          return this.fromWireType(HEAPF64[pointer >> 3]);
        };
      default:
        throw new TypeError(`invalid float width (${width}): ${name}`);
    }
  };
  var __embind_register_float = (rawType, name, size) => {
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: (value) => value, toWireType: (destructors, value) => value, readValueFromPointer: floatReadValueFromPointer(name, size), destructorFunction: null });
  };
  var __embind_register_function = (name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync, isNonnullReturn) => {
    var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
    name = AsciiToString(name);
    name = getFunctionName(name);
    rawInvoker = embind__requireFunction(signature, rawInvoker, isAsync);
    exposePublicSymbol(name, function() {
      throwUnboundTypeError(`Cannot call ${name} due to unbound types`, argTypes);
    }, argCount - 1);
    whenDependentTypesAreResolved([], argTypes, (argTypes2) => {
      var invokerArgsArray = [argTypes2[0], null].concat(argTypes2.slice(1));
      replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null, rawInvoker, fn, isAsync), argCount - 1);
      return [];
    });
  };
  var __embind_register_integer = (primitiveType, name, size, minRange, maxRange) => {
    name = AsciiToString(name);
    const isUnsignedType = minRange === 0;
    let fromWireType = (value) => value;
    if (isUnsignedType) {
      var bitshift = 32 - 8 * size;
      fromWireType = (value) => value << bitshift >>> bitshift;
      maxRange = fromWireType(maxRange);
    }
    registerType(primitiveType, { name, fromWireType, toWireType: (destructors, value) => value, readValueFromPointer: integerReadValueFromPointer(name, size, minRange !== 0), destructorFunction: null });
  };
  var __embind_register_memory_view = (rawType, dataTypeIndex, name) => {
    var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array];
    var TA = typeMapping[dataTypeIndex];
    function decodeMemoryView(handle) {
      var size = HEAPU32[handle >> 2];
      var data = HEAPU32[handle + 4 >> 2];
      return new TA(HEAP8.buffer, data, size);
    }
    name = AsciiToString(name);
    registerType(rawType, { name, fromWireType: decodeMemoryView, readValueFromPointer: decodeMemoryView }, { ignoreDuplicateRegistrations: true });
  };
  var EmValOptionalType = Object.assign({ optional: true }, EmValType);
  var __embind_register_optional = (rawOptionalType, rawType) => {
    registerType(rawOptionalType, EmValOptionalType);
  };
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i2 = 0; i2 < str.length; ++i2) {
      var u = str.codePointAt(i2);
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        heap[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        heap[outIdx++] = 192 | u >> 6;
        heap[outIdx++] = 128 | u & 63;
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        heap[outIdx++] = 224 | u >> 12;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
      } else {
        if (outIdx + 3 >= endIdx) break;
        heap[outIdx++] = 240 | u >> 18;
        heap[outIdx++] = 128 | u >> 12 & 63;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
        i2++;
      }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx;
  };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  var lengthBytesUTF8 = (str) => {
    var len = 0;
    for (var i2 = 0; i2 < str.length; ++i2) {
      var c = str.charCodeAt(i2);
      if (c <= 127) {
        len++;
      } else if (c <= 2047) {
        len += 2;
      } else if (c >= 55296 && c <= 57343) {
        len += 4;
        ++i2;
      } else {
        len += 3;
      }
    }
    return len;
  };
  var UTF8Decoder = globalThis.TextDecoder && new TextDecoder();
  var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
    var maxIdx = idx + maxBytesToRead;
    if (ignoreNul) return maxIdx;
    while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
    return idx;
  };
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
    var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    var str = "";
    while (idx < endPtr) {
      var u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      var u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode((u0 & 31) << 6 | u1);
        continue;
      }
      var u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
      } else {
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
      }
    }
    return str;
  };
  var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "";
  var __embind_register_std_string = (rawType, name) => {
    name = AsciiToString(name);
    var stdStringIsUTF8 = true;
    registerType(rawType, { name, fromWireType(value) {
      var length = HEAPU32[value >> 2];
      var payload = value + 4;
      var str;
      if (stdStringIsUTF8) {
        str = UTF8ToString(payload, length, true);
      } else {
        str = "";
        for (var i2 = 0; i2 < length; ++i2) {
          str += String.fromCharCode(HEAPU8[payload + i2]);
        }
      }
      _free(value);
      return str;
    }, toWireType(destructors, value) {
      if (value instanceof ArrayBuffer) {
        value = new Uint8Array(value);
      }
      var length;
      var valueIsOfTypeString = typeof value == "string";
      if (!(valueIsOfTypeString || ArrayBuffer.isView(value) && value.BYTES_PER_ELEMENT == 1)) {
        throwBindingError("Cannot pass non-string to std::string");
      }
      if (stdStringIsUTF8 && valueIsOfTypeString) {
        length = lengthBytesUTF8(value);
      } else {
        length = value.length;
      }
      var base = _malloc(4 + length + 1);
      var ptr = base + 4;
      HEAPU32[base >> 2] = length;
      if (valueIsOfTypeString) {
        if (stdStringIsUTF8) {
          stringToUTF8(value, ptr, length + 1);
        } else {
          for (var i2 = 0; i2 < length; ++i2) {
            var charCode = value.charCodeAt(i2);
            if (charCode > 255) {
              _free(base);
              throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
            }
            HEAPU8[ptr + i2] = charCode;
          }
        }
      } else {
        HEAPU8.set(value, ptr);
      }
      if (destructors !== null) {
        destructors.push(_free, base);
      }
      return base;
    }, readValueFromPointer: readPointer, destructorFunction(ptr) {
      _free(ptr);
    } });
  };
  var UTF16Decoder = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0;
  var UTF16ToString = (ptr, maxBytesToRead, ignoreNul) => {
    var idx = ptr >> 1;
    var endIdx = findStringEnd(HEAPU16, idx, maxBytesToRead / 2, ignoreNul);
    if (endIdx - idx > 16 && UTF16Decoder) return UTF16Decoder.decode(HEAPU16.subarray(idx, endIdx));
    var str = "";
    for (var i2 = idx; i2 < endIdx; ++i2) {
      var codeUnit = HEAPU16[i2];
      str += String.fromCharCode(codeUnit);
    }
    return str;
  };
  var stringToUTF16 = (str, outPtr, maxBytesToWrite) => {
    maxBytesToWrite ?? (maxBytesToWrite = 2147483647);
    if (maxBytesToWrite < 2) return 0;
    maxBytesToWrite -= 2;
    var startPtr = outPtr;
    var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
    for (var i2 = 0; i2 < numCharsToWrite; ++i2) {
      var codeUnit = str.charCodeAt(i2);
      HEAP16[outPtr >> 1] = codeUnit;
      outPtr += 2;
    }
    HEAP16[outPtr >> 1] = 0;
    return outPtr - startPtr;
  };
  var lengthBytesUTF16 = (str) => str.length * 2;
  var UTF32ToString = (ptr, maxBytesToRead, ignoreNul) => {
    var str = "";
    var startIdx = ptr >> 2;
    for (var i2 = 0; !(i2 >= maxBytesToRead / 4); i2++) {
      var utf32 = HEAPU32[startIdx + i2];
      if (!utf32 && !ignoreNul) break;
      str += String.fromCodePoint(utf32);
    }
    return str;
  };
  var stringToUTF32 = (str, outPtr, maxBytesToWrite) => {
    maxBytesToWrite ?? (maxBytesToWrite = 2147483647);
    if (maxBytesToWrite < 4) return 0;
    var startPtr = outPtr;
    var endPtr = startPtr + maxBytesToWrite - 4;
    for (var i2 = 0; i2 < str.length; ++i2) {
      var codePoint = str.codePointAt(i2);
      if (codePoint > 65535) {
        i2++;
      }
      HEAP32[outPtr >> 2] = codePoint;
      outPtr += 4;
      if (outPtr + 4 > endPtr) break;
    }
    HEAP32[outPtr >> 2] = 0;
    return outPtr - startPtr;
  };
  var lengthBytesUTF32 = (str) => {
    var len = 0;
    for (var i2 = 0; i2 < str.length; ++i2) {
      var codePoint = str.codePointAt(i2);
      if (codePoint > 65535) {
        i2++;
      }
      len += 4;
    }
    return len;
  };
  var __embind_register_std_wstring = (rawType, charSize, name) => {
    name = AsciiToString(name);
    var decodeString, encodeString, lengthBytesUTF;
    if (charSize === 2) {
      decodeString = UTF16ToString;
      encodeString = stringToUTF16;
      lengthBytesUTF = lengthBytesUTF16;
    } else {
      decodeString = UTF32ToString;
      encodeString = stringToUTF32;
      lengthBytesUTF = lengthBytesUTF32;
    }
    registerType(rawType, { name, fromWireType: (value) => {
      var length = HEAPU32[value >> 2];
      var str = decodeString(value + 4, length * charSize, true);
      _free(value);
      return str;
    }, toWireType: (destructors, value) => {
      if (!(typeof value == "string")) {
        throwBindingError(`Cannot pass non-string to C++ string type ${name}`);
      }
      var length = lengthBytesUTF(value);
      var ptr = _malloc(4 + length + charSize);
      HEAPU32[ptr >> 2] = length / charSize;
      encodeString(value, ptr + 4, length + charSize);
      if (destructors !== null) {
        destructors.push(_free, ptr);
      }
      return ptr;
    }, readValueFromPointer: readPointer, destructorFunction(ptr) {
      _free(ptr);
    } });
  };
  var __embind_register_value_object = (rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) => {
    structRegistrations[rawType] = { name: AsciiToString(name), rawConstructor: embind__requireFunction(constructorSignature, rawConstructor), rawDestructor: embind__requireFunction(destructorSignature, rawDestructor), fields: [] };
  };
  var __embind_register_value_object_field = (structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) => {
    structRegistrations[structType].fields.push({ fieldName: AsciiToString(fieldName), getterReturnType, getter: embind__requireFunction(getterSignature, getter), getterContext, setterArgumentType, setter: embind__requireFunction(setterSignature, setter), setterContext });
  };
  var __embind_register_void = (rawType, name) => {
    name = AsciiToString(name);
    registerType(rawType, { isVoid: true, name, fromWireType: () => void 0, toWireType: (destructors, o) => void 0 });
  };
  var emval_methodCallers = [];
  var emval_addMethodCaller = (caller) => {
    var id = emval_methodCallers.length;
    emval_methodCallers.push(caller);
    return id;
  };
  var emval_lookupTypes = (argCount, argTypes) => {
    var a = new Array(argCount);
    for (var i2 = 0; i2 < argCount; ++i2) {
      a[i2] = requireRegisteredType(HEAPU32[argTypes + i2 * 4 >> 2], `parameter ${i2}`);
    }
    return a;
  };
  var emval_returnValue = (toReturnWire, destructorsRef, handle) => {
    var destructors = [];
    var result = toReturnWire(destructors, handle);
    if (destructors.length) {
      HEAPU32[destructorsRef >> 2] = Emval.toHandle(destructors);
    }
    return result;
  };
  var emval_symbols = {};
  var getStringOrSymbol = (address) => {
    var symbol = emval_symbols[address];
    if (symbol === void 0) {
      return AsciiToString(address);
    }
    return symbol;
  };
  var __emval_create_invoker = (argCount, argTypesPtr, kind) => {
    var GenericWireTypeSize = 8;
    var [retType, ...argTypes] = emval_lookupTypes(argCount, argTypesPtr);
    var toReturnWire = retType.toWireType.bind(retType);
    var argFromPtr = argTypes.map((type) => type.readValueFromPointer.bind(type));
    argCount--;
    var captures = { toValue: Emval.toValue };
    var args = argFromPtr.map((argFromPtr2, i2) => {
      var captureName = `argFromPtr${i2}`;
      captures[captureName] = argFromPtr2;
      return `${captureName}(args${i2 ? "+" + i2 * GenericWireTypeSize : ""})`;
    });
    var functionBody;
    switch (kind) {
      case 0:
        functionBody = "toValue(handle)";
        break;
      case 2:
        functionBody = "new (toValue(handle))";
        break;
      case 3:
        functionBody = "";
        break;
      case 1:
        captures["getStringOrSymbol"] = getStringOrSymbol;
        functionBody = "toValue(handle)[getStringOrSymbol(methodName)]";
        break;
    }
    functionBody += `(${args})`;
    if (!retType.isVoid) {
      captures["toReturnWire"] = toReturnWire;
      captures["emval_returnValue"] = emval_returnValue;
      functionBody = `return emval_returnValue(toReturnWire, destructorsRef, ${functionBody})`;
    }
    functionBody = `return function (handle, methodName, destructorsRef, args) {
  ${functionBody}
  }`;
    var invokerFunction = new Function(Object.keys(captures), functionBody)(...Object.values(captures));
    var functionName = `methodCaller<(${argTypes.map((t) => t.name)}) => ${retType.name}>`;
    return emval_addMethodCaller(createNamedFunction(functionName, invokerFunction));
  };
  var __emval_get_global = (name) => {
    if (!name) {
      return Emval.toHandle(globalThis);
    }
    name = getStringOrSymbol(name);
    return Emval.toHandle(globalThis[name]);
  };
  var __emval_get_property = (handle, key) => {
    handle = Emval.toValue(handle);
    key = Emval.toValue(key);
    return Emval.toHandle(handle[key]);
  };
  var __emval_incref = (handle) => {
    if (handle > 9) {
      emval_handles[handle + 1] += 1;
    }
  };
  var __emval_instanceof = (object, constructor) => {
    object = Emval.toValue(object);
    constructor = Emval.toValue(constructor);
    return object instanceof constructor;
  };
  var __emval_invoke = (caller, handle, methodName, destructorsRef, args) => emval_methodCallers[caller](handle, methodName, destructorsRef, args);
  var __emval_new_array = () => Emval.toHandle([]);
  var __emval_new_cstring = (v) => Emval.toHandle(getStringOrSymbol(v));
  var __emval_new_object = () => Emval.toHandle({});
  var __emval_run_destructors = (handle) => {
    var destructors = Emval.toValue(handle);
    runDestructors(destructors);
    __emval_decref(handle);
  };
  var __emval_set_property = (handle, key, value) => {
    handle = Emval.toValue(handle);
    key = Emval.toValue(key);
    value = Emval.toValue(value);
    handle[key] = value;
  };
  var __tzset_js = (timezone, daylight, std_name, dst_name) => {
    var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    var winter = new Date(currentYear, 0, 1);
    var summer = new Date(currentYear, 6, 1);
    var winterOffset = winter.getTimezoneOffset();
    var summerOffset = summer.getTimezoneOffset();
    var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
    HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
    HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
    var extractZone = (timezoneOffset) => {
      var sign = timezoneOffset >= 0 ? "-" : "+";
      var absOffset = Math.abs(timezoneOffset);
      var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
      var minutes = String(absOffset % 60).padStart(2, "0");
      return `UTC${sign}${hours}${minutes}`;
    };
    var winterName = extractZone(winterOffset);
    var summerName = extractZone(summerOffset);
    if (summerOffset < winterOffset) {
      stringToUTF8(winterName, std_name, 17);
      stringToUTF8(summerName, dst_name, 17);
    } else {
      stringToUTF8(winterName, dst_name, 17);
      stringToUTF8(summerName, std_name, 17);
    }
  };
  var getHeapMax = () => 2147483648;
  var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
  var growMemory = (size) => {
    var oldHeapSize = wasmMemory.buffer.byteLength;
    var pages = (size - oldHeapSize + 65535) / 65536 | 0;
    try {
      wasmMemory.grow(pages);
      updateMemoryViews();
      return 1;
    } catch (e) {
    }
  };
  var _emscripten_resize_heap = (requestedSize) => {
    var oldSize = HEAPU8.length;
    requestedSize >>>= 0;
    var maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize) {
      return false;
    }
    for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
      var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
      var replacement = growMemory(newSize);
      if (replacement) {
        return true;
      }
    }
    return false;
  };
  var ENV = {};
  var getExecutableName = () => thisProgram || "./this.program";
  var getEnvStrings = () => {
    if (!getEnvStrings.strings) {
      var lang = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8";
      var env = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: lang, _: getExecutableName() };
      for (var x in ENV) {
        if (ENV[x] === void 0) delete env[x];
        else env[x] = ENV[x];
      }
      var strings = [];
      for (var x in env) {
        strings.push(`${x}=${env[x]}`);
      }
      getEnvStrings.strings = strings;
    }
    return getEnvStrings.strings;
  };
  var _environ_get = (__environ, environ_buf) => {
    var bufSize = 0;
    var envp = 0;
    for (var string of getEnvStrings()) {
      var ptr = environ_buf + bufSize;
      HEAPU32[__environ + envp >> 2] = ptr;
      bufSize += stringToUTF8(string, ptr, Infinity) + 1;
      envp += 4;
    }
    return 0;
  };
  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
    var strings = getEnvStrings();
    HEAPU32[penviron_count >> 2] = strings.length;
    var bufSize = 0;
    for (var string of strings) {
      bufSize += lengthBytesUTF8(string) + 1;
    }
    HEAPU32[penviron_buf_size >> 2] = bufSize;
    return 0;
  };
  var PATH = { isAbs: (path) => path.charAt(0) === "/", splitPath: (filename) => {
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  }, normalizeArray: (parts, allowAboveRoot) => {
    var up = 0;
    for (var i2 = parts.length - 1; i2 >= 0; i2--) {
      var last = parts[i2];
      if (last === ".") {
        parts.splice(i2, 1);
      } else if (last === "..") {
        parts.splice(i2, 1);
        up++;
      } else if (up) {
        parts.splice(i2, 1);
        up--;
      }
    }
    if (allowAboveRoot) {
      for (; up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  }, normalize: (path) => {
    var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
    path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  }, dirname: (path) => {
    var result = PATH.splitPath(path), root = result[0], dir = result[1];
    if (!root && !dir) {
      return ".";
    }
    if (dir) {
      dir = dir.slice(0, -1);
    }
    return root + dir;
  }, basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1], join: (...paths) => PATH.normalize(paths.join("/")), join2: (l, r) => PATH.normalize(l + "/" + r) };
  var initRandomFill = () => {
    if (ENVIRONMENT_IS_NODE) {
      var nodeCrypto = require2("crypto");
      return (view) => nodeCrypto.randomFillSync(view);
    }
    return (view) => crypto.getRandomValues(view);
  };
  var randomFill = (view) => {
    (randomFill = initRandomFill())(view);
  };
  var PATH_FS = { resolve: (...args) => {
    var resolvedPath = "", resolvedAbsolute = false;
    for (var i2 = args.length - 1; i2 >= -1 && !resolvedAbsolute; i2--) {
      var path = i2 >= 0 ? args[i2] : FS.cwd();
      if (typeof path != "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = PATH.isAbs(path);
    }
    resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  }, relative: (from, to) => {
    from = PATH_FS.resolve(from).slice(1);
    to = PATH_FS.resolve(to).slice(1);
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i2 = 0; i2 < length; i2++) {
      if (fromParts[i2] !== toParts[i2]) {
        samePartsLength = i2;
        break;
      }
    }
    var outputParts = [];
    for (var i2 = samePartsLength; i2 < fromParts.length; i2++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  } };
  var FS_stdin_getChar_buffer = [];
  var intArrayFromString = (stringy, dontAddNull, length) => {
    var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  };
  var FS_stdin_getChar = () => {
    if (!FS_stdin_getChar_buffer.length) {
      var result = null;
      if (ENVIRONMENT_IS_NODE) {
        var BUFSIZE = 256;
        var buf = Buffer.alloc(BUFSIZE);
        var bytesRead = 0;
        var fd = process.stdin.fd;
        try {
          bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
        } catch (e) {
          if (e.toString().includes("EOF")) bytesRead = 0;
          else throw e;
        }
        if (bytesRead > 0) {
          result = buf.slice(0, bytesRead).toString("utf-8");
        }
      } else if (globalThis.window?.prompt) {
        result = window.prompt("Input: ");
        if (result !== null) {
          result += "\n";
        }
      } else {
      }
      if (!result) {
        return null;
      }
      FS_stdin_getChar_buffer = intArrayFromString(result, true);
    }
    return FS_stdin_getChar_buffer.shift();
  };
  var TTY = { ttys: [], init() {
  }, shutdown() {
  }, register(dev, ops) {
    TTY.ttys[dev] = { input: [], output: [], ops };
    FS.registerDevice(dev, TTY.stream_ops);
  }, stream_ops: { open(stream) {
    var tty = TTY.ttys[stream.node.rdev];
    if (!tty) {
      throw new FS.ErrnoError(43);
    }
    stream.tty = tty;
    stream.seekable = false;
  }, close(stream) {
    stream.tty.ops.fsync(stream.tty);
  }, fsync(stream) {
    stream.tty.ops.fsync(stream.tty);
  }, read(stream, buffer, offset, length, pos) {
    if (!stream.tty || !stream.tty.ops.get_char) {
      throw new FS.ErrnoError(60);
    }
    var bytesRead = 0;
    for (var i2 = 0; i2 < length; i2++) {
      var result;
      try {
        result = stream.tty.ops.get_char(stream.tty);
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (result === void 0 && bytesRead === 0) {
        throw new FS.ErrnoError(6);
      }
      if (result === null || result === void 0) break;
      bytesRead++;
      buffer[offset + i2] = result;
    }
    if (bytesRead) {
      stream.node.atime = Date.now();
    }
    return bytesRead;
  }, write(stream, buffer, offset, length, pos) {
    if (!stream.tty || !stream.tty.ops.put_char) {
      throw new FS.ErrnoError(60);
    }
    try {
      for (var i2 = 0; i2 < length; i2++) {
        stream.tty.ops.put_char(stream.tty, buffer[offset + i2]);
      }
    } catch (e) {
      throw new FS.ErrnoError(29);
    }
    if (length) {
      stream.node.mtime = stream.node.ctime = Date.now();
    }
    return i2;
  } }, default_tty_ops: { get_char(tty) {
    return FS_stdin_getChar();
  }, put_char(tty, val) {
    if (val === null || val === 10) {
      out(UTF8ArrayToString(tty.output));
      tty.output = [];
    } else {
      if (val != 0) tty.output.push(val);
    }
  }, fsync(tty) {
    if (tty.output?.length > 0) {
      out(UTF8ArrayToString(tty.output));
      tty.output = [];
    }
  }, ioctl_tcgets(tty) {
    return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
  }, ioctl_tcsets(tty, optional_actions, data) {
    return 0;
  }, ioctl_tiocgwinsz(tty) {
    return [24, 80];
  } }, default_tty1_ops: { put_char(tty, val) {
    if (val === null || val === 10) {
      err(UTF8ArrayToString(tty.output));
      tty.output = [];
    } else {
      if (val != 0) tty.output.push(val);
    }
  }, fsync(tty) {
    if (tty.output?.length > 0) {
      err(UTF8ArrayToString(tty.output));
      tty.output = [];
    }
  } } };
  var mmapAlloc = (size) => {
    abort();
  };
  var MEMFS = { ops_table: null, mount(mount) {
    return MEMFS.createNode(null, "/", 16895, 0);
  }, createNode(parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(63);
    }
    MEMFS.ops_table || (MEMFS.ops_table = { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } });
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      node.contents = null;
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.atime = node.mtime = node.ctime = Date.now();
    if (parent) {
      parent.contents[name] = node;
      parent.atime = parent.mtime = parent.ctime = node.atime;
    }
    return node;
  }, getFileDataAsTypedArray(node) {
    if (!node.contents) return new Uint8Array(0);
    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
    return new Uint8Array(node.contents);
  }, expandFileStorage(node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0;
    if (prevCapacity >= newCapacity) return;
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
    var oldContents = node.contents;
    node.contents = new Uint8Array(newCapacity);
    if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  }, resizeFileStorage(node, newSize) {
    if (node.usedBytes == newSize) return;
    if (newSize == 0) {
      node.contents = null;
      node.usedBytes = 0;
    } else {
      var oldContents = node.contents;
      node.contents = new Uint8Array(newSize);
      if (oldContents) {
        node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
      }
      node.usedBytes = newSize;
    }
  }, node_ops: { getattr(node) {
    var attr = {};
    attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
    attr.ino = node.id;
    attr.mode = node.mode;
    attr.nlink = 1;
    attr.uid = 0;
    attr.gid = 0;
    attr.rdev = node.rdev;
    if (FS.isDir(node.mode)) {
      attr.size = 4096;
    } else if (FS.isFile(node.mode)) {
      attr.size = node.usedBytes;
    } else if (FS.isLink(node.mode)) {
      attr.size = node.link.length;
    } else {
      attr.size = 0;
    }
    attr.atime = new Date(node.atime);
    attr.mtime = new Date(node.mtime);
    attr.ctime = new Date(node.ctime);
    attr.blksize = 4096;
    attr.blocks = Math.ceil(attr.size / attr.blksize);
    return attr;
  }, setattr(node, attr) {
    for (const key of ["mode", "atime", "mtime", "ctime"]) {
      if (attr[key] != null) {
        node[key] = attr[key];
      }
    }
    if (attr.size !== void 0) {
      MEMFS.resizeFileStorage(node, attr.size);
    }
  }, lookup(parent, name) {
    if (!MEMFS.doesNotExistError) {
      MEMFS.doesNotExistError = new FS.ErrnoError(44);
      MEMFS.doesNotExistError.stack = "<generic error, no stack>";
    }
    throw MEMFS.doesNotExistError;
  }, mknod(parent, name, mode, dev) {
    return MEMFS.createNode(parent, name, mode, dev);
  }, rename(old_node, new_dir, new_name) {
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {
    }
    if (new_node) {
      if (FS.isDir(old_node.mode)) {
        for (var i2 in new_node.contents) {
          throw new FS.ErrnoError(55);
        }
      }
      FS.hashRemoveNode(new_node);
    }
    delete old_node.parent.contents[old_node.name];
    new_dir.contents[new_name] = old_node;
    old_node.name = new_name;
    new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
  }, unlink(parent, name) {
    delete parent.contents[name];
    parent.ctime = parent.mtime = Date.now();
  }, rmdir(parent, name) {
    var node = FS.lookupNode(parent, name);
    for (var i2 in node.contents) {
      throw new FS.ErrnoError(55);
    }
    delete parent.contents[name];
    parent.ctime = parent.mtime = Date.now();
  }, readdir(node) {
    return [".", "..", ...Object.keys(node.contents)];
  }, symlink(parent, newname, oldpath) {
    var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
    node.link = oldpath;
    return node;
  }, readlink(node) {
    if (!FS.isLink(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    return node.link;
  } }, stream_ops: { read(stream, buffer, offset, length, position) {
    var contents = stream.node.contents;
    if (position >= stream.node.usedBytes) return 0;
    var size = Math.min(stream.node.usedBytes - position, length);
    if (size > 8 && contents.subarray) {
      buffer.set(contents.subarray(position, position + size), offset);
    } else {
      for (var i2 = 0; i2 < size; i2++) buffer[offset + i2] = contents[position + i2];
    }
    return size;
  }, write(stream, buffer, offset, length, position, canOwn) {
    if (buffer.buffer === HEAP8.buffer) {
      canOwn = false;
    }
    if (!length) return 0;
    var node = stream.node;
    node.mtime = node.ctime = Date.now();
    if (buffer.subarray && (!node.contents || node.contents.subarray)) {
      if (canOwn) {
        node.contents = buffer.subarray(offset, offset + length);
        node.usedBytes = length;
        return length;
      } else if (node.usedBytes === 0 && position === 0) {
        node.contents = buffer.slice(offset, offset + length);
        node.usedBytes = length;
        return length;
      } else if (position + length <= node.usedBytes) {
        node.contents.set(buffer.subarray(offset, offset + length), position);
        return length;
      }
    }
    MEMFS.expandFileStorage(node, position + length);
    if (node.contents.subarray && buffer.subarray) {
      node.contents.set(buffer.subarray(offset, offset + length), position);
    } else {
      for (var i2 = 0; i2 < length; i2++) {
        node.contents[position + i2] = buffer[offset + i2];
      }
    }
    node.usedBytes = Math.max(node.usedBytes, position + length);
    return length;
  }, llseek(stream, offset, whence) {
    var position = offset;
    if (whence === 1) {
      position += stream.position;
    } else if (whence === 2) {
      if (FS.isFile(stream.node.mode)) {
        position += stream.node.usedBytes;
      }
    }
    if (position < 0) {
      throw new FS.ErrnoError(28);
    }
    return position;
  }, mmap(stream, length, position, prot, flags) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    var ptr;
    var allocated;
    var contents = stream.node.contents;
    if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
      allocated = false;
      ptr = contents.byteOffset;
    } else {
      allocated = true;
      ptr = mmapAlloc(length);
      if (!ptr) {
        throw new FS.ErrnoError(48);
      }
      if (contents) {
        if (position > 0 || position + length < contents.length) {
          if (contents.subarray) {
            contents = contents.subarray(position, position + length);
          } else {
            contents = Array.prototype.slice.call(contents, position, position + length);
          }
        }
        HEAP8.set(contents, ptr);
      }
    }
    return { ptr, allocated };
  }, msync(stream, buffer, offset, length, mmapFlags) {
    MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
    return 0;
  } } };
  var FS_modeStringToFlags = (str) => {
    var flagModes = { r: 0, "r+": 2, w: 512 | 64 | 1, "w+": 512 | 64 | 2, a: 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
    var flags = flagModes[str];
    if (typeof flags == "undefined") {
      throw new Error(`Unknown file open mode: ${str}`);
    }
    return flags;
  };
  var FS_getMode = (canRead, canWrite) => {
    var mode = 0;
    if (canRead) mode |= 292 | 73;
    if (canWrite) mode |= 146;
    return mode;
  };
  var asyncLoad = async (url) => {
    var arrayBuffer = await readAsync(url);
    return new Uint8Array(arrayBuffer);
  };
  var FS_createDataFile = (...args) => FS.createDataFile(...args);
  var getUniqueRunDependency = (id) => id;
  var runDependencies = 0;
  var dependenciesFulfilled = null;
  var removeRunDependency = (id) => {
    runDependencies--;
    Module2["monitorRunDependencies"]?.(runDependencies);
    if (runDependencies == 0) {
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  };
  var addRunDependency = (id) => {
    runDependencies++;
    Module2["monitorRunDependencies"]?.(runDependencies);
  };
  var preloadPlugins = [];
  var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
    if (typeof Browser != "undefined") Browser.init();
    for (var plugin of preloadPlugins) {
      if (plugin["canHandle"](fullname)) {
        return plugin["handle"](byteArray, fullname);
      }
    }
    return byteArray;
  };
  var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
    var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
    var dep = getUniqueRunDependency(`cp ${fullname}`);
    addRunDependency(dep);
    try {
      var byteArray = url;
      if (typeof url == "string") {
        byteArray = await asyncLoad(url);
      }
      byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
      preFinish?.();
      if (!dontCreateFile) {
        FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
      }
    } finally {
      removeRunDependency(dep);
    }
  };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
    FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
  };
  var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, filesystems: null, syncFSRequests: 0, readFiles: {}, ErrnoError: class {
    constructor(errno) {
      __publicField(this, "name", "ErrnoError");
      this.errno = errno;
    }
  }, FSStream: class {
    constructor() {
      __publicField(this, "shared", {});
    }
    get object() {
      return this.node;
    }
    set object(val) {
      this.node = val;
    }
    get isRead() {
      return (this.flags & 2097155) !== 1;
    }
    get isWrite() {
      return (this.flags & 2097155) !== 0;
    }
    get isAppend() {
      return this.flags & 1024;
    }
    get flags() {
      return this.shared.flags;
    }
    set flags(val) {
      this.shared.flags = val;
    }
    get position() {
      return this.shared.position;
    }
    set position(val) {
      this.shared.position = val;
    }
  }, FSNode: class {
    constructor(parent, name, mode, rdev) {
      __publicField(this, "node_ops", {});
      __publicField(this, "stream_ops", {});
      __publicField(this, "readMode", 292 | 73);
      __publicField(this, "writeMode", 146);
      __publicField(this, "mounted", null);
      if (!parent) {
        parent = this;
      }
      this.parent = parent;
      this.mount = parent.mount;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.rdev = rdev;
      this.atime = this.mtime = this.ctime = Date.now();
    }
    get read() {
      return (this.mode & this.readMode) === this.readMode;
    }
    set read(val) {
      val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
    }
    get write() {
      return (this.mode & this.writeMode) === this.writeMode;
    }
    set write(val) {
      val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
    }
    get isFolder() {
      return FS.isDir(this.mode);
    }
    get isDevice() {
      return FS.isChrdev(this.mode);
    }
  }, lookupPath(path, opts = {}) {
    if (!path) {
      throw new FS.ErrnoError(44);
    }
    opts.follow_mount ?? (opts.follow_mount = true);
    if (!PATH.isAbs(path)) {
      path = FS.cwd() + "/" + path;
    }
    linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
      var parts = path.split("/").filter((p) => !!p);
      var current = FS.root;
      var current_path = "/";
      for (var i2 = 0; i2 < parts.length; i2++) {
        var islast = i2 === parts.length - 1;
        if (islast && opts.parent) {
          break;
        }
        if (parts[i2] === ".") {
          continue;
        }
        if (parts[i2] === "..") {
          current_path = PATH.dirname(current_path);
          if (FS.isRoot(current)) {
            path = current_path + "/" + parts.slice(i2 + 1).join("/");
            nlinks--;
            continue linkloop;
          } else {
            current = current.parent;
          }
          continue;
        }
        current_path = PATH.join2(current_path, parts[i2]);
        try {
          current = FS.lookupNode(current, parts[i2]);
        } catch (e) {
          if (e?.errno === 44 && islast && opts.noent_okay) {
            return { path: current_path };
          }
          throw e;
        }
        if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
          current = current.mounted.root;
        }
        if (FS.isLink(current.mode) && (!islast || opts.follow)) {
          if (!current.node_ops.readlink) {
            throw new FS.ErrnoError(52);
          }
          var link = current.node_ops.readlink(current);
          if (!PATH.isAbs(link)) {
            link = PATH.dirname(current_path) + "/" + link;
          }
          path = link + "/" + parts.slice(i2 + 1).join("/");
          continue linkloop;
        }
      }
      return { path: current_path, node: current };
    }
    throw new FS.ErrnoError(32);
  }, getPath(node) {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
      }
      path = path ? `${node.name}/${path}` : node.name;
      node = node.parent;
    }
  }, hashName(parentid, name) {
    var hash = 0;
    for (var i2 = 0; i2 < name.length; i2++) {
      hash = (hash << 5) - hash + name.charCodeAt(i2) | 0;
    }
    return (parentid + hash >>> 0) % FS.nameTable.length;
  }, hashAddNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  }, hashRemoveNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  }, lookupNode(parent, name) {
    var errCode = FS.mayLookup(parent);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    var hash = FS.hashName(parent.id, name);
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    return FS.lookup(parent, name);
  }, createNode(parent, name, mode, rdev) {
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  }, destroyNode(node) {
    FS.hashRemoveNode(node);
  }, isRoot(node) {
    return node === node.parent;
  }, isMountpoint(node) {
    return !!node.mounted;
  }, isFile(mode) {
    return (mode & 61440) === 32768;
  }, isDir(mode) {
    return (mode & 61440) === 16384;
  }, isLink(mode) {
    return (mode & 61440) === 40960;
  }, isChrdev(mode) {
    return (mode & 61440) === 8192;
  }, isBlkdev(mode) {
    return (mode & 61440) === 24576;
  }, isFIFO(mode) {
    return (mode & 61440) === 4096;
  }, isSocket(mode) {
    return (mode & 49152) === 49152;
  }, flagsToPermissionString(flag) {
    var perms = ["r", "w", "rw"][flag & 3];
    if (flag & 512) {
      perms += "w";
    }
    return perms;
  }, nodePermissions(node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2;
    } else if (perms.includes("w") && !(node.mode & 146)) {
      return 2;
    } else if (perms.includes("x") && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  }, mayLookup(dir) {
    if (!FS.isDir(dir.mode)) return 54;
    var errCode = FS.nodePermissions(dir, "x");
    if (errCode) return errCode;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  }, mayCreate(dir, name) {
    if (!FS.isDir(dir.mode)) {
      return 54;
    }
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {
    }
    return FS.nodePermissions(dir, "wx");
  }, mayDelete(dir, name, isdir) {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var errCode = FS.nodePermissions(dir, "wx");
    if (errCode) {
      return errCode;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31;
      }
    }
    return 0;
  }, mayOpen(node, flags) {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== "r" || flags & (512 | 64)) {
        return 31;
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
  }, checkOpExists(op, err2) {
    if (!op) {
      throw new FS.ErrnoError(err2);
    }
    return op;
  }, MAX_OPEN_FDS: 4096, nextfd() {
    for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  }, getStreamChecked(fd) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    return stream;
  }, getStream: (fd) => FS.streams[fd], createStream(stream, fd = -1) {
    stream = Object.assign(new FS.FSStream(), stream);
    if (fd == -1) {
      fd = FS.nextfd();
    }
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  }, closeStream(fd) {
    FS.streams[fd] = null;
  }, dupStream(origStream, fd = -1) {
    var stream = FS.createStream(origStream, fd);
    stream.stream_ops?.dup?.(stream);
    return stream;
  }, doSetAttr(stream, node, attr) {
    var setattr = stream?.stream_ops.setattr;
    var arg = setattr ? stream : node;
    setattr ?? (setattr = node.node_ops.setattr);
    FS.checkOpExists(setattr, 63);
    setattr(arg, attr);
  }, chrdev_stream_ops: { open(stream) {
    var device = FS.getDevice(stream.node.rdev);
    stream.stream_ops = device.stream_ops;
    stream.stream_ops.open?.(stream);
  }, llseek() {
    throw new FS.ErrnoError(70);
  } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice(dev, ops) {
    FS.devices[dev] = { stream_ops: ops };
  }, getDevice: (dev) => FS.devices[dev], getMounts(mount) {
    var mounts = [];
    var check = [mount];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push(...m.mounts);
    }
    return mounts;
  }, syncfs(populate, callback) {
    if (typeof populate == "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(errCode) {
      FS.syncFSRequests--;
      return callback(errCode);
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(errCode);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    for (var mount of mounts) {
      if (mount.type.syncfs) {
        mount.type.syncfs(mount, populate, done);
      } else {
        done(null);
      }
    }
  }, mount(type, opts, mountpoint) {
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      mountpoint = lookup.path;
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = { type, opts, mountpoint, mounts: [] };
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      node.mounted = mount;
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  }, unmount(mountpoint) {
    var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    for (var [hash, current] of Object.entries(FS.nameTable)) {
      while (current) {
        var next = current.name_next;
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current);
        }
        current = next;
      }
    }
    node.mounted = null;
    var idx = node.mount.mounts.indexOf(mount);
    node.mount.mounts.splice(idx, 1);
  }, lookup(parent, name) {
    return parent.node_ops.lookup(parent, name);
  }, mknod(path, mode, dev) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name) {
      throw new FS.ErrnoError(28);
    }
    if (name === "." || name === "..") {
      throw new FS.ErrnoError(20);
    }
    var errCode = FS.mayCreate(parent, name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  }, statfs(path) {
    return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
  }, statfsStream(stream) {
    return FS.statfsNode(stream.node);
  }, statfsNode(node) {
    var rtn = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: FS.nextInode, ffree: FS.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
    if (node.node_ops.statfs) {
      Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
    }
    return rtn;
  }, create(path, mode = 438) {
    mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  }, mkdir(path, mode = 511) {
    mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  }, mkdirTree(path, mode) {
    var dirs = path.split("/");
    var d = "";
    for (var dir of dirs) {
      if (!dir) continue;
      if (d || PATH.isAbs(path)) d += "/";
      d += dir;
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  }, mkdev(path, mode, dev) {
    if (typeof dev == "undefined") {
      dev = mode;
      mode = 438;
    }
    mode |= 8192;
    return FS.mknod(path, mode, dev);
  }, symlink(oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  }, rename(old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    var lookup, old_dir, new_dir;
    lookup = FS.lookupPath(old_path, { parent: true });
    old_dir = lookup.node;
    lookup = FS.lookupPath(new_path, { parent: true });
    new_dir = lookup.node;
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    var old_node = FS.lookupNode(old_dir, old_name);
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {
    }
    if (old_node === new_node) {
      return;
    }
    var isdir = FS.isDir(old_node.mode);
    var errCode = FS.mayDelete(old_dir, old_name, isdir);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
      throw new FS.ErrnoError(10);
    }
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    FS.hashRemoveNode(old_node);
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
      old_node.parent = new_dir;
    } catch (e) {
      throw e;
    } finally {
      FS.hashAddNode(old_node);
    }
  }, rmdir(path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, true);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
  }, readdir(path) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
    return readdir(node);
  }, unlink(path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, false);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
  }, readlink(path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return link.node_ops.readlink(link);
  }, stat(path, dontFollow) {
    var lookup = FS.lookupPath(path, { follow: !dontFollow });
    var node = lookup.node;
    var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
    return getattr(node);
  }, fstat(fd) {
    var stream = FS.getStreamChecked(fd);
    var node = stream.node;
    var getattr = stream.stream_ops.getattr;
    var arg = getattr ? stream : node;
    getattr ?? (getattr = node.node_ops.getattr);
    FS.checkOpExists(getattr, 63);
    return getattr(arg);
  }, lstat(path) {
    return FS.stat(path, true);
  }, doChmod(stream, node, mode, dontFollow) {
    FS.doSetAttr(stream, node, { mode: mode & 4095 | node.mode & ~4095, ctime: Date.now(), dontFollow });
  }, chmod(path, mode, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doChmod(null, node, mode, dontFollow);
  }, lchmod(path, mode) {
    FS.chmod(path, mode, true);
  }, fchmod(fd, mode) {
    var stream = FS.getStreamChecked(fd);
    FS.doChmod(stream, stream.node, mode, false);
  }, doChown(stream, node, dontFollow) {
    FS.doSetAttr(stream, node, { timestamp: Date.now(), dontFollow });
  }, chown(path, uid, gid, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doChown(null, node, dontFollow);
  }, lchown(path, uid, gid) {
    FS.chown(path, uid, gid, true);
  }, fchown(fd, uid, gid) {
    var stream = FS.getStreamChecked(fd);
    FS.doChown(stream, stream.node, false);
  }, doTruncate(stream, node, len) {
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.nodePermissions(node, "w");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.doSetAttr(stream, node, { size: len, timestamp: Date.now() });
  }, truncate(path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: true });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doTruncate(null, node, len);
  }, ftruncate(fd, len) {
    var stream = FS.getStreamChecked(fd);
    if (len < 0 || (stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.doTruncate(stream, stream.node, len);
  }, utime(path, atime, mtime) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
    setattr(node, { atime, mtime });
  }, open(path, flags, mode = 438) {
    if (path === "") {
      throw new FS.ErrnoError(44);
    }
    flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
    if (flags & 64) {
      mode = mode & 4095 | 32768;
    } else {
      mode = 0;
    }
    var node;
    var isDirPath;
    if (typeof path == "object") {
      node = path;
    } else {
      isDirPath = path.endsWith("/");
      var lookup = FS.lookupPath(path, { follow: !(flags & 131072), noent_okay: true });
      node = lookup.node;
      path = lookup.path;
    }
    var created = false;
    if (flags & 64) {
      if (node) {
        if (flags & 128) {
          throw new FS.ErrnoError(20);
        }
      } else if (isDirPath) {
        throw new FS.ErrnoError(31);
      } else {
        node = FS.mknod(path, mode | 511, 0);
        created = true;
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }
    if (flags & 65536 && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54);
    }
    if (!created) {
      var errCode = FS.mayOpen(node, flags);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    if (flags & 512 && !created) {
      FS.truncate(node, 0);
    }
    flags &= ~(128 | 512 | 131072);
    var stream = FS.createStream({ node, path: FS.getPath(node), flags, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
    if (created) {
      FS.chmod(node, mode & 511);
    }
    if (Module2["logReadFiles"] && !(flags & 1)) {
      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1;
      }
    }
    return stream;
  }, close(stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (stream.getdents) stream.getdents = null;
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
    stream.fd = null;
  }, isClosed(stream) {
    return stream.fd === null;
  }, llseek(stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70);
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28);
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  }, read(stream, buffer, offset, length, position) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  }, write(stream, buffer, offset, length, position, canOwn) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28);
    }
    if (stream.seekable && stream.flags & 1024) {
      FS.llseek(stream, 0, 2);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
    if (!seeking) stream.position += bytesWritten;
    return bytesWritten;
  }, mmap(stream, length, position, prot, flags) {
    if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
      throw new FS.ErrnoError(2);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2);
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43);
    }
    if (!length) {
      throw new FS.ErrnoError(28);
    }
    return stream.stream_ops.mmap(stream, length, position, prot, flags);
  }, msync(stream, buffer, offset, length, mmapFlags) {
    if (!stream.stream_ops.msync) {
      return 0;
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  }, ioctl(stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59);
    }
    return stream.stream_ops.ioctl(stream, cmd, arg);
  }, readFile(path, opts = {}) {
    opts.flags = opts.flags || 0;
    opts.encoding = opts.encoding || "binary";
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      abort(`Invalid encoding type "${opts.encoding}"`);
    }
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);
    if (opts.encoding === "utf8") {
      buf = UTF8ArrayToString(buf);
    }
    FS.close(stream);
    return buf;
  }, writeFile(path, data, opts = {}) {
    opts.flags = opts.flags || 577;
    var stream = FS.open(path, opts.flags, opts.mode);
    if (typeof data == "string") {
      data = new Uint8Array(intArrayFromString(data, true));
    }
    if (ArrayBuffer.isView(data)) {
      FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
    } else {
      abort("Unsupported data type");
    }
    FS.close(stream);
  }, cwd: () => FS.currentPath, chdir(path) {
    var lookup = FS.lookupPath(path, { follow: true });
    if (lookup.node === null) {
      throw new FS.ErrnoError(44);
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54);
    }
    var errCode = FS.nodePermissions(lookup.node, "x");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.currentPath = lookup.path;
  }, createDefaultDirectories() {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  }, createDefaultDevices() {
    FS.mkdir("/dev");
    FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length, llseek: () => 0 });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    var randomBuffer = new Uint8Array(1024), randomLeft = 0;
    var randomByte = () => {
      if (randomLeft === 0) {
        randomFill(randomBuffer);
        randomLeft = randomBuffer.byteLength;
      }
      return randomBuffer[--randomLeft];
    };
    FS.createDevice("/dev", "random", randomByte);
    FS.createDevice("/dev", "urandom", randomByte);
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  }, createSpecialDirectories() {
    FS.mkdir("/proc");
    var proc_self = FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount({ mount() {
      var node = FS.createNode(proc_self, "fd", 16895, 73);
      node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
      node.node_ops = { lookup(parent, name) {
        var fd = +name;
        var stream = FS.getStreamChecked(fd);
        var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path }, id: fd + 1 };
        ret.parent = ret;
        return ret;
      }, readdir() {
        return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
      } };
      return node;
    } }, {}, "/proc/self/fd");
  }, createStandardStreams(input, output, error) {
    if (input) {
      FS.createDevice("/dev", "stdin", input);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }
    if (output) {
      FS.createDevice("/dev", "stdout", null, output);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }
    if (error) {
      FS.createDevice("/dev", "stderr", null, error);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }
    var stdin = FS.open("/dev/stdin", 0);
    var stdout = FS.open("/dev/stdout", 1);
    var stderr = FS.open("/dev/stderr", 1);
  }, staticInit() {
    FS.nameTable = new Array(4096);
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
    FS.filesystems = { MEMFS };
  }, init(input, output, error) {
    FS.initialized = true;
    input ?? (input = Module2["stdin"]);
    output ?? (output = Module2["stdout"]);
    error ?? (error = Module2["stderr"]);
    FS.createStandardStreams(input, output, error);
  }, quit() {
    FS.initialized = false;
    for (var stream of FS.streams) {
      if (stream) {
        FS.close(stream);
      }
    }
  }, findObject(path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink);
    if (!ret.exists) {
      return null;
    }
    return ret.object;
  }, analyzePath(path, dontResolveLastLink) {
    try {
      var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      path = lookup.path;
    } catch (e) {
    }
    var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
    try {
      var lookup = FS.lookupPath(path, { parent: true });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }
    return ret;
  }, createPath(parent, path, canRead, canWrite) {
    parent = typeof parent == "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();
    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);
      try {
        FS.mkdir(current);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
      parent = current;
    }
    return current;
  }, createFile(parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(canRead, canWrite);
    return FS.create(path, mode);
  }, createDataFile(parent, name, data, canRead, canWrite, canOwn) {
    var path = name;
    if (parent) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      path = name ? PATH.join2(parent, name) : parent;
    }
    var mode = FS_getMode(canRead, canWrite);
    var node = FS.create(path, mode);
    if (data) {
      if (typeof data == "string") {
        var arr = new Array(data.length);
        for (var i2 = 0, len = data.length; i2 < len; ++i2) arr[i2] = data.charCodeAt(i2);
        data = arr;
      }
      FS.chmod(node, mode | 146);
      var stream = FS.open(node, 577);
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }
  }, createDevice(parent, name, input, output) {
    var _a;
    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(!!input, !!output);
    (_a = FS.createDevice).major ?? (_a.major = 64);
    var dev = FS.makedev(FS.createDevice.major++, 0);
    FS.registerDevice(dev, { open(stream) {
      stream.seekable = false;
    }, close(stream) {
      if (output?.buffer?.length) {
        output(10);
      }
    }, read(stream, buffer, offset, length, pos) {
      var bytesRead = 0;
      for (var i2 = 0; i2 < length; i2++) {
        var result;
        try {
          result = input();
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === void 0 && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === void 0) break;
        bytesRead++;
        buffer[offset + i2] = result;
      }
      if (bytesRead) {
        stream.node.atime = Date.now();
      }
      return bytesRead;
    }, write(stream, buffer, offset, length, pos) {
      for (var i2 = 0; i2 < length; i2++) {
        try {
          output(buffer[offset + i2]);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
      }
      if (length) {
        stream.node.mtime = stream.node.ctime = Date.now();
      }
      return i2;
    } });
    return FS.mkdev(path, mode, dev);
  }, forceLoadFile(obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    if (globalThis.XMLHttpRequest) {
      abort("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
    } else {
      try {
        obj.contents = readBinary(obj.url);
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
    }
  }, createLazyFile(parent, name, url, canRead, canWrite) {
    class LazyUint8Array {
      constructor() {
        __publicField(this, "lengthKnown", false);
        __publicField(this, "chunks", []);
      }
      get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return void 0;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = idx / this.chunkSize | 0;
        return this.getter(chunkNum)[chunkOffset];
      }
      setDataGetter(getter) {
        this.getter = getter;
      }
      cacheLength() {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
        var chunkSize = 1024 * 1024;
        if (!hasByteServing) chunkSize = datalength;
        var doXHR = (from, to) => {
          if (from > to) abort("invalid range (" + from + ", " + to + ") or no bytes requested!");
          if (to > datalength - 1) abort("only " + datalength + " bytes available! programmer error!");
          var xhr2 = new XMLHttpRequest();
          xhr2.open("GET", url, false);
          if (datalength !== chunkSize) xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
          xhr2.responseType = "arraybuffer";
          if (xhr2.overrideMimeType) {
            xhr2.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr2.send(null);
          if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) abort("Couldn't load " + url + ". Status: " + xhr2.status);
          if (xhr2.response !== void 0) {
            return new Uint8Array(xhr2.response || []);
          }
          return intArrayFromString(xhr2.responseText || "", true);
        };
        var lazyArray2 = this;
        lazyArray2.setDataGetter((chunkNum) => {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          end = Math.min(end, datalength - 1);
          if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
            lazyArray2.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray2.chunks[chunkNum] == "undefined") abort("doXHR failed!");
          return lazyArray2.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1;
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out("LazyFiles on gzip forces download of the whole file when length is accessed");
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      }
      get length() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._length;
      }
      get chunkSize() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._chunkSize;
      }
    }
    if (globalThis.XMLHttpRequest) {
      if (!ENVIRONMENT_IS_WORKER) abort("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
      var lazyArray = new LazyUint8Array();
      var properties = { isDevice: false, contents: lazyArray };
    } else {
      var properties = { isDevice: false, url };
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite);
    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }
    Object.defineProperties(node, { usedBytes: { get: function() {
      return this.contents.length;
    } } });
    var stream_ops = {};
    for (const [key, fn] of Object.entries(node.stream_ops)) {
      stream_ops[key] = (...args) => {
        FS.forceLoadFile(node);
        return fn(...args);
      };
    }
    function writeChunks(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      if (contents.slice) {
        for (var i2 = 0; i2 < size; i2++) {
          buffer[offset + i2] = contents[position + i2];
        }
      } else {
        for (var i2 = 0; i2 < size; i2++) {
          buffer[offset + i2] = contents.get(position + i2);
        }
      }
      return size;
    }
    stream_ops.read = (stream, buffer, offset, length, position) => {
      FS.forceLoadFile(node);
      return writeChunks(stream, buffer, offset, length, position);
    };
    stream_ops.mmap = (stream, length, position, prot, flags) => {
      FS.forceLoadFile(node);
      var ptr = mmapAlloc(length);
      if (!ptr) {
        throw new FS.ErrnoError(48);
      }
      writeChunks(stream, HEAP8, ptr, length, position);
      return { ptr, allocated: true };
    };
    node.stream_ops = stream_ops;
    return node;
  } };
  var SYSCALLS = { DEFAULT_POLLMASK: 5, calculateAt(dirfd, path, allowEmpty) {
    if (PATH.isAbs(path)) {
      return path;
    }
    var dir;
    if (dirfd === -100) {
      dir = FS.cwd();
    } else {
      var dirstream = SYSCALLS.getStreamFromFD(dirfd);
      dir = dirstream.path;
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44);
      }
      return dir;
    }
    return dir + "/" + path;
  }, writeStat(buf, stat) {
    HEAPU32[buf >> 2] = stat.dev;
    HEAPU32[buf + 4 >> 2] = stat.mode;
    HEAPU32[buf + 8 >> 2] = stat.nlink;
    HEAPU32[buf + 12 >> 2] = stat.uid;
    HEAPU32[buf + 16 >> 2] = stat.gid;
    HEAPU32[buf + 20 >> 2] = stat.rdev;
    HEAP64[buf + 24 >> 3] = BigInt(stat.size);
    HEAP32[buf + 32 >> 2] = 4096;
    HEAP32[buf + 36 >> 2] = stat.blocks;
    var atime = stat.atime.getTime();
    var mtime = stat.mtime.getTime();
    var ctime = stat.ctime.getTime();
    HEAP64[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
    HEAPU32[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
    HEAP64[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
    HEAPU32[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
    HEAP64[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
    HEAPU32[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
    HEAP64[buf + 88 >> 3] = BigInt(stat.ino);
    return 0;
  }, writeStatFs(buf, stats) {
    HEAPU32[buf + 4 >> 2] = stats.bsize;
    HEAPU32[buf + 60 >> 2] = stats.bsize;
    HEAP64[buf + 8 >> 3] = BigInt(stats.blocks);
    HEAP64[buf + 16 >> 3] = BigInt(stats.bfree);
    HEAP64[buf + 24 >> 3] = BigInt(stats.bavail);
    HEAP64[buf + 32 >> 3] = BigInt(stats.files);
    HEAP64[buf + 40 >> 3] = BigInt(stats.ffree);
    HEAPU32[buf + 48 >> 2] = stats.fsid;
    HEAPU32[buf + 64 >> 2] = stats.flags;
    HEAPU32[buf + 56 >> 2] = stats.namelen;
  }, doMsync(addr, stream, len, flags, offset) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (flags & 2) {
      return 0;
    }
    var buffer = HEAPU8.slice(addr, addr + len);
    FS.msync(stream, buffer, offset, len, flags);
  }, getStreamFromFD(fd) {
    var stream = FS.getStreamChecked(fd);
    return stream;
  }, varargs: void 0, getStr(ptr) {
    var ret = UTF8ToString(ptr);
    return ret;
  } };
  function _fd_close(fd) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
  }
  var doReadv = (stream, iov, iovcnt, offset) => {
    var ret = 0;
    for (var i2 = 0; i2 < iovcnt; i2++) {
      var ptr = HEAPU32[iov >> 2];
      var len = HEAPU32[iov + 4 >> 2];
      iov += 8;
      var curr = FS.read(stream, HEAP8, ptr, len, offset);
      if (curr < 0) return -1;
      ret += curr;
      if (curr < len) break;
      if (typeof offset != "undefined") {
        offset += curr;
      }
    }
    return ret;
  };
  function _fd_read(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[pnum >> 2] = num;
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
  }
  var INT53_MAX = 9007199254740992;
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num);
  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
    try {
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      HEAP64[newOffset >> 3] = BigInt(stream.position);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
  }
  var doWritev = (stream, iov, iovcnt, offset) => {
    var ret = 0;
    for (var i2 = 0; i2 < iovcnt; i2++) {
      var ptr = HEAPU32[iov >> 2];
      var len = HEAPU32[iov + 4 >> 2];
      iov += 8;
      var curr = FS.write(stream, HEAP8, ptr, len, offset);
      if (curr < 0) return -1;
      ret += curr;
      if (curr < len) {
        break;
      }
      if (typeof offset != "undefined") {
        offset += curr;
      }
    }
    return ret;
  };
  function _fd_write(fd, iov, iovcnt, pnum) {
    try {
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[pnum >> 2] = num;
      return 0;
    } catch (e) {
      if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
      return e.errno;
    }
  }
  for (var base64ReverseLookup = new Uint8Array(123), i = 25; i >= 0; --i) {
    base64ReverseLookup[48 + i] = 52 + i;
    base64ReverseLookup[65 + i] = i;
    base64ReverseLookup[97 + i] = 26 + i;
  }
  base64ReverseLookup[43] = 62;
  base64ReverseLookup[47] = 63;
  init_ClassHandle();
  init_RegisteredPointer();
  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.preloadFile = FS_preloadFile;
  FS.staticInit();
  {
    if (Module2["noExitRuntime"]) noExitRuntime = Module2["noExitRuntime"];
    if (Module2["preloadPlugins"]) preloadPlugins = Module2["preloadPlugins"];
    if (Module2["print"]) out = Module2["print"];
    if (Module2["printErr"]) err = Module2["printErr"];
    if (Module2["wasmBinary"]) wasmBinary = Module2["wasmBinary"];
    if (Module2["arguments"]) arguments_ = Module2["arguments"];
    if (Module2["thisProgram"]) thisProgram = Module2["thisProgram"];
    if (Module2["preInit"]) {
      if (typeof Module2["preInit"] == "function") Module2["preInit"] = [Module2["preInit"]];
      while (Module2["preInit"].length > 0) {
        Module2["preInit"].shift()();
      }
    }
  }
  var _malloc, ___getTypeName, _free, memory, __indirect_function_table, wasmMemory, wasmTable;
  function assignWasmExports(wasmExports2) {
    _malloc = wasmExports2["U"];
    ___getTypeName = wasmExports2["V"];
    _free = wasmExports2["W"];
    memory = wasmMemory = wasmExports2["R"];
    __indirect_function_table = wasmTable = wasmExports2["T"];
  }
  var wasmImports = { d: ___cxa_throw, F: __abort_js, n: __embind_finalize_value_object, y: __embind_register_bigint, O: __embind_register_bool, v: __embind_register_class, s: __embind_register_class_constructor, e: __embind_register_class_function, u: __embind_register_class_property, B: __embind_register_constant, M: __embind_register_emval, q: __embind_register_enum, b: __embind_register_enum_value, x: __embind_register_float, l: __embind_register_function, p: __embind_register_integer, i: __embind_register_memory_view, z: __embind_register_optional, N: __embind_register_std_string, t: __embind_register_std_wstring, o: __embind_register_value_object, a: __embind_register_value_object_field, P: __embind_register_void, h: __emval_create_invoker, c: __emval_decref, D: __emval_get_global, k: __emval_get_property, j: __emval_incref, C: __emval_instanceof, g: __emval_invoke, r: __emval_new_array, m: __emval_new_cstring, A: __emval_new_object, f: __emval_run_destructors, Q: __emval_set_property, E: __tzset_js, J: _emscripten_resize_heap, K: _environ_get, L: _environ_sizes_get, G: _fd_close, H: _fd_read, I: _fd_seek, w: _fd_write };
  function run() {
    if (runDependencies > 0) {
      dependenciesFulfilled = run;
      return;
    }
    preRun();
    if (runDependencies > 0) {
      dependenciesFulfilled = run;
      return;
    }
    function doRun() {
      Module2["calledRun"] = true;
      if (ABORT) return;
      initRuntime();
      readyPromiseResolve?.(Module2);
      Module2["onRuntimeInitialized"]?.();
      postRun();
    }
    if (Module2["setStatus"]) {
      Module2["setStatus"]("Running...");
      setTimeout(() => {
        setTimeout(() => Module2["setStatus"](""), 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
  }
  var wasmExports;
  wasmExports = await createWasm();
  run();
  const convertEnum = (enumObj) => {
    if (!enumObj) return enumObj;
    const converted = {};
    for (const key in enumObj) {
      if (Object.prototype.hasOwnProperty.call(enumObj, key)) {
        const item = enumObj[key];
        if (typeof item === "object" && item !== null && "value" in item) {
          converted[key] = item.value;
        }
      }
    }
    return converted;
  };
  if (Module2._TerminationReason) {
    Module2._TerminationReason = convertEnum(Module2._TerminationReason);
  }
  if (Module2._BaseTrajDataInterpKey) {
    Module2._BaseTrajDataInterpKey = convertEnum(Module2._BaseTrajDataInterpKey);
  }
  if (Module2._TrajectoryDataInterpKey) {
    Module2._TrajectoryDataInterpKey = convertEnum(Module2._TrajectoryDataInterpKey);
  }
  if (Module2._Vector) {
    const VectorProto = Module2._Vector.prototype;
    const chainableMethods = ["iadd", "isub", "imul", "idiv", "inorm"];
    chainableMethods.forEach((methodName) => {
      const originalMethod = VectorProto[methodName];
      if (!originalMethod) return;
      VectorProto[methodName] = function(...args) {
        originalMethod.apply(this, args);
        return this;
      };
    });
    VectorProto.clone = function() {
      return new Module2._Vector(this.x, this.y, this.z);
    };
    VectorProto.set = function(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    };
    VectorProto.equals = function(other, epsilon = 1e-10) {
      return Math.abs(this.x - other.x) < epsilon && Math.abs(this.y - other.y) < epsilon && Math.abs(this.z - other.z) < epsilon;
    };
    VectorProto.toObject = function() {
      return { x: this.x, y: this.y, z: this.z };
    };
    VectorProto.toArray = function() {
      return [this.x, this.y, this.z];
    };
    VectorProto.toString = function() {
      return `Vector(${this.x.toFixed(6)}, ${this.y.toFixed(6)}, ${this.z.toFixed(6)})`;
    };
    Module2._Vector.fromArray = function(arr) {
      return new Module2._Vector(arr[0], arr[1], arr[2]);
    };
    Module2._Vector.fromObject = function(obj) {
      return new Module2._Vector(obj.x, obj.y, obj.z);
    };
    Module2._Vector.zero = function() {
      return new Module2._Vector(0, 0, 0);
    };
    Module2._Vector.unitX = function() {
      return new Module2._Vector(1, 0, 0);
    };
    Module2._Vector.unitY = function() {
      return new Module2._Vector(0, 1, 0);
    };
    Module2._Vector.unitZ = function() {
      return new Module2._Vector(0, 0, 1);
    };
  }
  if (runtimeInitialized) {
    moduleRtn = Module2;
  } else {
    moduleRtn = new Promise((resolve, reject) => {
      readyPromiseResolve = resolve;
      readyPromiseReject = reject;
    });
  }
  ;
  return moduleRtn;
}
var bclibc_default = Module;

// src/_wasm.ts
var BclibcFactory = bclibc_default;
var bclibcReady = null;
var loadBclibc = () => {
  if (!bclibcReady) {
    bclibcReady = BclibcFactory();
  }
  return bclibcReady;
};
var IntegrationMethod = {
  RK4: { value: 0 },
  EULER: { value: 1 }
};
var TrajFlag = /* @__PURE__ */ ((TrajFlag2) => {
  TrajFlag2[TrajFlag2["NONE"] = 0] = "NONE";
  TrajFlag2[TrajFlag2["ZERO_UP"] = 1] = "ZERO_UP";
  TrajFlag2[TrajFlag2["ZERO_DOWN"] = 2] = "ZERO_DOWN";
  TrajFlag2[TrajFlag2["ZERO"] = 3] = "ZERO";
  TrajFlag2[TrajFlag2["MACH"] = 4] = "MACH";
  TrajFlag2[TrajFlag2["RANGE"] = 8] = "RANGE";
  TrajFlag2[TrajFlag2["APEX"] = 16] = "APEX";
  TrajFlag2[TrajFlag2["ALL"] = 31] = "ALL";
  TrajFlag2[TrajFlag2["MRT"] = 32] = "MRT";
  return TrajFlag2;
})(TrajFlag || {});

// src/unit.ts
var Unit = /* @__PURE__ */ ((Unit3) => {
  Unit3[Unit3["Radian"] = 0] = "Radian";
  Unit3[Unit3["Degree"] = 1] = "Degree";
  Unit3[Unit3["MOA"] = 2] = "MOA";
  Unit3[Unit3["MIL"] = 3] = "MIL";
  Unit3[Unit3["MRad"] = 4] = "MRad";
  Unit3[Unit3["Thousand"] = 5] = "Thousand";
  Unit3[Unit3["InchesPer100Yd"] = 6] = "InchesPer100Yd";
  Unit3[Unit3["CmPer100M"] = 7] = "CmPer100M";
  Unit3[Unit3["OClock"] = 8] = "OClock";
  Unit3[Unit3["Inch"] = 10] = "Inch";
  Unit3[Unit3["Foot"] = 11] = "Foot";
  Unit3[Unit3["Yard"] = 12] = "Yard";
  Unit3[Unit3["Mile"] = 13] = "Mile";
  Unit3[Unit3["NauticalMile"] = 14] = "NauticalMile";
  Unit3[Unit3["Millimeter"] = 15] = "Millimeter";
  Unit3[Unit3["Centimeter"] = 16] = "Centimeter";
  Unit3[Unit3["Meter"] = 17] = "Meter";
  Unit3[Unit3["Kilometer"] = 18] = "Kilometer";
  Unit3[Unit3["Line"] = 19] = "Line";
  Unit3[Unit3["FootPound"] = 30] = "FootPound";
  Unit3[Unit3["Joule"] = 31] = "Joule";
  Unit3[Unit3["MmHg"] = 40] = "MmHg";
  Unit3[Unit3["InHg"] = 41] = "InHg";
  Unit3[Unit3["Bar"] = 42] = "Bar";
  Unit3[Unit3["hPa"] = 43] = "hPa";
  Unit3[Unit3["PSI"] = 44] = "PSI";
  Unit3[Unit3["Fahrenheit"] = 50] = "Fahrenheit";
  Unit3[Unit3["Celsius"] = 51] = "Celsius";
  Unit3[Unit3["Kelvin"] = 52] = "Kelvin";
  Unit3[Unit3["Rankin"] = 53] = "Rankin";
  Unit3[Unit3["MPS"] = 60] = "MPS";
  Unit3[Unit3["KMH"] = 61] = "KMH";
  Unit3[Unit3["FPS"] = 62] = "FPS";
  Unit3[Unit3["MPH"] = 63] = "MPH";
  Unit3[Unit3["KT"] = 64] = "KT";
  Unit3[Unit3["Grain"] = 70] = "Grain";
  Unit3[Unit3["Ounce"] = 71] = "Ounce";
  Unit3[Unit3["Gram"] = 72] = "Gram";
  Unit3[Unit3["Pound"] = 73] = "Pound";
  Unit3[Unit3["Kilogram"] = 74] = "Kilogram";
  Unit3[Unit3["Newton"] = 75] = "Newton";
  return Unit3;
})(Unit || {});
var Dimension = class {
  constructor(value, units) {
    this._value = this.toRaw(value, units);
    this._definedUnits = units;
  }
  /**
   * Returns a human-readable representation of the value with its unit.
   *
   * @return {string} A string representing the value with its unit.
   */
  toString() {
    const units = this._definedUnits;
    const props = UnitProps[units];
    const v = this.fromRaw(this._value, units);
    return `${v.toFixed(props.accuracy)}${props.symbol}`;
  }
  /**
   * Validates the units.
   *
   * @param {number} value - Value of the unit.
   * @param {AllowedUnitT} units - Unit enum type.
   * @return {number} Value in specified units.
   * @throws {TypeError} When the provided units are not of the expected type.
   * @throws {Error} When the provided units are not supported.
   */
  _unit_support_error(value, units) {
    if (!(units instanceof this.constructor)) {
      const err_msg = `Type expected: ${this.constructor.name}, ${typeof units} found: ${units} (${value})`;
      throw new TypeError(err_msg);
    }
    if (!Object.values(this).includes(units)) {
      throw new Error(`${this.constructor.name}: unit ${units} is not supported`);
    }
    return 0;
  }
  /**
   * Converts value with specified units to raw value.
   *
   * @param {number} value - Value of the unit.
   * @param {AllowedUnitT} units - Unit enum type.
   * @return {number} Value in specified units.
   */
  toRaw(value, units) {
    return this._unit_support_error(value, units);
  }
  /**
   * Converts raw value to specified units.
   *
   * @param {number} value - Raw value of the unit.
   * @param {AllowedUnitT} units - Unit enum type.
   * @return {number} Value in specified units.
   */
  fromRaw(value, units) {
    return this._unit_support_error(value, units);
  }
  // Додайте перевантаження
  to(units) {
    const value = this.In(units);
    return new this.constructor(value, units);
  }
  // Додайте перевантаження
  In(units) {
    return this.fromRaw(this._value, units);
  }
  /**
   * Returns defined units.
   *
   * @return {AllowedUnitT} Defined units.
   */
  get units() {
    return this._definedUnits;
  }
  /**
   * Raw unit value getter.
   *
   * @return {number} Raw unit value.
   */
  get rawValue() {
    return this._value;
  }
};
var Angular = class extends Dimension {
  constructor(value, units) {
    super(value, units);
  }
  get rad() {
    return this.In(0 /* Radian */);
  }
  toRaw(value, units) {
    let result = 0;
    switch (units) {
      case 0 /* Radian */:
        result = value;
        break;
      case 1 /* Degree */:
        result = value / 180 * Math.PI;
        break;
      case 2 /* MOA */:
        result = value / 180 * Math.PI / 60;
        break;
      case 3 /* MIL */:
        result = value / 3200 * Math.PI;
        break;
      case 4 /* MRad */:
        result = value / 1e3;
        break;
      case 5 /* Thousand */:
        result = value / 3e3 * Math.PI;
        break;
      case 6 /* InchesPer100Yd */:
        result = Math.atan(value / 3600);
        break;
      case 7 /* CmPer100M */:
        result = Math.atan(value / 1e4);
        break;
      case 8 /* OClock */:
        result = value / 6 * Math.PI;
        break;
      default:
        return super.toRaw(value, units);
    }
    if (result > 2 * Math.PI) {
      result = result % (2 * Math.PI);
    }
    return result;
  }
  fromRaw(value, units) {
    switch (units) {
      case 0 /* Radian */:
        return value;
      case 1 /* Degree */:
        return value * 180 / Math.PI;
      case 2 /* MOA */:
        return value * 180 / Math.PI * 60;
      case 3 /* MIL */:
        return value * 3200 / Math.PI;
      case 4 /* MRad */:
        return value * 1e3;
      case 5 /* Thousand */:
        return value * 3e3 / Math.PI;
      case 6 /* InchesPer100Yd */:
        return Math.tan(value) * 3600;
      case 7 /* CmPer100M */:
        return Math.tan(value) * 1e4;
      case 8 /* OClock */:
        return value * 6 / Math.PI;
      default:
        return super.fromRaw(value, units);
    }
  }
};
// Angular unit constants
Angular.Radian = 0 /* Radian */;
Angular.Degree = 1 /* Degree */;
Angular.MOA = 2 /* MOA */;
Angular.MIL = 3 /* MIL */;
Angular.MRad = 4 /* MRad */;
Angular.Thousand = 5 /* Thousand */;
Angular.InchesPer100Yd = 6 /* InchesPer100Yd */;
Angular.CmPer100M = 7 /* CmPer100M */;
Angular.OClock = 8 /* OClock */;
var Distance = class extends Dimension {
  constructor(value, units) {
    super(value, units);
  }
  get foot() {
    return this.In(11 /* Foot */);
  }
  get inch() {
    return this.In(10 /* Inch */);
  }
  toRaw(value, units) {
    switch (units) {
      case 10 /* Inch */:
        return value;
      case 11 /* Foot */:
        return value * 12;
      case 12 /* Yard */:
        return value * 36;
      case 13 /* Mile */:
        return value * 63360;
      case 14 /* NauticalMile */:
        return value * 72913.3858;
      case 19 /* Line */:
        return value / 10;
      case 15 /* Millimeter */:
        return value / 25.4;
      case 16 /* Centimeter */:
        return value / 2.54;
      case 17 /* Meter */:
        return value / 25.4 * 1e3;
      case 18 /* Kilometer */:
        return value / 25.4 * 1e6;
      default:
        return super.toRaw(value, units);
    }
  }
  fromRaw(value, units) {
    switch (units) {
      case 10 /* Inch */:
        return value;
      case 11 /* Foot */:
        return value / 12;
      case 12 /* Yard */:
        return value / 36;
      case 13 /* Mile */:
        return value / 63360;
      case 14 /* NauticalMile */:
        return value / 72913.3858;
      case 19 /* Line */:
        return value * 10;
      case 15 /* Millimeter */:
        return value * 25.4;
      case 16 /* Centimeter */:
        return value * 2.54;
      case 17 /* Meter */:
        return value * 25.4 / 1e3;
      case 18 /* Kilometer */:
        return value * 25.4 / 1e6;
      default:
        return super.fromRaw(value, units);
    }
  }
};
// Distance unit constants
Distance.Inch = 10 /* Inch */;
Distance.Foot = 11 /* Foot */;
Distance.Yard = 12 /* Yard */;
Distance.Mile = 13 /* Mile */;
Distance.NauticalMile = 14 /* NauticalMile */;
Distance.Line = 19 /* Line */;
Distance.Millimeter = 15 /* Millimeter */;
Distance.Centimeter = 16 /* Centimeter */;
Distance.Meter = 17 /* Meter */;
Distance.Kilometer = 18 /* Kilometer */;
var Velocity = class extends Dimension {
  constructor(value, units) {
    super(value, units);
  }
  get fps() {
    return this.In(62 /* FPS */);
  }
  toRaw(value, units) {
    switch (units) {
      case 60 /* MPS */:
        return value;
      case 61 /* KMH */:
        return value / 3.6;
      case 62 /* FPS */:
        return value / 3.2808399;
      case 63 /* MPH */:
        return value / 2.23693629;
      case 64 /* KT */:
        return value / 1.94384449;
      default:
        return super.toRaw(value, units);
    }
  }
  fromRaw(value, units) {
    switch (units) {
      case 60 /* MPS */:
        return value;
      case 61 /* KMH */:
        return value * 3.6;
      case 62 /* FPS */:
        return value * 3.2808399;
      case 63 /* MPH */:
        return value * 2.23693629;
      case 64 /* KT */:
        return value * 1.94384449;
      default:
        return super.fromRaw(value, units);
    }
  }
};
// Velocity unit constants
Velocity.MPS = 60 /* MPS */;
Velocity.KMH = 61 /* KMH */;
Velocity.FPS = 62 /* FPS */;
Velocity.MPH = 63 /* MPH */;
Velocity.KT = 64 /* KT */;
var Weight = class extends Dimension {
  constructor(value, units) {
    super(value, units);
  }
  get grain() {
    return this.In(70 /* Grain */);
  }
  toRaw(value, units) {
    switch (units) {
      case 70 /* Grain */:
        return value;
      case 72 /* Gram */:
        return value * 15.4323584;
      case 74 /* Kilogram */:
        return value * 15432.3584;
      case 75 /* Newton */:
        return value * 151339.73750336;
      case 73 /* Pound */:
        return value / 142857143e-12;
      case 71 /* Ounce */:
        return value * 437.5;
      default:
        return super.toRaw(value, units);
    }
  }
  fromRaw(value, units) {
    switch (units) {
      case 70 /* Grain */:
        return value;
      case 72 /* Gram */:
        return value / 15.4323584;
      case 74 /* Kilogram */:
        return value / 15432.3584;
      case 75 /* Newton */:
        return value / 151339.73750336;
      case 73 /* Pound */:
        return value * 142857143e-12;
      case 71 /* Ounce */:
        return value / 437.5;
      default:
        return super.fromRaw(value, units);
    }
  }
};
// Weight unit constants
Weight.Grain = 70 /* Grain */;
Weight.Ounce = 71 /* Ounce */;
Weight.Gram = 72 /* Gram */;
Weight.Pound = 73 /* Pound */;
Weight.Kilogram = 74 /* Kilogram */;
Weight.Newton = 75 /* Newton */;
var Pressure = class extends Dimension {
  constructor(value, units) {
    super(value, units);
  }
  toRaw(value, units) {
    switch (units) {
      case 40 /* MmHg */:
        return value;
      case 41 /* InHg */:
        return value * 25.4;
      case 42 /* Bar */:
        return value * 750.061683;
      case 43 /* hPa */:
        return value * 750.061683 / 1e3;
      case 44 /* PSI */:
        return value * 51.714924102396;
      default:
        return super.toRaw(value, units);
    }
  }
  fromRaw(value, units) {
    switch (units) {
      case 40 /* MmHg */:
        return value;
      case 41 /* InHg */:
        return value / 25.4;
      case 42 /* Bar */:
        return value / 750.061683;
      case 43 /* hPa */:
        return value / 750.061683 * 1e3;
      case 44 /* PSI */:
        return value / 51.714924102396;
      default:
        return super.fromRaw(value, units);
    }
  }
};
// Pressure unit constants
Pressure.MmHg = 40 /* MmHg */;
Pressure.InHg = 41 /* InHg */;
Pressure.Bar = 42 /* Bar */;
Pressure.hPa = 43 /* hPa */;
Pressure.PSI = 44 /* PSI */;
var Temperature = class extends Dimension {
  constructor(value, units) {
    super(value, units);
  }
  toRaw(value, units) {
    switch (units) {
      case 50 /* Fahrenheit */:
        return value;
      case 53 /* Rankin */:
        return value - 459.67;
      case 51 /* Celsius */:
        return value * 9 / 5 + 32;
      case 52 /* Kelvin */:
        return (value - 273.15) * 9 / 5 + 32;
      default:
        return super.toRaw(value, units);
    }
  }
  fromRaw(value, units) {
    switch (units) {
      case 50 /* Fahrenheit */:
        return value;
      case 53 /* Rankin */:
        return value + 459.67;
      case 51 /* Celsius */:
        return (value - 32) * 5 / 9;
      case 52 /* Kelvin */:
        return (value - 32) * 5 / 9 + 273.15;
      default:
        return super.fromRaw(value, units);
    }
  }
};
// Temperature unit constants
Temperature.Fahrenheit = 50 /* Fahrenheit */;
Temperature.Celsius = 51 /* Celsius */;
Temperature.Kelvin = 52 /* Kelvin */;
Temperature.Rankin = 53 /* Rankin */;
var Energy = class extends Dimension {
  constructor(value, units) {
    super(value, units);
  }
  toRaw(value, units) {
    if (units === 30 /* FootPound */) {
      return value;
    }
    if (units === 31 /* Joule */) {
      return value * 0.737562149277;
    }
    return super.toRaw(value, units);
  }
  fromRaw(value, units) {
    if (units === 30 /* FootPound */) {
      return value;
    }
    if (units === 31 /* Joule */) {
      return value / 0.737562149277;
    }
    return super.fromRaw(value, units);
  }
};
// Energy unit constants
Energy.FootPound = 30 /* FootPound */;
Energy.Joule = 31 /* Joule */;
var UnitProps = {
  [0 /* Radian */]: { name: "radian", accuracy: 6, symbol: "rad" },
  [1 /* Degree */]: { name: "degree", accuracy: 4, symbol: "\xB0" },
  [2 /* MOA */]: { name: "MOA", accuracy: 2, symbol: "MOA" },
  [3 /* MIL */]: { name: "MIL", accuracy: 2, symbol: "MIL" },
  [4 /* MRad */]: { name: "MRAD", accuracy: 2, symbol: "MRAD" },
  [5 /* Thousand */]: { name: "thousand", accuracy: 2, symbol: "ths" },
  [6 /* InchesPer100Yd */]: {
    name: "inches/100yd",
    accuracy: 2,
    symbol: "in/100yd"
  },
  [7 /* CmPer100M */]: { name: "cm/100m", accuracy: 2, symbol: "cm/100m" },
  [8 /* OClock */]: { name: "hour", accuracy: 2, symbol: "h" },
  [10 /* Inch */]: { name: "inch", accuracy: 3, symbol: "inch" },
  [11 /* Foot */]: { name: "foot", accuracy: 2, symbol: "ft" },
  [12 /* Yard */]: { name: "yard", accuracy: 3, symbol: "yd" },
  [13 /* Mile */]: { name: "mile", accuracy: 3, symbol: "mi" },
  [14 /* NauticalMile */]: { name: "nautical mile", accuracy: 3, symbol: "nm" },
  [15 /* Millimeter */]: { name: "millimeter", accuracy: 3, symbol: "mm" },
  [16 /* Centimeter */]: { name: "centimeter", accuracy: 3, symbol: "cm" },
  [17 /* Meter */]: { name: "meter", accuracy: 3, symbol: "m" },
  [18 /* Kilometer */]: { name: "kilometer", accuracy: 3, symbol: "km" },
  [19 /* Line */]: { name: "line", accuracy: 3, symbol: "ln" },
  [30 /* FootPound */]: { name: "foot * pound", accuracy: 0, symbol: "ft\xB7lb" },
  [31 /* Joule */]: { name: "joule", accuracy: 0, symbol: "J" },
  [40 /* MmHg */]: { name: "mmHg", accuracy: 0, symbol: "mmHg" },
  [41 /* InHg */]: { name: "inHg", accuracy: 6, symbol: "inHg" },
  [42 /* Bar */]: { name: "bar", accuracy: 2, symbol: "bar" },
  [43 /* hPa */]: { name: "hPa", accuracy: 4, symbol: "hPa" },
  [44 /* PSI */]: { name: "psi", accuracy: 4, symbol: "psi" },
  [50 /* Fahrenheit */]: { name: "fahrenheit", accuracy: 1, symbol: "\xB0F" },
  [51 /* Celsius */]: { name: "celsius", accuracy: 1, symbol: "\xB0C" },
  [52 /* Kelvin */]: { name: "kelvin", accuracy: 1, symbol: "\xB0K" },
  [53 /* Rankin */]: { name: "rankin", accuracy: 1, symbol: "\xB0R" },
  [60 /* MPS */]: { name: "mps", accuracy: 0, symbol: "m/s" },
  [61 /* KMH */]: { name: "kmh", accuracy: 1, symbol: "km/h" },
  [62 /* FPS */]: { name: "fps", accuracy: 1, symbol: "ft/s" },
  [63 /* MPH */]: { name: "mph", accuracy: 1, symbol: "mph" },
  [64 /* KT */]: { name: "knots", accuracy: 1, symbol: "kt" },
  [70 /* Grain */]: { name: "grain", accuracy: 1, symbol: "gr" },
  [71 /* Ounce */]: { name: "ounce", accuracy: 1, symbol: "oz" },
  [72 /* Gram */]: { name: "gram", accuracy: 1, symbol: "g" },
  [73 /* Pound */]: { name: "pound", accuracy: 3, symbol: "lb" },
  [74 /* Kilogram */]: { name: "kilogram", accuracy: 3, symbol: "kg" },
  [75 /* Newton */]: { name: "newton", accuracy: 3, symbol: "N" }
};
var Measure = {
  Angular,
  Distance,
  Velocity,
  Weight,
  Temperature,
  Pressure,
  Energy
};
var UNew = {
  Radian: (value) => new Angular(value, 0 /* Radian */),
  Degree: (value) => new Angular(value, 1 /* Degree */),
  MOA: (value) => new Angular(value, 2 /* MOA */),
  MIL: (value) => new Angular(value, 3 /* MIL */),
  MRad: (value) => new Angular(value, 4 /* MRad */),
  Thousand: (value) => new Angular(value, 5 /* Thousand */),
  InchesPer100Yd: (value) => new Angular(value, 6 /* InchesPer100Yd */),
  CmPer100M: (value) => new Angular(value, 7 /* CmPer100M */),
  OClock: (value) => new Angular(value, 8 /* OClock */),
  Inch: (value) => new Distance(value, 10 /* Inch */),
  Foot: (value) => new Distance(value, 11 /* Foot */),
  Yard: (value) => new Distance(value, 12 /* Yard */),
  Mile: (value) => new Distance(value, 13 /* Mile */),
  NauticalMile: (value) => new Distance(value, 14 /* NauticalMile */),
  Millimeter: (value) => new Distance(value, 15 /* Millimeter */),
  Centimeter: (value) => new Distance(value, 16 /* Centimeter */),
  Meter: (value) => new Distance(value, 17 /* Meter */),
  Kilometer: (value) => new Distance(value, 18 /* Kilometer */),
  Line: (value) => new Distance(value, 19 /* Line */),
  FootPound: (value) => new Energy(value, 30 /* FootPound */),
  Joule: (value) => new Energy(value, 31 /* Joule */),
  MmHg: (value) => new Pressure(value, 40 /* MmHg */),
  InHg: (value) => new Pressure(value, 41 /* InHg */),
  Bar: (value) => new Pressure(value, 42 /* Bar */),
  hPa: (value) => new Pressure(value, 43 /* hPa */),
  PSI: (value) => new Pressure(value, 44 /* PSI */),
  Fahrenheit: (value) => new Temperature(value, 50 /* Fahrenheit */),
  Celsius: (value) => new Temperature(value, 51 /* Celsius */),
  Kelvin: (value) => new Temperature(value, 52 /* Kelvin */),
  Rankin: (value) => new Temperature(value, 53 /* Rankin */),
  MPS: (value) => new Velocity(value, 60 /* MPS */),
  KMH: (value) => new Velocity(value, 61 /* KMH */),
  FPS: (value) => new Velocity(value, 62 /* FPS */),
  MPH: (value) => new Velocity(value, 63 /* MPH */),
  KT: (value) => new Velocity(value, 64 /* KT */),
  Grain: (value) => new Weight(value, 70 /* Grain */),
  Ounce: (value) => new Weight(value, 71 /* Ounce */),
  Gram: (value) => new Weight(value, 72 /* Gram */),
  Pound: (value) => new Weight(value, 73 /* Pound */),
  Kilogram: (value) => new Weight(value, 74 /* Kilogram */),
  Newton: (value) => new Weight(value, 75 /* Newton */),
  [0 /* Radian */]: (value) => new Angular(value, 0 /* Radian */),
  [1 /* Degree */]: (value) => new Angular(value, 1 /* Degree */),
  [2 /* MOA */]: (value) => new Angular(value, 2 /* MOA */),
  [3 /* MIL */]: (value) => new Angular(value, 3 /* MIL */),
  [4 /* MRad */]: (value) => new Angular(value, 4 /* MRad */),
  [5 /* Thousand */]: (value) => new Angular(value, 5 /* Thousand */),
  [6 /* InchesPer100Yd */]: (value) => new Angular(value, 6 /* InchesPer100Yd */),
  [7 /* CmPer100M */]: (value) => new Angular(value, 7 /* CmPer100M */),
  [8 /* OClock */]: (value) => new Angular(value, 8 /* OClock */),
  [10 /* Inch */]: (value) => new Distance(value, 10 /* Inch */),
  [11 /* Foot */]: (value) => new Distance(value, 11 /* Foot */),
  [12 /* Yard */]: (value) => new Distance(value, 12 /* Yard */),
  [13 /* Mile */]: (value) => new Distance(value, 13 /* Mile */),
  [14 /* NauticalMile */]: (value) => new Distance(value, 14 /* NauticalMile */),
  [15 /* Millimeter */]: (value) => new Distance(value, 15 /* Millimeter */),
  [16 /* Centimeter */]: (value) => new Distance(value, 16 /* Centimeter */),
  [17 /* Meter */]: (value) => new Distance(value, 17 /* Meter */),
  [18 /* Kilometer */]: (value) => new Distance(value, 18 /* Kilometer */),
  [19 /* Line */]: (value) => new Distance(value, 19 /* Line */),
  [30 /* FootPound */]: (value) => new Energy(value, 30 /* FootPound */),
  [31 /* Joule */]: (value) => new Energy(value, 31 /* Joule */),
  [40 /* MmHg */]: (value) => new Pressure(value, 40 /* MmHg */),
  [41 /* InHg */]: (value) => new Pressure(value, 41 /* InHg */),
  [42 /* Bar */]: (value) => new Pressure(value, 42 /* Bar */),
  [43 /* hPa */]: (value) => new Pressure(value, 43 /* hPa */),
  [44 /* PSI */]: (value) => new Pressure(value, 44 /* PSI */),
  [50 /* Fahrenheit */]: (value) => new Temperature(value, 50 /* Fahrenheit */),
  [51 /* Celsius */]: (value) => new Temperature(value, 51 /* Celsius */),
  [52 /* Kelvin */]: (value) => new Temperature(value, 52 /* Kelvin */),
  [53 /* Rankin */]: (value) => new Temperature(value, 53 /* Rankin */),
  [60 /* MPS */]: (value) => new Velocity(value, 60 /* MPS */),
  [61 /* KMH */]: (value) => new Velocity(value, 61 /* KMH */),
  [62 /* FPS */]: (value) => new Velocity(value, 62 /* FPS */),
  [63 /* MPH */]: (value) => new Velocity(value, 63 /* MPH */),
  [64 /* KT */]: (value) => new Velocity(value, 64 /* KT */),
  [70 /* Grain */]: (value) => new Weight(value, 70 /* Grain */),
  [71 /* Ounce */]: (value) => new Weight(value, 71 /* Ounce */),
  [72 /* Gram */]: (value) => new Weight(value, 72 /* Gram */),
  [73 /* Pound */]: (value) => new Weight(value, 73 /* Pound */),
  [74 /* Kilogram */]: (value) => new Weight(value, 74 /* Kilogram */),
  [75 /* Newton */]: (value) => new Weight(value, 75 /* Newton */)
};
function unitTypeCoerce(instance, expectedClass, defaultUnit) {
  if (instance instanceof expectedClass) {
    return instance;
  } else if (typeof instance === "number") {
    return new expectedClass(instance, defaultUnit);
  } else {
    throw new TypeError(`Instance must be a type of ${expectedClass.name} or 'number'`);
  }
}
function isUnit(value) {
  return Object.values(Unit).includes(value);
}
var PreferredUnits = class {
  constructor() {
    this.angular = 1 /* Degree */;
    this.distance = 12 /* Yard */;
    this.velocity = 62 /* FPS */;
    this.pressure = 41 /* InHg */;
    this.temperature = 50 /* Fahrenheit */;
    this.diameter = 10 /* Inch */;
    this.length = 10 /* Inch */;
    this.weight = 70 /* Grain */;
    this.adjustment = 3 /* MIL */;
    this.drop = 10 /* Inch */;
    this.energy = 30 /* FootPound */;
    this.ogw = 73 /* Pound */;
    this.sight_height = 10 /* Inch */;
    this.target_height = 10 /* Inch */;
    this.twist = 10 /* Inch */;
  }
  defaults() {
    this.angular = 1 /* Degree */;
    this.distance = 12 /* Yard */;
    this.velocity = 62 /* FPS */;
    this.pressure = 41 /* InHg */;
    this.temperature = 50 /* Fahrenheit */;
    this.diameter = 10 /* Inch */;
    this.length = 10 /* Inch */;
    this.weight = 70 /* Grain */;
    this.adjustment = 3 /* MIL */;
    this.drop = 10 /* Inch */;
    this.energy = 30 /* FootPound */;
    this.ogw = 73 /* Pound */;
    this.sight_height = 10 /* Inch */;
    this.target_height = 10 /* Inch */;
    this.twist = 10 /* Inch */;
  }
  setUnits(units) {
    for (const [key, value] of Object.entries(units)) {
      if (isUnit(value)) {
        this[key] = value;
      } else {
        console.warn(`${value} is not a valid Unit`);
      }
    }
  }
};
var preferredUnits = new PreferredUnits();

// src/conditions.ts
var _Atmo = class _Atmo {
  /**
   * Represents atmospheric conditions and performs density calculations.
   *
   * @param {Object} [options] - The options for initializing the atmospheric conditions.
   * @param {number | Distance} [options.altitude=undefined] - Altitude above sea level, or a distance object.
   * @param {number | Pressure} [options.pressure=undefined] - Atmospheric pressure, or a pressure object.
   * @param {number | Temperature} [options.temperature=undefined] - Temperature in Fahrenheit, or a temperature object.
   * @param {number} [options.humidity=0.0] - Relative humidity as a decimal (default: 0.0, where 1.0 is 100%).
   * @param {number | Temperature} [options.powderT=undefined] - Powder temperature (default: undefined).
   */
  constructor({
    altitude = void 0,
    pressure = void 0,
    temperature = void 0,
    humidity = 0,
    powderTemperature = void 0
  } = {}) {
    this._initializing = true;
    this._altitude = unitTypeCoerce(altitude ?? 0, Distance, preferredUnits.distance);
    this._pressure = unitTypeCoerce(
      pressure ?? _Atmo.standardPressure(this.altitude),
      Pressure,
      preferredUnits.pressure
    );
    this._temperature = unitTypeCoerce(
      temperature ?? _Atmo.standardTemperature(this.altitude),
      Temperature,
      preferredUnits.temperature
    );
    this._powderTemp = unitTypeCoerce(
      powderTemperature ?? this.temperature,
      Temperature,
      preferredUnits.temperature
    );
    this._t0 = this.temperature.In(Temperature.Celsius);
    this._p0 = this.pressure.In(Pressure.hPa);
    this._a0 = this.altitude.foot;
    this._mach = _Atmo.machF(this._temperature.In(Temperature.Fahrenheit));
    this.humidity = humidity;
    this._initializing = false;
    this.updateDensityRatio();
  }
  get altitude() {
    return this._altitude;
  }
  get pressure() {
    return this._pressure;
  }
  get temperature() {
    return this._temperature;
  }
  get humidity() {
    return this._humidity;
  }
  get powderTemp() {
    return this._powderTemp;
  }
  get mach() {
    return UNew.FPS(this._mach);
  }
  get densityRatio() {
    return this._densityRatio;
  }
  set humidity(value) {
    if (value < 0 || value > 100) {
      throw new Error("Humidity must be between 0% and 100%.");
    }
    if (value > 1) {
      value = value / 100;
    }
    this._humidity = value;
    if (!this._initializing) {
      this.updateDensityRatio();
    }
  }
  updateDensityRatio() {
    this._densityRatio = _Atmo.calculateAirDensity(this._t0, this._p0, this.humidity) / cStandardDensityMetric;
  }
  get densityMetric() {
    return this._densityRatio * cStandardDensityMetric;
  }
  get densityImperial() {
    return this._densityRatio * cStandardDensity;
  }
  temperatureAtAltitude(altitude) {
    let t = (altitude - this._a0) * cLapseRateKperFoot + this._t0;
    if (t < _Atmo.cLowestTempC) {
      t = _Atmo.cLowestTempC;
      console.warn(`Temperature interpolated from altitude fell below minimum temperature limit.
                Model not accurate here.  Temperature bounded at cLowestTempF: ${cLowestTempF}\xB0F.`);
    }
    return t;
  }
  pressureAtAltitude(altitude) {
    return this._p0 * Math.pow(
      1 + cLapseRateKperFoot * (altitude - this._a0) / (this._t0 + cDegreesCtoK),
      cPressureExponent
    );
  }
  getDensityFactorAndMachForAltitude(altitude) {
    if (Math.abs(this._a0 - altitude) < 30) {
      return [this._densityRatio, this._mach];
    }
    if (altitude > 36089) {
      console.warn(
        "Density request for altitude above troposphere. Atmospheric model not valid here."
      );
    }
    const t = this.temperatureAtAltitude(altitude) + cDegreesCtoK;
    const mach = UNew.MPS(_Atmo.machK(t)).fps;
    const p = this.pressureAtAltitude(altitude);
    const densityDelta = (this._t0 + cDegreesCtoK) * p / (this._p0 * t);
    const densityRatio = this._densityRatio * densityDelta;
    return [densityRatio, mach];
  }
  static standardTemperature(altitude) {
    return UNew.Fahrenheit(
      cStandardTemperatureF + altitude.foot * cLapseRateImperial
    );
  }
  static standardPressure(altitude) {
    return UNew.hPa(
      cStandardPressureMetric * Math.pow(
        1 + cLapseRateMetric * altitude.In(Distance.Meter) / (cStandardTemperatureC + cDegreesCtoK),
        cPressureExponent
      )
    );
  }
  static icao({
    // Destructure directly in the parameter list
    altitude = 0,
    // Default altitude to 0 if not provided in the options object
    temperature = void 0,
    // No default here; handle undefined explicitly in the body
    humidity = cStandardHumidity
    // Default humidity to cStandardHumidity if not provided
  } = {}) {
    const _altitude = unitTypeCoerce(altitude, Distance, preferredUnits.distance);
    if (temperature === void 0) {
      temperature = _Atmo.standardTemperature(_altitude);
    }
    const pressure = _Atmo.standardPressure(_altitude);
    return new _Atmo({ altitude, pressure, temperature, humidity });
  }
  static machF(fahrenheit) {
    if (fahrenheit < -cDegreesFtoR) {
      console.warn(`Invalid temperature: ${fahrenheit}\xB0F. Adjusted to (${cLowestTempF}\xB0F).`);
      fahrenheit = cLowestTempF;
    }
    return Math.sqrt(fahrenheit + cDegreesFtoR) * cSpeedOfSoundImperial;
  }
  static machC(celsius) {
    if (celsius < -cDegreesCtoK) {
      const badTemp = celsius;
      celsius = _Atmo.cLowestTempC;
      console.warn(`Invalid temperature: ${badTemp}\xB0C. Adjusted to (${celsius}\xB0C).`);
    }
    return _Atmo.machK(celsius + cDegreesCtoK);
  }
  static machK(kelvin) {
    if (kelvin < 0) {
      const badTemp = kelvin;
      kelvin = _Atmo.cLowestTempC + cDegreesCtoK;
      console.warn(`Invalid temperature: ${badTemp}K. Adjusted to (${kelvin}K).`);
    }
    return Math.sqrt(kelvin) * cSpeedOfSoundMetric;
  }
  static calculateAirDensity(t, p_hpa, humidity) {
    const R = 8.314472;
    const M_a = 0.02896546;
    const M_v = 0.01801528;
    const saturationVaporPressure = (T) => {
      const A = [12378847e-12, -0.019121316, 33.93711047, -6343.1645];
      return Math.exp(A[0] * T ** 2 + A[1] * T + A[2] + A[3] / T);
    };
    const enchancementFactor = (p2, T) => {
      const alpha = 1.00062;
      const beta = 314e-10;
      const gamma = 56e-8;
      return alpha + beta * p2 + gamma * T ** 2;
    };
    const compressibilityFactor = (p2, T, x_v2) => {
      const a0 = 158123e-11;
      const a1 = -29331e-12;
      const a2 = 11043e-14;
      const b0 = 5707e-9;
      const b1 = -2051e-11;
      const c0 = 19898e-8;
      const c1 = -2376e-9;
      const d = 183e-13;
      const e = -765e-11;
      const t_l = T - cDegreesCtoK;
      const Z2 = 1 - p2 / T * (a0 + a1 * t_l + a2 * t_l ** 2 + (b0 + b1 * t_l) * x_v2 + (c0 + c1 * t_l) * x_v2 ** 2) + (p2 / T) ** 2 * (d + e * x_v2 ** 2);
      return Z2;
    };
    let rh_frac = humidity > 1 ? humidity / 100 : humidity;
    rh_frac = Math.max(0, Math.min(1, rh_frac));
    const T_K = t + cDegreesCtoK;
    const p = p_hpa * 100;
    const p_sv = saturationVaporPressure(T_K);
    const f = enchancementFactor(p, t);
    const p_v = rh_frac * f * p_sv;
    const x_v = p_v / p;
    const Z = compressibilityFactor(p, T_K, x_v);
    return p * M_a / (Z * R * T_K) * (1 - x_v * (1 - M_v / M_a));
  }
  toWasmAtmo() {
    return {
      t0: this._t0,
      a0: this._a0,
      p0: this._p0,
      mach: this._mach,
      density_ratio: this.densityRatio,
      cLowestTempC: _Atmo.cLowestTempC
    };
  }
};
_Atmo.cLowestTempC = UNew.Fahrenheit(cLowestTempF).In(Temperature.Celsius);
_Atmo.standard = _Atmo.icao;
var Atmo = _Atmo;
var Vacuum = class extends Atmo {
  /**
   * Represents atmospheric conditions and performs density calculations.
   *
   * @param {Object} [options] - The options for initializing the atmospheric conditions.
   * @param {number | Distance} [options.altitude=undefined] - Altitude above sea level, or a distance object.
   * @param {number | Pressure} [options.pressure=undefined] - Atmospheric pressure, or a pressure object.
   * @param {number | Temperature} [options.temperature=undefined] - Temperature in Fahrenheit, or a temperature object.
   * @param {number} [options.humidity=0.0] - Relative humidity as a decimal (default: 0.0, where 1.0 is 100%).
   */
  constructor({
    altitude = void 0,
    temperature = void 0
  } = {}) {
    super({ altitude, pressure: 0, temperature, humidity: 0 });
    this._pressure = unitTypeCoerce(0, Pressure, preferredUnits.pressure);
    this._densityRatio = 0;
  }
  updateDensityRatio() {
  }
};
Vacuum.cLowestTempC = cDegreesCtoK;
var _Wind = class _Wind {
  /**
   * Stores wind data at the desired distance.
   *
   * @param {Object} [options] - The options for initializing wind data.
   * @param {number | Velocity} [options.velocity=undefined] - Wind velocity. Can be a number, a `Velocity` object, or `undefined`.
   * @param {number | Angular} [options.directionFrom=undefined] - Wind direction in relation to the shooter. Can be a number, an `Angular` object, or `undefined`.
   * @param {number | Distance} [options.untilDistance=undefined] - Distance up to which the wind data is applicable. Can be a number, a `Distance` object, or `undefined`.
   * @param {number} [options.maxDistanceFeet=cMaxWindDistanceFeet] - Maximum distance in feet up to which the wind data is applicable. Defaults to `1e8`.
   */
  constructor({
    velocity = void 0,
    directionFrom = void 0,
    untilDistance = void 0,
    maxDistanceFeet = cMaxWindDistanceFeet
  } = {}) {
    _Wind.MAX_DISTANCE_FEET = maxDistanceFeet ?? cMaxWindDistanceFeet;
    this.velocity = unitTypeCoerce(velocity ?? 0, Velocity, preferredUnits.velocity);
    this.directionFrom = unitTypeCoerce(directionFrom ?? 0, Angular, preferredUnits.angular);
    this.untilDistance = unitTypeCoerce(
      untilDistance ?? UNew.Foot(_Wind.MAX_DISTANCE_FEET),
      Distance,
      preferredUnits.distance
    );
  }
  toWasmWind() {
    return {
      velocity_fps: this.velocity.fps,
      direction_from_rad: this.directionFrom.rad,
      until_distance_ft: this.untilDistance.foot,
      MAX_DISTANCE_FEET: _Wind.MAX_DISTANCE_FEET
    };
  }
};
_Wind.MAX_DISTANCE_FEET = cMaxWindDistanceFeet;
var Wind = _Wind;
var Coriolis = class {
  /**
   * Creates a Coriolis instance for applying Earth's rotation effects.
   *
   * @param options - Configuration options
   * @param options.latitudeDeg - Latitude of shooting location in degrees [-90, 90]
   * @param options.azimuthDeg - Azimuth of shooting direction in degrees [0, 360).
   *        Geographic bearing: 0 = North, 90 = East, 180 = South, 270 = West
   * @param options.muzzleVelocityFps - Muzzle velocity in feet per second
   *
   * @remarks
   * - If `latitudeDeg` is undefined, creates zero-filled instance (no Coriolis effects)
   * - If `azimuthDeg` is undefined, uses flat-fire approximation (horizontal drift only)
   * - If both provided, computes full 3D Coriolis effects
   */
  constructor({
    latitudeDeg,
    azimuthDeg,
    muzzleVelocityFps
  }) {
    if (latitudeDeg === void 0) {
      this.sin_lat = 0;
      this.cos_lat = 0;
      this.sin_az = 0;
      this.cos_az = 0;
      this.range_east = 0;
      this.range_north = 0;
      this.cross_east = 0;
      this.cross_north = 0;
      this.flat_fire_only = false;
      this.muzzle_velocity_fps = muzzleVelocityFps;
      return;
    }
    const lat_rad = latitudeDeg * Math.PI / 180;
    const sin_lat = Math.sin(lat_rad);
    const cos_lat = Math.cos(lat_rad);
    if (azimuthDeg === void 0) {
      this.sin_lat = sin_lat;
      this.cos_lat = cos_lat;
      this.muzzle_velocity_fps = muzzleVelocityFps;
      this.sin_az = 0;
      this.cos_az = 0;
      this.range_east = 0;
      this.range_north = 0;
      this.cross_east = 0;
      this.cross_north = 0;
      this.flat_fire_only = true;
      return;
    }
    const azimuth_rad = azimuthDeg * Math.PI / 180;
    const azimuth_sin = Math.sin(azimuth_rad);
    const azimuth_cos = Math.cos(azimuth_rad);
    this.sin_lat = sin_lat;
    this.cos_lat = cos_lat;
    this.muzzle_velocity_fps = muzzleVelocityFps;
    this.sin_az = azimuth_sin;
    this.cos_az = azimuth_cos;
    this.range_east = azimuth_sin;
    this.range_north = azimuth_cos;
    this.cross_east = azimuth_cos;
    this.cross_north = -azimuth_sin;
    this.flat_fire_only = false;
  }
  /**
   * Converts to WASM-compatible Coriolis format.
   *
   * @returns Object with all Coriolis parameters, using 0.0 for undefined values
   */
  toWasmCoriolis() {
    return {
      sin_lat: this.sin_lat,
      cos_lat: this.cos_lat,
      sin_az: this.sin_az ?? 0,
      cos_az: this.cos_az ?? 0,
      range_east: this.range_east ?? 0,
      range_north: this.range_north ?? 0,
      cross_east: this.cross_east ?? 0,
      cross_north: this.cross_north ?? 0,
      flat_fire_only: this.flat_fire_only,
      muzzle_velocity_fps: this.muzzle_velocity_fps
    };
  }
};

// src/drag_tables.ts
var DragTables = {
  G1: [
    {
      Mach: 0,
      CD: 0.2629
    },
    {
      Mach: 0.05,
      CD: 0.2558
    },
    {
      Mach: 0.1,
      CD: 0.2487
    },
    {
      Mach: 0.15,
      CD: 0.2413
    },
    {
      Mach: 0.2,
      CD: 0.2344
    },
    {
      Mach: 0.25,
      CD: 0.2278
    },
    {
      Mach: 0.3,
      CD: 0.2214
    },
    {
      Mach: 0.35,
      CD: 0.2155
    },
    {
      Mach: 0.4,
      CD: 0.2104
    },
    {
      Mach: 0.45,
      CD: 0.2061
    },
    {
      Mach: 0.5,
      CD: 0.2032
    },
    {
      Mach: 0.55,
      CD: 0.202
    },
    {
      Mach: 0.6,
      CD: 0.2034
    },
    {
      Mach: 0.7,
      CD: 0.2165
    },
    {
      Mach: 0.725,
      CD: 0.223
    },
    {
      Mach: 0.75,
      CD: 0.2313
    },
    {
      Mach: 0.775,
      CD: 0.2417
    },
    {
      Mach: 0.8,
      CD: 0.2546
    },
    {
      Mach: 0.825,
      CD: 0.2706
    },
    {
      Mach: 0.85,
      CD: 0.2901
    },
    {
      Mach: 0.875,
      CD: 0.3136
    },
    {
      Mach: 0.9,
      CD: 0.3415
    },
    {
      Mach: 0.925,
      CD: 0.3734
    },
    {
      Mach: 0.95,
      CD: 0.4084
    },
    {
      Mach: 0.975,
      CD: 0.4448
    },
    {
      Mach: 1,
      CD: 0.4805
    },
    {
      Mach: 1.025,
      CD: 0.5136
    },
    {
      Mach: 1.05,
      CD: 0.5427
    },
    {
      Mach: 1.075,
      CD: 0.5677
    },
    {
      Mach: 1.1,
      CD: 0.5883
    },
    {
      Mach: 1.125,
      CD: 0.6053
    },
    {
      Mach: 1.15,
      CD: 0.6191
    },
    {
      Mach: 1.2,
      CD: 0.6393
    },
    {
      Mach: 1.25,
      CD: 0.6518
    },
    {
      Mach: 1.3,
      CD: 0.6589
    },
    {
      Mach: 1.35,
      CD: 0.6621
    },
    {
      Mach: 1.4,
      CD: 0.6625
    },
    {
      Mach: 1.45,
      CD: 0.6607
    },
    {
      Mach: 1.5,
      CD: 0.6573
    },
    {
      Mach: 1.55,
      CD: 0.6528
    },
    {
      Mach: 1.6,
      CD: 0.6474
    },
    {
      Mach: 1.65,
      CD: 0.6413
    },
    {
      Mach: 1.7,
      CD: 0.6347
    },
    {
      Mach: 1.75,
      CD: 0.628
    },
    {
      Mach: 1.8,
      CD: 0.621
    },
    {
      Mach: 1.85,
      CD: 0.6141
    },
    {
      Mach: 1.9,
      CD: 0.6072
    },
    {
      Mach: 1.95,
      CD: 0.6003
    },
    {
      Mach: 2,
      CD: 0.5934
    },
    {
      Mach: 2.05,
      CD: 0.5867
    },
    {
      Mach: 2.1,
      CD: 0.5804
    },
    {
      Mach: 2.15,
      CD: 0.5743
    },
    {
      Mach: 2.2,
      CD: 0.5685
    },
    {
      Mach: 2.25,
      CD: 0.563
    },
    {
      Mach: 2.3,
      CD: 0.5577
    },
    {
      Mach: 2.35,
      CD: 0.5527
    },
    {
      Mach: 2.4,
      CD: 0.5481
    },
    {
      Mach: 2.45,
      CD: 0.5438
    },
    {
      Mach: 2.5,
      CD: 0.5397
    },
    {
      Mach: 2.6,
      CD: 0.5325
    },
    {
      Mach: 2.7,
      CD: 0.5264
    },
    {
      Mach: 2.8,
      CD: 0.5211
    },
    {
      Mach: 2.9,
      CD: 0.5168
    },
    {
      Mach: 3,
      CD: 0.5133
    },
    {
      Mach: 3.1,
      CD: 0.5105
    },
    {
      Mach: 3.2,
      CD: 0.5084
    },
    {
      Mach: 3.3,
      CD: 0.5067
    },
    {
      Mach: 3.4,
      CD: 0.5054
    },
    {
      Mach: 3.5,
      CD: 0.504
    },
    {
      Mach: 3.6,
      CD: 0.503
    },
    {
      Mach: 3.7,
      CD: 0.5022
    },
    {
      Mach: 3.8,
      CD: 0.5016
    },
    {
      Mach: 3.9,
      CD: 0.501
    },
    {
      Mach: 4,
      CD: 0.5006
    },
    {
      Mach: 4.2,
      CD: 0.4998
    },
    {
      Mach: 4.4,
      CD: 0.4995
    },
    {
      Mach: 4.6,
      CD: 0.4992
    },
    {
      Mach: 4.8,
      CD: 0.499
    },
    {
      Mach: 5,
      CD: 0.4988
    }
  ],
  G7: [
    {
      Mach: 0,
      CD: 0.1198
    },
    {
      Mach: 0.05,
      CD: 0.1197
    },
    {
      Mach: 0.1,
      CD: 0.1196
    },
    {
      Mach: 0.15,
      CD: 0.1194
    },
    {
      Mach: 0.2,
      CD: 0.1193
    },
    {
      Mach: 0.25,
      CD: 0.1194
    },
    {
      Mach: 0.3,
      CD: 0.1194
    },
    {
      Mach: 0.35,
      CD: 0.1194
    },
    {
      Mach: 0.4,
      CD: 0.1193
    },
    {
      Mach: 0.45,
      CD: 0.1193
    },
    {
      Mach: 0.5,
      CD: 0.1194
    },
    {
      Mach: 0.55,
      CD: 0.1193
    },
    {
      Mach: 0.6,
      CD: 0.1194
    },
    {
      Mach: 0.65,
      CD: 0.1197
    },
    {
      Mach: 0.7,
      CD: 0.1202
    },
    {
      Mach: 0.725,
      CD: 0.1207
    },
    {
      Mach: 0.75,
      CD: 0.1215
    },
    {
      Mach: 0.775,
      CD: 0.1226
    },
    {
      Mach: 0.8,
      CD: 0.1242
    },
    {
      Mach: 0.825,
      CD: 0.1266
    },
    {
      Mach: 0.85,
      CD: 0.1306
    },
    {
      Mach: 0.875,
      CD: 0.1368
    },
    {
      Mach: 0.9,
      CD: 0.1464
    },
    {
      Mach: 0.925,
      CD: 0.166
    },
    {
      Mach: 0.95,
      CD: 0.2054
    },
    {
      Mach: 0.975,
      CD: 0.2993
    },
    {
      Mach: 1,
      CD: 0.3803
    },
    {
      Mach: 1.025,
      CD: 0.4015
    },
    {
      Mach: 1.05,
      CD: 0.4043
    },
    {
      Mach: 1.075,
      CD: 0.4034
    },
    {
      Mach: 1.1,
      CD: 0.4014
    },
    {
      Mach: 1.125,
      CD: 0.3987
    },
    {
      Mach: 1.15,
      CD: 0.3955
    },
    {
      Mach: 1.2,
      CD: 0.3884
    },
    {
      Mach: 1.25,
      CD: 0.381
    },
    {
      Mach: 1.3,
      CD: 0.3732
    },
    {
      Mach: 1.35,
      CD: 0.3657
    },
    {
      Mach: 1.4,
      CD: 0.358
    },
    {
      Mach: 1.5,
      CD: 0.344
    },
    {
      Mach: 1.55,
      CD: 0.3376
    },
    {
      Mach: 1.6,
      CD: 0.3315
    },
    {
      Mach: 1.65,
      CD: 0.326
    },
    {
      Mach: 1.7,
      CD: 0.3209
    },
    {
      Mach: 1.75,
      CD: 0.316
    },
    {
      Mach: 1.8,
      CD: 0.3117
    },
    {
      Mach: 1.85,
      CD: 0.3078
    },
    {
      Mach: 1.9,
      CD: 0.3042
    },
    {
      Mach: 1.95,
      CD: 0.301
    },
    {
      Mach: 2,
      CD: 0.298
    },
    {
      Mach: 2.05,
      CD: 0.2951
    },
    {
      Mach: 2.1,
      CD: 0.2922
    },
    {
      Mach: 2.15,
      CD: 0.2892
    },
    {
      Mach: 2.2,
      CD: 0.2864
    },
    {
      Mach: 2.25,
      CD: 0.2835
    },
    {
      Mach: 2.3,
      CD: 0.2807
    },
    {
      Mach: 2.35,
      CD: 0.2779
    },
    {
      Mach: 2.4,
      CD: 0.2752
    },
    {
      Mach: 2.45,
      CD: 0.2725
    },
    {
      Mach: 2.5,
      CD: 0.2697
    },
    {
      Mach: 2.55,
      CD: 0.267
    },
    {
      Mach: 2.6,
      CD: 0.2643
    },
    {
      Mach: 2.65,
      CD: 0.2615
    },
    {
      Mach: 2.7,
      CD: 0.2588
    },
    {
      Mach: 2.75,
      CD: 0.2561
    },
    {
      Mach: 2.8,
      CD: 0.2533
    },
    {
      Mach: 2.85,
      CD: 0.2506
    },
    {
      Mach: 2.9,
      CD: 0.2479
    },
    {
      Mach: 2.95,
      CD: 0.2451
    },
    {
      Mach: 3,
      CD: 0.2424
    },
    {
      Mach: 3.1,
      CD: 0.2368
    },
    {
      Mach: 3.2,
      CD: 0.2313
    },
    {
      Mach: 3.3,
      CD: 0.2258
    },
    {
      Mach: 3.4,
      CD: 0.2205
    },
    {
      Mach: 3.5,
      CD: 0.2154
    },
    {
      Mach: 3.6,
      CD: 0.2106
    },
    {
      Mach: 3.7,
      CD: 0.206
    },
    {
      Mach: 3.8,
      CD: 0.2017
    },
    {
      Mach: 3.9,
      CD: 0.1975
    },
    {
      Mach: 4,
      CD: 0.1935
    },
    {
      Mach: 4.2,
      CD: 0.1861
    },
    {
      Mach: 4.4,
      CD: 0.1793
    },
    {
      Mach: 4.6,
      CD: 0.173
    },
    {
      Mach: 4.8,
      CD: 0.1672
    },
    {
      Mach: 5,
      CD: 0.1618
    }
  ],
  G2: [
    {
      Mach: 0,
      CD: 0.2303
    },
    {
      Mach: 0.05,
      CD: 0.2298
    },
    {
      Mach: 0.1,
      CD: 0.2287
    },
    {
      Mach: 0.15,
      CD: 0.2271
    },
    {
      Mach: 0.2,
      CD: 0.2251
    },
    {
      Mach: 0.25,
      CD: 0.2227
    },
    {
      Mach: 0.3,
      CD: 0.2196
    },
    {
      Mach: 0.35,
      CD: 0.2156
    },
    {
      Mach: 0.4,
      CD: 0.2107
    },
    {
      Mach: 0.45,
      CD: 0.2048
    },
    {
      Mach: 0.5,
      CD: 0.198
    },
    {
      Mach: 0.55,
      CD: 0.1905
    },
    {
      Mach: 0.6,
      CD: 0.1828
    },
    {
      Mach: 0.65,
      CD: 0.1758
    },
    {
      Mach: 0.7,
      CD: 0.1702
    },
    {
      Mach: 0.75,
      CD: 0.1669
    },
    {
      Mach: 0.775,
      CD: 0.1664
    },
    {
      Mach: 0.8,
      CD: 0.1667
    },
    {
      Mach: 0.825,
      CD: 0.1682
    },
    {
      Mach: 0.85,
      CD: 0.1711
    },
    {
      Mach: 0.875,
      CD: 0.1761
    },
    {
      Mach: 0.9,
      CD: 0.1831
    },
    {
      Mach: 0.925,
      CD: 0.2004
    },
    {
      Mach: 0.95,
      CD: 0.2589
    },
    {
      Mach: 0.975,
      CD: 0.3492
    },
    {
      Mach: 1,
      CD: 0.3983
    },
    {
      Mach: 1.025,
      CD: 0.4075
    },
    {
      Mach: 1.05,
      CD: 0.4103
    },
    {
      Mach: 1.075,
      CD: 0.4114
    },
    {
      Mach: 1.1,
      CD: 0.4106
    },
    {
      Mach: 1.125,
      CD: 0.4089
    },
    {
      Mach: 1.15,
      CD: 0.4068
    },
    {
      Mach: 1.175,
      CD: 0.4046
    },
    {
      Mach: 1.2,
      CD: 0.4021
    },
    {
      Mach: 1.25,
      CD: 0.3966
    },
    {
      Mach: 1.3,
      CD: 0.3904
    },
    {
      Mach: 1.35,
      CD: 0.3835
    },
    {
      Mach: 1.4,
      CD: 0.3759
    },
    {
      Mach: 1.45,
      CD: 0.3678
    },
    {
      Mach: 1.5,
      CD: 0.3594
    },
    {
      Mach: 1.55,
      CD: 0.3512
    },
    {
      Mach: 1.6,
      CD: 0.3432
    },
    {
      Mach: 1.65,
      CD: 0.3356
    },
    {
      Mach: 1.7,
      CD: 0.3282
    },
    {
      Mach: 1.75,
      CD: 0.3213
    },
    {
      Mach: 1.8,
      CD: 0.3149
    },
    {
      Mach: 1.85,
      CD: 0.3089
    },
    {
      Mach: 1.9,
      CD: 0.3033
    },
    {
      Mach: 1.95,
      CD: 0.2982
    },
    {
      Mach: 2,
      CD: 0.2933
    },
    {
      Mach: 2.05,
      CD: 0.2889
    },
    {
      Mach: 2.1,
      CD: 0.2846
    },
    {
      Mach: 2.15,
      CD: 0.2806
    },
    {
      Mach: 2.2,
      CD: 0.2768
    },
    {
      Mach: 2.25,
      CD: 0.2731
    },
    {
      Mach: 2.3,
      CD: 0.2696
    },
    {
      Mach: 2.35,
      CD: 0.2663
    },
    {
      Mach: 2.4,
      CD: 0.2632
    },
    {
      Mach: 2.45,
      CD: 0.2602
    },
    {
      Mach: 2.5,
      CD: 0.2572
    },
    {
      Mach: 2.55,
      CD: 0.2543
    },
    {
      Mach: 2.6,
      CD: 0.2515
    },
    {
      Mach: 2.65,
      CD: 0.2487
    },
    {
      Mach: 2.7,
      CD: 0.246
    },
    {
      Mach: 2.75,
      CD: 0.2433
    },
    {
      Mach: 2.8,
      CD: 0.2408
    },
    {
      Mach: 2.85,
      CD: 0.2382
    },
    {
      Mach: 2.9,
      CD: 0.2357
    },
    {
      Mach: 2.95,
      CD: 0.2333
    },
    {
      Mach: 3,
      CD: 0.2309
    },
    {
      Mach: 3.1,
      CD: 0.2262
    },
    {
      Mach: 3.2,
      CD: 0.2217
    },
    {
      Mach: 3.3,
      CD: 0.2173
    },
    {
      Mach: 3.4,
      CD: 0.2132
    },
    {
      Mach: 3.5,
      CD: 0.2091
    },
    {
      Mach: 3.6,
      CD: 0.2052
    },
    {
      Mach: 3.7,
      CD: 0.2014
    },
    {
      Mach: 3.8,
      CD: 0.1978
    },
    {
      Mach: 3.9,
      CD: 0.1944
    },
    {
      Mach: 4,
      CD: 0.1912
    },
    {
      Mach: 4.2,
      CD: 0.1851
    },
    {
      Mach: 4.4,
      CD: 0.1794
    },
    {
      Mach: 4.6,
      CD: 0.1741
    },
    {
      Mach: 4.8,
      CD: 0.1693
    },
    {
      Mach: 5,
      CD: 0.1648
    }
  ],
  G5: [
    {
      Mach: 0,
      CD: 0.171
    },
    {
      Mach: 0.05,
      CD: 0.1719
    },
    {
      Mach: 0.1,
      CD: 0.1727
    },
    {
      Mach: 0.15,
      CD: 0.1732
    },
    {
      Mach: 0.2,
      CD: 0.1734
    },
    {
      Mach: 0.25,
      CD: 0.173
    },
    {
      Mach: 0.3,
      CD: 0.1718
    },
    {
      Mach: 0.35,
      CD: 0.1696
    },
    {
      Mach: 0.4,
      CD: 0.1668
    },
    {
      Mach: 0.45,
      CD: 0.1637
    },
    {
      Mach: 0.5,
      CD: 0.1603
    },
    {
      Mach: 0.55,
      CD: 0.1566
    },
    {
      Mach: 0.6,
      CD: 0.1529
    },
    {
      Mach: 0.65,
      CD: 0.1497
    },
    {
      Mach: 0.7,
      CD: 0.1473
    },
    {
      Mach: 0.75,
      CD: 0.1463
    },
    {
      Mach: 0.8,
      CD: 0.1489
    },
    {
      Mach: 0.85,
      CD: 0.1583
    },
    {
      Mach: 0.875,
      CD: 0.1672
    },
    {
      Mach: 0.9,
      CD: 0.1815
    },
    {
      Mach: 0.925,
      CD: 0.2051
    },
    {
      Mach: 0.95,
      CD: 0.2413
    },
    {
      Mach: 0.975,
      CD: 0.2884
    },
    {
      Mach: 1,
      CD: 0.3379
    },
    {
      Mach: 1.025,
      CD: 0.3785
    },
    {
      Mach: 1.05,
      CD: 0.4032
    },
    {
      Mach: 1.075,
      CD: 0.4147
    },
    {
      Mach: 1.1,
      CD: 0.4201
    },
    {
      Mach: 1.15,
      CD: 0.4278
    },
    {
      Mach: 1.2,
      CD: 0.4338
    },
    {
      Mach: 1.25,
      CD: 0.4373
    },
    {
      Mach: 1.3,
      CD: 0.4392
    },
    {
      Mach: 1.35,
      CD: 0.4403
    },
    {
      Mach: 1.4,
      CD: 0.4406
    },
    {
      Mach: 1.45,
      CD: 0.4401
    },
    {
      Mach: 1.5,
      CD: 0.4386
    },
    {
      Mach: 1.55,
      CD: 0.4362
    },
    {
      Mach: 1.6,
      CD: 0.4328
    },
    {
      Mach: 1.65,
      CD: 0.4286
    },
    {
      Mach: 1.7,
      CD: 0.4237
    },
    {
      Mach: 1.75,
      CD: 0.4182
    },
    {
      Mach: 1.8,
      CD: 0.4121
    },
    {
      Mach: 1.85,
      CD: 0.4057
    },
    {
      Mach: 1.9,
      CD: 0.3991
    },
    {
      Mach: 1.95,
      CD: 0.3926
    },
    {
      Mach: 2,
      CD: 0.3861
    },
    {
      Mach: 2.05,
      CD: 0.38
    },
    {
      Mach: 2.1,
      CD: 0.3741
    },
    {
      Mach: 2.15,
      CD: 0.3684
    },
    {
      Mach: 2.2,
      CD: 0.363
    },
    {
      Mach: 2.25,
      CD: 0.3578
    },
    {
      Mach: 2.3,
      CD: 0.3529
    },
    {
      Mach: 2.35,
      CD: 0.3481
    },
    {
      Mach: 2.4,
      CD: 0.3435
    },
    {
      Mach: 2.45,
      CD: 0.3391
    },
    {
      Mach: 2.5,
      CD: 0.3349
    },
    {
      Mach: 2.6,
      CD: 0.3269
    },
    {
      Mach: 2.7,
      CD: 0.3194
    },
    {
      Mach: 2.8,
      CD: 0.3125
    },
    {
      Mach: 2.9,
      CD: 0.306
    },
    {
      Mach: 3,
      CD: 0.2999
    },
    {
      Mach: 3.1,
      CD: 0.2942
    },
    {
      Mach: 3.2,
      CD: 0.2889
    },
    {
      Mach: 3.3,
      CD: 0.2838
    },
    {
      Mach: 3.4,
      CD: 0.279
    },
    {
      Mach: 3.5,
      CD: 0.2745
    },
    {
      Mach: 3.6,
      CD: 0.2703
    },
    {
      Mach: 3.7,
      CD: 0.2662
    },
    {
      Mach: 3.8,
      CD: 0.2624
    },
    {
      Mach: 3.9,
      CD: 0.2588
    },
    {
      Mach: 4,
      CD: 0.2553
    },
    {
      Mach: 4.2,
      CD: 0.2488
    },
    {
      Mach: 4.4,
      CD: 0.2429
    },
    {
      Mach: 4.6,
      CD: 0.2376
    },
    {
      Mach: 4.8,
      CD: 0.2326
    },
    {
      Mach: 5,
      CD: 0.228
    }
  ],
  G6: [
    {
      Mach: 0,
      CD: 0.2617
    },
    {
      Mach: 0.05,
      CD: 0.2553
    },
    {
      Mach: 0.1,
      CD: 0.2491
    },
    {
      Mach: 0.15,
      CD: 0.2432
    },
    {
      Mach: 0.2,
      CD: 0.2376
    },
    {
      Mach: 0.25,
      CD: 0.2324
    },
    {
      Mach: 0.3,
      CD: 0.2278
    },
    {
      Mach: 0.35,
      CD: 0.2238
    },
    {
      Mach: 0.4,
      CD: 0.2205
    },
    {
      Mach: 0.45,
      CD: 0.2177
    },
    {
      Mach: 0.5,
      CD: 0.2155
    },
    {
      Mach: 0.55,
      CD: 0.2138
    },
    {
      Mach: 0.6,
      CD: 0.2126
    },
    {
      Mach: 0.65,
      CD: 0.2121
    },
    {
      Mach: 0.7,
      CD: 0.2122
    },
    {
      Mach: 0.75,
      CD: 0.2132
    },
    {
      Mach: 0.8,
      CD: 0.2154
    },
    {
      Mach: 0.85,
      CD: 0.2194
    },
    {
      Mach: 0.875,
      CD: 0.2229
    },
    {
      Mach: 0.9,
      CD: 0.2297
    },
    {
      Mach: 0.925,
      CD: 0.2449
    },
    {
      Mach: 0.95,
      CD: 0.2732
    },
    {
      Mach: 0.975,
      CD: 0.3141
    },
    {
      Mach: 1,
      CD: 0.3597
    },
    {
      Mach: 1.025,
      CD: 0.3994
    },
    {
      Mach: 1.05,
      CD: 0.4261
    },
    {
      Mach: 1.075,
      CD: 0.4402
    },
    {
      Mach: 1.1,
      CD: 0.4465
    },
    {
      Mach: 1.125,
      CD: 0.449
    },
    {
      Mach: 1.15,
      CD: 0.4497
    },
    {
      Mach: 1.175,
      CD: 0.4494
    },
    {
      Mach: 1.2,
      CD: 0.4482
    },
    {
      Mach: 1.225,
      CD: 0.4464
    },
    {
      Mach: 1.25,
      CD: 0.4441
    },
    {
      Mach: 1.3,
      CD: 0.439
    },
    {
      Mach: 1.35,
      CD: 0.4336
    },
    {
      Mach: 1.4,
      CD: 0.4279
    },
    {
      Mach: 1.45,
      CD: 0.4221
    },
    {
      Mach: 1.5,
      CD: 0.4162
    },
    {
      Mach: 1.55,
      CD: 0.4102
    },
    {
      Mach: 1.6,
      CD: 0.4042
    },
    {
      Mach: 1.65,
      CD: 0.3981
    },
    {
      Mach: 1.7,
      CD: 0.3919
    },
    {
      Mach: 1.75,
      CD: 0.3855
    },
    {
      Mach: 1.8,
      CD: 0.3788
    },
    {
      Mach: 1.85,
      CD: 0.3721
    },
    {
      Mach: 1.9,
      CD: 0.3652
    },
    {
      Mach: 1.95,
      CD: 0.3583
    },
    {
      Mach: 2,
      CD: 0.3515
    },
    {
      Mach: 2.05,
      CD: 0.3447
    },
    {
      Mach: 2.1,
      CD: 0.3381
    },
    {
      Mach: 2.15,
      CD: 0.3314
    },
    {
      Mach: 2.2,
      CD: 0.3249
    },
    {
      Mach: 2.25,
      CD: 0.3185
    },
    {
      Mach: 2.3,
      CD: 0.3122
    },
    {
      Mach: 2.35,
      CD: 0.306
    },
    {
      Mach: 2.4,
      CD: 0.3
    },
    {
      Mach: 2.45,
      CD: 0.2941
    },
    {
      Mach: 2.5,
      CD: 0.2883
    },
    {
      Mach: 2.6,
      CD: 0.2772
    },
    {
      Mach: 2.7,
      CD: 0.2668
    },
    {
      Mach: 2.8,
      CD: 0.2574
    },
    {
      Mach: 2.9,
      CD: 0.2487
    },
    {
      Mach: 3,
      CD: 0.2407
    },
    {
      Mach: 3.1,
      CD: 0.2333
    },
    {
      Mach: 3.2,
      CD: 0.2265
    },
    {
      Mach: 3.3,
      CD: 0.2202
    },
    {
      Mach: 3.4,
      CD: 0.2144
    },
    {
      Mach: 3.5,
      CD: 0.2089
    },
    {
      Mach: 3.6,
      CD: 0.2039
    },
    {
      Mach: 3.7,
      CD: 0.1991
    },
    {
      Mach: 3.8,
      CD: 0.1947
    },
    {
      Mach: 3.9,
      CD: 0.1905
    },
    {
      Mach: 4,
      CD: 0.1866
    },
    {
      Mach: 4.2,
      CD: 0.1794
    },
    {
      Mach: 4.4,
      CD: 0.173
    },
    {
      Mach: 4.6,
      CD: 0.1673
    },
    {
      Mach: 4.8,
      CD: 0.1621
    },
    {
      Mach: 5,
      CD: 0.1574
    }
  ],
  G8: [
    {
      Mach: 0,
      CD: 0.2105
    },
    {
      Mach: 0.05,
      CD: 0.2105
    },
    {
      Mach: 0.1,
      CD: 0.2104
    },
    {
      Mach: 0.15,
      CD: 0.2104
    },
    {
      Mach: 0.2,
      CD: 0.2103
    },
    {
      Mach: 0.25,
      CD: 0.2103
    },
    {
      Mach: 0.3,
      CD: 0.2103
    },
    {
      Mach: 0.35,
      CD: 0.2103
    },
    {
      Mach: 0.4,
      CD: 0.2103
    },
    {
      Mach: 0.45,
      CD: 0.2102
    },
    {
      Mach: 0.5,
      CD: 0.2102
    },
    {
      Mach: 0.55,
      CD: 0.2102
    },
    {
      Mach: 0.6,
      CD: 0.2102
    },
    {
      Mach: 0.65,
      CD: 0.2102
    },
    {
      Mach: 0.7,
      CD: 0.2103
    },
    {
      Mach: 0.75,
      CD: 0.2103
    },
    {
      Mach: 0.8,
      CD: 0.2104
    },
    {
      Mach: 0.825,
      CD: 0.2104
    },
    {
      Mach: 0.85,
      CD: 0.2105
    },
    {
      Mach: 0.875,
      CD: 0.2106
    },
    {
      Mach: 0.9,
      CD: 0.2109
    },
    {
      Mach: 0.925,
      CD: 0.2183
    },
    {
      Mach: 0.95,
      CD: 0.2571
    },
    {
      Mach: 0.975,
      CD: 0.3358
    },
    {
      Mach: 1,
      CD: 0.4068
    },
    {
      Mach: 1.025,
      CD: 0.4378
    },
    {
      Mach: 1.05,
      CD: 0.4476
    },
    {
      Mach: 1.075,
      CD: 0.4493
    },
    {
      Mach: 1.1,
      CD: 0.4477
    },
    {
      Mach: 1.125,
      CD: 0.445
    },
    {
      Mach: 1.15,
      CD: 0.4419
    },
    {
      Mach: 1.2,
      CD: 0.4353
    },
    {
      Mach: 1.25,
      CD: 0.4283
    },
    {
      Mach: 1.3,
      CD: 0.4208
    },
    {
      Mach: 1.35,
      CD: 0.4133
    },
    {
      Mach: 1.4,
      CD: 0.4059
    },
    {
      Mach: 1.45,
      CD: 0.3986
    },
    {
      Mach: 1.5,
      CD: 0.3915
    },
    {
      Mach: 1.55,
      CD: 0.3845
    },
    {
      Mach: 1.6,
      CD: 0.3777
    },
    {
      Mach: 1.65,
      CD: 0.371
    },
    {
      Mach: 1.7,
      CD: 0.3645
    },
    {
      Mach: 1.75,
      CD: 0.3581
    },
    {
      Mach: 1.8,
      CD: 0.3519
    },
    {
      Mach: 1.85,
      CD: 0.3458
    },
    {
      Mach: 1.9,
      CD: 0.34
    },
    {
      Mach: 1.95,
      CD: 0.3343
    },
    {
      Mach: 2,
      CD: 0.3288
    },
    {
      Mach: 2.05,
      CD: 0.3234
    },
    {
      Mach: 2.1,
      CD: 0.3182
    },
    {
      Mach: 2.15,
      CD: 0.3131
    },
    {
      Mach: 2.2,
      CD: 0.3081
    },
    {
      Mach: 2.25,
      CD: 0.3032
    },
    {
      Mach: 2.3,
      CD: 0.2983
    },
    {
      Mach: 2.35,
      CD: 0.2937
    },
    {
      Mach: 2.4,
      CD: 0.2891
    },
    {
      Mach: 2.45,
      CD: 0.2845
    },
    {
      Mach: 2.5,
      CD: 0.2802
    },
    {
      Mach: 2.6,
      CD: 0.272
    },
    {
      Mach: 2.7,
      CD: 0.2642
    },
    {
      Mach: 2.8,
      CD: 0.2569
    },
    {
      Mach: 2.9,
      CD: 0.2499
    },
    {
      Mach: 3,
      CD: 0.2432
    },
    {
      Mach: 3.1,
      CD: 0.2368
    },
    {
      Mach: 3.2,
      CD: 0.2308
    },
    {
      Mach: 3.3,
      CD: 0.2251
    },
    {
      Mach: 3.4,
      CD: 0.2197
    },
    {
      Mach: 3.5,
      CD: 0.2147
    },
    {
      Mach: 3.6,
      CD: 0.2101
    },
    {
      Mach: 3.7,
      CD: 0.2058
    },
    {
      Mach: 3.8,
      CD: 0.2019
    },
    {
      Mach: 3.9,
      CD: 0.1983
    },
    {
      Mach: 4,
      CD: 0.195
    },
    {
      Mach: 4.2,
      CD: 0.189
    },
    {
      Mach: 4.4,
      CD: 0.1837
    },
    {
      Mach: 4.6,
      CD: 0.1791
    },
    {
      Mach: 4.8,
      CD: 0.175
    },
    {
      Mach: 5,
      CD: 0.1713
    }
  ],
  GI: [
    {
      Mach: 0,
      CD: 0.2282
    },
    {
      Mach: 0.05,
      CD: 0.2282
    },
    {
      Mach: 0.1,
      CD: 0.2282
    },
    {
      Mach: 0.15,
      CD: 0.2282
    },
    {
      Mach: 0.2,
      CD: 0.2282
    },
    {
      Mach: 0.25,
      CD: 0.2282
    },
    {
      Mach: 0.3,
      CD: 0.2282
    },
    {
      Mach: 0.35,
      CD: 0.2282
    },
    {
      Mach: 0.4,
      CD: 0.2282
    },
    {
      Mach: 0.45,
      CD: 0.2282
    },
    {
      Mach: 0.5,
      CD: 0.2282
    },
    {
      Mach: 0.55,
      CD: 0.2282
    },
    {
      Mach: 0.6,
      CD: 0.2282
    },
    {
      Mach: 0.65,
      CD: 0.2282
    },
    {
      Mach: 0.7,
      CD: 0.2282
    },
    {
      Mach: 0.725,
      CD: 0.2353
    },
    {
      Mach: 0.75,
      CD: 0.2434
    },
    {
      Mach: 0.775,
      CD: 0.2515
    },
    {
      Mach: 0.8,
      CD: 0.2596
    },
    {
      Mach: 0.825,
      CD: 0.2677
    },
    {
      Mach: 0.85,
      CD: 0.2759
    },
    {
      Mach: 0.875,
      CD: 0.2913
    },
    {
      Mach: 0.9,
      CD: 0.317
    },
    {
      Mach: 0.925,
      CD: 0.3442
    },
    {
      Mach: 0.95,
      CD: 0.3728
    },
    {
      Mach: 1,
      CD: 0.4349
    },
    {
      Mach: 1.05,
      CD: 0.5034
    },
    {
      Mach: 1.075,
      CD: 0.5402
    },
    {
      Mach: 1.1,
      CD: 0.5756
    },
    {
      Mach: 1.125,
      CD: 0.5887
    },
    {
      Mach: 1.15,
      CD: 0.6018
    },
    {
      Mach: 1.175,
      CD: 0.6149
    },
    {
      Mach: 1.2,
      CD: 0.6279
    },
    {
      Mach: 1.225,
      CD: 0.6418
    },
    {
      Mach: 1.25,
      CD: 0.6423
    },
    {
      Mach: 1.3,
      CD: 0.6423
    },
    {
      Mach: 1.35,
      CD: 0.6423
    },
    {
      Mach: 1.4,
      CD: 0.6423
    },
    {
      Mach: 1.45,
      CD: 0.6423
    },
    {
      Mach: 1.5,
      CD: 0.6423
    },
    {
      Mach: 1.55,
      CD: 0.6423
    },
    {
      Mach: 1.6,
      CD: 0.6423
    },
    {
      Mach: 1.625,
      CD: 0.6407
    },
    {
      Mach: 1.65,
      CD: 0.6378
    },
    {
      Mach: 1.7,
      CD: 0.6321
    },
    {
      Mach: 1.75,
      CD: 0.6266
    },
    {
      Mach: 1.8,
      CD: 0.6213
    },
    {
      Mach: 1.85,
      CD: 0.6163
    },
    {
      Mach: 1.9,
      CD: 0.6113
    },
    {
      Mach: 1.95,
      CD: 0.6066
    },
    {
      Mach: 2,
      CD: 0.602
    },
    {
      Mach: 2.05,
      CD: 0.5976
    },
    {
      Mach: 2.1,
      CD: 0.5933
    },
    {
      Mach: 2.15,
      CD: 0.5891
    },
    {
      Mach: 2.2,
      CD: 0.585
    },
    {
      Mach: 2.25,
      CD: 0.5811
    },
    {
      Mach: 2.3,
      CD: 0.5773
    },
    {
      Mach: 2.35,
      CD: 0.5733
    },
    {
      Mach: 2.4,
      CD: 0.5679
    },
    {
      Mach: 2.45,
      CD: 0.5626
    },
    {
      Mach: 2.5,
      CD: 0.5576
    },
    {
      Mach: 2.6,
      CD: 0.5478
    },
    {
      Mach: 2.7,
      CD: 0.5386
    },
    {
      Mach: 2.8,
      CD: 0.5298
    },
    {
      Mach: 2.9,
      CD: 0.5215
    },
    {
      Mach: 3,
      CD: 0.5136
    },
    {
      Mach: 3.1,
      CD: 0.5061
    },
    {
      Mach: 3.2,
      CD: 0.4989
    },
    {
      Mach: 3.3,
      CD: 0.4921
    },
    {
      Mach: 3.4,
      CD: 0.4855
    },
    {
      Mach: 3.5,
      CD: 0.4792
    },
    {
      Mach: 3.6,
      CD: 0.4732
    },
    {
      Mach: 3.7,
      CD: 0.4674
    },
    {
      Mach: 3.8,
      CD: 0.4618
    },
    {
      Mach: 3.9,
      CD: 0.4564
    },
    {
      Mach: 4,
      CD: 0.4513
    },
    {
      Mach: 4.2,
      CD: 0.4415
    },
    {
      Mach: 4.4,
      CD: 0.4323
    },
    {
      Mach: 4.6,
      CD: 0.4238
    },
    {
      Mach: 4.8,
      CD: 0.4157
    },
    {
      Mach: 5,
      CD: 0.4082
    }
  ],
  GS: [
    {
      Mach: 0,
      CD: 0.4662
    },
    {
      Mach: 0.05,
      CD: 0.4689
    },
    {
      Mach: 0.1,
      CD: 0.4717
    },
    {
      Mach: 0.15,
      CD: 0.4745
    },
    {
      Mach: 0.2,
      CD: 0.4772
    },
    {
      Mach: 0.25,
      CD: 0.48
    },
    {
      Mach: 0.3,
      CD: 0.4827
    },
    {
      Mach: 0.35,
      CD: 0.4852
    },
    {
      Mach: 0.4,
      CD: 0.4882
    },
    {
      Mach: 0.45,
      CD: 0.492
    },
    {
      Mach: 0.5,
      CD: 0.497
    },
    {
      Mach: 0.55,
      CD: 0.508
    },
    {
      Mach: 0.6,
      CD: 0.526
    },
    {
      Mach: 0.65,
      CD: 0.559
    },
    {
      Mach: 0.7,
      CD: 0.592
    },
    {
      Mach: 0.75,
      CD: 0.6258
    },
    {
      Mach: 0.8,
      CD: 0.661
    },
    {
      Mach: 0.85,
      CD: 0.6985
    },
    {
      Mach: 0.9,
      CD: 0.737
    },
    {
      Mach: 0.95,
      CD: 0.7757
    },
    {
      Mach: 1,
      CD: 0.814
    },
    {
      Mach: 1.05,
      CD: 0.8512
    },
    {
      Mach: 1.1,
      CD: 0.887
    },
    {
      Mach: 1.15,
      CD: 0.921
    },
    {
      Mach: 1.2,
      CD: 0.951
    },
    {
      Mach: 1.25,
      CD: 0.974
    },
    {
      Mach: 1.3,
      CD: 0.991
    },
    {
      Mach: 1.35,
      CD: 0.999
    },
    {
      Mach: 1.4,
      CD: 1.003
    },
    {
      Mach: 1.45,
      CD: 1.006
    },
    {
      Mach: 1.5,
      CD: 1.008
    },
    {
      Mach: 1.55,
      CD: 1.009
    },
    {
      Mach: 1.6,
      CD: 1.009
    },
    {
      Mach: 1.65,
      CD: 1.009
    },
    {
      Mach: 1.7,
      CD: 1.009
    },
    {
      Mach: 1.75,
      CD: 1.008
    },
    {
      Mach: 1.8,
      CD: 1.007
    },
    {
      Mach: 1.85,
      CD: 1.006
    },
    {
      Mach: 1.9,
      CD: 1.004
    },
    {
      Mach: 1.95,
      CD: 1.0025
    },
    {
      Mach: 2,
      CD: 1.001
    },
    {
      Mach: 2.05,
      CD: 0.999
    },
    {
      Mach: 2.1,
      CD: 0.997
    },
    {
      Mach: 2.15,
      CD: 0.9956
    },
    {
      Mach: 2.2,
      CD: 0.994
    },
    {
      Mach: 2.25,
      CD: 0.9916
    },
    {
      Mach: 2.3,
      CD: 0.989
    },
    {
      Mach: 2.35,
      CD: 0.9869
    },
    {
      Mach: 2.4,
      CD: 0.985
    },
    {
      Mach: 2.45,
      CD: 0.983
    },
    {
      Mach: 2.5,
      CD: 0.981
    },
    {
      Mach: 2.55,
      CD: 0.979
    },
    {
      Mach: 2.6,
      CD: 0.977
    },
    {
      Mach: 2.65,
      CD: 0.975
    },
    {
      Mach: 2.7,
      CD: 0.973
    },
    {
      Mach: 2.75,
      CD: 0.971
    },
    {
      Mach: 2.8,
      CD: 0.969
    },
    {
      Mach: 2.85,
      CD: 0.967
    },
    {
      Mach: 2.9,
      CD: 0.965
    },
    {
      Mach: 2.95,
      CD: 0.963
    },
    {
      Mach: 3,
      CD: 0.961
    },
    {
      Mach: 3.05,
      CD: 0.9589
    },
    {
      Mach: 3.1,
      CD: 0.957
    },
    {
      Mach: 3.15,
      CD: 0.9555
    },
    {
      Mach: 3.2,
      CD: 0.954
    },
    {
      Mach: 3.25,
      CD: 0.952
    },
    {
      Mach: 3.3,
      CD: 0.95
    },
    {
      Mach: 3.35,
      CD: 0.9485
    },
    {
      Mach: 3.4,
      CD: 0.947
    },
    {
      Mach: 3.45,
      CD: 0.945
    },
    {
      Mach: 3.5,
      CD: 0.943
    },
    {
      Mach: 3.55,
      CD: 0.9414
    },
    {
      Mach: 3.6,
      CD: 0.94
    },
    {
      Mach: 3.65,
      CD: 0.9385
    },
    {
      Mach: 3.7,
      CD: 0.937
    },
    {
      Mach: 3.75,
      CD: 0.9355
    },
    {
      Mach: 3.8,
      CD: 0.934
    },
    {
      Mach: 3.85,
      CD: 0.9325
    },
    {
      Mach: 3.9,
      CD: 0.931
    },
    {
      Mach: 3.95,
      CD: 0.9295
    },
    {
      Mach: 4,
      CD: 0.928
    }
  ]
};
var makeDataPoints = (dragTable) => {
  if (typeof dragTable === "string") {
    const tableName = dragTable.toUpperCase();
    if (!(tableName in DragTables)) {
      throw new Error(`Drag table "${dragTable}" not found. Available tables: ${Object.keys(DragTables).join(", ")}`);
    }
    return DragTables[tableName];
  }
  return dragTable.map((point) => {
    if (typeof point === "object" && point !== null && "Mach" in point && "CD" in point) {
      return { Mach: point.Mach, CD: point.CD };
    }
    throw new TypeError(
      "All items in dragTable must be objects with 'Mach' and 'CD' keys."
    );
  });
};

// src/drag_model.ts
var BCPoint = class _BCPoint {
  /**
   * Creates an instance of BCPoint.
   * @param {Object} options - The parameters for initializing the ballistic coefficient point.
   * @param {number} options.BC - The ballistic coefficient. Must be positive.
   * @param {number} [options.Mach=null] - Mach number. Optional if velocity is provided.
   * @param {number | Velocity | null} [options.V=null] - Velocity. Optional if Mach number is provided.
   * @throws {Error} If BC is less than or equal to zero, or if both Mach and V are specified, or if neither Mach nor V is specified.
   */
  constructor({
    BC,
    Mach = null,
    V = null
  }) {
    if (BC <= 0) {
      throw new Error("Ballistic coefficient must be positive");
    }
    if (Mach !== null && V !== null) {
      throw new Error("You cannot specify both 'Mach' and 'V' at the same time");
    }
    if (Mach === null && V === null) {
      throw new Error("One of 'Mach' and 'V' must be specified");
    }
    this.BC = BC;
    if (V !== null) {
      this.V = unitTypeCoerce(V, Velocity, preferredUnits.velocity);
      this.Mach = this.V.In(Velocity.MPS) / _BCPoint._machC();
    } else if (Mach !== null) {
      this.V = null;
      this.Mach = Mach;
    } else {
      throw new Error("Internal error: Mach or V should have been specified but were not.");
    }
  }
  static _machC() {
    return Math.sqrt(cStandardTemperatureC + cDegreesCtoK) * cSpeedOfSoundMetric;
  }
};
var DragModel = class {
  /**
   * Creates an instance of DragModel.
   * @param {Object} options - The options for initializing the drag model.
   * @param {number} options.bc - Coefficient value for drag.
   * @param {DragTable} options.dragTable - Custom drag table.
   * @param {number | Weight} [options.weight=0] - Weight value or Weight instance (default: 0).
   * @param {number | Distance} [options.diameter=0] - Diameter value or Distance instance (default: 0).
   * @param {number | Distance} [options.length=0] - Length value or Distance instance (default: 0).
   */
  constructor({
    bc,
    dragTable,
    weight = 0,
    diameter = 0,
    length = 0
  }) {
    if (dragTable.length <= 0) {
      throw new Error("Received empty drag table");
    } else if (bc <= 0) {
      throw new Error("Ballistic coefficient must be positive");
    }
    this.dragTable = makeDataPoints(dragTable);
    this.bc = bc;
    this.weight = unitTypeCoerce(weight ?? 0, Weight, preferredUnits.weight);
    this.diameter = unitTypeCoerce(diameter ?? 0, Distance, preferredUnits.diameter);
    this.length = unitTypeCoerce(length ?? 0, Distance, preferredUnits.length);
    if (weight && diameter) {
      this.sectionalDensity = this._getSectionalDensity();
      this.formFactor = this._getFormFactor(this.bc);
    }
  }
  /**
   * Calculate and return the form factor.
   * @param {number} bc - Drag coefficient value.
   * @returns {number} - Calculated form factor.
   * @private
   */
  _getFormFactor(bc) {
    return this.sectionalDensity / bc;
  }
  /**
   * Calculate and return the sectional density.
   * @returns {number} - Calculated sectional density.
   * @private
   */
  _getSectionalDensity() {
    const w = this.weight.grain;
    const d = this.diameter.inch;
    return sectionalDensity(w, d);
  }
};
var sectionalDensity = (weight, diameter) => {
  return weight / Math.pow(diameter, 2) / 7e3;
};
var DragModelMultiBC = ({
  bcPoints,
  dragTable,
  weight = 0,
  diameter = 0,
  length = 0
}) => {
  let bc;
  const _weight = unitTypeCoerce(weight, Weight, preferredUnits.weight);
  const _diameter = unitTypeCoerce(
    diameter,
    // Use default parameter, no need for ?? 0
    Distance,
    preferredUnits.diameter
  );
  if (_weight.rawValue > 0 && _diameter.rawValue > 0) {
    bc = sectionalDensity(_weight.grain, _diameter.inch);
  } else {
    bc = 1;
  }
  const _dragTable = makeDataPoints(dragTable);
  bcPoints.sort((a, b) => a.Mach - b.Mach);
  const bcInterp = linearInterpolation(
    _dragTable.map((point) => point.Mach),
    bcPoints.map((point) => point.Mach),
    bcPoints.map((point) => point.BC / bc)
  );
  _dragTable.forEach((item, index) => {
    if (bcInterp[index] === 0 || isNaN(bcInterp[index])) {
      console.warn(
        `Warning: Interpolated BC factor at index ${index} is zero or NaN. CD calculation may result in Infinity/NaN.`
      );
    }
    item.CD = item.CD / bcInterp[index];
  });
  return new DragModel({
    bc,
    dragTable: _dragTable,
    weight: _weight,
    diameter: _diameter,
    length
  });
};
var linearInterpolation = (x, xp, yp) => {
  if (xp.length !== yp.length) {
    throw new Error("xp and yp lists must have the same length");
  }
  if (xp.length === 0) {
    if (x.length > 0) {
      throw new Error(
        "Cannot interpolate with empty reference points (xp, yp) when x is not empty."
      );
    }
    return [];
  }
  const y = [];
  for (const xi of x) {
    if (xi <= xp[0]) {
      y.push(yp[0]);
    } else if (xi >= xp[xp.length - 1]) {
      y.push(yp[yp.length - 1]);
    } else {
      let left = 0;
      let right = xp.length - 1;
      while (left < right - 1) {
        const mid = Math.floor((left + right) / 2);
        if (xi < xp[mid]) {
          right = mid;
        } else {
          left = mid;
        }
      }
      const slope = (yp[right] - yp[left]) / (xp[right] - xp[left]);
      y.push(yp[left] + slope * (xi - xp[left]));
    }
  }
  return y;
};

// src/exceptions.ts
var UnitTypeError = class extends TypeError {
  constructor(message) {
    super(message);
    this.name = "UnitTypeError";
  }
};
var UnitConversionError = class extends UnitTypeError {
  constructor(message) {
    super(message);
    this.name = "UnitConversionError";
  }
};
var UnitAliasError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "UnitAliasError";
  }
};
var SolverRuntimeError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "SolverRuntimeError";
  }
};
var ZeroFindingError = class extends SolverRuntimeError {
  /**
   * @param zeroFindingError - Error magnitude in feet
   * @param iterationsCount - Number of iterations performed
   * @param lastBarrelElevation - Last computed barrel elevation (Angular instance)
   * @param reason - Specific reason for failure
   */
  constructor(zeroFindingError, iterationsCount, lastBarrelElevation, reason = "") {
    let message = `Vertical error ${zeroFindingError} feet with ${lastBarrelElevation} elevation, after ${iterationsCount} iterations.`;
    if (reason) {
      message = `${reason}. ${message}`;
    }
    super(message);
    this.name = "ZeroFindingError";
    this.zeroFindingError = zeroFindingError;
    this.iterationsCount = iterationsCount;
    this.lastBarrelElevation = lastBarrelElevation;
    this.reason = reason;
  }
};
ZeroFindingError.DISTANCE_NON_CONVERGENT = "Distance non-convergent";
ZeroFindingError.ERROR_NON_CONVERGENT = "Error non-convergent";
var RangeError = class extends SolverRuntimeError {
  /**
   * @param reason - The error reason
   * @param ranges - The trajectory data before the exception occurred
   */
  constructor(reason, ranges) {
    let message = `Max range not reached: (${reason})`;
    let lastDistance = null;
    if (ranges.length > 0) {
      lastDistance = ranges[ranges.length - 1].distance;
      message += `, last distance: ${lastDistance}`;
    }
    super(message);
    this.name = "RangeError";
    this.reason = reason;
    this.incompleteTrajectory = ranges;
    this.lastDistance = lastDistance;
  }
};
RangeError.MinimumVelocityReached = "Minimum velocity reached";
RangeError.MaximumDropReached = "Maximum drop reached";
RangeError.MinimumAltitudeReached = "Minimum altitude reached";
var OutOfRangeError = class extends SolverRuntimeError {
  /**
   * @param requestedDistance - The distance that was requested
   * @param maxRange - Maximum achievable range (optional)
   * @param lookAngle - Look angle for the shot (optional)
   * @param note - Additional note (optional)
   */
  constructor(requestedDistance, maxRange, lookAngle, note = "") {
    let message = `Requested distance ${requestedDistance}`;
    if (maxRange !== void 0) {
      message += ` exceeds maximum possible range ${maxRange.foot} feet`;
    }
    if (lookAngle !== void 0 && lookAngle.rawValue) {
      message += ` with look-angle ${lookAngle.rad} rad`;
    }
    if (note) {
      message += `. ${note}`;
    }
    super(message);
    this.name = "OutOfRangeError";
    this.requestedDistance = requestedDistance;
    this.maxRange = maxRange;
    this.lookAngle = lookAngle;
  }
};
var InterceptionError = class extends SolverRuntimeError {
  /**
   * @param message - Error message
   * @param lastData - Tuple of [BaseTrajData, TrajectoryData]
   */
  constructor(message, lastData) {
    super(message);
    this.name = "InterceptionError";
    this.lastData = lastData;
  }
};

// src/munition.ts
var Weapon = class {
  /**
   * Initializes a new instance of the Weapon class.
   * @param {Object} options - Parameters for initializing the weapon.
   * @param {number | Distance} [options.sightHeight=undefined] - Height of the sight above the bore axis.
   * @param {number | Distance} [options.twist=undefined] - The twist rate of the barrel.
   * @param {number | Angular} [options.zeroElevation=undefined] - The look angle for the zero distance.
   */
  constructor({
    sightHeight = void 0,
    twist = void 0,
    zeroElevation = void 0
  } = {}) {
    this.sightHeight = unitTypeCoerce(sightHeight ?? 0, Distance, preferredUnits.sight_height);
    this.twist = unitTypeCoerce(twist ?? 0, Distance, preferredUnits.twist);
    this.zeroElevation = unitTypeCoerce(zeroElevation ?? 0, Angular, preferredUnits.angular);
  }
};
var Ammo = class {
  /**
   * Creates an instance of Ammo with specified properties.
   * @param {Object} options - Parameters for initializing the Ammo instance.
   * @param {DragModel} options.dm - Drag model instance.
   * @param {number | Velocity} options.mv - Velocity value.
   * @param {number} [options.tempModifier=0] - Temperature modifier value. Defaults to 0.
   * @param {number | Temperature} [options.powderTemp=undefined] - Powder temperature value. Defaults to undefined.
   * @param {boolean} [options.usePowderSensitivity=false] - Use powder sensitivity value. Defaults to false.
   */
  constructor({
    dm,
    mv,
    powderTemp = void 0,
    tempModifier = 0,
    usePowderSensitivity = false
  }) {
    this.dm = dm;
    this.mv = unitTypeCoerce(mv ?? 0, Velocity, preferredUnits.velocity);
    this.powderTemp = unitTypeCoerce(
      powderTemp ?? UNew.Celsius(15),
      Temperature,
      preferredUnits.temperature
    );
    this.tempModifier = tempModifier ?? 0;
    this.usePowderSensitivity = usePowderSensitivity;
  }
  /**
   * Calculates the velocity correction based on the change in temperature and assigns it to the temperature modifier.
   * @param {number | Velocity} otherVelocity - The velocity to compare with.
   * @param {number | Temperature} otherTemperature - The temperature to compare with.
   * @returns {number} - The calculated temperature sensitivity adjustment.
   */
  calcPowderSens(otherVelocity, otherTemperature) {
    const v0 = this.mv.In(Velocity.MPS);
    const t0 = this.powderTemp.In(Temperature.Celsius);
    const v1 = unitTypeCoerce(otherVelocity, Velocity, preferredUnits.velocity).In(
      Velocity.MPS
    );
    const t1 = unitTypeCoerce(otherTemperature, Temperature, preferredUnits.temperature).In(
      Temperature.Celsius
    );
    if (v0 <= 0 || v1 <= 0) {
      throw new Error("calcPowderSens requires positive muzzle velocities");
    }
    const vDelta = Math.abs(v0 - v1);
    const tDelta = Math.abs(t0 - t1);
    const vLower = v1 < v0 ? v1 : v0;
    if (vDelta === 0 || tDelta === 0) {
      throw new Error(
        "Temperature modifier error, other velocity and temperature can't be same as default"
      );
    }
    this.tempModifier = vDelta / tDelta * (15 / vLower);
    return this.tempModifier;
  }
  /**
   * Calculates the muzzle velocity at a given temperature based on the temperature modifier.
   * @param {number | Temperature} currentTemp - The current temperature for which to calculate the velocity.
   * @returns {Velocity} - The calculated muzzle velocity at the specified temperature.
   */
  getVelocityForTemp(currentTemp) {
    if (!this.usePowderSensitivity) {
      return this.mv;
    }
    const v0 = this.mv.In(Velocity.MPS);
    if (!isFinite(v0)) {
      return UNew.MPS(0);
    }
    const t0 = this.powderTemp.In(Temperature.Celsius);
    const t1 = unitTypeCoerce(currentTemp, Temperature, preferredUnits.temperature).In(
      Temperature.Celsius
    );
    const tDelta = t1 - t0;
    const muzzleVelocity = this.tempModifier / (15 / v0) * tDelta + v0;
    return UNew.MPS(muzzleVelocity);
  }
};

// src/trajectory_data.ts
var trajFlagNames = {
  [0 /* NONE */]: "NONE",
  [1 /* ZERO_UP */]: "ZERO_UP",
  [2 /* ZERO_DOWN */]: "ZERO_DOWN",
  [3 /* ZERO */]: "ZERO",
  [4 /* MACH */]: "MACH",
  [8 /* RANGE */]: "RANGE",
  [16 /* APEX */]: "APEX",
  [31 /* ALL */]: "ALL",
  [32 /* MRT */]: "MRT"
};
var trajFlagName = (value) => {
  if (Object.prototype.hasOwnProperty.call(trajFlagNames, value)) {
    return trajFlagNames[value];
  }
  let parts = [];
  for (const [bitStr, name] of Object.entries(trajFlagNames)) {
    const bit = Number(bitStr);
    if (bit !== 0 && (value & bit) === bit) {
      parts.push(name);
    }
  }
  if ((value & 1 /* ZERO_UP */) === 1 /* ZERO_UP */ && (value & 2 /* ZERO_DOWN */) === 2 /* ZERO_DOWN */) {
    parts = parts.filter((part) => part !== "ZERO_UP" && part !== "ZERO_DOWN");
    if (!parts.includes("ZERO")) {
      parts.push("ZERO");
    }
  }
  parts.sort();
  return parts.length > 0 ? parts.join("|") : "UNKNOWN";
};
var TrajectoryData = class _TrajectoryData2 {
  /**
   * Represents data related to a trajectory calculation.
   * This class is used solely as a return value from trajectory calculations.
   *
   * @class
   * @param {number} time - The time elapsed in the trajectory calculation.
   * @param {Distance} distance - The distance traveled.
   * @param {Velocity} velocity - The velocity at the given point.
   * @param {number} mach - The Mach number at the given point.
   * @param {Distance} height - The height above the reference point.
   * @param {Distance} targetDrop - The drop from the target elevation.
   * @param {Angular} dropAdjustment - Adjustment in angle due to drop.
   * @param {Distance} windage - The amount of windage correction.
   * @param {Angular} windageAdjustment - Adjustment in angle due to windage.
   * @param {Distance} lookDistance - The distance to the target.
   * @param {Angular} angle - The angle of the trajectory.
   * @param {number} densityFactor - Factor representing air density effects.
   * @param {number} drag - The drag experienced by the projectile.
   * @param {Energy} energy - The energy of the projectile.
   * @param {Weight} ogw - The optimal gun weight.
   * @param {TrajFlag} flag - Flags representing various trajectory characteristics.
   */
  constructor(time, distance, velocity, mach, height, targetDrop, dropAdjustment, windage, windageAdjustment, lookDistance, angle, densityFactor, drag, energy, ogw, flag) {
    this.time = time;
    this.distance = distance;
    this.velocity = velocity;
    this.mach = mach;
    this.height = height;
    this.targetDrop = targetDrop;
    this.dropAdjustment = dropAdjustment;
    this.windage = windage;
    this.windageAdjustment = windageAdjustment;
    this.lookDistance = lookDistance;
    this.angle = angle;
    this.densityFactor = densityFactor;
    this.drag = drag;
    this.energy = energy;
    this.ogw = ogw;
    this.flag = flag;
  }
  // Properties are automatically assigned due to 'readonly' and constructor parameters
  /**
   * Returns an array of numerical values representing the trajectory data in default units.
   *
   * @returns {number[]} An array where each element corresponds to a specific piece of trajectory data
   * converted to default units.
   */
  inDefUnits() {
    return [
      this.time,
      this.distance.In(preferredUnits.distance),
      this.velocity.In(preferredUnits.velocity),
      this.mach,
      this.height.In(preferredUnits.drop),
      // Changed to preferredUnits.drop as per python
      this.targetDrop.In(preferredUnits.drop),
      this.dropAdjustment.In(preferredUnits.adjustment),
      this.windage.In(preferredUnits.drop),
      this.windageAdjustment.In(preferredUnits.adjustment),
      this.lookDistance.In(preferredUnits.distance),
      this.angle.In(preferredUnits.angular),
      this.densityFactor,
      this.drag,
      this.energy.In(preferredUnits.energy),
      this.ogw.In(preferredUnits.ogw),
      this.flag
    ];
  }
  /**
   * Returns an array of strings representing the trajectory data in a formatted manner.
   *
   * @returns {string[]} An array of formatted strings, each representing a piece of trajectory data.
   */
  formatted() {
    function _fmt(value, unit) {
      return `${value.In(unit).toFixed(UnitProps[unit].accuracy)} ${UnitProps[unit].symbol}`;
    }
    return [
      `${this.time.toFixed(3)} s`,
      // Changed to 3 decimal places as per python
      _fmt(this.distance, preferredUnits.distance),
      _fmt(this.velocity, preferredUnits.velocity),
      `${this.mach.toFixed(2)} mach`,
      _fmt(this.height, preferredUnits.drop),
      // Changed to preferredUnits.drop as per python
      _fmt(this.targetDrop, preferredUnits.drop),
      _fmt(this.dropAdjustment, preferredUnits.adjustment),
      _fmt(this.windage, preferredUnits.drop),
      _fmt(this.windageAdjustment, preferredUnits.adjustment),
      _fmt(this.lookDistance, preferredUnits.distance),
      _fmt(this.angle, preferredUnits.angular),
      `${this.densityFactor.toFixed(3)}`,
      `${this.drag.toFixed(3)}`,
      _fmt(this.energy, preferredUnits.energy),
      _fmt(this.ogw, preferredUnits.ogw),
      `${trajFlagName(this.flag)}`
    ];
  }
  static fromWasmTrajectoryData(data) {
    return new _TrajectoryData2(
      data.time,
      UNew.Foot(data.distance_ft),
      UNew.FPS(data.velocity_fps),
      data.mach,
      UNew.Foot(data.height_ft),
      UNew.Foot(data.slant_height_ft),
      UNew.Radian(data.drop_angle_rad),
      UNew.Foot(data.windage_ft),
      UNew.Radian(data.windage_angle_rad),
      UNew.Foot(data.slant_distance_ft),
      UNew.Radian(data.angle_rad),
      data.density_ratio,
      data.drag,
      UNew.FootPound(data.energy_ft_lb),
      UNew.Pound(data.ogw_lb),
      data.flag.value
    );
  }
};
var DangerSpace = class {
  /**
   * Stores the danger space data for a specified distance.
   * ! DATACLASS, USES AS RETURNED VALUE ONLY
   *
   * @param {TrajectoryData} atRange - The trajectory data at the specified range.
   * @param {Distance} targetHeight - The height of the target, or undefined if not applicable.
   * @param {TrajectoryData} begin - The starting trajectory data for the danger space.
   * @param {TrajectoryData} end - The ending trajectory data for the danger space.
   * @param {Angular} lookAngle - The look angle for the danger space, or undefined if not applicable.
   */
  constructor(atRange, targetHeight, begin, end, lookAngle) {
    this.atRange = atRange;
    this.targetHeight = targetHeight;
    this.begin = begin;
    this.end = end;
    this.lookAngle = lookAngle;
  }
  /**
   * Returns a string representation of the DangerSpace object.
   * @returns {string} - A string summarizing the DangerSpace data.
   */
  toString() {
    let str = `Danger space at ${this.atRange.distance.to(preferredUnits.distance)} for ${this.targetHeight.to(preferredUnits.drop)} tall target`;
    if (this.lookAngle.rawValue !== 0) {
      str += ` at ${this.lookAngle.to(Angular.Degree)} look-angle`;
    }
    str += ` ranges from ${this.begin.distance.to(preferredUnits.distance)} to ${this.end.distance.to(preferredUnits.distance)}`;
    return str;
  }
};
var HitResult = class _HitResult {
  constructor(shot, trajectory, extra = false) {
    this.shot = shot;
    this.trajectory = trajectory;
    this.extra = extra;
  }
  /**
   * Returns an iterator for the trajectory data.
   * Allows iterating over the HitResult object directly.
   */
  *[Symbol.iterator]() {
    yield* this.trajectory;
  }
  /**
   * Allows accessing trajectory elements by index.
   * @param {number} index - The index of the element.
   * @returns {TrajectoryData} - Trajectory data at the specified index.
   */
  at(index) {
    return this.trajectory[index];
  }
  _checkExtra() {
    if (!this.extra) {
      throw new Error(
        `${Object.getPrototypeOf(this).constructor.name} has no extra data. Use Calculator.fire(..., extra_data=true)`
      );
    }
  }
  get length() {
    return this.trajectory.length;
  }
  zeros() {
    this._checkExtra();
    const data = this.trajectory.filter((row) => row.flag & 3 /* ZERO */);
    if (data.length < 1) {
      throw new Error("Can't find zero crossing points");
    }
    return data;
  }
  /**
   * Finds the index of the TrajectoryData item closest to the given distance.
   * @param {Distance} distance - The distance to search for.
   * @returns {number} - The index of the closest TrajectoryData item.
   */
  indexAtDistance(distance) {
    const epsilon = 1e-8;
    return this.trajectory.findIndex(
      (item) => item.distance.rawValue >= distance.rawValue - epsilon
    );
  }
  getAtDistance(d) {
    const index = this.indexAtDistance(d);
    if (index < 0) {
      throw new Error(
        `Calculated trajectory doesn't reach requested distance ${d.rawValue}`
        // Changed to d.rawValue for better output
      );
    }
    return this.trajectory[index];
  }
  /**
   * Calculates the danger space for the specified range and target height.
   * @param {number | Distance} atRange - The distance at which to calculate the danger space.
   * @param {number | Distance} targetHeight - The height of the target.
   * @param {number | Angular} lookAngle - The look angle for the calculation.
   * @returns {DangerSpace} - The computed DangerSpace object.
   */
  dangerSpace(atRange, targetHeight, lookAngle) {
    this._checkExtra();
    const _atRange = unitTypeCoerce(atRange, Distance, preferredUnits.distance);
    const _targetHeight = unitTypeCoerce(
      targetHeight,
      Distance,
      preferredUnits.distance
    );
    const _targetHeightHalf = _targetHeight.rawValue / 2;
    const _lookAngle = lookAngle === void 0 ? this.shot.lookAngle : unitTypeCoerce(lookAngle, Angular, preferredUnits.angular);
    const index = this.indexAtDistance(_atRange);
    if (index < 0) {
      throw new Error(
        `Calculated trajectory doesn't reach requested distance ${_atRange.rawValue}`
      );
    }
    const findBeginDanger = (rowNum) => {
      const centerRow = this.trajectory[rowNum];
      for (let i = rowNum - 1; i >= 0; i--) {
        const primeRow = this.trajectory[i];
        if (primeRow.targetDrop.rawValue - centerRow.targetDrop.rawValue >= _targetHeightHalf) {
          return primeRow;
        }
      }
      return this.trajectory[0];
    };
    const findEndDanger = (rowNum) => {
      const centerRow = this.trajectory[rowNum];
      for (let i = rowNum + 1; i < this.trajectory.length; i++) {
        const primeRow = this.trajectory[i];
        if (centerRow.targetDrop.rawValue - primeRow.targetDrop.rawValue >= _targetHeightHalf) {
          return primeRow;
        }
      }
      return this.trajectory[this.trajectory.length - 1];
    };
    return new DangerSpace(
      this.trajectory[index],
      _targetHeight,
      findBeginDanger(index),
      findEndDanger(index),
      _lookAngle
    );
  }
  static fromWasmHitOutput(shot, hit, extra_data) {
    return new _HitResult(
      shot,
      hit.trajectory.map((item) => TrajectoryData.fromWasmTrajectoryData(item)),
      extra_data
      // FIXME
    );
  }
};

// src/shot.ts
var Shot = class {
  /**
   * Creates an instance of the Shot class.
   *
   * @param options - The parameters for initializing the shot data
   * @param options.ammo - The ammunition used for the shot
   * @param options.weapon - The weapon used for the shot
   * @param options.atmo - Atmospheric conditions affecting the shot (defaults to ICAO standard)
   * @param options.winds - List of wind conditions affecting the shot
   * @param options.lookAngle - Angle of sight line relative to horizontal.
   *        If `lookAngle != 0` then target in crosshairs will be at different altitude:
   *        - Horizontal distance X = cos(lookAngle) * target_distance
   *        - Vertical distance Y = sin(lookAngle) * target_distance
   * @param options.relativeAngle - Elevation adjustment ("hold") added to `weapon.zeroElevation`
   * @param options.cantAngle - Tilt of gun from vertical. Shifts barrel elevation
   *        from vertical plane into horizontal plane by `sin(cantAngle)`
   * @param options.azimuthDeg - Azimuth of shooting direction in degrees [0, 360). Optional, for Coriolis effects.
   *        Geographic bearing: 0 = North, 90 = East, 180 = South, 270 = West
   * @param options.latitudeDeg - Latitude of shooting location in degrees [-90, 90]. Optional, for Coriolis effects
   *
   * @example
   * ```typescript
   * const shot = new Shot({
   *     ammo: new Ammo(...),
   *     weapon: new Weapon(...),
   *     lookAngle: UNew.Degree(5),
   *     azimuthDeg: 90,
   *     latitudeDeg: 45
   * });
   * ```
   */
  constructor({
    weapon,
    ammo,
    lookAngle = void 0,
    relativeAngle = void 0,
    cantAngle = void 0,
    atmo = void 0,
    winds = void 0,
    azimuthDeg = void 0,
    latitudeDeg = void 0
  }) {
    this.lookAngle = unitTypeCoerce(lookAngle ?? 0, Angular, preferredUnits.angular);
    this.relativeAngle = unitTypeCoerce(relativeAngle ?? 0, Angular, preferredUnits.angular);
    this.cantAngle = unitTypeCoerce(cantAngle ?? 0, Angular, preferredUnits.angular);
    this.weapon = weapon;
    this.ammo = ammo;
    this.atmo = atmo ?? Atmo.icao();
    this.winds = winds;
    this.azimuthDeg = azimuthDeg;
    this.latitudeDeg = latitudeDeg;
  }
  /**
   * Azimuth of the shooting direction in degrees [0, 360).
   *
   * Should be *geographic* bearing where 0 = North, 90 = East, 180 = South, 270 = West.
   * Difference from *magnetic* bearing is usually negligible.
   * Optional, used for Coriolis effects.
   */
  get azimuthDeg() {
    return this._azimuthDeg;
  }
  set azimuthDeg(value) {
    if (value !== void 0 && (value < 0 || value >= 360)) {
      throw new Error("Azimuth must be in range [0, 360).");
    }
    this._azimuthDeg = value;
  }
  /**
   * Latitude of the shooting location in degrees [-90, 90].
   *
   * Optional, used for Coriolis effects.
   */
  get latitudeDeg() {
    return this._latitudeDeg;
  }
  set latitudeDeg(value) {
    if (value !== void 0 && (value < -90 || value > 90)) {
      throw new Error("Latitude must be in range [-90, 90].");
    }
    this._latitudeDeg = value;
  }
  /**
   * Sets wind conditions affecting the shot.
   * Winds will be automatically sorted by `untilDistance` when retrieved.
   */
  set winds(winds) {
    this._winds = winds;
  }
  /**
   * Gets wind conditions sorted by `untilDistance`.
   *
   * @returns Array of Wind instances sorted by until_distance, or empty array if none set
   */
  get winds() {
    return (this._winds ?? []).slice().sort((a, b) => a.untilDistance.rawValue - b.untilDistance.rawValue);
  }
  /**
   * Gets the horizontal angle of the barrel relative to the sight line.
   *
   * The azimuth angle is calculated based on the cant angle and the relative angle of the
   * weapon. The result is converted to radians.
   *
   * Calculated as: `sin(cantAngle) * (weapon.zeroElevation + relativeAngle)`
   *
   * @returns Angular value representing horizontal barrel angle
   */
  get barrelAzimuth() {
    return UNew.Radian(
      Math.sin(this.cantAngle.rad) * (this.weapon.zeroElevation.rad + this.relativeAngle.rad)
    );
  }
  /**
   * Gets the barrel elevation in the vertical plane from the horizontal.
   *
   * The elevation is calculated by adding the look angle to the vertical component of
   * the barrel's elevation based on the cant angle and relative angle. The result is
   * converted to radians.
   *
   * Calculated as: `lookAngle + cos(cantAngle) * (weapon.zeroElevation + relativeAngle)`
   *
   * @returns Angular value representing vertical barrel elevation
   */
  get barrelElevation() {
    return UNew.Radian(
      this.lookAngle.rad + Math.cos(this.cantAngle.rad) * (this.weapon.zeroElevation.rad + this.relativeAngle.rad)
    );
  }
  /**
   * Sets barrel elevation by adjusting `relativeAngle`.
   *
   * This does not change `weapon.zeroElevation`.
   * Calculates required `relativeAngle` to achieve desired barrel elevation.
   *
   * @param value - Desired barrel elevation in vertical plane from horizontal
   */
  set barrelElevation(value) {
    this.relativeAngle = UNew.Radian(
      unitTypeCoerce(value, Angular, preferredUnits.angular).rad - this.lookAngle.rad - Math.cos(this.cantAngle.rad) * this.weapon.zeroElevation.rad
    );
  }
  /**
   * Synonym for `lookAngle`.
   *
   * @returns Angle of sight line relative to horizontal
   */
  get slantAngle() {
    return this.lookAngle;
  }
  set slantAngle(value) {
    this.lookAngle = unitTypeCoerce(value, Angular, preferredUnits.angular);
  }
  /**
   * Converts Shot instance to WASM-compatible input format.
   *
   * Serializes all shot parameters into the format required by the WASM ballistic calculator.
   * Includes ballistic coefficient, angles, atmospheric conditions, winds, and calculation config.
   *
   * @param method - Integration method to use (RK4 or EULER)
   * @param config - Optional partial configuration to override defaults
   * @returns WASM-compatible shot properties object
   *
   * @example
   * ```typescript
   * const wasmInput = shot.toWasmShotPropsInput(IntegrationMethod.RK4, {
   *     maxIterations: 50,
   *     minimumVelocity: 100.0
   * });
   * ```
   */
  toWasmShotProps(method, config) {
    const muzzle_velocity_fps = this.ammo.getVelocityForTemp(this.atmo.powderTemp).fps;
    return {
      // Ballistic properties
      bc: this.ammo.dm.bc,
      drag_table: this.ammo.dm.dragTable,
      weight_grain: this.ammo.dm.weight.grain,
      diameter_inch: this.ammo.dm.diameter.inch,
      length_inch: this.ammo.dm.length.inch,
      // Velocity (adjusted for powder temperature)
      muzzle_velocity_fps,
      // Angles
      look_angle_rad: this.lookAngle.rad,
      barrel_elevation_rad: this.barrelElevation.rad,
      barrel_azimuth_rad: this.barrelAzimuth.rad,
      cant_angle_rad: this.cantAngle.rad,
      // Weapon properties
      sight_height_ft: this.weapon.sightHeight.foot,
      twist_inch: this.weapon.twist.inch,
      // Environmental conditions
      alt0_ft: this.atmo.altitude.foot,
      atmo: this.atmo.toWasmAtmo(),
      // winds: this.winds.map(wind => wind.toWasmWind()),
      winds: this.winds.map((wind) => wind.toWasmWind()),
      // Coriolis
      coriolis: new Coriolis({
        latitudeDeg: this.latitudeDeg,
        azimuthDeg: this.azimuthDeg,
        muzzleVelocityFps: muzzle_velocity_fps
      }).toWasmCoriolis(),
      // Calculation options
      method,
      config
    };
  }
};

// src/interface.ts
var cZeroFindingAccuracy = 5e-6;
var cMaxIterations = 40;
var cMinimumAltitude = -1500;
var cMaximumDrop = -1e4;
var cMinimumVelocity = 50;
var cGravityConstant = -cGravityImperial;
var cStepMultiplier = 1;
var DEFAULT_CONFIG = {
  zeroFindingAccuracy: cZeroFindingAccuracy,
  maxIterations: cMaxIterations,
  minimumAltitude: cMinimumAltitude,
  maximumDrop: cMaximumDrop,
  minimumVelocity: cMinimumVelocity,
  gravityConstant: cGravityConstant,
  stepMultiplier: cStepMultiplier
};
var Calculator = class {
  /**
   * Creates an instance of Calculator.
   *
   * @param options Configuration options
   * @param options.method The integration method to use
   * @param options.config The calculation configuration
   */
  constructor(options) {
    options = options ?? {};
    this.method = options.method ?? IntegrationMethod.RK4;
    this.config = { ...DEFAULT_CONFIG, ...options.config ?? {} };
  }
  /**
   * Calculates the barrel elevation required to hit a target at a specified distance.
   *
   * This method automatically initializes the WASM module on first call.
   *
   * @param shot The shot parameters including weapon and ammo data
   * @param targetDistance The distance to the target (number in default units or Distance object)
   * @returns The required barrel elevation
   *
   * @example
   * ```typescript
   * const calc = new Calculator();
   * const elevation = await calc.barrelElevationForTarget(shot, 1000);
   * console.log(`Elevation: ${elevation.In(Angular.Radian)} rad`);
   * ```
   */
  async barrelElevationForTarget(shot, targetDistance) {
    const _targetDistance = unitTypeCoerce(targetDistance, Distance, preferredUnits.distance);
    const engine = await loadBclibc();
    const totalElevationRad = engine.findZeroAngle(
      shot.toWasmShotProps(this.method, this.config),
      _targetDistance.foot
    );
    return UNew.Radian(totalElevationRad - shot.lookAngle.rad);
  }
  /**
   * Sets the weapon's zero elevation based on the specified zero distance.
   *
   * This method automatically initializes the WASM module on first call.
   * Modifies the shot.weapon.zeroElevation property.
   *
   * @param shot The shot parameters including weapon and ammo data
   * @param zeroDistance The distance at which the weapon should be zeroed
   * @returns The new zero elevation of the weapon
   *
   * @example
   * ```typescript
   * const calc = new Calculator();
   * const zero = await calc.setWeaponZero(shot, 100);
   * console.log(`Zero elevation: ${zero.In(Angular.MOA)} MOA`);
   * ```
   */
  async setWeaponZero(shot, zeroDistance) {
    shot.weapon.zeroElevation = await this.barrelElevationForTarget(shot, zeroDistance);
    return shot.weapon.zeroElevation;
  }
  /**
   * Fires a shot and calculates the complete trajectory.
   *
   * This method automatically initializes the WASM module on first call.
   *
   * @param options Parameters for the shot and trajectory calculation
   * @param options.shot The shot parameters including weapon and ammo data
   * @param options.trajectoryRange The total range of the trajectory
   * @param options.trajectoryStep The step size for trajectory calculations (default: range/10)
   * @param options.timeStep Time step for integration (default: 0)
   * @param options.filterFlags Trajectory data filter flags (default: ALL)
   * @param options.denseOutput Whether to generate dense output (default: false)
   * @returns The complete trajectory result including hit data
   *
   * @example
   * ```typescript
   * const calc = new Calculator();
   *
   * // Simple trajectory
   * const result = await calc.fire({
   *     shot,
   *     trajectoryRange: 1000,
   *     trajectoryStep: 10
   * });
   *
   * // With all options
   * const result = await calc.fire({
   *     shot,
   *     trajectoryRange: 2000,
   *     trajectoryStep: 25,
   *     timeStep: 0.01,
   *     filterFlags: engine._TrajFlag.BASIC,
   *     denseOutput: true
   * });
   *
   * console.log(`Impact velocity: ${result.trajectory[result.trajectory.length - 1].velocity}`);
   * ```
   */
  async fire({
    shot,
    trajectoryRange,
    trajectoryStep = 0,
    timeStep = 0,
    filterFlags = 8 /* RANGE */,
    denseOutput = false
  }) {
    const _trajectoryRange = unitTypeCoerce(
      trajectoryRange,
      Distance,
      preferredUnits.distance
    );
    let step;
    if (!trajectoryStep) {
      step = UNew.Inch(_trajectoryRange.rawValue / 10);
    } else {
      step = unitTypeCoerce(trajectoryStep, Distance, preferredUnits.distance);
    }
    const engine = await loadBclibc();
    const request = {
      range_limit_ft: _trajectoryRange.foot,
      range_step_ft: step.foot,
      time_step: timeStep,
      dense_output: denseOutput,
      filter_flags: filterFlags
    };
    const hit_out = engine.integrate(
      shot.toWasmShotProps(this.method, this.config),
      request
    );
    return HitResult.fromWasmHitOutput(shot, hit_out, Boolean(filterFlags & 31 /* ALL */));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Ammo,
  Angular,
  Atmo,
  BCPoint,
  Calculator,
  Coriolis,
  DEFAULT_CONFIG,
  DangerSpace,
  Dimension,
  Distance,
  DragModel,
  DragModelMultiBC,
  DragTables,
  Energy,
  HitResult,
  IntegrationMethod,
  InterceptionError,
  Measure,
  OutOfRangeError,
  PreferredUnits,
  Pressure,
  RangeError,
  Shot,
  SolverRuntimeError,
  Temperature,
  TrajFlag,
  TrajectoryData,
  UNew,
  Unit,
  UnitAliasError,
  UnitConversionError,
  UnitProps,
  UnitTypeError,
  Vacuum,
  Velocity,
  Weapon,
  Weight,
  Wind,
  ZeroFindingError,
  cA0,
  cA1,
  cA2,
  cA3,
  cA4,
  cA5,
  cDegreesCtoK,
  cDegreesFtoR,
  cDensityImperialToMetric,
  cEarthAngularVelocityRadS,
  cGravityConstant,
  cGravityImperial,
  cLapseRateImperial,
  cLapseRateKperFoot,
  cLapseRateMetric,
  cLowestTempF,
  cMaxIterations,
  cMaxWindDistanceFeet,
  cMaximumDrop,
  cMinimumAltitude,
  cMinimumVelocity,
  cPressureExponent,
  cSpeedOfSoundImperial,
  cSpeedOfSoundMetric,
  cStandardDensity,
  cStandardDensityMetric,
  cStandardHumidity,
  cStandardPressure,
  cStandardPressureMetric,
  cStandardTemperatureC,
  cStandardTemperatureF,
  cStepMultiplier,
  cZeroFindingAccuracy,
  loadBclibc,
  makeDataPoints,
  preferredUnits,
  trajFlagName,
  trajFlagNames,
  unitTypeCoerce
});
