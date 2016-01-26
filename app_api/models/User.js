var mongoose = require('mongoose');
var passport = require('passport-local-mongoose');

var beerSchema = new mongoose.Schema({
  brewery: {type: String, required: true},
  beer: {type: String, required: true},
  style: String,
  date: String,
  quantity: Number,
  forTrade: Boolean
});

var User = new mongoose.Schema({
  username: String,
  password: String,
  beers: [beerSchema]
});

User.plugin(passport);

module.exports = mongoose.model('Beer', beerSchema);
module.exports = mongoose.model('User', User);
