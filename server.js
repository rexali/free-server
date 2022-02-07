const { httpServer } = require('./src/app');

const PORT = 4000;

httpServer.then(server => server.listen(
  PORT,
  () => console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`)
)).catch(error => {
  console.warn(error);
})

