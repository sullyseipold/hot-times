const express = require("express");

var db = require("./models");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

var syncOptions = {
  force: false
};

// If running on heroku, set syncOptions.force to true
// if (process.env.NODE_ENV === "production") {
//   syncOptions.force = true;
// }

db.sequelize.sync(syncOptions).then(function () {

  // Start the API server
  app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});

module.exports=app;