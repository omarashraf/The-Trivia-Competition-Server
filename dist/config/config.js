"use strict";

//loads environment variables from a .env file into process.env
require("dotenv").config();
var ENV = process.env;

var config = {
    jwtSecret: ENV.JWT_SECRET,
    defaultPassword: ENV.DEFAULT_PASSWORD,
    adminLoginUrl: ENV.ADMIN_LOGIN_URL
};

module.exports = config;
//# sourceMappingURL=config.js.map
