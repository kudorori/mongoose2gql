import R from "ramda";
export default ignoreObjs => R.map(R.when(
  R.pipe(
    R.prop("name"),
    R.has(R.__, ignoreObjs)
  ),
  ({name, properties, ...props}) => {
    return {
      ...props,
      name,
      properties: R.omit(ignoreObjs[name], properties)
    }
  }
))
