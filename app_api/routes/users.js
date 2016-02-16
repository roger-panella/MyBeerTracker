var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var router = express.Router();
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  // apiOptions.server = "https://mysterious-spire-8549.herokuapp.com";
  apiOptions.server = "http://www.mybeertracker.com";
}

router.get('/', function(req, res){
    res.render('users', { user: req.user });
});

router.get('/login', function(req, res){
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', message: "Whoops! something went wrong.  Let\'s try again."}),
  function(req, res) {
    console.log('im getting here');
    res.redirect('/cellar');
  }
);

router.get('/register', function(req, res){
    if (req.user) {
      res.redirect('/cellar');
  } else {
      res.render('register', { user: req.user });
  }
});

router.post('/register', function(req, res){
    User.register(new User({
      username: req.body.username
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.render('register', {  user: user, message: "Whoops!  Something went wrong.  Let\'s try again." });
      }
      passport.authenticate('local')(req, res, function(){
        // res.redirect('/cellar'); original rediect before untapped authenticate
        // res.redirect('https://untappd.com/oauth/authenticate/?client_id=' + process.env.UTID + '&response_type=code&redirect_url=http://localhost:3000/cellar');
        // res.redirect('https://untappd.com/oauth/authenticate/?client_id=' + process.env.UTID + '&response_type=code&redirect_url=' + apiOptions.server + '/cellar');
        res.redirect('https://untappd.com/oauth/authenticate/?client_id=' + process.env.UTID + '&response_type=code&redirect_url=' + apiOptions.server + '/cellar');
      });
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
