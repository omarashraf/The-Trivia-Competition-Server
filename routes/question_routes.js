var express = require("express");
var app = express();
var cors = require('cors');
var expressJwt = require('express-jwt');
const config = require("../config/config");
const validate = require('express-validation');
var questionCtrl = require("../controllers/question_ctrl");
var questionValidation = require("../validations/question_validations");
const router = express.Router();

router.route('')
    .get(expressJwt({secret: config.jwtSecret}), questionCtrl.getQuestions)
    .post( validate(questionValidation.addQuestion),questionCtrl.addQuestion);
router.route('/genres')
    .get(expressJwt({secret: config.jwtSecret}), questionCtrl.getGenres)
router.route('/timer')
    .get(expressJwt({secret: config.jwtSecret}), questionCtrl.getTimer)

router.route('/:genre')
.get(expressJwt({secret: config.jwtSecret}), questionCtrl.getQuestionsByGenre);
router.route('/:id')
.delete(expressJwt({secret: config.jwtSecret}), validate(questionValidation.deleteQuestion), questionCtrl.deleteQuestion)
.put(expressJwt({secret: config.jwtSecret}), validate(questionValidation.addQuestion), questionCtrl.updateQuestion);



module.exports = router;