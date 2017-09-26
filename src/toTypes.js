import R from "ramda";

const firstUpper = R.pipe(
  R.adjust(R.toUpper, 0),
  R.join('')
)

const array2Type = (result, name, key) => R.pipe(
  R.head,
  R.cond([
    [ R.is(Array), item => `${array2Type(name, key)(item).name}` ],
    [ R.is(Object), item => {
      const objects = toTypes(`${name}${firstUpper(key)}`)(item);
      result = R.concat(result, objects);
      return R.pipe(
        R.last,
        R.prop("name")
      )(objects)
    }],
    [ R.T, item => `${item}`]
  ]),
  name => {
    return {
      name: `[${name}]`,
      result
    };
  }
)

const toTypes = (name, desc = "") => obj => {
  let result = [];
  const o = R.pipe(
    R.mapObjIndexed((item, key) => R.cond([
      [R.is(Array), item => {
        const objects = array2Type([], name, key)(item);
        result = R.concat(result, objects.result);
        return objects.name;
      }],
      [R.is(Object), item => {
        const objects = toTypes(`${name}${firstUpper(key)}`)(item);
        result = R.concat(result, objects);
        return R.pipe(
          R.last,
          R.prop("name")
        )(objects)
      }],
      [R.T, R.identity]
    ])(item)),
    R.objOf("properties"),
    R.assoc("name", name),
    R.assoc("description", desc)
  )(obj);
  return [...result, o]
}

export default toTypes;
