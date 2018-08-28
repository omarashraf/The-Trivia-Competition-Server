var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required:true,
    index: true,
  },
  score: {
    type: Number
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
