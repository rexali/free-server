require('dotenv').config();
const express = require('express');
const { 
  ApolloServer, 
  gql 
} = require('apollo-server-express');
const fs = require('fs');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

// type definition, Altrnatively, const typeDefs = require("./schema");
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });
// resolvers for the schema query, mutation, subscription
const resolvers = require('./resolvers');

const loggingHandler = (req,res,next)=>{
  console.log("IP Address: "+ req.ip);
  next()
}
// start server
async function startServer() {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources:()=>({client:prisma}),
    introspection: process.env.NODE_ENV !== 'production',
    apollo: {
      key: process.env.APOLLO_KEY,
    },
    context: ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || '';
      // we could also check user roles/permissions here
      // if (!token) throw new Error('you must be logged in');
      // add the token to the context
      return {
        req,
        token 
      };
     },
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  // use the logging handler
  app.use(loggingHandler)

  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

}

startServer();
