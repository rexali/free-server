const server = require('./app')
const PORT = 3418
server.listen(3419)
server.listen(3420)
server.listen(3421)
server.listen(PORT, () => { console.log(`listening on port ${PORT}...`) })