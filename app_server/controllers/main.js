var request = require('request');

// var requestOptions = {
//   url : "https://api.untappd.com/v4/search/beer?client_id=01A58C550C16736146E4019C0B36C5A8478B128D&client_secret=89BF8DFD841F00A494EB2EFDCE95D477918A0880&q=pliny&limit=10",
//   method : "GET",
//   json : {}
// };
//
// request(requestOptions, function(err, response, body){
//   if (err){
//     console.log(err);
//   } else if (response.statusCode === 200) {
//     console.log(body);
//   } else {
//     console.log(response.statusCode);
//   }
// });


module.exports.index = function(req, res){
  res.render('index', { title: 'Home Page'});
};

module.exports.cellar = function(req, res){
  res.render('cellar', {
    title: 'Your Cellar | My Beer Tracker',
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
};

module.exports.publicCellar = function(req, res){
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
};

module.exports.browseCellars = function(req, res){
  res.render('browse_cellars', { title: 'Browse Cellars'});
};

module.exports.about = function(req, res){
  res.render('about', { title: 'About My Beer Tracker'});
};

module.exports.searchForBeer = function(req, res){
  res.render('search', { title: 'Search for a Beer'});
}

module.exports.addBeer = function(req, res){
  for (var i in req.query){
    console.log(i);
  };
  var beerResult = req.query.q;
    console.log('------beer Result-----');
  console.log(beerResult);
  res.render('add', { title: 'Add Beer', beername: beerResult});
}
