import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import types from "../types";
import models from "./models";
import { makeExecutableSchema } from 'graphql-tools';
import {
  GraphQLSchema,
  GraphQLObjectType
} from "graphql"
const PORT = 3000;

// const typeDefs =  `
//   ${types}
//   type Query {
//     aList: [a],
//     bList: [b]
//   }
// `
//
// const resolvers = {
//   Query: {}
// }
//
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });



var app = express();
// app.post('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// app.get('/graphql', bodyParser.json(), graphiqlExpress({
//   endpointURL: "/graphql"
// }));
app.listen(PORT);
