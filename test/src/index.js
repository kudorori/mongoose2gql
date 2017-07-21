import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import query from "../query";
import mutation from "../mutation";
import {
  GraphQLSchema,
  GraphQLObjectType
} from "graphql"
const PORT = 3000;

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "rootQuery",
    fields: query
  }),
  mutation: new GraphQLObjectType({
    name: "rootMutation",
    fields: mutation
  })
})



var app = express();
app.post('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphql', bodyParser.json(), graphiqlExpress({
  endpointURL: "/graphql"
}));
app.listen(PORT);
