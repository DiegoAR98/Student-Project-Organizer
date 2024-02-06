// Import the Sequelize constructor from the sequelize package
const Sequelize = require('sequelize');
// Import dotenv package to use environment variables from the .env file
require('dotenv').config();

// Declare a variable to hold our sequelize instance
let sequelize;

// Check if the app is running on Heroku and has a JAWSDB_URL environment variable
if (process.env.JAWSDB_URL) {
  // If running on Heroku with JawsDB MySQL add-on, use the JAWSDB_URL to connect
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If running locally, configure sequelize to use a local MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name as defined in the .env file
    process.env.DB_USER, // Database user as defined in the .env file
    process.env.DB_PASSWORD, // Database password as defined in the .env file
    {
      host: 'localhost', // Database host, typically localhost for a local database
      dialect: 'mysql', // The database dialect to use. In this case, we're using MySQL
      port: 3306 // The port on which the MySQL database is running (default is 3306)
    }
  );
}

// Export the sequelize instance to be used in other parts of the application
module.exports = sequelize;
