const models = require('../models');

exports.showSurvey = function (req, res) {
    res.render('pages/showSurvey');
}

exports.newSurvey = function (req, res) {
    res.render('pages/newSurvey')
}

exports.createSurvey = function (req, res) {
    const { survey } = req.body;

    models.Survey.create({
        survey: "Survey"
    }).then((survey) => {
        res.redirect('/');  
    }).catch((err) => {
        res.status(404).send(err.errors[0].message);
    });
}