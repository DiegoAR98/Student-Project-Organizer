// Import Sequelize Model class and DataTypes
const { Model, DataTypes } = require('sequelize');
// Import sequelize connection
const sequelize = require('../config/connection');
// Define Comment model class by extending Sequelize Model
class Comment extends Model {}
// Initialize Comment model with schema definition
Comment.init(
  {
    // Column definition for comment ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Column definition for the body of the comment
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Column for the creation date of the comment with default value as current date/time
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Foreign key linking to the User model (user_id)
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the 'user' table
        key: 'id', // Specifies the column in the referenced table
      },
    },
    // Foreign key linking to the Post model (post_id)
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post', // References the 'post' table
        key: 'id', // Specifies the column in the referenced table
      },
    },
  },
  {
    // Connection instance for the model
    sequelize,
    // Disables automatic timestamp fields creation
    timestamps: false,
    // Prevents Sequelize from pluralizing table name
    freezeTableName: true,
    // Enables snake_case naming convention in DB fields
    underscored: true,
    // Sets the model name
    modelName: 'comment',
  }
);
// Export the Comment model for use in the application
module.exports = Comment;


