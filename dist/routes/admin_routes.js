'use strict';

var expressJwt = require('express-jwt');
var express = require("express");
var app = express();
var cors = require('cors');
var validate = require('express-validation');
var config = require("../config/config");

var Admin = require("../models/admin");
var AdminCtrl = require("../controllers/admin_ctrl");

var router = express.Router();

router.route('/login').post(AdminCtrl.loginAdmin);

router.route('/register').post(AdminCtrl.registerAdmin);

router.route('/invite').post(expressJwt({ secret: config.jwtSecret }), AdminCtrl.inviteAdmin);

router.route('/stats').get(expressJwt({ secret: config.jwtSecret }), AdminCtrl.stats);

module.exports = router;
//# sourceMappingURL=admin_routes.js.map
