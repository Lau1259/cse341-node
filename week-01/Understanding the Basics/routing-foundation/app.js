const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // You can access the entire request object here or use . notation to access specific parts.
  const url = req.url;
  const method = req.method;

  // Route to root
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    // I opted to use a template literal because it's easier to read than multiple call to the write function.
    res.write(`<html>
    <head>
    <title>Enter Message</title>
    </head>
      <body>
        <h1>Node.js Message from Form</h1>
        <form action="/message" method="POST">
          <input type="text" name="message">
          <button type ="submit">Send</button>
        </form>
      </body>
    </html>`);
    // The return will make sure the code after the if is not executed.
    return res.end();
  }
  // /message rout
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      // This only works because we are receiving text.
      const parseBody = Buffer.concat(body).toString();
      // console.log(parseBody);
      const message = parseBody.split('=')[1];
      // writeFileSync is synchronous
      fs.writeFile('message.txt', message, err => {
        /*
            TODO: writeHead was not covered in depth. The 302 is the http status code for redirection. This will allow me to use location inside of setHeader to redirect to the / route.
           */
        // res.writeHead(302, '/')
        // Redirect to root by setting the status code to redirect and then use location to go to a different route.
        res.statusCode = 302;
        res.setHeader('Location', '/');
        // The return will make sure the code after the if is not executed.
        return res.end();
      });
    });
  }
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