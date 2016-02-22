var mongoose = require('mongoose');
var passport = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

var beerSchema = new mongoose.Schema({
  brewery: {type: String},
  beer: {type: String},
  style: String,
  date: String,
  quantity: Number,
  forTrade: String
});

var User = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  apiToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  beers: [beerSchema]
});

User.pre('save', function(next){
  var user = this;
  var SALT_FACTOR = 10;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt){
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) return cb(err);
    cb(null, isMatch);
  });
};





User.plugin(passport);

module.exports = mongoose.model('Beer', beerSchema);
module.exports = mongoose.model('User', User);
