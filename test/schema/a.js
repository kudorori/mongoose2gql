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
  test: [[String]],
  aaa: [{a: String, b:String}]
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
