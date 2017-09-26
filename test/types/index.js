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

export default /* GraphQL */`
  ${aType}
  ${bType}
  type Query {
    default: String
  }
`;
