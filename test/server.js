const server = require('./app')
const PORT = 3418
server.listen(PORT, () => { console.log(`listening on port ${PORT}...`) })