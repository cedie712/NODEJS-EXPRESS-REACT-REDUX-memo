var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});

const validate_password = require('../custom_scripts/password_validator');

const nodemailer = require('nodemailer');
const email_config = require('../config/email_config');


router.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  res.sendStatus(403)
});

/* GET home page. */
router.get('/signup', csrfProtection, (request, response, next) => {
  context = {csrfToken: request.csrfToken()};
  return response.json(context);
});

router.post('/signup', csrfProtection, (request, response, next) => {
  let check_password = validate_password(request.body.password, request.body.confirm, 8);

  if (check_password !== true) {
    return response.status(400).json(check_password);
  }
  

  // proceed to email verification here
  // emailExistence.check(request.body.email, function(email_error, email_res){
  //   console.log(email_res);
  //   if (!email_res) {
  //     email_check.has_error = true;
  //     email_check['error'] = 'bitch please, that email doesn\'t exists';
  //   }
  // });

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
        from: 'cedrick.domingo048@gmail.com', // sender address
        to: request.body.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "test mail", // plain text body
      };
  
      let info = await transporter.sendMail(mailOptions)
  
      console.log("Message sent: %s", info.messageId);
    } 


    send_email()
    .then(() => {
      return response.sendStatus(200);
    })
    .catch((error) => {
      return response.status(400).json({error: 'Email does not exists'});
    })
  
   
  } catch (error) {
    console.log(error);
  }



  

});

module.exports = router;