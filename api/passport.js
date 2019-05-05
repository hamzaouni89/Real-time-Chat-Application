var passport = require('passport')
const BearerStrategy = require("passport-http-bearer");
const jwt = require('jsonwebtoken')


// Load User model
const User = require('../model/users');
var secret = "KJN4511qkqhxq5585x5s85f8f2x8ww8w55x8s52q5w2q2"

passport.use(new BearerStrategy(
  function(token, done) {
    jwt.verify(token,secret, function(err,decoded){
      if(err){
          return done(err);
      }
      if(decoded){
        User.findOne({ _id: decoded._id }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, true);
        });
      }
  })
  }
));
