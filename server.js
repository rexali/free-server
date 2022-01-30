const {httpServer} = require('./app');

const PORT = 4000;
  httpServer.listen({PORT}, () =>{
    console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`)
})
