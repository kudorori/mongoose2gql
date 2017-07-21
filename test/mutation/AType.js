
import createType from "../../src";
import schema from "../schema/a";

export default createType({
  name: "InputTypeA",
  schema,
  class: "GraphQLInputObjectType"
})
