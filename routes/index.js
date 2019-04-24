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

router.get('/main', (request, response, next) => {
  console.log(request.user.id);
  context = {msg: 'woot woot'};
  return response.json(context);
});

// save new memo
router.post('/save_new_memo', (request, response, next) => {
  let title = request.body.new_memo_title;
  let content = request.body.new_memo_content;
  let due_date = request.body.new_memo_due_date;
  models.posts.create({
    user_id: request.user.id,
    post_title: title,
    post_body: content,
    post_due_date: due_date
  }).then((post) => {
    return response.json({data: post})
  }).catch(error => console.log(error));
})

module.exports = router;
