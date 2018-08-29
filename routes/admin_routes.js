var expressJwt = require('express-jwt');
var express = require("express");
var app = express();
var cors = require('cors');
const validate = require('express-validation');
const config = require("../config/config");

var Admin = require("../models/admin");
var AdminCtrl = require("../controllers/admin_ctrl");

const router = express.Router();

router.route('/login')
    .post(AdminCtrl.loginAdmin);

router.route('/register')
    .post(AdminCtrl.registerAdmin);

router.route('/invite')
    .post(expressJwt({secret: config.jwtSecret}), AdminCtrl.inviteAdmin);

router.route('/setTimer')
    .post(AdminCtrl.addTimer);

router.route('/stats')
    .get( AdminCtrl.stats);

module.exports = router;
