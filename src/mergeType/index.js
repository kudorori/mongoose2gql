import { parse, print } from "graphql";
import R from "ramda";

const log = R.tap(console.log);

const getTypeName = R.path(["name", "value"]);

export default (types) => {
  let result = {};
  types.forEach((item, idx) => {
    const ast = parse(item);
    ast.definitions.forEach((definition) => {
      const definitionName = getTypeName(definition);
      if(result[definitionName] == undefined) {
        result[definitionName] = definition;
      } else {
        result[definitionName] = R.evolve({
          fields: R.pipe(
            R.concat(R.__, definition.fields),
          ),
        }, result[definitionName])
      }
    })
  })

  return R.pipe(
    R.map(R.evolve({
      fields: R.uniqBy(R.path(["name", "value"]))
    })),
    R.toPairs,
    R.map(R.prop(1)),
    R.objOf("definitions"),
    R.assoc("kind", "Document"),
    print
  )(result);
}
