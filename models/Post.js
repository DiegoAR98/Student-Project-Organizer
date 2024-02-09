// Import Sequelize Model class and DataTypes, and database connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define Post model by extending Sequelize Model
class Post extends Model {}

// Initialize Post model with schema definition
Post.init(
  {
    // Unique identifier for each post
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Title of the post
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Detailed description of the post, using TEXT type for longer content
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // Name of the course related to the post
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Due date for the assignment or task
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Priority level of the post (high, medium, low)
    priority: {
      type: DataTypes.ENUM('high', 'medium', 'low'),
      allowNull: false,
    },
    // Current status of the post (in progress, completed), defaults to 'in progress'
    status: {
      type: DataTypes.ENUM('in progress', 'completed'),
      allowNull: false,
      defaultValue: 'in progress',
    },
    // Date the post was created, defaults to the current date/time
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Date the post was last updated
    date_updated: {
      type: DataTypes.DATE,
    },
    // Foreign key linking to the user who created the post
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the 'user' table
        key: 'id',
      },
    },
  },
  {
    sequelize, // Database connection
    timestamps: true, // Enables Sequelize to manage createdAt and updatedAt fields automatically
    freezeTableName: true, // Prevents Sequelize from renaming the table
    underscored: true, // Enables snake_case naming convention in DB fields
    modelName: 'post', // Sets the model name
  }
);

// Export the Post model for use in the application
module.exports = Post;
