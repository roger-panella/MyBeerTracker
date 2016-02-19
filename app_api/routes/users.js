var express = require('express');
var passport = require('passport');
var async = require('async');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-sendgrid-transport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var router = express.Router();
var flash = require('express-flash');

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

//----working Passport login-----//

// router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', message: "Whoops! something went wrong.  Let\'s try again."}),
//   function(req, res) {
//     console.log('im getting here');
//     res.redirect('/cellar');
//   }
// );

//--- bcrypt login -----

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if (err) return next(err)
    if (!user) {
      req.flash('error', 'Hmmm.  We can\'t find that user.');
      return res.redirect('/users/login')
    }
    req.logIn(user, function(err){
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/register', function(req, res){
    if (req.user) {
      res.redirect('/cellar');
  } else {
      res.render('register', { user: req.user });
  }
});

//------original working register-----//

// router.post('/register', function(req, res){
//     User.register(new User({
//       username: req.body.username,
//       email: req.body.email
//     }),
//     req.body.password,
//     function(err, user) {
//       if (err) {
//         return res.render('register', {  user: user, message: "Whoops!  Something went wrong.  Let\'s try again." });
//       }
//       passport.authenticate('local')(req, res, function(){
//         // res.redirect('/cellar'); original rediect before untapped authenticate
//         // res.redirect('https://untappd.com/oauth/authenticate/?client_id=' + process.env.UTID + '&response_type=code&redirect_url=http://localhost:3000/cellar');
//         // res.redirect('https://untappd.com/oauth/authenticate/?client_id=' + process.env.UTID + '&response_type=code&redirect_url=' + apiOptions.server + '/cellar');
//         res.redirect('https://untappd.com/oauth/authenticate/?client_id=' + process.env.UTID + '&response_type=code&redirect_url=' + apiOptions.server + '/cellar');
//       });
//     });
// });

router.post('/register', function(req, res){
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.save(function(err){
    req.logIn(user, function(err){
      res.redirect('https://untappd.com/oauth/authenticate/?client_id=' + process.env.UTID + '&response_type=code&redirect_url=' + apiOptions.server + '/cellar');
    });
  });
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/forgot-password', function(req, res){
  res.render('forgot', {
    user: req.user,
    title: 'Reset Password | My Beer Tracker'
  });
});

router.post('/forgot-password', function(req, res, next){
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf){
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user){
        if (!user) {
          req.flash('error', 'Hmmmm. No account with that email address exists.');
          return res.redirect('/users/forgot-password');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var options = {
        auth: {
          api_user: process.env.SGLOGIN,
          api_key: process.env.SGPASS
        }
      }

      var client = nodemailer.createTransport(smtpTransport(options));

      var mailOptions = {
        to: user.email,
        from: 'rogerpanella@gmail.com',
        subject: 'My Beer Tracker Password Reset Request',
        text: 'You\'re receiving this because you requested to reset your My Beer Tracker Password. \n\n' + 'Please click on the following link to complete this process:\n\n' + 'http://' + req.headers.host + '/users/reset/' + token + '\n\n' + 'If you did not request this password change, please ignore this message. \n'
      };
      client.sendMail(mailOptions, function(err){
        req.flash('info', 'An email has been sent to ' + user.email + ' with instructions on how to reset your password.');
        done(err, 'done');
      });
    }
  ], function(err){
    if (err) return next(err);
    res.redirect('/users/forgot-password');
  });
});

router.get('/reset/:token', function(req, res){
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user){
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired');
      return res.redirect('/forgot-password');
    }
    res.render('reset', {
      user: req.user,
      email: user.email,
      token: user.resetPasswordToken
    });
    console.log('---email from get-----');
    console.log(user.email);
  });
});

router.post('/reset/:token', function(req, res){
  async.waterfall([
    function(done){
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } },function(err, user) {
        if (!user) {
          console.log('no user!');
          req.flash('error', 'Password reset token is invalid or has expired');
          return res.redirect('/');
        }
        console.log('----user email-------');
        console.log(user.email);
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err){
          req.logIn(user, function(err){
            done(err, user);
          });
        });
      });
    },
    function(user, done) {
      var options = {
        auth: {
          api_user: process.env.SGLOGIN,
          api_key: process.env.SGPASS
        }
      }

      var client = nodemailer.createTransport(smtpTransport(options));

      var mailOptions = {
        to: user.email,
        from: 'rogerpanella@gmail.com',
        subject: 'My Beer Tracker Password Changed',
        text: 'Just letting you know that your My Beer Tracker password has been successfully changed.  Woo hoo! \n\n'
      };
      client.sendMail(mailOptions, function(err){
        done(err, 'done');
    });
   }
 ], function(err){
   res.redirect('/');
 });
});


module.exports = router;
