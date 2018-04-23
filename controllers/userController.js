const models = require('../models');

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

exports.userSurveyGet = function (req, res) {
    models.Survey.findAll({ where: { user_id: req.session.user.id } }).
        then((surveys) => {
            console.log(surveys);
            if (surveys) {
                let surveyList = surveys.map((survey) => {
                    return survey.dataValues;
                });
                console.log(surveyList);
                res.render('pages/user/survey', { surveys: surveyList });
            }
            else
                res.render('pages/user/survey', { surveys: [] });
        }).
        catch((err) => {
            res.send("ERROR")
            console.log(err);
        });
}

exports.userSurveyPost = function (req, res) {
    res.render('pages/user/survey');
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

    if(settingType === 'profile'){}
    if(settingType === 'account'){}
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
