const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// REST endpoints
router.get('/login', authController.showLoginPage);
router.post('/login', authController.loginUser);

router.get('/register', authController.showRegisterPage);
router.post('/register', authController.registerUser);

router.get('/logout', authController.logoutUser);

module.exports = router;
