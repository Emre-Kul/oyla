const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController.js');

const authHelper = require('../helpers/authHelper.js');

adminRouter.get('/dashboard/', authHelper.isLogined,authHelper.isAdmin, adminController.dashboardGet);

adminRouter.get('/user/', authHelper.isLogined,authHelper.isAdmin, adminController.userGet);

adminRouter.get('/survey', authHelper.isLogined,authHelper.isAdmin, adminController.surveyGet);

module.exports = adminRouter;