require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const {
  ApolloServer,
  gql
} = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
// type definition, Altrnatively, const typeDefs = require("./schema");
const typeDefs = fs.readFileSync('./src/schema.graphql', { encoding: 'utf-8' });
// resolvers for the schema query, mutation, subscription
const resolvers = require('./resolvers');

const loggingHandler = (req, res, next) => {
  console.log("IP Address: " + req.ip);
  next()
}

var httpServer = (async function () {
  const app = express();
  // This `app` is the returned value from `express()`.
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  // ...
  const server = new ApolloServer({
    schema,
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
    dataSources: () => ({ client: prisma }),
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

  const subscriptionServer = SubscriptionServer.create({
    // This is the `schema` we just created.
    schema,
    // These are imported from `graphql`.
    execute,
    subscribe,
  }, {
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
  });

  await server.start();
  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());
  // path
  app.use('/', (req, res, next) => { 
    console.log("I am working");
    next(); 
  });
  // use the logging handler
  app.use(loggingHandler);
  // static files
  
  app.use(express.static("upload"));

  app.use("/upload", express.static("upload"));

  server.applyMiddleware({ app });

  return httpServer;

})();

module.exports = { httpServer };

