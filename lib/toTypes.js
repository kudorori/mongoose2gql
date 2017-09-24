"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var firstUpper = _ramda2.default.pipe(_ramda2.default.adjust(_ramda2.default.toUpper, 0), _ramda2.default.join(''));

var toTypes = function toTypes(name) {
  var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return function (obj) {
    var result = [];
    var o = _ramda2.default.pipe(_ramda2.default.mapObjIndexed(function (item, key) {
      return _ramda2.default.cond([[_ramda2.default.is(Array), _ramda2.default.pipe(_ramda2.default.when(_ramda2.default.pipe(_ramda2.default.head, _ramda2.default.is(Object)), function (item) {
        var objects = toTypes("" + name + firstUpper(key))(item[0]);
        result = _ramda2.default.concat(result, objects);
        return _ramda2.default.pipe(_ramda2.default.last, _ramda2.default.prop("name"), _ramda2.default.of)(objects);
      }), function (item) {
        return "[" + item + "]";
      })], [_ramda2.default.is(Object), function (item) {
        var objects = toTypes("" + name + firstUpper(key))(item);
        result = _ramda2.default.concat(result, objects);
        return _ramda2.default.pipe(_ramda2.default.last, _ramda2.default.prop("name"))(objects);
      }], [_ramda2.default.T, _ramda2.default.identity]])(item);
    }), _ramda2.default.objOf("properties"), _ramda2.default.assoc("name", name), _ramda2.default.assoc("description", desc))(obj);
    return [].concat(_toConsumableArray(result), [o]);
  };
};

exports.default = toTypes;