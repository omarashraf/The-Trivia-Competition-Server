var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true
  }
  
});

var Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
