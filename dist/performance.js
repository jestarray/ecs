"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/*global global */

var perf = null,
    start = Date.now();

// use global browser performance module
// for node create a polyfill
if (!global) {
  exports.performance = perf = window.performance;
} else {
  exports.performance = perf = {
    now: function now() {
      return Date.now() - start;
    }
  };
}

exports.performance = perf;