/**
 *  測試循環參照
 */
import createType from "../../src";
import schema from "../schema/a";
import BType from "./BType";
import {
  GraphQLObjectType
} from "graphql"

const impl = createType({
  name: "AType",
  schema,
  exclude: ["_id"],
  class: "GraphQLInterfaceType"
})

export default new GraphQLObjectType({
  name: "asdasdasd",
  interfaces: impl,

})
