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
  stringType: String,
  numberType: Number,
  floatType: {
    type: Number,
    graphql: GraphQLFloat
  },
  dateType: Date,
  requiredType: {
    required: true,
    type: String
  },
  arrayTypeString: [String],
  arrayTypeNumber: [Number],
  tree: {
    title: String,
    tree: {
      title: String,
      titleArray: [String],
      titleObject: {
        subTitle: String,
        subsubTitle: String,
        createAt: Date
      }
    }
  },
  EmbeddedB: b,
  EmbeddedBArray: [b],
  __v: Number
}, {timestamp: true});
