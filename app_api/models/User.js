var mongoose = require('mongoose');
var passport = require('passport-local-mongoose');

var beerSchema = new mongoose.Schema({
  brewery: {type: String},
  beer: {type: String},
  style: String,
  date: String,
  quantity: Number,
  forTrade: String
});

var User = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  apiToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  beers: [beerSchema]
});

User.plugin(passport);

module.exports = mongoose.model('Beer', beerSchema);
module.exports = mongoose.model('User', User);
