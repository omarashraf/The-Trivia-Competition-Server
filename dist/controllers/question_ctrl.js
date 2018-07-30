"use strict";

var Question = require('../models/question');

function getQuestions(req, res) {
    console.log("FETCHING ALL QUESTIONS");
    Question.find({}, function (err, questions) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(questions);
        }
    });
}
function getQuestionsByGenre(req, res) {
    console.log("FETCHING QUESTIONS BY GENRE ");
    Question.find({ genre: req.params.genre }, function (err, questions) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(questions);
        }
    });
}
function deleteQuestion(req, res) {
    console.log("DELETING QUESTION");
    Question.findByIdAndRemove(req.params.id, function (err, question) {
        if (err) {
            res.status(400).send(err);
        } else {
            if (!question) {
                res.status(404).send({
                    "message": "Not Found"
                });
            } else {
                res.status(204).send();
            }
        }
    });
}
function addQuestion(req, res) {
    console.log("ADDING QUESTION");
    var question = new Question(req.body);
    question.save(function (err) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).send(question);
        }
    });
}
function updateQuestion(req, res) {
    console.log("UPDATING QUESTION");
    Question.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, question) {
        if (err) {
            res.status(400).send(err);
        } else {
            if (!question) {
                res.status(404).send({
                    "message": "Not Found"
                });
            } else {
                res.send(question);
            }
        }
    });
}
function getGenres(req, res) {
    console.log("FETCHING GENRES");
    Question.find().distinct('genre', function (err, genres) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send({
                'genres': genres
            });
        }
    });
}

module.exports = {
    addQuestion: addQuestion,
    getQuestions: getQuestions,
    updateQuestion: updateQuestion,
    deleteQuestion: deleteQuestion,
    getGenres: getGenres,
    getQuestionsByGenre: getQuestionsByGenre
};
//# sourceMappingURL=question_ctrl.js.map
