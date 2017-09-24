import R from "ramda";
export default extendObjs => R.map(R.when(
  R.pipe(
    R.prop("name"),
    R.has(R.__, extendObjs)
  ),
  ({name, properties, ...props}) => {
    return {
      ...props,
      name,
      properties: R.mergeDeepLeft(extendObjs[name], properties)
    }
  }
))
