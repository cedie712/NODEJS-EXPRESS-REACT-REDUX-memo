const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;   
const models = require('../models');


passport.use('local-signup' ,new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (request, username, password, done) => {    
        console.log(request.body);
        models.users.findOne({
           where: {
               email: request.body.email
           } 
        })
        .then((user) => {
            if (user) {
                return done(null, user, 'user already exists');
            }

            if(!user) {
                models.users.create({
                    email: request.body.email,
                    password: models.users.encrypt_password(request.body.password)
                })
                .then((user) => {
                    return done(null, user);
                })
                .catch((error) => {
                    return done(error);
                })
                ;
            }
        })
        .catch((error) => {
            return done(error);
        })  
    }
  ));