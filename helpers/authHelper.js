
exports.isNotLogined = function (req, res, next) {
    if (!req.session.user) {
        next();
    }
    else {
        res.redirect('/user/dashboard');
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
    if (req.session.user && req.session.user.UserMeta['is_admin'] && req.session.user.UserMeta['is_admin'] === '1') {
        next();
    }
    else {
        res.redirect('/')
    }
}