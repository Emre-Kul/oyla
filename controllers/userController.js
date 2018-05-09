const models = require('../models');
const Op = require('sequelize').Op;
const bcrypt = require('bcrypt');
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
        res.redirect('/error/404');
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
        res.redirect('/error/500');
    });
}

exports.userDashboardGet = function (req, res) {
    let { search, page } = req.query;
    search = (typeof search === 'undefined') ? '%' : `%${search}%`;
    page = (typeof page === 'undefined') ? 0 : parseInt(page);


    models.Survey.findAndCountAll({
        where: {
            user_id: {
                [Op.ne]: req.session.user.id
            },
            title: {
                [Op.like]: search
            }
        },
        include: [{
            model: models.User
        }],
        order: [["updated_at", "DESC"]],
        offset: CONFIG.SQL_LIMIT * page,
        limit: CONFIG.SQL_LIMIT
    }).
        then((surveys) => {
            if (surveys) {
                let surveyList = surveys.rows.map((survey) => {
                    let surveyObj = survey.dataValues;
                    surveyObj.User = surveyObj.User.dataValues;
                    return surveyObj;
                });
                res.render('pages/user/dashboard', {
                    surveys: surveyList,
                    pagination: {
                        pageStart: CONFIG.SQL_LIMIT * page,
                        pageCount: Math.ceil(surveys.count / CONFIG.SQL_LIMIT)
                    }
                });
            }
            else
                res.render('pages/user/dashboard', { surveys: [] });
        }).
        catch((err) => {
            res.send("ERROR")
            console.log(err);
        });
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
        order: [["updated_at", "DESC"]],
        offset: CONFIG.SQL_LIMIT * page,
        limit: CONFIG.SQL_LIMIT
    }).
        then((surveys) => {
            if (surveys) {
                let surveyList = surveys.rows.map((survey) => {
                    return survey.dataValues;
                });
                res.render('pages/user/survey',
                    {
                        surveys: surveyList,
                        pagination: {
                            pageStart: CONFIG.SQL_LIMIT * page,
                            pageCount: Math.ceil(surveys.count / CONFIG.SQL_LIMIT)
                        }
                    });
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
            userProfile: userProfile.dataValues
        });
    }).catch((err) => {
        console.log(err);
        res.send("Some Error Accured");
    });
}

exports.userSettingPost = function (req, res) {
    const { settingType } = req.body;
    new Promise((resolve, reject) => {
        if (settingType === 'profile') {
            const { fullname, income, sex, degree } = req.body;
            models.UserProfile.update(
                { fullname, income, sex, degree },
                { where: { user_id: req.session.user.id } }
            ).then(() => resolve({
                type: 'success',
                text: 'Profile succesfully updated'
            })).catch(reject);
        }
        else if (settingType === 'account') {
            const { oldpassword, newpassword, renewpassword } = req.body;
            //şifre değişince session.user yenilenmeli
            if (!bcrypt.compareSync(oldpassword, req.session.user.password)) {
                resolve({
                    type: 'error',
                    text: 'Old Password is wrong'
                });
            }
            else if (newpassword !== renewpassword) {
                resolve({
                    type: 'error',
                    text: 'Passwords Does not match'
                });
            }
            else {
                const hashedPassword = bcrypt.hashSync(newpassword, bcrypt.genSaltSync());
                models.User.update(
                    { password: hashedPassword },
                    { where: { id: req.session.user.id } }
                ).then(() => {
                    req.session.user.password = hashedPassword;
                    resolve({
                        type: 'success',
                        text: 'Password succesfully changed'
                    })
                }).catch(reject);
            }
        }
    }).then((notification) => {
        models.UserProfile.findOne({ where: { user_id: req.session.user.id } }).then((userProfile) => {
            res.render('pages/user/setting', {
                userProfile: userProfile.dataValues,
                notification: notification
            });
        }).catch((err) => {
            console.log(err);
            res.redirect("/error/500");
        });
    }).catch((err) => {
        res.send(err);
    });

}
exports.logoutGet = function (req, res) {
    req.session.destroy();
    res.redirect('/');
    //res.render('pages/logout');//buggy
}
