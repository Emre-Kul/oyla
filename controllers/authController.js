const models = require('../models/');

exports.loginGet = function (req, res) {
    res.render('pages/auth/login');
}

exports.loginPost = function (req, res) {
    const { email, password } = req.body;
    console.log(email,password);
    models.User.findOne({
        where: { email: email }
    }).then((user) => {
        if (!user || !user.validPassword(password)) {
            res.render('pages/auth/login', { error: { message: "Invalid username or password" } });
        }
        else {
            console.log(user);
            req.session.user = user.dataValues;
            res.redirect('/user/dashboard');
        }
    }).catch((err) => {
        res.status(404).send("Error Accured!");
        console.log(err);
    });
}

exports.registerGet = function (req, res) {
    res.render('pages/auth/register');
}

exports.registerPost = function (req, res) {
    const { username, email, password, repassword } = req.body;

    if (password !== repassword) {
        res.render('pages/auth/register', { error: { message: "Passwords are not same !" } });
        return;
    }

    if (password.length > 10 || password.length < 4) {//i will delete this magic numbers
        res.render('pages/auth/register', { error: { message: "Password must be between 4 and 10" } });
        return;
    }

    models.User.create({ username: username, password: password, email: email, token: 'NONE' }).then((user) => {
        models.UserProfile.create({ user_id: user.id, income: 0 }).
            then((userProfile) => {
                req.session.user = user.dataValues;
                res.redirect('/');
            }).
            catch((err) => {
                res.status(404).send(err.errors[0].message);//this is not good find a better way
            });
    }).catch((err) => {
        let msg = err.errors[0].path;
        msg = msg[0].toUpperCase() + msg.substring(1);
        msg += " has been already taken !";
        res.render('pages/auth/register', { error: { message: msg } });
    });
}
