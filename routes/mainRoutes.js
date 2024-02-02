// routes/index.js or routes/mainRoutes.js

const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.showMainPage);

module.exports = router;
