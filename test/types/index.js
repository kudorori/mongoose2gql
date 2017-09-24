import a from "../schema/a";
import b from "../schema/b";
import createType from "../../src";

const aType = createType({
  schema: a,
  name: "a",
  description: "123123",
  ignore: () => ({

  }),
  extend: () => ({
    a: {
      bbb: "b"
    }
  })
});
const bType = createType({
  schema: b,
  name: 'b'
});

const str = `
  ${aType}
  ${bType}
`

// console.log(str)

export default str;
