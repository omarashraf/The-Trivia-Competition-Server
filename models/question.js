var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        index: true,
    },
    a: {
        type: String,
        required: true
    },
    b: {
        type: String,
        required: true
    },
    c: {
        type: String,
        required: true
    },
    d: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
    }
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;