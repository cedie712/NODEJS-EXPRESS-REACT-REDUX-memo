var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});

router.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  res.sendStatus(403)
})

/* GET home page. */
router.get('/signup', csrfProtection, (request, response, next) => {
  context = {csrfToken: request.csrfToken()};
  return response.json(context);
});

router.post('/signup', csrfProtection, (request, response, next) => {
  console.log(request.body);
  response.sendStatus(200);

});

module.exports = router;