const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log('wooot wooot');
        User.findOne({
           username 
        })
        .then((user) => {
            if (user) {
                console.log(user);
            }
            else {
                console.log('will create user here');
            }
        })
    }
  ));