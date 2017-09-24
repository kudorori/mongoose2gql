"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (ignoreObjs) {
  return _ramda2.default.map(_ramda2.default.when(_ramda2.default.pipe(_ramda2.default.prop("name"), _ramda2.default.has(_ramda2.default.__, ignoreObjs)), function (_ref) {
    var name = _ref.name,
        properties = _ref.properties,
        props = _objectWithoutProperties(_ref, ["name", "properties"]);

    return _extends({}, props, {
      name: name,
      properties: _ramda2.default.omit(extendObjs[name], properties)
    });
  }));
};