/**
 * 測試循環參照 + 自我參照
 */
import createType from "../../src";
import schema from "../schema/b";
import AType from "./AType";

const BType = createType({
  name: "BType",
  schema,
  extends: () => ({
    AType: {
      type: AType
    },
    BType: {
      type: BType
    }
  }),
  class: "GraphQLObjectType"
})

export default BType
