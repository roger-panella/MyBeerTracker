var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mongoose = require('mongoose');
require('./app_server/models/db');

var routes = require('./app_server/routes/index');
var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'hbs');

hbs.registerHelper("getForTrade", function(forTrade){
  if (forTrade == true) {
    return 'Yes';
  } else if (forTrade == false) {
    return 'No';
  }
});

// hsb.registerHelper("testy", function(data) {
//
//   var html = '<div>';
//   // loop through data
//   // only append stuff to div as needed
//   // when done w/logic return the fully formed html
//   html = html = '</div>';
//
//   return html;
//
//
// });

hbs.registerHelper("getStylesForSort", function(beers){
  var stylesForSort = [];
  for (var i = 0; i < beers.length;i++){
    if (stylesForSort.indexOf(beers[i].style) == -1) {
      stylesForSort.push(beers[i].style);
    };
  }
  console.log(stylesForSort);
  return stylesForSort;
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
