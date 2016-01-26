var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

hbs.registerHelper("getForTrade", function(forTrade){
  if (forTrade == true) {
    return 'Yes';
  } else if (forTrade == false) {
    return 'No';
  }
});

hbs.registerHelper("showUsers", function(users){
  // var usersList = [];
  var ul = "<ul>";
  for (var inc = 0; inc < users.length; inc++) {
    console.log('---users----');
    console.log(users);
    var name = Object.keys(users[inc])[0];
    var nameVal = users[inc][name];
    console.log(nameVal);
    // usersList.push(name);
    var li = "<li><a href=api/users/"+nameVal+">" + name + "</a></li>";
    ul = ul + li;
  }
  // console.log(usersList);
  ul = ul + "</ul>";
  console.log(ul);
  return new hbs.SafeString(ul);
});

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('./app_api/models/db');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
var users = require('./app_api/routes/users');


var app = express();

app.use(require('express-session')({
  secret: 'Cantillon makes delicous beer',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./app_api/models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname,'app_server', 'views'));
app.set('view engine', 'hbs');



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
app.use('/api', routesApi);
app.use('/users', users)

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
