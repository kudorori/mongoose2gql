import R from "ramda";
import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLUnionType,
  GraphQLNonNull
} from 'graphql';


const CLS = {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLInterfaceType
}


const defaultArgs = {
  name: "",
  class: "GraphQLObjectType",
  description: "description",
  extends: () => ({}),
  exclude: ["__v"]
}
const createType = (_args) => {
  const args = R.mergeDeepWithKey((k, l, r) => k == 'exclude' ? R.concat(l, r) : r, defaultArgs, _args);
  const resType = ({required = false}) => type => {
    if(required) {
      return { type: new GraphQLNonNull(type) }
    }
    return { type }
  }

  const toType = name => ({enumValues, instance, options, caster, schema}) => {

    const res = resType(options);
    if(options.graphql != undefined){
      return res(options.graphql);
    }
    switch(instance){
      case "String":
        return res(GraphQLString);
      break;
      case "ObjectID":
        return res(GraphQLString);
        break;
      case "Date":
        return res(GraphQLString);
        break;
      case "Mixed":
        return res(GraphQLString);
        break;
      case "Boolean":
        return res(GraphQLBoolean);
        break;
      case "Buffer":
        return res(GraphQLBoolean);
        break;
      case "Number":
        return res(GraphQLInt);
        break;
      case "Array":
        if(schema != undefined){
          return res(new GraphQLList(createType(Object.assign({}, args, {
            schema,
            name: `${args.name}_${name}`,
            extends: () => ({}),
          }))));
        }
        return res(new GraphQLList(toType(`${args.name}_SUB_ARRAY_${name}`)(caster).type));
        break;
      case "Embedded":
        return res(createType(Object.assign({}, args, {
          schema,
          name: `${args.name}_${name}`,
          extends: () => ({}),
        })))
        break;
    }
  }

  const mapToType = R.pipe(
    R.propOr({}, "paths"),
    R.toPairs,
    R.partition(R.pipe(
      R.prop(0),
      R.test(/\./),
      R.not
    )),
    R.adjust(R.pipe(
      R.map(([key, schema]) => [key, toType(key)(schema)]),
      R.fromPairs
    ), 0),
    R.adjust(R.pipe(
      R.reduce((curr, [key, schema]) => {
        let path = R.pipe(
          R.split("."),
          R.splitAt("1"),
          R.adjust(R.join("."), 1),
          R.intersperse(["schema", "paths"]),
          R.flatten,
        )(key)
        return R.assocPath(path, schema, curr);
      }, {}),
      R.toPairs,
      R.map(([key, schema]) => ([key, Object.assign({}, schema, {
        instance: "Embedded",
        options: {}
      })])),
      R.map(([key, schema]) => [key, toType(key)(schema)]),
      R.fromPairs,
    ), 1),
    R.mergeAll,
  )

  let fields = R.pipe(
    mapToType,
    R.omit(args.exclude)
  )(args.schema)
  return new CLS[args.class]({
    name: args.name,
    description: args.description,
    fields: () => Object.assign({}, fields, args.extends()),
  });

}

export default createType
