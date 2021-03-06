const models = require('../models/');

exports.loginGet = function (req, res) {
    res.render('pages/auth/login');
}

exports.loginPost = function (req, res) {
    const { email, password } = req.body;
    console.log(email, password);
    models.User.findOne({
        where: { email: email },
        include: [{
            model: models.UserMeta
        }],
    }).then((user) => {
        if (!user || !user.validPassword(password)) {
            res.render('pages/auth/login', { form: { email: email}, error: { message: "Invalid username or password" } });
        }
        else {
            let userObj = user.dataValues;
            userObj.UserMeta = {};
            user.UserMeta.forEach((userMeta) => {
                userObj.UserMeta[userMeta.key] = userMeta.value;
            });
            console.log(userObj);
            req.session.user = userObj;
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
        res.render('pages/auth/register', { form: { username: username, email: email}, error: { message: "Passwords are not same !" } });
        return;
    }

    if (password.length > 10 || password.length < 4) {//i will delete this magic numbers
        res.render('pages/auth/register', { form: { username: username, email: email}, error: { message: "Password must be between 4 and 10" } });
        return;
    }

    models.User.create({ username: username, password: password, email: email, token: 'NONE' }).then((user) => {
        models.UserProfile.create({ user_id: user.id }).
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
        res.render('pages/auth/register', { form: { username: username, email: email}, error: { message: msg } });
    });
}
