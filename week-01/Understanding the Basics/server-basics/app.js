/* ******************************************************* This is the root file that makes up the application. It is sometimes named server.js
 ******************************************************* */

// When the directory is omitted Node.js will look for a global module and automatically add the .js extension.
const http = require('http');

// Create a server takes a function that runs each time a request is sent and returns a response. Anonymous functions or arrow functions can by used. This functions returns a server so we save it to a constant.
const server = http.createServer((req, res) => {
  // You can access the entire request object here or use . notation to access specific parts.
  console.log(req.url, req.method, req.headers);
  // You can stop the process by using the following line:
  // process.exit();
  // We can pass data to a response for example the header.
  res.setHeader('Content-Type', 'text/html');
  // This is the hard way of passing in html. This is before using views.
  res.write('<html>');
  res.write('<head><title>My First Page with Node.js</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

// Keeps the server up to 'listen' for incoming requests. It takes a port as an optional argument.
server.listen(3000);