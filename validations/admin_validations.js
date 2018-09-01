const Joi = require('joi');
module.exports = {
    changePassword: {
        body: {
            password: Joi.string().required(),
            new_password: Joi.string().required().min(6).max(15),
            confirm_password: Joi.string().required().min(6).max(15),
        }
    }
}