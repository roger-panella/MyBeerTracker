var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var router = express.Router();
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/', function(req, res){
    res.render('users', { user: req.user });
});

router.get('/login', function(req, res){
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/users'}),
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
        return res.render('register', {  user: user });
      }
      passport.authenticate('local')(req, res, function(){
        res.redirect('/cellar');
      });
    });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
