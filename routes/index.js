const express = require('express');
const router = express.Router();

const authHelper = require('../helpers/authHelper.js');

router.get('/',authHelper.isNotLogined,(req, res) => {
    res.render('pages/index');
});

module.exports = router;
