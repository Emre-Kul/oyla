const express = require('express');
const registerRouter = express.Router();
const authController = require('../controllers/authController.js');

registerRouter.get('/', authController.authControl, authController.registerGet);
registerRouter.post('/', authController.authControl, authController.registerPost);

module.exports = registerRouter;