'use strict';

var Joi = require('joi');
module.exports = {
    register: {
        body: {
            email: [Joi.string().required().regex(/^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(dell|emc)\.com$/)]
        }
    }
};
//# sourceMappingURL=user_validations.js.map
