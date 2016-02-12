require('dotenv').config();
var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// passport.authenticate('local', {failureFlash: 'Invalid username or password'});

// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/cellar', ctrlMain.cellar);
router.get('/public_cellar', ctrlMain.publicCellar);
router.get('/about', ctrlMain.about);
router.get('/browse-cellars', ctrlMain.browseCellars);
router.get('/search', ctrlMain.searchForBeer);
router.get('/add', ctrlMain.addBeer);
router.get('/edit', ctrlMain.editBeer);

module.exports = router;
