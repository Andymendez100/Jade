$(document).ready(function() {
  const passport = require("passport");
  const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
  const FacebookStrategy = require("passport-facebook").Strategy;
  const TwitterStrategy = require("passport-twitter").Strategy;
  const key = require("./key");

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID: key.google.clientID,
        clientSecret: key.google.clientSecret,
        callbackURL: "http://www.example.com/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
          return done(err, user);
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: key.facebook.clientID,
        clientSecret: key.facebook.clientSecret,
        callbackURL: "http://www.facebook.com"
      },
      function(accessToken, refreshToken, profile, done) {
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
