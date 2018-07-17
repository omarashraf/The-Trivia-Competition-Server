require("dotenv").config();
const ENV = process.env;

const config = 
{
    jwtSecret: ENV.JWT_SECRET
};

module.exports = config;