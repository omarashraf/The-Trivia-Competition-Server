'use strict';

var express = require("express");
var app = express();
var cors = require('cors');
var expressJwt = require('express-jwt');
var config = require("../config/config");
var validate = require('express-validation');
var questionCtrl = require("../controllers/question_ctrl");
var questionValidation = require("../validations/question_validations");
var router = express.Router();

router.route('').get(questionCtrl.getQuestions).post(expressJwt({ secret: config.jwtSecret }), validate(questionValidation.addQuestion), questionCtrl.addQuestion);
router.route('/genres').get(expressJwt({ secret: config.jwtSecret }), questionCtrl.getGenres);
router.route('/:genre').get(expressJwt({ secret: config.jwtSecret }), questionCtrl.getQuestionsByGenre);
router.route('/:id').delete(expressJwt({ secret: config.jwtSecret }), validate(questionValidation.deleteQuestion), questionCtrl.deleteQuestion).put(expressJwt({ secret: config.jwtSecret }), validate(questionValidation.addQuestion), questionCtrl.updateQuestion);

module.exports = router;
//# sourceMappingURL=question_routes.js.map
