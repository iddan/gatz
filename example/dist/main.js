/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleNotFoundError: Module not found: Error: Can't resolve './logo.svg' in '/Users/iddan/gatz/example/pages'\n    at factory.create (/Users/iddan/gatz/node_modules/webpack/lib/Compilation.js:522:10)\n    at factory (/Users/iddan/gatz/node_modules/webpack/lib/NormalModuleFactory.js:358:22)\n    at resolver (/Users/iddan/gatz/node_modules/webpack/lib/NormalModuleFactory.js:118:21)\n    at asyncLib.parallel (/Users/iddan/gatz/node_modules/webpack/lib/NormalModuleFactory.js:198:22)\n    at /Users/iddan/gatz/node_modules/neo-async/async.js:2817:7\n    at /Users/iddan/gatz/node_modules/neo-async/async.js:6783:13\n    at normalResolver.resolve (/Users/iddan/gatz/node_modules/webpack/lib/NormalModuleFactory.js:188:25)\n    at doResolve (/Users/iddan/gatz/node_modules/enhanced-resolve/lib/Resolver.js:181:12)\n    at hook.callAsync (/Users/iddan/gatz/node_modules/enhanced-resolve/lib/Resolver.js:232:5)\n    at _fn0 (eval at create (/Users/iddan/gatz/node_modules/tapable/lib/HookCodeFactory.js:24:12), <anonymous>:15:1)");

/***/ })
/******/ ]);