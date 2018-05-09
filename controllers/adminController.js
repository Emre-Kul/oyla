const models = require('../models/');
const Op = require('sequelize').Op;

const CONFIG = require('../config/appConfig.js');

exports.dashboardGet = function (req, res) {
    res.render('pages/admin/dashboard');
}

exports.userGet = function (req, res) {
    let { search, page } = req.query;
    search = (typeof search === 'undefined') ? '%' : `%${search}%`;
    page = (typeof page === 'undefined') ? 0 : parseInt(page);

    models.User.findAndCountAll(
        {
            where: {
                username: {
                    [Op.like]: search
                }
            },
            offset: CONFIG.SQL_LIMIT * page,
            limit: CONFIG.SQL_LIMIT
        }
    ).then((users) => {
        let userValues = users.rows.map((user) => {
            return user.dataValues;
        })
        res.render('pages/admin/user',
            {
                users: userValues,
                pagination:
                {
                    pageStart: CONFIG.SQL_LIMIT * page,
                    pageCount: Math.ceil(users.count / CONFIG.SQL_LIMIT)
                }
            });
    }).catch((e) => {
        console.log(e);
        res.redirect('/error/500');
    });
}

exports.surveyGet = function (req, res) {
    let { search, page } = req.query;
    search = (typeof search === 'undefined') ? '%' : `%${search}%`;
    page = (typeof page === 'undefined') ? 0 : parseInt(page);
    models.Survey.findAndCountAll(
        {
            where: {
                title: {
                    [Op.like]: search
                }
            },
            include : [{
                model : models.User
            }],
            offset: CONFIG.SQL_LIMIT * page,
            limit: CONFIG.SQL_LIMIT
        }
    ).then((surveys) => {
        
        let surveyValues = surveys.rows.map((survey) => {
            let surveyObj = survey.dataValues;
            surveyObj.User = surveyObj.User.dataValues;
            return surveyObj;
        });
        console.log(surveyValues[0]);
        res.render('pages/admin/survey',
            {
                surveys: surveyValues,
                pagination: {
                    pageStart: CONFIG.SQL_LIMIT * page,
                    pageCount: Math.ceil(surveys.count / CONFIG.SQL_LIMIT)
                }
            });
    }).catch((e) => {
        console.log(e);
        res.redirect('/error/500');
    });
}