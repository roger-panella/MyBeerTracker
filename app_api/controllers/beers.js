var mongoose = require('mongoose');
var Cellar = mongoose.model('Cellar');

var jsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.createBeers = function(req, res) {
  var cellarid = req.params.cellarid;
  if (cellarid) {
    Cellar.findById(cellarid)
    .select('beers')
    .exec(
      function(err, cellar) {
        if (err) {
          jsonResponse(res, 400, err);
        } else {
          doAddBeer(req, res, cellar);
        }
      }
    );
  } else {
    jsonResponse(res, 404, {
      "message": "Not found.  Cellar ID required."
    });
  }
};

var doAddBeer = function(req, res, cellar) {
  if (!cellar) {
    jsonResponse(res, 404, {
      "message" : "No cellar ID found"
    });
  } else {
    cellar.beers.push({
      brewery: req.body.brewery,
      beer: req.body.beer,
      style: req.body.style,
      date: req.body.date,
      quantity: req.body.quantity,
      forTrade: req.body.forTrade
    });
    cellar.save(function(err, cellar){
      var thisBeer;
      if (err) {
        jsonResponse(res, 400, err);
      } else {
        thisBeer = cellar.beers[cellar.beers.length - 1];
        jsonResponse(res, 201, thisBeer);
      }
    });
  }
};

module.exports.listOneBeer = function(req, res) {
  if (req.params && req.params.cellarid && req.params.beerid) {
    Cellar.findById(req.params.cellarid)
          .select('username beers')
          .exec(
            function(err, cellar) {
              var response, beer;
              if (!cellar) {
               jsonResponse(res, 404, {
                 "message" : "We cant find a cellar that contains that beer."
               });
              return;
            } else if (err) {
              jsonResponse(res, 400, err);
              return;
            }
            if (cellar.beers && cellar.beers.length > 0) {
              beer = cellar.beers.id(req.params.beerid);
              if (!beer) {
                jsonResponse(res, 404, {
                  "message": "We cant find that beer id"
                });
              } else {
                response = {
                  cellar : {
                    username : cellar.username,
                    id : req.params.cellarid
                  },
                  beer : beer
                };
                jsonResponse(res, 200, response);
              }
            } else {
              jsonResponse(res, 404, {
                "message" : "We cant find any beers in that cellar"
              });
            }
          }
      );
    } else {
      jsonRespone(res, 404, {
        "message" : "Not found.  Cellar and Beer ID are both required"
      });
    }
  };

module.exports.updateOneBeer = function(req, res) {
  if (!req.params.cellarid || !req.params.beerid) {
    jsonResponse(res, 404, {
      "message": "Not found.  Both cellar id and beer id are required"
    });
    return;
  }
  Cellar.findById(req.params.cellarid)
        .select('beers')
        .exec(
          function(err, cellar) {
            var thisBeer;
          if (!cellar) {
            jsonResponse(res, 404, {
              "message": "Cellar ID not found"
            });
            return;
          }
          if (cellar.beers && cellar.beers.length > 0) {
            thisBeer = cellar.beers.id(req.params.beerid);
            if(!thisBeer) {
              jsonResponse(res, 404, {
                "message": "That beer ID is not found"
              });
            } else {
              thisBeer.beer = req.body.beer;
              thisBeer.brewery = req.body.brewery;
              thisBeer.style = req.body.style;
              thisBeer.date = req.body.date;
              thisBeer.quantity = req.body.quantity;
              thisBeer.forTrade = req.body.forTrade;
              cellar.save(function(err, cellar){
                if (err) {
                  jsonResponse(res, 404, err);
                } else {
                  jsonResponse(res, 200, thisBeer);
                }
              });
            }
          } else {
            jsonResponse(res, 404, {
              "message": "No beer to update"
            });
          }
        }
      );
   };

module.exports.deleteOneBeer = function(req, res) {
  if (!req.params.cellarid || !req.params.beerid){
    jsonResponse(res, 404, {
      "message" : "Not found. Both cellar and beer ID are required"
    });
    return;
  } Cellar.findById(req.params.cellarid)
          .select('beers')
          .exec(
            function(err, cellar) {
              if (!cellar) {
                jsonResponse(res, 404, {
                  "message": "cellar id not found"
                });
                return;
              } else if(err) {
                jsonResponse(res, 400, err);
                return;
              }
              if (cellar.beers && cellar.beers.length > 0) {
                if (!cellar.beers.id(req.params.beerid)) {
                  jsonResponse(res, 404, {
                    "message": "beer ID not found"
                  });
                } else {
                  cellar.beers.id(req.params.beerid).remove();
                  cellar.save(function(err){
                    if (err) {
                      jsonResponse(res, 404, err);
                    } else {
                      jsonResponse(res, 204, null);
                    }
                  });
                }
              } else {
                jsonResponse(res, 404, {
                  "message": "No review to delete"
                });
              }
            }
          );
        };
