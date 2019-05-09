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
  if (request.isAuthenticated()) {
      return next();
  }
  return response.status(403).json({error: 'forbidden'})
  // console.log(request._parsedOriginalUrl.path);
}

router.use(login_required);

router.get('/main', (request, response, next) => {
  console.log(request.user.id);
  context = {msg: 'user authenticated'};
  return response.json(context);
});

// save new memo
router.post('/save_new_memo', (request, response, next) => {
  let title = request.body.new_memo_title;
  let content = request.body.new_memo_content;
  let due_date = null;
  if (request.body.new_memo_due_date) {
    due_date = new Date(request.body.new_memo_due_date);
  }
  models.posts.create({
    user_id: request.user.id,
    post_title: title,
    post_body: content,
    post_due_date: due_date
  }).then((post) => {
    return response.json({post: post})
  }).catch(error => console.log(error));
});


// fetch memos
router.post('/all_memos', (request, response, next) => {
  models.posts.findAll({
    where: {
      user_id: request.user.id,
    },
    order: [
      ['id', 'DESC'],
    ],
    limit: 5,
    offset: request.body.offset
  }).then((posts) => {
    for (i in posts) {
      let local_date = posts[i].createdAt.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'});
      posts[i].setDataValue('createdAt_local', local_date);
      if (posts[i].post_due_date) {
        let new_due_date = posts[i].post_due_date.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
        posts[i].setDataValue('post_due_date_local', new_due_date);
      }
    }
    models.posts.count({
      where: {
        user_id: request.user.id,
      }
    }).then((count) => {
      return response.status(200).json({items: posts, count});
    })
  }).catch(error => console.log(error));
});

// delete memo
router.post('/delete_memo', (request, response, next) => {
  let  memo_id = request.body.memo_id;
  models.posts.destroy({
    where: {
      id: memo_id
    }
  }).then(() => {
    return response.status(200).json({msg: 'memo deleted'})
  }).catch((error) => console.log(error))

});

// done memo
router.post('/done_memo', (request, response, next) => {
  let memo_id = request.body.memo_id;
  models.posts.update({
    is_done: true
  }, {
    where: {
      id: memo_id
    }
  }).then(() => {
    return response.status(200).json({msg: 'memo set to done'})
  }).catch(error => console.log(error));
});

// edit memo
router.post('/edit_memo', (request, response, next) => {
  console.log(request.body);
  models.posts.update({
    post_title: request.body.title,
    post_body: request.body.content,
    post_due_date: request.body.due_date
  },
  {
    where: {
      id: request.body.memo_id
    }
  }).then((post) => {
    return response.json({post: post})
  }).catch(error => console.log(error));
});

module.exports = router;
