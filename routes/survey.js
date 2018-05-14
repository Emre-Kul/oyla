const express = require('express');
const surveyRouter = express.Router();
const surveyController = require('../controllers/surveyController.js');

const authHelper = require('../helpers/authHelper.js');

surveyRouter.get('/create', authHelper.isLogined, surveyController.createSurveyGet);
surveyRouter.post('/create', authHelper.isLogined, surveyController.createSurveyPost);
surveyRouter.get('/:surveyId', surveyController.showSurveyGet);
surveyRouter.post('/:surveyId', surveyController.submitSurveyPost);

module.exports = surveyRouter;