const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController.js');

adminRouter.get('/dashboard/', adminController.dashboardGet);

adminRouter.get('/user/', adminController.userGet);

adminRouter.get('/survey', adminController.surveyGet);

module.exports = adminRouter;