var mongoose = require('mongoose');
var Cellar = mongoose.model('Cellar');

function errorResponse(err) {
  return {
    message: err,
    status: 500,
    note: 'Whoop!  Something went wrong, here.'
  };
};

var jsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.listCellars = function(req, res) {
  Cellar.find(function(err, cellars) {
    if (err) {
      res.json(errorResponse(err));
    } else {
      res.json(cellars);
    }
  });
};

module.exports.createCellars = function(req, res) {
  Cellar.create({
    username: req.body.username
  }, function(err, cellar){
    if (err) {
      jsonResponse(res, 400, err);
    } else {
      jsonResponse(res, 201, cellar);
    }
  });
};

module.exports.listOneCellar = function (req, res) {
  if (req.params && req.params.cellarid) {
    Cellar.findById(req.params.cellarid)
          .exec(function(err, cellar) {
      if (!cellar) {
        jsonResponse(res, 404, {
          "message" : "Sorry, we can\t find that cellar!"
        });
        return;
      } else if (err) {
        jsonResponse(res, 404, err);
        return;
      }
      jsonResponse(res, 200, cellar);
    });
  } else {
    jsonResponse(res, 404, {
      "message" : "No Cellar ID in the server request"
    });
  }
};

module.exports.updateOneCellar = function(req, res) {
  if (!req.params.cellarid) {
    jsonResponse(res, 404, {
      "message": "Cellar ID is required to update document"
    });
    return;
  }
  Cellar.findById(req.params.cellarid)
        .select('-beers')
        .exec(
          function(err, cellar) {
            if (!cellar) {
              jsonResponse(res, 404, {
                "message" : "That cellar id was not found"
              });
              return
            } else if (err) {
              jsonResponse(res, 400, err);
              return;
            }
            cellar.username = req.body.username;
            cellar.save(function(err, cellar) {
              if (err) {
                jsonResponse(res, 404, err);
              } else {
                jsonResponse(res, 200, cellar);
              }
            });
          }
        );
      };

module.exports.deleteOneCellar = function(req, res) {
  var cellarid = req.params.cellarid;
  if (cellarid) {
    Cellar.findByIdAndRemove(cellarid)
          .exec(
            function(err, cellar){
              if (err) {
                jsonResponse(res, 404, err);
                return;
              }
              jsonResponse(res, 204, null);
            }
          );
    } else {
      jsonResponse(res, 404, {
        "message": "No cellar ID in your request"
      });
    }
  };
