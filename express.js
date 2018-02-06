var express = require("express");
var mongoose = require("mongoose");
var mongoDB = "mongodb://localhost:27017/riseup_db";
var bodyParser = require("body-parser");
var app = express();
var userCtrl = require("./controllers/user_ctrl");
var cors = require('cors');

var User = require("./models/user");
var Session = require("./models/session");

var InitDB = require('./create_db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(3000, function() {
  console.log("Listening on port 3000..");
});

mongoose.connect(mongoDB, function(err, res) {
  if (err) {
    console.log("Error --> "+ err);
  }
  else {
    console.log("Succeeded DB connection");
  }
  InitDB.initDB();
});

app.get("/", function(req, res) {
  res.send("Homepage");
});

// get the ranking of a certain number of players
app.post("/leaderboard", function(req, res) {
  User.find({}).sort({score: -1}).limit(req.body.limit).execFind(function(err, docs) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(docs);
    }
  });
});

// get a specific user
app.post('/user', function(req, res) {
  User.find({ username: req.body.username }, function(err, user) {
    if (err) {
      res.send('err --> ', err);
    }
    else {
      res.send(user);
    }
  })
});

// update score of specific user
app.put("/score", function(req, res) {
  var score = {
    score: req.body.score
  }

  User.findOneAndUpdate({ username: req.body.username}, score, {new: true}, function(err, user) {
   if (err) {
     res.send(err);
   }
   else {
      res.send(user);
   }
  });
});

// add a new user in the db + set the session
app.post("/register", function(req, res) {
  var user = new User ({
    username: req.body.username,
    email: req.body.email,
    score: 0
  });

  user.save(function(err) {
    if (err) {
      res.send("error");
    }
    else {
      res.send("ok");
    }
  });
});

// get the session record
app.get('/session', function(req, res) {
  Session.find({}).execFind(function(err, session) {
    if (err) {
      res.send("error");
    }
    else {
      res.send(session);
    }
  });
});

// update session
app.put("/session", function(req, res) {
  var newSession = {
    username: req.body.username,
    qIndex: req.body.qIndex
  };
  Session.findOneAndUpdate({}, newSession, {new: true}, function(err, user) {
   if (err) {
     res.send("err");
   }
   else {
      res.send(user);
   }
  });
});
