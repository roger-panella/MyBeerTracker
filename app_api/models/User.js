var mongoose = require('mongoose');
var passport = require('passport-local-mongoose');


var User = new mongoose.Schema ({
  username: String,
  password: String
});

User.plugin(passport);

module.exports = mongoose.model('User', User);
