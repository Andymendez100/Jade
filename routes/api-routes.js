// Requiring our models and passport as we've configured it
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const db = require('../models');
const passport = require('../config/passport');
const keys = require('../config/keys');

const BUCKET_NAME = keys.bucket;
const IAM_USER_KEY = keys.id;
const IAM_USER_SECRET = keys.secret;

function uploadToS3(file) {
  const s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function() {
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
    };
    s3bucket.upload(params, function(err, data) {
      if (err) {
        console.log(err, 'error with aws');
      }
      console.log('success');
      console.log(data);
    });
  });
}

module.exports = app => {
  app.post('/api/upload', function(req, res) {
    const busboy = new Busboy({ headers: req.headers });
    console.log('Upload finished');
    // The file upload has completed
    busboy.on('finish', function() {
      // Grabs your file object from the request
      const file = req.files.element2;

      // Begins the upload to the AWS S3
      uploadToS3(file);
      const url = `https://jade-main-feed.s3-us-west-1.amazonaws.com/${file.name}`;

      db.Feed.create({
        postImage: url,
        postContent: req.body.userContent,
        postPrice: req.body.userNumber,
        postTitle: req.body.userTitle,
      });
    });
    // upload to database
    req.pipe(busboy);
    setTimeout(function() {
      console.log('TimeOutWorking');

      res.redirect('/members');
    }, 5000);
  });

  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    db.User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then(function(user) {
        console.log('Got data');
      })
      .catch(function(err) {
        console.log(err);
      });
    res.redirect('/members');
  });
  //

  app.post('/api/signup', (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        console.log('created user');
      })
      .catch(err => {
        console.log(err);
      });
    res.redirect('/login');
  });
  //
  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  //
  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  // This gets all the items from saved in s3 buckets
  app.get('/api/userfeed', (req, res) => {
    db.Feed.findAll({}).then(function(result) {
      res.json(result);
    });
  });
};
