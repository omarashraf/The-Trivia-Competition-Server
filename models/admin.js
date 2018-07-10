const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var AdminSchema = new mongoose.Schema({
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
    unique: true,
    required:true,
    index: true,
  }
});

AdminSchema.pre("save", ()=>
{
  const admin = this;
  if (this.isModified("password") || this.isNew)
  {
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

AdminSchema.methods.comparePassword = function(pw, cb)
{
  bcrypt.compare(pw, this.password, (err, isMatch)=>
  {
    if (err)
    {
      return cb(err);
    }
    cb(null, isMatch);
  });
}

var Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
