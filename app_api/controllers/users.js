var mongoose = require('mongoose');
var User = require('../models/User');


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

module.exports.listUsers = function(req, res) {
  User.find(function(err, users) {
    if (err) {
      res.json(errorResponse(err));
    } else {
      res.json(users);
    }
  });
};

// module.exports.createUser = function(req, res) {
//   Cellar.create({
//     username: req.body.username
//   }, function(err, cellar){
//     if (err) {
//       jsonResponse(res, 400, err);
//     } else {
//       jsonResponse(res, 201, cellar);
//     }
//   });
// };

module.exports.listOneUser = function (req, res) {
  if (req.params && req.params.userid) {
    User.findById(req.params.userid)
          .exec(function(err, user) {
      if (!user) {
        jsonResponse(res, 404, {
          "message" : "Sorry, we can\t find that user!"
        });
        return;
      } else if (err) {
        jsonResponse(res, 404, err);
        return;
      }
      jsonResponse(res, 200, user);
    });
  } else {
    jsonResponse(res, 404, {
      "message" : "No User ID in the server request"
    });
  }
};

module.exports.updateOneUser = function(req, res) {
  if (!req.params.userid) {
    jsonResponse(res, 404, {
      "message": "User ID is required to update document"
    });
    return;
  }
  User.findById(req.params.userid)
        .select('-beers')
        .exec(
          function(err, user) {
            if (!user) {
              jsonResponse(res, 404, {
                "message" : "That userid was not found"
              });
              return
            } else if (err) {
              jsonResponse(res, 400, err);
              return;
            }
            user.username = req.body.username;
            user.save(function(err, user) {
              if (err) {
                jsonResponse(res, 404, err);
              } else {
                jsonResponse(res, 200, user);
              }
            });
          }
        );
      };

module.exports.deleteOneUser= function(req, res) {
  var userid = req.params.userid;
  if (userid) {
    User.findByIdAndRemove(userid)
          .exec(
            function(err, user){
              if (err) {
                jsonResponse(res, 404, err);
                return;
              }
              jsonResponse(res, 204, null);
            }
          );
    } else {
      jsonResponse(res, 404, {
        "message": "No user ID in your request"
      });
    }
  };
