const models = require('../models/');

exports.loginGet = function (req, res) {
    res.render('pages/auth/login');
}

exports.loginPost = function (req, res) {
    const { email, password } = req.body;

    models.User.findOne({ where: { email: email } }).then((user) => {
        if (!user || !user.validPassword(password)) {
            res.render('pages/auth/login',{error:{message: "Invalid username or password"}});
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
    res.render('pages/auth/register');
}

exports.registerPost = function (req, res) {
    const { username, email, password, repassword } = req.body;

    models.User.findOne({ where: { email: email } }).then((user) => {
        if (user != null && email === user.email) {
            res.render('pages/auth/register',{error: {message: "Email has been already taken !"}});
            return;
        }
    }).catch((err) => {
        res.status(404).send("Error Accured!");
        console.log(err);
    });    

    models.User.findOne({ where: { username: username } }).then((user) => {
        if (user != null && username === user.username) {
            res.render('pages/auth/register',{error: {message: "Username has been already taken !"}});
            return;
        }
    }).catch((err) => {
        res.status(404).send("Error Accured!");
        console.log(err);
    });

    if (password !== repassword) {
        res.render('pages/auth/register',{error: {message: "Passwords are not same !"}});
        return;
    }

    if (password.length > 10 || password.length < 4) {//i will delete this magic numbers
        res.render('pages/auth/register',{error: {message: "Password must be between 4 and 10", code: "002"}});
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
