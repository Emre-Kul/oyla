const models = require('../models/');

exports.authControl = function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    }
    else {
        next();
    }
}

exports.loginGet = function (req, res) {
    res.render('pages/login');
}

exports.loginPost = function (req, res) {
    const { email, password } = req.body;

    models.User.findOne({ where: { email: email } }).then((user) => {
        if (!user || !user.validPassword(password)) {
            res.send("Email Or Password Wrong!");
        }
        else {
            req.session.user = user.dataValues;
            res.redirect('/');
        }
    }).catch((err) => {
        res.status(404).send("Error Accured!");
        console.log(err);
    });
}

exports.registerGet = function (req, res) {
    res.render('pages/register');
}

exports.registerPost = function (req, res) {
    const { username, email, password, repassword } = req.body;

    if (password !== repassword) {
        res.send("Passwords Not Same!");
        return;
    }

    if (password.length > 10 || password.length < 4) {//i will delete this magic numbers
        res.send("Password must be beetween 4 and 10");
        return;
    }

    models.User.create({ username: username, password: password, email: email, token: 'NONE' }).then((user) => {
        models.UserProfile.create({user_id : user.id,income : 0}).
            then((userProfile) => {
                req.session.user = user.dataValues;
                res.redirect('/');
            }).
            catch((err) => {
                res.status(404).send(err.errors[0].message);//this is not good find a better way
            });
    }).catch((err) => {
        res.status(404).send(err.errors[0].message);
    });

}

exports.logoutGet = function (req, res) {
    req.session.destroy();
    res.redirect('/');
    //res.render('pages/logout');//buggy
}