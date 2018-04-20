const models = require('../models/');

exports.dashboardGet = function (req, res) {
    res.render('pages/admin/dashboard');
}
