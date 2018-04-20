const express = require('express');
const errorRouter = express.Router();
const errorController = require('../controllers/errorController.js');

errorRouter.get('/404/', errorController.error404Get);
errorRouter.get('/500/', errorController.error500Get);

module.exports = errorRouter;