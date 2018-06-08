var User = require("../models/user");

function testEndpoint(req, res) {
    res.send("Homepage");
}

function getLeaderboard(req, res) {
    User.find({}).sort({score: -1}).limit(parseInt(req.body.limit)).exec(function(err, docs) {
      if (err) {
        res.send(err);
      }
      else {
        res.send(docs);
      }
    });
}

function getUser(req, res) {
    User.find({ username: req.body.username }, function(err, user) {
        if (err) {
        res.send('err --> ', err);
        }
        else {
        res.send(user);
        }
    })
}

function updateScore(req, res) {
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
}

function registerUser(req, res) {
    var user = new User ({
      username: req.body.username,
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
}

module.exports = {
    testEndpoint,
    getLeaderboard,
    getUser,
    updateScore,
    registerUser
}