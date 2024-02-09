// Require Express router
const router = require('express').Router();
// Import user routes
const userRoutes = require('./userRoutes');
// Import post routes
const postRoutes = require('./postRoutes');
// Import comment routes
const commentRoutes = require('./commentRoutes');
// Use userRoutes for '/users' endpoint
router.use('/users', userRoutes);
// Use postRoutes for '/posts' endpoint
router.use('/posts', postRoutes);
// Use commentRoutes for '/comments' endpoint
router.use('/comments', commentRoutes);
// Export configured router
module.exports = router;