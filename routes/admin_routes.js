var expressJwt = require('express-jwt');
var express = require("express");
var app = express();
var cors = require('cors');
const validate = require('express-validation');
const config = require("../config/config");
var adminCtrl = require("../controllers/admin_ctrl");
var questionCtrl = require("../controllers/question_ctrl");
var adminValidation = require("../validations/admin_validations")

const router = express.Router();

router.route('/login')
    .post(adminCtrl.loginAdmin);

router.route('/register')
    .post(adminCtrl.registerAdmin);

router.route('/invite')
    .post(expressJwt({ secret: config.jwtSecret }), adminCtrl.inviteAdmin);

router.route('/setTimer')
    .post(expressJwt({ secret: config.jwtSecret }), questionCtrl.addTimer);

router.route('/stats')
    .get(expressJwt({ secret: config.jwtSecret }), adminCtrl.stats);

router.route('/change-password')
    .post(expressJwt({ secret: config.jwtSecret }), validate(adminValidation.changePassword), adminCtrl.changePassword);

module.exports = router;
