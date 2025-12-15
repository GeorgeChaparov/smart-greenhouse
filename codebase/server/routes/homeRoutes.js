const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const requireLogin = require('../middleware/authMiddleware');

router.get('/', requireLogin, homeController.showHomePage);

module.exports = router;

