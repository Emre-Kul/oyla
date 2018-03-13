const express = require('express');
const registerRouter = express.Router();
const userController = require('../controllers/userController.js');

registerRouter.get('/', (req, res) => {
    res.render('pages/register');
});

registerRouter.post('/',userController.registerPost);

module.exports = registerRouter;
