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
  username: String,
  password: String,
  image: String,
  name: String,
  // sex: {
  //   type: String,
  //   default: "M",
  //   enum: [
  //     "M",
  //     "F"
  //   ]
  // },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  birthDay: Date,
  description: {
    type: String,
    default: "大家好！請多多指教！"
  },
  city: String,
  area: String,
  address: String,
  role: {
    type: String,
    default: "GENRAL",
    ref: "user/role"
  },
  badge: [String]
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
