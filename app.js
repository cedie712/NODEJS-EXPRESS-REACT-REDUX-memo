const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const db = require('./config/database_conf');
const database_keys = require('./config/config.json');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const keys = require('./config/keys');

db.authenticate()
    .then(() => console.log('connected to the database'))
    .catch((error) => console.log(error));


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const conObject = {
    user: database_keys.development.username,
    password: database_keys.development.password,
    host: 'localhost',
    port: 5432,
    database: database_keys.development.database
};

const pgSession = require('connect-pg-simple')(session);

app.use(session({
    store: new pgSession({conObject: conObject}),
    secret: keys.session_secret,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days,
    saveUninitialized: true,
  }));
app.use(passport.initialize());
app.use(passport.session());

// passport strategies
require('./config/passport_local');
require('./config/passport_google_oauth');


app.use('/api/user', userRouter);
app.use('/api', indexRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// concurrently script
// "start": "concurrently \"nodemon ./bin/www\" \"cd client && npm start\""
module.exports = app;
