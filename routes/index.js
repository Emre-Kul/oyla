const express = require('express');
const router = express.Router();
const models = require('../models');

const authHelper = require('../helpers/authHelper.js');

router.get('/',authHelper.isNotLogined,(req, res) => {
    models.Survey.findAndCountAll({
        order: [["created_at", "DESC"]],
        offset: 0,
        limit: 5
    }).
        then((surveys) => {
            if (surveys) {
                let surveyList = surveys.rows.map((survey) => {
                    let surveyObj = survey.dataValues;
                    return surveyObj;
                });
                res.render('pages/index.ejs', { surveys: surveyList });
            }
            else
                res.render('pages/index.ejs', { surveys: [] });
        }).
        catch((err) => {
            res.send("ERROR")
            console.log(err);
        });
});

module.exports = router;
