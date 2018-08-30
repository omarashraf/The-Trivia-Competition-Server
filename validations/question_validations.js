const Joi = require('joi');
module.exports = {
    addQuestion: {
        body: {
            question: Joi.string().required(),
            a: Joi.string().required(),
            b: Joi.string().required(),
            c: Joi.string().required(),
            d: Joi.string().required(),
            correct_answer: Joi.string().required(),
            genre: Joi.string().required(),
        }
    },
    updateQuestion: {
        params: {
            id: [Joi.string().required()]
        }
    },
    deleteQuestion: {
        params: {
            id: [Joi.string().required()]
        }
    },
}