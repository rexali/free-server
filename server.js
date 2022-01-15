require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
// read the schema type definition using schema file
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });
// Altrnatively, read the schema type definition without using schema file
// const typeDefs = require("./schema");
const resolvers = require('./resolvers');

// const {client} = require("./db");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV !== 'production',
  apollo: {
    key: process.env.APOLLO_KEY,
  },
  // dataSources:(client)=>{client},
});
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
