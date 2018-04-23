const models = require('../models/');
const Op = require('sequelize').Op;

const SQL_LIMIT = 2;

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
            offset: SQL_LIMIT * page,
            limit: SQL_LIMIT
        }
    ).then((users) => {
        let userValues = users.rows.map((user) => {
            return user.dataValues;
        })
        res.render('pages/admin/user', { users: userValues, pagination: { pageCount: Math.ceil(users.count/SQL_LIMIT) } });
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
            offset: SQL_LIMIT * page,
            limit: SQL_LIMIT
        }
    ).then((surveys) => {
        let surveyValues = surveys.rows.map((survey) => {
            return survey.dataValues;
        });
        res.render('pages/admin/survey', { surveys: surveyValues, pagination: { pageCount: Math.ceil(surveys.count/SQL_LIMIT) } });//will calculate page count
    }).catch((e) => {
        console.log(e);
        res.redirect('/error/500');
    });
}