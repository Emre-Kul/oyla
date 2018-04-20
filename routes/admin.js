const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController.js');

adminRouter.get('/dashboard/', adminController.dashboardGet);

module.exports = adminRouter;