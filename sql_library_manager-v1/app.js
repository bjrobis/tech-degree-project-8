var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Sequelize = require('sequelize');


//init new Sequelize 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db'
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Test Connection and Sync Tables
(async () => {
  await sequelize.sync({force: true});

  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('The Page You Were Looking For Is Not Found');
  error.status = 404;
  console.log(error.status);
  console.log(error.message);
  res.render('page-not-found', {error});
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
 
 
  res.status(err.status || 500);
  res.render('error'), {err};
});

module.exports = app;
