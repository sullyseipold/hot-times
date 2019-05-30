const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
require('dotenv').config();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

app.use(cors());

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:messages' ]);
const checkScopesAdmin = jwtAuthz([ 'write:messages' ]);

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', checkJwt, checkScopes, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
});

app.post('/api/admin', checkJwt, checkScopesAdmin, function(req, res) {
  res.json({ message: "Hello from an admin endpoint! You need to be authenticated and have a scope of write:messages to see this." });
});

app.listen(3001);
console.log('Server listening on http://localhost:3001. The React app will be built and served at http://localhost:3000.');
// const express = require("express");

// var db = require("./models");
// const routes = require("./routes");
// const app = express();

// const jwt = require('express-jwt');
// const jwtAuthz = require('jwks-rsa');
// const jwksRsa = require('jwks-rsa');
// const PORT = process.env.PORT || 3001;
// const cors = require('cors');
// const morgan = require('morgan');
// require('dotenv').config();


// app.use(cors());


// var jwtCheck = jwt({
//   secret: jwksRsa.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: 'https://dev-b23leygb.auth0.com/.well-known/jwks.json'
// }),
// audience: 'http://localhost:3001/',
// issuer: 'https://dev-b23leygb.auth0.com/',
// algorithms: ['RS256']
// });

// app.use(jwtCheck);

// app.get('/authorized', function (req, res) {
// res.send('Secured Resource');
// });
// app.get('/api/public', function(req, res) {
//   res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
// });

// app.get('/api/private', checkJwt, checkScopes, function(req, res) {
//   res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
// });

// app.post('/api/admin', checkJwt, checkScopesAdmin, function(req, res) {
//   res.json({ message: "Hello from an admin endpoint! You need to be authenticated and have a scope of write:messages to see this." });
// });



// app.use(morgan('API Request (port 3001): :method :url :status :response-time ms - :res[content-length]'));

// // Define middleware here
// app.use(express.urlencoded({
//   extended: true
// }));
// app.use(express.json());
// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// // Add routes, both API and view
// app.use(routes);

// var syncOptions = {
//   force: false
// };

// // If running on heroku, set syncOptions.force to true
// if (process.env.NODE_ENV === "production") {
//   syncOptions.force = true;
// }

// db.sequelize.sync(syncOptions).then(function () {

//   // Start the API server
//   app.listen(PORT, function () {
//     console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
//   });
// });

// module.exports=app;