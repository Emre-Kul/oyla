const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController.js');

const authHelper = require('../helpers/authHelper.js');

userRouter.get('/profile/:username', userController.userProfileByIdGet);

userRouter.get('/profile', authHelper.isLogined, userController.userProfileGet);
userRouter.post('/profile', authHelper.isLogined, userController.userProfilePost);

userRouter.get('/survey', authHelper.isLogined, userController.userSurveyGet);
userRouter.get('/survey', authHelper.isLogined, userController.userSurveyPost);

userRouter.get('/setting', authHelper.isLogined, userController.userSettingGet);
userRouter.post('/setting', authHelper.isLogined, userController.userSettingPost);

userRouter.get('/logout', authHelper.isLogined, userController.logoutGet);

module.exports = userRouter;