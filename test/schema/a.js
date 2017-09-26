/**
 * 故意用個滿深的樹
 * 並且將B引用進來
 */
import mongoose from "mongoose"
import {
  GraphQLFloat
} from "graphql"
import b from "./b";

let Schema = mongoose.Schema;
export default new Schema({
  parent: {
    type: Schema.ObjectId,
    ref: "cms/page"
  },
  header: {
    type: Schema.ObjectId,
    ref: "cms/header"
  },
  icon: String,
  class: String,
  title: String,
  open: String,
  subTitle: String,
  content: String,
  redirect: {
    pathname: String,
    query: [[String]]
  },
  alias: String,
  group: String,
  display: {
    type: Boolean,
    default: true
  },
  plugins: [{
    kind: String,
    item: {
      type: Schema.ObjectId,
      refPath: "plugins.kind"
    }
  }]
}, {
  timestamps: true
});


/**
 * type b {
 *  title: String
 * }
 *
 * type * {
 *  stringType: String!,
 *  numberType: Int,
 *  subDocument: b,
 *  array: [String!]
 * }
 */
