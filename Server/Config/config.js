
require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.SECRET_KEY,
    TOKEN_EXPIRESIN: process.env.TOKEN_EXPIRESIN,
    PORT: process.env.PORT 
};
