import a from "../schema/a";
import b from "../schema/b";
import createType, { mergeType } from "../../src";

const aType = createType({
  schema: a,
  name: "a",
  // description: "123123",
  ignore: () => ({

  }),
  extend: () => ({

  })
});
const bType = createType({
  schema: b,
  name: 'b'
});


const type1 = `
  
  # Description
  type Query {
    me: Me
  }
  type Me {
    me1: String
  }
`

const type2 = `
  type Query{
    me: Me
  }
  type Me {
    me2: String
  }
`

const schema = mergeType([type1, type2]);
// console.log(schema);
export default schema;
