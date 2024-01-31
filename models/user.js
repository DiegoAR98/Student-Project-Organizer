const { Model, DataTypes } = require('sequelize');

// Exporting a function that defines the User model
module.exports = (sequelize) => {
  // Defining the User class which extends Sequelize's Model class
  class User extends Model {}

  // Initializing the User model with its schema definition
  User.init({
    // Defining the 'id' column as an integer, primary key, auto-incrementing
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Defining the 'username' column as a unique string, cannot be null
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // Defining the 'email' column as a unique string, cannot be null, must be a valid email format
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validator to ensure the email is in valid format
      },
    },
    // Defining the 'passwordHash' column to store hashed passwords, cannot be null
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize, // Associating this model with the Sequelize instance
    modelName: 'User' // Setting the name of the model
  });

  // Returning the User model
  return User;
};
