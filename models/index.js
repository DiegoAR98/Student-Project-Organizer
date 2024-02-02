// Configuring dotenv to load environment variables
require('dotenv').config();

// Importing the Sequelize library and model definitions
const Sequelize = require('sequelize');
const UserModel = require('./user');
const ProjectModel = require('./project');


// Creating a Sequelize instance using environment variables for configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name from environment variable
  process.env.DB_USER,       // Database username from environment variable
  process.env.DB_PASSWORD,   // Database password from environment variable
  {
    host: process.env.DB_HOST, // Database host from environment variable
    dialect: 'mysql'            // Specifying the use of MySQL database
  }
);

// Initializing the User and Project models using the Sequelize instance
const User = UserModel(sequelize);
const Project = ProjectModel(sequelize);

// Defining model associations
User.hasMany(Project);     // A User can have many Projects
Project.belongsTo(User);   // A Project belongs to a single User

// Synchronizing the Sequelize models with the database
sequelize.sync({ force: false })  // 'force: false' ensures no data loss by not recreating tables
  .then(() => {
    console.log('Database & tables created!'); // Logging once the sync is complete
  });

// Exporting the initialized User and Project models
module.exports = {
  User,
  Project
};
