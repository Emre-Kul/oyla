const express = require('express');
const loginRouter = express.Router();
const userController = require('../controllers/userController.js');

loginRouter.get('/', (req, res) => {
    res.render('pages/login');
});

loginRouter.post('/',userController.loginPost);

module.exports = loginRouter;
