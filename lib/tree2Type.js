"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _mongoose = require("mongoose");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ignore = _ramda2.default.pipe(_ramda2.default.when(_ramda2.default.has("type"), _ramda2.default.prop("type")), _ramda2.default.either(_ramda2.default.is(_mongoose.VirtualType), _ramda2.default.is(_mongoose.Schema), _ramda2.default.equals(_mongoose.VirtualType), _ramda2.default.equals(_mongoose.Schema)), _ramda2.default.not);

var isInstance = function isInstance(is) {
  return _ramda2.default.ifElse(_ramda2.default.has("type"), function (item) {
    return isInstance(is)(item.type);
  }, _ramda2.default.either(_ramda2.default.equals(is), _ramda2.default.is(is)));
};

var resultType = function resultType(type) {
  return _ramda2.default.ifElse(_ramda2.default.has("required"), _ramda2.default.ifElse(_ramda2.default.propEq("required", true), _ramda2.default.always(type + "!"), _ramda2.default.always(type)), _ramda2.default.always(type));
};

var arrayToType = _ramda2.default.pipe(_ramda2.default.head, _ramda2.default.cond([[_ramda2.default.has("type"), function (item) {
  return [Field2Type(item)];
}], [function (item) {
  return typeof item == "function";
}, function (item) {
  return [Field2Type(item)];
}], [_ramda2.default.is(Object), function (item) {
  return [mapType(item)];
}]]));

var Field2Type = _ramda2.default.cond([[isInstance(String), resultType("String")], [isInstance(Number), resultType("Float")], [isInstance(_mongoose.Schema.ObjectId), resultType("String")], [isInstance(Date), resultType("String")], [isInstance(Boolean), resultType("Boolean")], [isInstance(Array), arrayToType], [isInstance(Object), function (item) {
  return mapType(item);
}], [_ramda2.default.T, _ramda2.default.empty]]);

var mapType = _ramda2.default.pipe(_ramda2.default.filter(ignore), _ramda2.default.map(Field2Type), _ramda2.default.filter(_ramda2.default.pipe(_ramda2.default.isEmpty, _ramda2.default.not)));

exports.default = mapType;