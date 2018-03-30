const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');

authRouter.get('/register/', authController.registerGet);
authRouter.post('/register/', authController.registerPost);

authRouter.get('/login/', authController.loginGet);
authRouter.post('/login/', authController.loginPost);

module.exports = authRouter;