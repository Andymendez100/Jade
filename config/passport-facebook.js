// const passport = require("passport"),
//   FacebookStrategy = require("passport-facebook").Strategy;
// const key = require("./key");

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: key.facebook.clientID,
//       clientSecret: key.facebook.clientSecret,
//       callbackURL: "https://www.facebook.com"
//     },
//     function(accessToken, refreshToken, profile, done) {
//       User.findOrCreate(
//         ...function(err, user) {
//           if (err) {
//             return done(err);
//           }
//           done(null, user);
//         }
//       );
//     }
//   )
// );

// module.exports = FacebookStrategy;