const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');

const authHelper = require('../helpers/authHelper.js');

authRouter.get('/register/', authHelper.isNotLogined, authController.registerGet);
authRouter.post('/register/', authHelper.isNotLogined, authController.registerPost);

authRouter.get('/login/', authHelper.isNotLogined, authController.loginGet);
authRouter.post('/login/', authHelper.isNotLogined, authController.loginPost);

module.exports = authRouter;