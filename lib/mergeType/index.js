"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require("graphql");

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = _ramda2.default.tap(console.log);

var getTypeName = _ramda2.default.path(["name", "value"]);

exports.default = function (types) {
  var result = {};
  types.forEach(function (item, idx) {
    var ast = (0, _graphql.parse)(item);
    console.log(ast);
    ast.definitions.forEach(function (definition) {
      var definitionName = getTypeName(definition);
      if (result[definitionName] == undefined) {
        result[definitionName] = definition;
      } else {
        result[definitionName] = _ramda2.default.evolve({
          fields: _ramda2.default.concat(_ramda2.default.__, definition.fields)
        }, result[definitionName]);
      }
    });
  });

  return _ramda2.default.pipe(_ramda2.default.toPairs, _ramda2.default.map(_ramda2.default.prop(1)), _ramda2.default.objOf("definitions"), _ramda2.default.assoc("kind", "Document"), _graphql.print)(result);
};