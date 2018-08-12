//loads environment variables from a .env file into process.env
require("dotenv").config();
const ENV = process.env;

const config = 
{
    jwtSecret: ENV.JWT_SECRET,
    defaultPassword: ENV.DEFAULT_PASSWORD,
    adminLoginUrl: ENV.ADMIN_LOGIN_URL,
    env: ENV.ENVIRONMENT,
    port: ENV.PORT,
    mongoDB: ENV.MONGODB,
    dbHost: ENV.DB_HOST,
    dbName: ENV.DB_NAME
};

module.exports = config;