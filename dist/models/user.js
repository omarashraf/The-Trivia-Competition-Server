"use strict";

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   lowercase: true,
  //   required: true,
  //   index: true,
  //   unique: true
  // },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: true
  },
  score: {
    type: Number
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
//# sourceMappingURL=user.js.map
