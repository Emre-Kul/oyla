const express = require('express');
const registerRouter = express.Router();
const authController = require('../controllers/authController.js');

registerRouter.get('/', authController.registerGet);
registerRouter.post('/',authController.registerPost);

module.exports = registerRouter;