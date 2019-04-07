const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;   
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

// User sign-up local-strategy
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
                return done(null, user, 'User already exists');
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

// User sign-in local-strategy
passport.use('local-signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true 
    }, (request, username, password, done) => {
        console.log(request.body)
        models.users.findOne({
            where: {
                email: request.body.email
            }
        }).then((user) => {
            if (user) {
                let check_password = models.users.validate_password(request.body.password, user.password);

                if (check_password) {
                    return done(null, user, true)
                }
            }

            return done(null, null, false);

        }).catch((error) => {
            done(error);
        })
    }
))