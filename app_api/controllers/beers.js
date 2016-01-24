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
  jsonResponse(res, 200, {"status" : "success"});
};

module.exports.deleteOneBeer = function(req, res) {
  jsonResponse(res, 200, {"status" : "success"});
};
