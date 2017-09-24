import R from "ramda";

const firstUpper = R.pipe(
  R.adjust(R.toUpper, 0),
  R.join('')
)

const toTypes = (name, desc = "") => obj => {
  let result = [];
  const o = R.pipe(
    R.mapObjIndexed((item, key) => R.cond([
      [R.is(Array), R.pipe(
        R.when(
          R.pipe(
            R.head,
            R.is(Object)
          ),
          item => {
            const objects = toTypes(`${name}${firstUpper(key)}`)(item[0]);
            result = R.concat(result, objects);
            return R.pipe(
              R.last,
              R.prop("name"),
              R.of
            )(objects)
          }
        ),
        item => `[${item}]`
      )],
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
