// Import User model
const User = require('./User');
// Import Post model
const Post = require('./Post');
// Import Comment model
const Comment = require('./Comment');

// Establish a one-to-many relationship between User and Post
User.hasMany(Post, {
  foreignKey: 'user_id', // Foreign key in the Post model
  onDelete: 'CASCADE' // Delete posts when the user is deleted
});

// Establish a many-to-one relationship between Post and User
Post.belongsTo(User, {
  foreignKey: 'user_id' // Foreign key in the Post model
});

// Establish a one-to-many relationship between User and Comment
User.hasMany(Comment, {
  foreignKey: 'user_id', // Foreign key in the Comment model
  onDelete: 'CASCADE' // Delete comments when the user is deleted
});

// Establish a many-to-one relationship between Comment and User
Comment.belongsTo(User, {
  foreignKey: 'user_id' // Foreign key in the Comment model
});

// Establish a one-to-many relationship between Post and Comment
Post.hasMany(Comment, {
  foreignKey: 'post_id', // Foreign key in the Comment model
  onDelete: 'CASCADE' // Delete comments when the post is deleted
});

// Establish a many-to-one relationship between Comment and Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id' // Foreign key in the Comment model
});

// Export models with established relationships
module.exports = { User, Post, Comment };
