// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const keys = require("../config/keys");

let current_user;
//
const BUCKET_NAME = keys.bucket;
const IAM_USER_KEY = keys.id;
const IAM_USER_SECRET = keys.secret;
let s3 = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME
});
function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
    });
  });
}
// function (url) {
//   db
// }
module.exports = app => {
  app.post('/api/upload', function (req, res, next) {
    // This grabs the additional parameters so in this case passing in
    // "element1" with a value.
    const element1 = req.body.element1;
    var busboy = new Busboy({ headers: req.headers });
    // The file upload has completed
    busboy.on('finish', function () {
      //console.log(req.body, " Hello new world city");


      console.log('Upload finished');
      // Grabs your file object from the request
      const file = req.files.element2;
      console.log(file.name, "File name here");
      // Begins the upload to the AWS S3
      uploadToS3(file);
      var url = `https://jade-main-feed.s3-us-west-1.amazonaws.com/${file.name}`
      console.log(url);

      // var urlParams = { Bucket: BUCKET_NAME, Key: file.name }
      // var url = s3.getSignedUrl('getObject', urlParams);
      //console.log(url);
      db.Feed.create({
        postImage: url,
        UserId: req.body.userId,
        postContent: req.body.userContent,
        postPrice: req.body.userNumber
      })
    });
    // upload to database
    req.pipe(busboy);
    setTimeout(function () {
      console.log("TimeOutWorking");

      res.redirect("/members")
    }, 10000);


  });
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {

    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      current_user = user.id
      res.json(user.id);

    }).catch(function (err) {
      console.log(err);
    })
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // res.send("/members");
  });
  //
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    //console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
  //
  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // This gets all the items from saved in s3 buckets
  app.get("/api/userfeed", (req, res) => {

    db.Feed.findAll({

    }).then(function (result) {
      //console.log(result);
      res.json(result)
    })
    // db.Feed.findAll({
    //   where: {
    //     UserId: current_user
    //   }
    // }).then(function (res) {
    //   console.log(res);

    // })
  })
};