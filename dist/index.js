'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ecs = require('./ecs');

Object.defineProperty(exports, 'ECS', {
  enumerable: true,
  get: function get() {
    return _ecs.ECS;
  }
});

var _system = require('./system');

Object.defineProperty(exports, 'System', {
  enumerable: true,
  get: function get() {
    return _system.System;
  }
});

var _entity = require('./entity');

Object.defineProperty(exports, 'Entity', {
  enumerable: true,
  get: function get() {
    return _entity.Entity;
  }
});