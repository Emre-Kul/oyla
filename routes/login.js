const express = require('express');
const loginRouter = express.Router();
const authController = require('../controllers/authController.js');

loginRouter.get('/', authController.authControl, authController.loginGet);
loginRouter.post('/', authController.authControl, authController.loginPost);

module.exports = loginRouter;