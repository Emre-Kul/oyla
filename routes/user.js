const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController.js');
//const authController = require('../controllers/authController.js');

userRouter.get('/profile', userController.userProfileGet);
userRouter.post('/profile', userController.userProfilePost);

userRouter.get('/survey', userController.userSurveyGet);
userRouter.get('/survey', userController.userSurveyPost);

userRouter.get('/setting',userController.userSettingGet);
userRouter.post('/setting',userController.userSettingPost);

userRouter.get('/logout', userController.logoutGet);

module.exports = userRouter;