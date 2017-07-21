/**
 *  測試循環參照
 */
import createType from "../../src";
import schema from "../schema/a";
import BType from "./BType";

export default createType({
  name: "AType",
  schema,
  extends: () => ({
    BType: {
      type: BType
    }
  })
})
