import R from "ramda";

const toTypeString = R.pipe(
  R.map(R.evolve({
    name: name => `type ${name}`,
    properties: R.pipe(
      R.toPairs,
      R.map(arr => `  ${arr.join(": ")}`),
      R.map(item => `${item}`),
      R.join("\r\n")
    )
  })),
  R.map(({name, properties, description}) => `
# ${description}
${name} {
${properties}
}
  `),
  R.join("\r\n")
)



export default toTypeString ;
