const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: { // Assuming this is the assignment title
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: { // Assuming this is the detailed description
      type: DataTypes.TEXT, // Changed to TEXT for longer descriptions
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('high', 'medium', 'low'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('in progress', 'completed'),
      allowNull: false,
      defaultValue: 'in progress',
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date_updated: {
      type: DataTypes.DATE,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Enabling automatic management of createdAt and updatedAt
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
