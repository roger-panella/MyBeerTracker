var mongoose = require('mongoose');
var User = require('../models/User')

var jsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.createBeers = function (req, res) {
  var userid = req.params.userid;
  if (userid) {
    console.log('---------User');
    console.log('User');
  User.findById(userid).select('beers')
       .exec(
         function(err, user){
           if (err){
             jsonResponse(res, 400, err);
           } else {
             doAddBeer(req, res, user);
           }
         }
       );
     } else {
       jsonResponse(res, 404, {
         "message": "Not found"
       });
     };
   };


var doAddBeer = function(req, res, user) {
  if (!user) {
    jsonResponse(res, 404, {
      "message" : "No user ID found"
      });
     } else {
         user.beers.push({
           brewery: req.body.brewery,
           beer: req.body.beer,
           style: req.body.style,
           date: req.body.date,
           quantity: req.body.quantity,
           forTrade: req.body.forTrade
          });
          user.save(function(err, user){
            var thisBeer;
            if (err) {
              jsonResponse(res, 400, err);
             } else {
               thisBeer = user.beers[user.beers.length - 1];
               jsonResponse(res, 201, thisBeer);
              }
           });
         }
       };

module.exports.listOneBeer = function(req, res) {
  if (req.params && req.params.userid && req.params.beerid) {
    User.findById(req.params.userid)
          .select('username beers')
          .exec(
            function(err, user) {
              var response, beer;
              if (!user) {
               jsonResponse(res, 404, {
                 "message" : "We cant find a user id that contains that beer."
               });
              return;
            } else if (err) {
              jsonResponse(res, 400, err);
              return;
            }
            if (user.beers && user.beers.length > 0) {
              beer = user.beers.id(req.params.beerid);
              if (!beer) {
                jsonResponse(res, 404, {
                  "message": "We cant find that beer id"
                });
              } else {
                response = {
                  user : {
                    username : user.username,
                    id : req.params.userid
                  },
                  beer : beer
                };
                jsonResponse(res, 200, response);
              }
            } else {
              jsonResponse(res, 404, {
                "message" : "We cant find any beers for that user"
              });
            }
          }
      );
    } else {
      jsonRespone(res, 404, {
        "message" : "Not found.  User and Beer ID are both required"
      });
    }
  };

module.exports.updateOneBeer = function(req, res) {
  if (!req.params.userid || !req.params.beerid) {
    jsonResponse(res, 404, {
      "message": "Not found.  Both user id and beer id are required"
    });
    return;
  }
  User.findById(req.params.userid)
        .select('beers')
        .exec(
          function(err, user) {
            var thisBeer;
          if (!user) {
            jsonResponse(res, 404, {
              "message": "User ID not found"
            });
            return;
          }
          if (user.beers && user.beers.length > 0) {
            thisBeer = user.beers.id(req.params.beerid);
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
              user.save(function(err, user){
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
  if (!req.params.userid || !req.params.userid){
    jsonResponse(res, 404, {
      "message" : "Not found. Both user and beer ID are required"
    });
    return;
  } User.findById(req.params.userid)
          .select('beers')
          .exec(
            function(err, user) {
              if (!user) {
                jsonResponse(res, 404, {
                  "message": "userid not found"
                });
                return;
              } else if(err) {
                jsonResponse(res, 400, err);
                return;
              }
              if (user.beers && user.beers.length > 0) {
                if (!user.beers.id(req.params.beerid)) {
                  jsonResponse(res, 404, {
                    "message": "beer ID not found"
                  });
                } else {
                  user.beers.id(req.params.beerid).remove();
                  user.save(function(err){
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
