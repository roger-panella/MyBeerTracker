module.exports.index = function(req, res){
  res.render('index', { title: 'Home Page'});
};

module.exports.cellar = function(req, res){
  res.render('cellar', { title: 'Your Cellar'});
};

module.exports.publicCellar = function(req, res){
  res.render('public_cellar', { title: 'Public Cellar'});
};

module.exports.browseCellars = function(req, res){
  res.render('browse_cellars', { title: 'Browse Cellars'});
};

module.exports.about = function(req, res){
  res.render('about', { title: 'About My Beer Tracker'});
};
