var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});
