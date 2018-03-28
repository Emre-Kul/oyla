const models = require('../models');

exports.showSurveyGet = function (req, res) {
    res.render('pages/showSurvey');
}

exports.createSurveyGet = function (req, res) {
    res.render('pages/newSurvey');
}

exports.createSurveyPost = function (req, res) {
    const { survey } = req.body;

    models.Survey.create(survey).then((survey) => {
        res.redirect('/');  
    }).catch((err) => {
        res.status(404).send(err.errors[0].message);
    });
}