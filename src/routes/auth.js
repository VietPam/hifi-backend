const express = require('express');

const router = express.Router();
const {authController} = require('../controllers/user');
const {protect} = require('../controllers/user');

router.post('/login',authController.login);

module.exports = router;