const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
