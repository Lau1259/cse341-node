/**********************************************************
 Handle two Routes:
 '/': Return some greeting text
 '/users': Return a list of dummy users
 (e.g.
  <ul>
    <li>User 1</li>
  </ul>
  )
**********************************************************/
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  //Routing
  switch (url) {
    case '/':
      /******************************************************
      Add a form with a 'username' <input> to the '/' page and submit a POST request to '/create-user' upon a button click
      *****************************************************/
      res.setHeader('Content-Type', 'text/html');
      res.write(`<html>
      <head>
        <title>Greeting | Node.js</title>
      </head>
      <body>
        <h1>Welcome to Node.js</h1>
        <p>This page was created by using Node.js from creating the server, to handling routing, and finally to displaying an UI using HTML.</p>
        <form action="/create-user" method="POST">
          <label for="username">Please enter a username:
            <input type="text" name="username">
          </label>
          <label for="password">Please enter a password:
            <input type="password" name="password">
          </label>
          <button type="submit">Create User</button>
        </form>
      </body>
      </html>`);
      return res.end();
    case '/users':
      // return a list of users
      res.setHeader('Content-Type', 'text/html');
      // Return an error page
      res.write(
        `<html>
            <head>
              <title>Users | Node.js</title>
            </head>
            <body>
              <h1>Users</h1>
              <ol>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
                <li>User 4</li>
              <ol>
            </body>
        </html>`
      );
      return res.end();

    case '/create-user':
      /******************************************************
       Add the '/create-user' route and parse the incoming data (i.e. the username) and simply log it to the console.****************************************************/
      if (method === 'POST') {
        const userData = [];
        req.on('data', (chunk) => {
          userData.push(chunk);
        });

        return req.on('end', () => {
          const parseUserData = Buffer.concat(userData).toString();
          console.log(parseUserData);
          const parseUserName = parseUserData.split('&')[0];
          const parseUserPass = parseUserData.split('&')[1];
          const username = parseUserName.split('=')[1];
          const pass = parseUserPass.split('=')[1];
          console.log(`New User: ${username} was added successfully!`);
          console.log(`${username} password: ${pass}`);
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
      } else {
        res.setHeader('Content-Type', 'text/html');
        // Return an error page
        res.write(
          `<html>
            <head>
              <title>Error | Node.js</title>
            </head>
            <body>
              <h1>Sorry User</h1>
              <p>Sorry, something went wrong with the form data. Please make sure to fill out all fields next time.
              </p>
            </body>
          </html>`
        );
        return res.end();
      }
      default:
        res.setHeader('Content-Type', 'text/html');
        // Return an error page
        // Return an error page
        res.write(
          `<html>
            <head>
              <title>Error | Node.js</title>
            </head>
            <body>
              <h1>Sorry User</h1>
              <p>Sorry, something went wrong with the form data. Please make sure to fill out all fields next time.
              </p>
            </body>
          </html>`
        );
        return res.end();
  }
}

// Using an object so that I can try to pass users here and then use a function to create the users list.
module.exports = {
  handler: requestHandler,
  users: ['Lautaro Cuevas', 'John Carter']
}