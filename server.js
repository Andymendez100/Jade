// Requiring necessary npm packages
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
//passport for facebook/twitter/google
const facebook = require ("./config/passport-facebook")
// const twitter = require ("./config/passport-twitter")
// const google = require("./config/passport-google")

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");
//
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("views"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//
// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
//
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});