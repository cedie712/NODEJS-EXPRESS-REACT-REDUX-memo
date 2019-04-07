const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});

const validate_password = require('../custom_scripts/password_validator');


const passport = require('passport');

const nodemailer = require('nodemailer');
const email_config = require('../config/email_config');

const models = require('../models');


router.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  res.sendStatus(403)
});


// signup_verify_code
let verification_code_signup = {};


router.get('/signup', csrfProtection, (request, response, next) => {
  context = {csrfToken: request.csrfToken()};
  return response.json(context);
});

router.post('/signup', csrfProtection, (request, response, next) => {
  let check_password = validate_password(request.body.password, request.body.confirm, 8);

  if (check_password !== true) {
    return response.status(400).json(check_password);
  }

  models.users.findOne({
    where: {
      email: request.body.email
    }
  }).then((user) => {
    if (user) {
      return response.status(400).json({error: 'User already exists'});
    }

    if(!user) {

      let verfication_code = Math.floor((Math.random() * 999999) + 100000);

      try {
        async function send_email() {
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: email_config.EMAIL_USERNAME,
              pass: email_config.EMAIL_PASSWORD
            }
          });
      
          let mailOptions = {
            from: 'Memo', // sender address
            to: request.body.email, // list of receivers
            subject: "Email Verfication for Signup Process", // Subject line
            text: `verification code: ${verfication_code}`, // plain text body
          };
      
          let info = await transporter.sendMail(mailOptions)
      
          console.log("Message sent: %s", info.messageId);
        } 


        // PRODUCTION - SEND VERIFICATION
        // send_email()
        // .then(() => {
        //   verification_code_signup[request.body._csrf] = {
        //     verfication_code : verfication_code,
        //     email: request.body.email,
        //     password: request.body.password
        //   };

        //   console.log(verification_code_signup[request.body._csrf]);

        //   // drop the verication code after 5 mins
        //   async function verification_limiter(ms) {
        //     return new Promise(resolve => {
        //       setTimeout(
        //         () => {
        //           delete verification_code_signup[request.body._csrf]
        //           console.log(verification_code_signup);
        //         }, 300000);
        //     });
        //   }

        //   verification_limiter()

        //   return response.sendStatus(200);
        // })
        // .catch((error) => {
        //   return response.status(400).json({error: 'Email does not exists'});
        // })
        // PRODUCTION - SEND VERIFICATION

        // TESTING
        verification_code_signup[request.body._csrf] = {
          verfication_code : verfication_code,
          email: request.body.email,
          password: request.body.password
        };

        console.log(verification_code_signup[request.body._csrf]);

        // drop the verication code after 5 mins
        async function verification_limiter(ms) {
          return new Promise(resolve => {
            setTimeout(
              () => {
                delete verification_code_signup[request.body._csrf]
                console.log(verification_code_signup);
              }, 300000);
          });
        }

        verification_limiter()

        return response.sendStatus(200);
        // TESTING
      
      } catch (error) {
        console.log(error);
      }

    }

  }).catch((error) => console.log(error));
});


router.post('/verify_signup', csrfProtection,(request, response, next) => {

  if (request.body.verfication_code === '' || !verification_code_signup[request.body._csrf]) {
    return response.status(400);
  }

  if (verification_code_signup[request.body._csrf].verfication_code !== parseInt(request.body.verification_code)) {
    return response.status(400).json({error: 'Invalid Code'});
  }

  request.body['email'] = verification_code_signup[request.body._csrf].email;
  request.body['password'] = verification_code_signup[request.body._csrf].password;
  // return next();

  passport.authenticate('local-signup',
  (error, user, info) => {

    //do whatever you like here
    if (error) {
      console.log(error)
    }

    if (info === 'user already exists') {
      return response.status(400).json({error: info});
    }

    if (user) {
      console.log('user created');
      user_info = {
        email: request.body['email'],
        password: request.body['password']
      }
      return response.status(200).json({user: user_info})
    }

  })(request, response, next);

});


module.exports = router;