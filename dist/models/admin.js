"use strict";

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var adminSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true
  }
});

adminSchema.pre('save', function (next) {
  var admin = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(admin.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        admin.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

adminSchema.methods.comparePassword = function (pw, cb) {
  bcrypt.compare(pw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
//# sourceMappingURL=admin.js.map
