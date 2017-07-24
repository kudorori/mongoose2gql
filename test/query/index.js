import {
  GraphQLEnumType,
  GraphQLInt
} from "graphql";
import AType from "./AType";
import BType from "./BType";
export default {
  AType: {
    type: AType
  },
  BType: {
    type: BType
  },
  enumTest: {
    type: GraphQLInt,
    args: {
      type: {
        type: new GraphQLEnumType({
          name: "EEEE",
          values: {
            VVIP: {value: 0},
            VIP: {value: 1},
            GENERAL: {value: 2}
          }
        })
      }
    },
    resolve: (root, args, ctx) => {
      return args.type;
    }
  }
}
