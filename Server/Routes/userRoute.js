const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController');

router.post('/register', UserController.signupValidators, UserController.registerUser);
router.post('/login', UserController.loginUser);

module.exports = router;