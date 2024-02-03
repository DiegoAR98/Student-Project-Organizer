const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
  {
    // Defining the 'id' column as an integer, primary key, auto-incrementing
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Defining the 'name' column as a string, cannot be null
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Defining the 'description' column as text, cannot be null
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // Defining the 'deadline' column to store date, cannot be null
    deadline: {
      type: DataTypes.DATE,
      allowNull: false
    },
    // Defining the 'status' column as a string, cannot be null, default value 'active'
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active' // Default status for new projects
    },
    // Defining the 'ownerId' column as an integer, foreign key referencing 'Users' table
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', // Reference to the Users table
        key: 'id' // The column in the Users table that ownerId refers to
      }
    },
    // Automatically managed 'createdAt' and 'updatedAt' fields
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = Project