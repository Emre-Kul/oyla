const express = require('express');
const router = express.Router();
const models = require('../models');

const authHelper = require('../helpers/authHelper.js');

router.get('/',authHelper.isNotLogined,(req, res) => {
    models.Survey.findAll({
        order: [["id", "DESC"]],
        offset: 0,
        limit: 5
    }).
        then((surveys) => {
            res.render('pages/index.ejs', { surveys: surveys });
        }).
        catch((err) => {
            res.send("ERROR")
            console.log(err);
        });
});

module.exports = router;
