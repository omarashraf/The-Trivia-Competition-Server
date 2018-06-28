var User = require("../models/user");
const MailService = require("../services/mail_service");

function testEndpoint(req, res) {
    res.send("Homepage");
}

function getLeaderboard(req, res) {
    User.find({}).sort({score: -1}).limit(parseInt(req.body.limit)).exec(function(err, docs) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        res.send(docs);
      }
    });
}

function getUser(req, res) {
    User.findOne({ email: req.query.email }, function(err, user) {
        if (err) {
          res.status(400).send(err);
        }
        else {
          if(user) {
            user = generateVerificationCode(user);
            // res.send(user);
          }else {
            res.send(user)
          }
          
        }
    })
}

function updateScore(req, res) {
    var score = {
      score: req.body.score
    }
  
    User.findOneAndUpdate({ email: req.body.email}, score, {new: true}, function(err, user) {
     if (err) {
       res.status(400).send(err);
     }
     else {
        res.send(user);
     }
    });
}

function registerUser(req, res) {
  console.log(req.body);
    var user = new User ({
      email: req.body.email,
      score: 0
    });
    user.save(function(err) {
      if (err) {
        res.status(400).send(err);
      }
      else {
        user = generateVerificationCode(user);
        return res.send(user);
      }
    });
}

function generateVerificationCode(user) {
  user = JSON.parse(JSON.stringify(user));
  verificationCode = Math.floor(1000 + Math.random() * 10000);
  MailService.sendEmail(user['email'],
    'Welcome to Trivia Competition',
    'Your Verification Code is '+verificationCode
  );
  user["verificationCode"] = verificationCode;
  return user;
}

module.exports = {
    testEndpoint,
    getLeaderboard,
    getUser,
    updateScore,
    registerUser
}