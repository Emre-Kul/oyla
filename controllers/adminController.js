const models = require('../models/');

exports.dashboardGet = function (req, res) {
    res.render('pages/admin/dashboard');
}

exports.userGet = function (req, res) {
    res.render('pages/admin/user');
}

exports.surveyGet = function (req, res) {
    res.render('pages/admin/survey');
}