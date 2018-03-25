const express = require('express');
const surveyRouter = express.Router();
const surveyController = require('../controllers/surveyController.js');

surveyRouter.get('/create', surveyController.newSurvey);
surveyRouter.post('/create', surveyController.createSurvey);
surveyRouter.get('/:surveyId', surveyController.showSurvey);

module.exports = surveyRouter;