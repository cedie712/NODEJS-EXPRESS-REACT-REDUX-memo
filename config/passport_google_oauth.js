const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const models = require('../models');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  models.users.findOne({
      where: {
          id: id
      }
  }).then((user) => {
      done(null, user);
  }).catch(error => console.log(error));
});


passport.use(new GoogleStrategy({
    clientID: keys.google.id,
    clientSecret: keys.google.secret,
    callbackURL: "/api/user/google/auth/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    models.users.findOne({
      where: {
        google_id: profile.id
      }
    }).then((user) => {
      if (user) {
        return done(null, user);
      }

      models.users.create({
        email: profile.emails[0].value,
        google_id: profile.id
      }).then((user) => {
        return done(null, user);
      })
      .catch((error) => {
        return done(error);
      })

    })
    .catch((error) => {
      return done(error);
    })
  }
));