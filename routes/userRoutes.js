const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/usersController');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
