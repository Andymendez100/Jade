$(document).ready(function() {
  const passport = require("passport"),
    TwitterStrategy = require("passport-twitter").Strategy;
  const key = require("./key");

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: key.twitter.consumerKey,
        consumerSecret: key.twitter.consumerSecret,
        callbackURL: "http://www.example.com/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate(
          ...function(err, user) {
            if (err) {
              return done(err);
            }
            done(null, user);
          }
        );
      }
    )
  );
});
