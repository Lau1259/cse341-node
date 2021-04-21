/**********************************************************
 This is the assignment for the module titled
 'Understanding the Basics' in the Academind course.
**********************************************************/
// imports (require)
const http = require('http');
const routes = require('./routes');

/**********************************************************
 * Spin up a Node.js driven server on port 3000
 * The route handling will happen in the external routes file.
 **********************************************************/
const server = http.createServer(routes.handler);
server.listen(3000);
