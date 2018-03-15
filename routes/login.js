const express = require('express');
const loginRouter = express.Router();
const authController = require('../controllers/authController.js');

loginRouter.get('/', authController.loginGet);
loginRouter.post('/',authController.loginPost);

module.exports = loginRouter;