const models = require('../models/');
const Op = require('sequelize').Op;

const SQL_LIMIT = 1;

exports.dashboardGet = function (req, res) {
    res.render('pages/admin/dashboard');
}

exports.userGet = function (req, res) {
    let { search, page } = req.query;
    search = (typeof search === 'undefined') ? '%' : `%${search}%`;
    page = (typeof page === 'undefined') ? 0 : parseInt(page);

    models.User.findAll(
        {
            where: {
                username: {
                    [Op.like]: search
                }
            },
            offset: SQL_LIMIT * page,
            limit: SQL_LIMIT
        }
    ).then((users) => {
        let userValues = users.map((user) => {
            return user.dataValues;
        })
        res.render('pages/admin/user', { users: userValues, pagination: { pageCount: 10 } });//will calculate page count
    }).catch((e) => {
        console.log(e);
        res.redirect('/error/500');
    });
}

exports.surveyGet = function (req, res) {
    let { search, page } = req.query;
    search = (typeof search === 'undefined') ? '%' : `%${search}%`;
    page = (typeof page === 'undefined') ? 0 : parseInt(page);
    models.Survey.findAll(
        {
            where: {
                title: {
                    [Op.like]: search
                }
            },
            offset: SQL_LIMIT * page,
            limit: SQL_LIMIT
        }
    ).then((surveys) => {
        let surveyValues = surveys.map((survey) => {
            return survey.dataValues;
        });
        res.render('pages/admin/survey', { surveys: surveyValues, pagination: { pageCount: 10 } });//will calculate page count
    }).catch((e) => {
        console.log(e);
        res.redirect('/error/500');
    });
}