var express = require("express");
var app = express();
var cors = require('cors');
const validate = require('express-validation');

var Admin = require("../models/admin");
var AdminCtrl = require("../controllers/admin_ctrl");

const router = express.Router();
/*
  - get the ranking of a certain number of players
*/
router.route('/login')
    .post(AdminCtrl.loginAdmin);

router.post("/register", AdminCtrl.registerAdmin);

module.exports = router;
