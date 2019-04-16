const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');

passport.use(new GoogleStrategy({
    clientID: keys.google.id,
    clientSecret: keys.google.secret,
    callbackURL: "/api/user/google/auth/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
  }
));