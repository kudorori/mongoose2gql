"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _graphql = require("graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLS = {
  GraphQLObjectType: _graphql.GraphQLObjectType,
  GraphQLInputObjectType: _graphql.GraphQLInputObjectType
};

var createArrayType = function createArrayType() {};

var defaultArgs = {
  name: "",
  class: "GraphQLObjectType",
  description: "description",
  extends: function _extends() {
    return {};
  },
  exclude: ["__v"]
};
var createType = function createType(_args) {
  var args = _ramda2.default.mergeDeepWithKey(function (k, l, r) {
    return k == 'exclude' ? _ramda2.default.concat(l, r) : r;
  }, defaultArgs, _args);
  var resType = function resType(_ref) {
    var _ref$required = _ref.required,
        required = _ref$required === undefined ? false : _ref$required;
    return function (type) {
      if (required) {
        return { type: new _graphql.GraphQLNonNull(type) };
      }
      return { type: type };
    };
  };

  var toType = function toType(name) {
    return function (_ref2) {
      var enumValues = _ref2.enumValues,
          instance = _ref2.instance,
          options = _ref2.options,
          caster = _ref2.caster,
          schema = _ref2.schema;


      var res = resType(options);
      switch (instance) {
        case "String":
          return res(_graphql.GraphQLString);
          break;
        case "ObjectID":
          return res(_graphql.GraphQLString);
          break;
        case "Date":
          return res(_graphql.GraphQLString);
          break;
        case "Mixed":
          return res(_graphql.GraphQLString);
          break;
        case "Boolean":
          return res(_graphql.GraphQLBoolean);
          break;
        case "Buffer":
          return res(_graphql.GraphQLBoolean);
          break;
        case "Number":
          return res(_graphql.GraphQLInt);
          break;
        case "Array":
          if (schema != undefined) {
            return res(new _graphql.GraphQLList(createType(Object.assign({}, args, {
              schema: schema,
              name: args.name + "_" + name,
              extends: function _extends() {
                return {};
              }
            }))));
          }
          return res(new _graphql.GraphQLList(toType(args.name + "_SUB_ARRAY_" + name)(caster).type));
          break;
        case "Embedded":
          return res(createType(Object.assign({}, args, {
            schema: schema,
            name: args.name + "_" + name,
            extends: function _extends() {
              return {};
            }
          })));
          break;
      }
    };
  };

  var mapToType = _ramda2.default.pipe(_ramda2.default.propOr({}, "paths"), _ramda2.default.toPairs, _ramda2.default.partition(_ramda2.default.pipe(_ramda2.default.prop(0), _ramda2.default.test(/\./), _ramda2.default.not)), _ramda2.default.adjust(_ramda2.default.pipe(_ramda2.default.map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        schema = _ref4[1];

    return [key, toType(key)(schema)];
  }), _ramda2.default.fromPairs), 0), _ramda2.default.adjust(_ramda2.default.pipe(_ramda2.default.reduce(function (curr, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        schema = _ref6[1];

    var path = _ramda2.default.pipe(_ramda2.default.split("."), _ramda2.default.splitAt("1"), _ramda2.default.adjust(_ramda2.default.join("."), 1), _ramda2.default.intersperse(["schema", "paths"]), _ramda2.default.flatten)(key);
    return _ramda2.default.assocPath(path, schema, curr);
  }, {}), _ramda2.default.toPairs, _ramda2.default.map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        schema = _ref8[1];

    return [key, Object.assign({}, schema, {
      instance: "Embedded",
      options: {}
    })];
  }), _ramda2.default.map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        key = _ref10[0],
        schema = _ref10[1];

    return [key, toType(key)(schema)];
  }), _ramda2.default.fromPairs), 1), _ramda2.default.mergeAll);

  var _fields = _ramda2.default.pipe(mapToType, _ramda2.default.omit(args.exclude))(args.schema);
  return new CLS[args.class]({
    name: args.name,
    description: args.description,
    fields: function fields() {
      return Object.assign({}, _fields, args.extends());
    }
  });
};

exports.default = createType;