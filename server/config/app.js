/* File Name: app.js   Student Name: James Yan   Student ID: 301229536   Date: 10/21/2022 */
//  installied 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//  Modules for Authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//  Database Setup
let mongoose = require('mongoose');
let DB = require('./db');

//  Point Mongoose to the DB URI
mongoose.connect(DB.URI);

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=> {
  console.log('Connected to MongoDB...');
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contact');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//  Setup Express Session
app.use(session({
  secret: "I love ice cream.",
  saveUninitialized: false,
  resave: false
}));

//  Initialize Flash (Maintains Error Message)
app.use(flash());

//  Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

//  Passport User Configuration

//  Create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

// Implement a User Authentication Strategy
passport.use(User.createStrategy());

//  Serialize and Deserialize the User Info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts-list', contactsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

// listens to the port
app.listen(3000);

module.exports = app;
