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

module.exports.addBeer = function(req, res){
  res.render('add', { title: 'Add a Beer'});
}
