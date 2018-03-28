const express = require('express');
const surveyRouter = express.Router();
const surveyController = require('../controllers/surveyController.js');

surveyRouter.get('/create', surveyController.createSurveyGet);
surveyRouter.post('/create', surveyController.createSurveyPost);
surveyRouter.get('/:surveyId', surveyController.showSurveyGet);

module.exports = surveyRouter;