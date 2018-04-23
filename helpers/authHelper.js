
exports.isNotLogined = function (req, res, next) {
    if (!req.session.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}

exports.isLogined = function (req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect('/');
    }
}

exports.isAdmin = function (req, res, next) {
    //control login too
    next();
}