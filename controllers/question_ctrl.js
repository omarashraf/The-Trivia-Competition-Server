var Question = require('../models/question');

function getQuestions(req, res) {
    Question.find({}, (err, questions) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(questions);
        }
    });
}
function getQuestionsByGenre(req, res) {
    Question.find({genre: req.params.genre}, (err, questions) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.send(questions);
        }
    });
}
function deleteQuestion(req, res) {
    Question.findByIdAndRemove(req.params.id, (err, question) => {
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
    var question = new Question(req.body);
    question.save((err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).send(question);
        }
    });
}
function updateQuestion(req, res) {
    Question.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, question) => {
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
    Question.find().distinct('genre', (err, genres) => {
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
    addQuestion,
    getQuestions,
    updateQuestion,
    deleteQuestion,
    getGenres,
    getQuestionsByGenre
}