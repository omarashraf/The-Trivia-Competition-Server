var express = require("express");
var app = express();
var cors = require('cors');
const validate = require('express-validation');

var User = require("../models/user");
var userCtrl = require("../controllers/user_ctrl");
var userValidation = require("../validations/user_validations");

const router = express.Router();
/*
  - get the ranking of a certain number of players
*/
router.route('/leaderboard')
    .get(userCtrl.getLeaderboard);

/*
  - update score of specific user
*/
router.route('/:email/score')
    .put(userCtrl.updateScore);

/*
  - get a specific user using email
*/
router.route('/:email')
    .get(userCtrl.getUser);

module.exports = router;
