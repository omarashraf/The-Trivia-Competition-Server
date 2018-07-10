const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


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
    required:true,
    index: true,
  },
  password:
  {
    type: String,
    required:true,
  }
});

adminSchema.pre("save", ()=>
{
  console.log("save")
  const admin = this;
  if (true)
  {
    console.log("hash")
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(admin.password, salt, (err, hash) => {
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
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
