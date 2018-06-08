var express = require("express");
var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost:27017/riseup_db";

var app = express();
var cors = require('cors');
var bodyParser = require("body-parser");

var User = require("./models/user");
var userCtrl = require("./controllers/user_ctrl");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// endpoint for testing
app.get("/", userCtrl.testEndpoint);

/*
  - get the ranking of a certain number of players
  - need to have the number of top players (in the body of the request) required to be returned
*/
app.post("/leaderboard", userCtrl.getLeaderboard);

/*
  - get a specific user
  - need to have the username in the body of the request
*/
app.post('/user', userCtrl.getUser);

/*
  - update score of specific user
  - need to have the score in the body of the request
*/
app.put("/score", userCtrl.updateScore);

/*
  - add a new user in the db
  - need to have the username in the body of the request
  - score is set to 0 initially
*/
app.post("/register", userCtrl.registerUser);

// app is running on port 3000
// TODO: set port among env variables
app.listen(3000, function() {
  console.log("Listening on port 3000..");
});

// db connection through mongoose and printing status in console
mongoose.connect(mongoDB, function(err, res) {
  if (err) {
    console.log("Error --> "+ err);
  }
  else {
    console.log("Succeeded DB connection");
  }
});