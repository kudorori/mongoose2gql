"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toTypeString = _ramda2.default.pipe(_ramda2.default.map(_ramda2.default.evolve({
  name: function name(_name) {
    return "type " + _name;
  },
  properties: _ramda2.default.pipe(_ramda2.default.toPairs, _ramda2.default.map(function (arr) {
    return "  " + arr.join(": ");
  }), _ramda2.default.map(function (item) {
    return "" + item;
  }), _ramda2.default.join("\r\n"))
})), _ramda2.default.map(function (_ref) {
  var name = _ref.name,
      properties = _ref.properties,
      description = _ref.description;
  return "\n# " + description + "\n" + name + " {\n" + properties + "\n}\n  ";
}), _ramda2.default.join("\r\n"));

exports.default = toTypeString;