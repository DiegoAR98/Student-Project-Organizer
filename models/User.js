// Import necessary modules from sequelize and bcrypt for password hashing
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define User model extending Sequelize's Model class
class User extends Model {
  // Method to check password validity
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize User model with schema definition
User.init(
  {
    // User ID field, auto-incremented, serves as the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Username field, required
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Password field, required, with minimum length validation
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Minimum password length is 8 characters
      },
    },
  },
  {
    // Lifecycle hooks for hashing password before creating/updating User records
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash password with bcrypt before creating
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); // Hash password with bcrypt before updating
        return updatedUserData;
      },
    },
    sequelize, // Database connection
    timestamps: false, // Disables automatic creation of createdAt and updatedAt fields
    freezeTableName: true, // Prevents sequelize from pluralizing the table name
    underscored: true, // Enforces the use of underscored naming conventions in DB columns
    modelName: 'user', // Name of the model
  }
);

// Export the User model for use elsewhere in the application
module.exports = User;
