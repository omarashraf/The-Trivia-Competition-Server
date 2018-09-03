var mongoose = require("mongoose");

var timerSchema = new mongoose.Schema({
  timer: {
    type: String,
    lowercase: true,
    unique: true,
    required:true,
    index: true,
  },
  createdAt:{ type: Date
  }
});

var Timer = mongoose.model('Timer', timerSchema);

module.exports = Timer;