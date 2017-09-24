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
export default Schema({
  stringType: {
    type: String,
    required: true
  },
  numberType: Number,
  subDocument: {
    type: b,
    required: true
  },
  embed: {
    title: String,
    int: Number
  },
  array: [{
    type: String,
    required: true
  }],
  subArrDoc: [{
    title: {
      type: String,
      required: true
    },
    content: String
  }]
}, {timestamp: true});


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
