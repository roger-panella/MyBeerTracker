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
  jsonResponse(res, 200, {"status" : "success"});
};

module.exports.deleteOneCellar = function(req, res) {
  jsonResponse(res, 200, {"status" : "success"});
};
