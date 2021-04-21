const http = require('http');

/* ********************************************************** The routes module is local so we must use the ./ to reference the root of the project. I exported an object so I need to use . notation to access each part.
 ********************************************************** */
const routes = require('./routes')

const server = http.createServer(routes.handler);

server.listen(3000);