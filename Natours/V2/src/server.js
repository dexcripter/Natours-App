const http = require('http');

const app = require('./app');

const server = http.createServer(app);

const port = 4040;

server.listen(port, () => {
  console.log(`Server is currently running on port ${port}`);
});
