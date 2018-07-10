require("dotenv").config();
const ENV = process.env;

const config = 
{
    jwtSecrect: ENV.JWT_SECRET
};

export default config;