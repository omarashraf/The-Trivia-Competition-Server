var mongoose = require("mongoose");
var mongoDB = "mongodb://10.207.85.122:27017/riseup_db";
var Question = require("./models/question.js");

mongoose.connect(mongoDB, function(err, res) {
  if (err) {
    console.log("Error --> "+ err);
  }
  else {
    console.log("Succeeded DB connection");
    // populate questions here
    var dummyQuestion = new Question({
      question: "How many type faces?",
      a: "0",
      b: "1",
      c: "no limit",
      d: "7",
      correct_answer: "no limit"
    });

    dummyQuestion.save(function(err) {
      if (err) throw err;
      console.log("Question saved..");
      console.log(dummyQuestion);
    });
  }
});
