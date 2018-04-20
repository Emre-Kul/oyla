const models = require('../models/');

exports.dashboardGet = function (req, res) {
    res.render('pages/admin/dashboard');
}

exports.userGet = function (req, res) {
    models.User.findAll().then((users) => {
        let userValues = users.map((user) =>{
            return user.dataValues;
        })
        res.render('pages/admin/user', { users: userValues });
    }).catch(e => console.log(e));
}

exports.surveyGet = function (req, res) {
    models.Survey.findAll().then((surveys) => {
        let surveyValues = surveys.map((survey) =>{
            return survey.dataValues;
        });
        res.render('pages/admin/survey', { surveys: surveyValues });
    }).catch(e => console.log(e));
}