const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');

authRouter.get('/register/', authController.authControl, authController.registerGet);
authRouter.post('/register/', authController.authControl, authController.registerPost);

authRouter.get('/login/', authController.authControl, authController.loginGet);
authRouter.post('/login/', authController.authControl, authController.loginPost);

authRouter.get('/logout/', authController.logoutGet);

module.exports = authRouter;