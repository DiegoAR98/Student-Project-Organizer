// Import Express router
const router = require('express').Router();
// Import API and home routes
const apiRoutes = require('./api/index.js');
const homeRoutes = require('./homeRoutes');
// Use homeRoutes for the base URL path
router.use('/', homeRoutes);
// Use apiRoutes for all routes under '/api'
router.use('/api', apiRoutes);
// Export the router to be used in the main application
module.exports = router;












