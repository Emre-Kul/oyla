const models = require('../models');
const Op = require('sequelize').Op;

const CONFIG = require('../config/appConfig.js');

exports.userProfileByIdGet = function (req, res) {
    const { username } = req.params;
    models.User.findOne({ where: { username: username } }).then((user) => {
        models.UserProfile.findOne({ where: { user_id: user.dataValues.id } }).then((userProfile) => {
            res.render('pages/user/profile', {
                user: user.dataValues,
                userProfile: userProfile.dataValues
            });
        });
    }).catch((err) => {
        console.log(err);
        res.send("Some Error Accured");
    });
}

exports.userProfileGet = function (req, res) {
    models.UserProfile.findOne({ where: { user_id: req.session.user.id } }).then((userProfile) => {
        res.render('pages/user/profile', {
            user: req.session.user,
            userProfile: userProfile.dataValues
        });
    }).catch((err) => {
        console.log(err);
        res.send("Some Error Accured");
    });
}

exports.userDashboardGet = function (req, res) {
    res.render('pages/user/dashboard');
}
exports.userSurveyGet = function (req, res) {
    let { search, page } = req.query;
    search = (typeof search === 'undefined') ? '%' : `%${search}%`;
    page = (typeof page === 'undefined') ? 0 : parseInt(page);


    models.Survey.findAndCountAll({
        where: {
            user_id: req.session.user.id,
            title: {
                [Op.like]: search
            }
        },
        offset: CONFIG.SQL_LIMIT * page,
        limit: CONFIG.SQL_LIMIT
    }).
        then((surveys) => {
            console.log(surveys);
            if (surveys) {
                let surveyList = surveys.rows.map((survey) => {
                    return survey.dataValues;
                });
                console.log(surveyList);
                res.render('pages/user/survey', { surveys: surveyList, pagination: { pageCount: Math.ceil(surveys.count / CONFIG.SQL_LIMIT) } });
            }
            else
                res.render('pages/user/survey', { surveys: [] });
        }).
        catch((err) => {
            res.send("ERROR")
            console.log(err);
        });
}

exports.userSettingGet = function (req, res) {
    models.UserProfile.findOne({ where: { user_id: req.session.user.id } }).then((userProfile) => {
        res.render('pages/user/setting', {
            user: req.session.user,
            userProfile: userProfile.dataValues
        });
    }).catch((err) => {
        console.log(err);
        res.send("Some Error Accured");
    });
}

exports.userSettingPost = function (req, res) {
    const { fullname, income, sex, degree, settingType } = req.body;

    if (settingType === 'profile') { }
    if (settingType === 'account') { }
    //i will fix this

    models.UserProfile.update(
        {
            fullname: fullname,
            income: income,
            sex: sex,
            degree: degree
        },
        {
            where: {
                user_id: req.session.user.id
            }
        }
    ).then((result) => {
        models.UserProfile.findOne({ where: { user_id: req.session.user.id } }).then((userProfile) => {
            res.render('pages/user/setting', {
                user: req.session.user,
                userProfile: userProfile.dataValues,
                notification: {
                    type: 'success',
                    text: 'Profile succesfully updated'
                }
            });
        }).catch((err) => {
            console.log(err);
            res.send("Some Error Accured");
        });
    }).catch((err) => {
        res.send(err.errors[0].message);
    });
}
exports.logoutGet = function (req, res) {
    req.session.destroy();
    res.redirect('/');
    //res.render('pages/logout');//buggy
}

//So much repeated code.
