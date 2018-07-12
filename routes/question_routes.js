var express = require("express");
var app = express();
var cors = require('cors');
const validate = require('express-validation');
var questionCtrl = require("../controllers/question_ctrl");
var questionValidation = require("../validations/question_validations");
const router = express.Router();

router.route('')
    .get(questionCtrl.getQuestions)
    .post(validate(questionValidation.addQuestion),questionCtrl.addQuestion);
router.route('/genres')
    .get(questionCtrl.getGenres);
router.route('/:genre')
.get(questionCtrl.getQuestionsByGenre);
router.route('/:id')
.delete(validate(questionValidation.deleteQuestion), questionCtrl.deleteQuestion)
.put(validate(questionValidation.addQuestion), questionCtrl.updateQuestion);


module.exports = router;