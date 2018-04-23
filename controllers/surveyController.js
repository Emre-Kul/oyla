const models = require('../models');

exports.showSurveyGet = function (req, res) {
    res.render('pages/survey/showSurvey');
}

exports.createSurveyGet = function (req, res) {
    res.render('pages/survey/newSurvey');
}

exports.createSurveyPost = function (req, res) {
    const survey = req.body;
    survey.user_id = req.session.user.id;
    models.Survey.create(survey).then((survey) => {
        res.redirect('/');  
    }).catch((err) => {
        res.status(404).send(err.errors[0].message);
    });
}