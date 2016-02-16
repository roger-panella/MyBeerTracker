var request = require('request');
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app_api/models/User');

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
  res.render('index', { title: 'My Beer Tracker', user: req.user});
};


//---------------------------- REAL RENDER CELLAR FUNCTION FOR CELLAR CONTROLLER !!!!!!-----------------------------------

// var renderCellar = function(req, res, responseBody) {
//   res.render('cellar', {
//     user: req.user,
//     title: 'Your Cellar | My Beer Tracker',
//     pageHeader: {
//       username: responseBody.username,
//       title: 'Cellar',
//     },
//     beers: responseBody.beers,
//     id: responseBody._id
//   });
// };

// ------------------------------REAL CELLAR CONTROLLER!!!-------------------------------------------------------------------
// module.exports.cellar = function(req, res){
//   if (req.user) {
//   var requestOptions, path;
//   path = '/api/users/' + req.user.id;
//   requestOptions = {
//     url : apiOptions.server + path,
//     method : "GET",
//     json : {},
//   };
//   request (
//     requestOptions,
//     function(err, response, body) {
//       renderCellar(req, res, body);
//     }
//   );
// } else {
//   res.redirect('/users/login');
//   }
// };


// -------------------------------Angular cellar controller!!!!----------------------------------------------------------------
module.exports.cellar = function(req, res) {
  if (req.user) {
  var apiPath = apiOptions.server + '/api/users/' + req.user.id;
  if (req.query.code) {
    request('https://untappd.com/oauth/authorize/?client_id=' + process.env.UTID + '&client_secret=' + process.env.UTSECRET + '&response_type=code&redirect_url=http://localhost:3000/cellar&code=' + req.query.code, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var untappdResponse = JSON.parse(body);
        var userToken = untappdResponse.response.access_token;
        User.findOne({_id: req.user.id}, function(err, user){
          if (err) { return next(err); }
          user.apiToken = userToken;
          user.save(function(err){
            if (err) { return next(err); }
          });
        });
        }
      })
    }
  renderCellar(req, res);
  } else {
  res.redirect('/users/login');
  }
};

//---------------------------------Angular renderCellar function!!!-------------------------------------------------------------

// var renderCellar = function(req, res, responseBody) {   with ResponseBody(api) data
var renderCellar = function(req, res) {
  res.render('cellar', {
    user: req.user,
    theId: req.user.id,
    title: 'Your Cellar | My Beer Tracker',
    pageHeader: {
      // username: responseBody.username,                   with API data
      username: 'Roger',
      title: 'Cellar',
    },
    // beers: responseBody.beers,                           with API data
    // id: responseBody._id                                 with API data
  });
};

module.exports.publicCellar = function(req, res){
  if (req.user) {
  var requestOptions, path;
  console.log('/api/users/'+req.query.id);
  path = '/api/users/' + req.query.id;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
  };
  request (
    requestOptions,
    function(err, response, body) {
      renderPublicCellar(req, res, body);
    }
  );
} else {
  res.redirect('/users/login');
  }
};

var renderPublicCellar = function(req, res, responseBody) {
  res.render('public_cellar', {
    user: req.user,
    title:  responseBody.username+"'s Cellar | My Beer Tracker",
    pageHeader: {
      username: responseBody.username,
      title: 'Cellar',
    },
    beers: responseBody.beers
  });
};

module.exports.browseCellars = function(req, res){
  var requestOptions, path;
  path = '/api/users'
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
  };
  request (
    requestOptions,
    function(err, response, body){
      renderUsers(req, res, body);
    }
  );
};

 var renderUsers = function(req, res, responseBody) {
    var users = [];

    for (var i = 0;i < responseBody.length;i++){
      var userObject = {};
      userObject[responseBody[i].username] = responseBody[i]._id;
      users.push(userObject);
    }
   res.render('browse_cellars', {
     user: req.user,
     title: 'Browse Cellars | My Beer Tracker',
     pageHeader: {
       username: responseBody.username,
       title: "Browse Cellars",
       browseUsers: users,
     },
       beers: responseBody.beers
    });
 };

module.exports.about = function(req, res){
  res.render('about', { title: 'About My Beer Tracker', user: req.user});
};

module.exports.searchForBeer = function(req, res){
  user = req.user;
  res.render('search', { title: 'Search for a Beer', user: req.user, untapId: process.env.UTID, untapSecret: process.env.UTSECRET});
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

module.exports.searchBeers = function(req, res) {
  var searchParams = req.body.userSearch;
  var apiResponse;
  request('https://api.untappd.com/v4/search/beer?client_id=' + process.env.UTID + '&client_secret=' + process.env.UTSECRET + '&q=' + searchParams +'&limit=10', function(error, response, body) {
  if (!error && response.statusCode == 200) {
  res.send(body);
    }
  })
};
