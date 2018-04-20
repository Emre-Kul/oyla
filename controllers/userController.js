const models = require('../models');

exports.userProfileGet = function (req, res) {
    console.log(req.session.user);
    models.UserProfile.findOne({where : { user_id: req.session.user.id }}).then((userProfile) => {
        console.log(userProfile);
        res.render('pages/user/userProfile', {
            userProfile: userProfile.dataValues
        });
    }).catch((err) => {
        console.log(err);
        res.send("Some Error Accured");
    });
}

exports.userProfilePost = function (req, res) {
    const { fullname, income, sex, degree } = req.body;
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
        models.UserProfile.findOne({where : { user_id: req.session.user.id }}).then((userProfile) => {
            res.render('pages/user/userProfile', {
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

exports.userSurveyGet = function (req, res) {
    models.Survey.findAll({ where: { user_id: req.session.user.id } }).
        then((surveys) => {
            console.log(surveys);
            if (surveys) {
                let surveyList = surveys.map((survey) => {
                    return survey.dataValues;
                });
                console.log(surveyList);
                res.render('pages/user/userSurvey', { surveys: surveyList });
            }
            else
                res.render('pages/user/userSurvey', { surveys: [] });
        }).
        catch((err) => {
            res.send("ERROR")
            console.log(err);
        });
}

exports.userSurveyPost = function (req, res) {
    res.render('pages/user/userSurvey');
}

exports.logoutGet = function (req, res) {
    req.session.destroy();
    res.redirect('/');
    //res.render('pages/logout');//buggy
}

//So much repeated code.
