const models = require('../models/');
const Op = require('sequelize').Op;

const CONFIG = require('../config/appConfig.js');

exports.dashboardGet = function (req, res) {
    models.UserProfile.findAll().then((profiles) => {
        let sex = { "male": 0, "female": 0, "unspecified": 0 };
        let degree = { bachelor: 0, master: 0, doctoral: 0, unspecified: 0 };
        let creationDate = [];

        let profileValues = profiles.map((profile) => {
            return profile.dataValues;
        });

        profileValues.forEach((profile) => {

            if (profile.sex) {
                sex[profile.sex]++;
            }
            else {
                sex.unspecified++;
            }

            if (profile.degree) {
                degree[profile.degree]++;
            }
            else {
                degree.unspecified++;
            }

        });
        res.render('pages/admin/dashboard', {
            stats: [
                {
                    id: "chart1",
                    chartType : "pie",
                    keys: Object.keys(sex),
                    values: Object.values(sex),
                    label: "User Sex"
                },
                {   
                    id: "chart2",
                    chartType : "bar",
                    keys: Object.keys(degree),
                    values: Object.values(degree),
                    label: "User Degree"
                }]
        });
    });


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
            include: [{
                model: models.User
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