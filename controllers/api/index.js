// Require Express router
const router = require('express').Router();
// Import user routes
const userRoutes = require('./userRoutes');
// Import post routes
const postRoutes = require('./postRoutes');
// Import comment routes
const commentRoutes = require('./commentRoutes');
// Use userRoutes for '/users' endpoint
r