import {
  GraphQLObjectType,
  GraphQLString
} from "graphql"
import AType from "./AType";

export default {
  InputTypeA: {
    type: GraphQLString,
    args: {
      input: {
        type: AType
      }
    },
    resolve: (root, args, ctx) => JSON.stringify(args)
  }
}
