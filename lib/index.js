"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _mongoose = require("mongoose");

var _tree2Type = require("./tree2Type");

var _tree2Type2 = _interopRequireDefault(_tree2Type);

var _toTypes = require("./toTypes");

var _toTypes2 = _interopRequireDefault(_toTypes);

var _toTypeString = require("./toTypeString");

var _toTypeString2 = _interopRequireDefault(_toTypeString);

var _mergeExtend = require("./mergeExtend");

var _mergeExtend2 = _interopRequireDefault(_mergeExtend);

var _mergeIgnore = require("./mergeIgnore");

var _mergeIgnore2 = _interopRequireDefault(_mergeIgnore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = _ramda2.default.tap(console.log);

//result [type, ... , type]
var createType = function createType(_args) {
  var schema = _args.schema,
      name = _args.name,
      _args$description = _args.description,
      description = _args$description === undefined ? "" : _args$description,
      _args$ignore = _args.ignore,
      ignore = _args$ignore === undefined ? function () {
    return {};
  } : _args$ignore,
      _args$extend = _args.extend,
      extend = _args$extend === undefined ? function () {
    return {};
  } : _args$extend;


  return _ramda2.default.pipe(_tree2Type2.default, (0, _toTypes2.default)(name, description), (0, _mergeIgnore2.default)(ignore()), (0, _mergeExtend2.default)(extend()), _toTypeString2.default)(schema.tree);
};

exports.default = createType;