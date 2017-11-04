var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var carList = require('./routes/carList');
var carVendor = require('./routes/carVendor');
var carType = require('./routes/carType');

var app = express();

// view  setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/carList', carList);
app.use('/carVendor', carVendor);
app.use('/carType', carType);

// catching 404 and forward 
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err); // next
});

// error hand
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //  the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
