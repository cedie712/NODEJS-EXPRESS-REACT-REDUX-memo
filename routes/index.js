const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});

const passport = require('passport');
const models = require('../models');

/* GET home page. */
// router.use(function (err, req, res, next) {
//   if (err.code !== 'EBADCSRFTOKEN') return next(err)

//   res.sendStatus(403)
// });

function login_required (request, response, next) {
  console.log(request.isAuthenticated());
  if (request.isAuthenticated()) {
      return next();
  }
  return response.status(403).json({error: 'forbidden'})
  // console.log(request._parsedOriginalUrl.path);
}

router.use(login_required);

router.get('/main', function(request, response, next) {
  context = {msg: 'woot woot'};
  return response.json(context);
});

module.exports = router;
