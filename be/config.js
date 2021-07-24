const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    dbConnectionString: process.env.DB_CONNECTION_STRING,
};
   