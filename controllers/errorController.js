const models = require('../models');

exports.error404Get = function (req, res) {
    res.render('pages/error/404');
}

exports.error500Get = function (req, res) {
    res.render('pages/error/500');
}