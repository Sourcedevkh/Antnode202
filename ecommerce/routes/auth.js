const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')
const {isLogin} = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', isLogin, authController.getMe)
router.delete('/logout', isLogin, authController.logout);


module.exports = router;