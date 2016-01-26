var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var apiOptions = {
  server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://mysterious-spire-8549.herokuapp.com";
}

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
  return next();
  res.redirect('/users/register');
}


module.exports.index = function(req, res){
  req.user;
  res.render('index', { title: 'Home Page', user: req.user});
};

var renderCellar = function(req, res, responseBody) {
  // var message;
  // if (responseBody.beers.length < 1) {
  //   console.log('-----responseBody');
  //   console.log(responseBody.beers);
  //   message = "You need to add some beers!";
  // }

  res.render('cellar', {
    user: req.user,
    title: 'Your Cellar | My Beer Tracker',
    pageHeader: {
      username: responseBody.username,
      title: 'Cellar',
    },
    beers: responseBody.beers,
    id: responseBody._id
    // message: message
  });
  console.log(responseBody);
  console.log('----responseID------');
  console.log(responseBody._id);
};

module.exports.cellar = function(req, res){
  user: req.user;
  var requestOptions, path;
  path = '/api/users/' + req.user.id;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
  };
  request (
    requestOptions,
    function(err, response, body) {
      renderCellar(req, res, body);
    }
  );
};


module.exports.publicCellar = function(req, res){
  if (req.user) {
    console.log('----req.session');
    console.log(req.session);
    // passport.authenticate('local'),
    res.render('public_cellar', {
      title: 'User\'s Public Cellar | My Beer Tracker',
      pageHeader: {
        username: 'Ralph',
        title: 'Cellar'
      },
      beers: [{
        brewery: 'Goose Island',
        beer: 'Bourbon County Stout',
        style: 'American Imperial Stout',
        date: '2014',
        forTrade: true
      },{
        brewery: 'Hill Farmstead',
        beer: 'Damon',
        style: 'American Imperial Stout',
        date: '2013',
        forTrade: false
      }, {
        brewery: 'Cantillon',
        beer: 'Iris',
        style: 'Lambic',
        date: '2013',
        forTrade: false
      },{
        brewery: 'Kane',
        beer: 'A Night to End All Dawns',
        style: 'American Imperial Stout',
        date: '2015',
        forTrade: true
      },{
        brewery: 'SARA',
        beer: 'Saison Bernice',
        style: 'Saison',
        date: '2015',
        forTrade: true
      }]
    });
} else {
  res.redirect('/');
}
};

module.exports.browseCellars = function(req, res){
  res.render('browse_cellars', { title: 'Browse Cellars', user: req.user});
};

module.exports.about = function(req, res){
  res.render('about', { title: 'About My Beer Tracker', user: req.user});
};

module.exports.searchForBeer = function(req, res){
  user = req.user;
  res.render('search', { title: 'Search for a Beer', user: req.user});
}

module.exports.addBeer = function(req, res){
  var brewery = req.query.brewery;
  var beer = req.query.beer;
  var style = req.query.style;
  var date = req.query.date;
  var quantity = req.query.quantity;
  var forTrade = req.query.forTrade;
  res.render('add', {
    title: 'Add Beer',
    user: req.user,
    breweryResult: brewery,
    beerResult: beer,
    beerStyle: style,
    beerDate: date,
    beerQuantity: quantity,
    beerForTrade: forTrade
  });
}

module.exports.editBeer = function(req, res){
  var brewery = req.query.brewery;
  var beer = req.query.beer;
  var style = req.query.style;
  var date = req.query.date;
  var quantity = req.query.quantity;
  var forTrade = req.query.forTrade;
  var beerId = req.query.id;
  var userId = req.user.id;
  res.render('edit', {
    title: 'Edit Beer',
    user: req.user,
    breweryResult: brewery,
    beerResult: beer,
    beerStyle: style,
    beerDate: date,
    beerQuantity: quantity,
    beerForTrade: forTrade,
    beerid: beerId
  });
}
