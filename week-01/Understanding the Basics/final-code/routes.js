const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  // Route to root
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
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
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page with Node.js</title></head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};
// The exports can only export one thing. You can export an object to pass multiple items.
// module.exports = requestHandler;
module.exports = {
  handler: requestHandler,
  someText: 'Some hard coded text',
};