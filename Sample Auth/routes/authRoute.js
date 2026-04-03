const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.create);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers)

module.exports = router;