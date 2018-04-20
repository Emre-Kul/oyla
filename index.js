const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const models = require('./models');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(session({
    key: 'user_sid',
    secret: 'random',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));

app.use(function (req, res, next) {
    res.locals.session = req.session.user;
    next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/index.js'));

app.use('/auth', function (req, res, next) {
    if (req.session.user) {
        res.redirect('/');
    }
    else {
        next();
    }
}, require('./routes/auth.js'));

app.use('/user', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/');
    }
    else {
        next();
    }
}, require('./routes/user.js'));

app.use('/admin', function (req, res, next) {
    if (!req.session.user) {//will add admin control
        res.redirect('/');
    }
    else {
        next();
    }
}, require('./routes/admin.js'));

app.use('/survey', require('./routes/survey.js'));
app.use('/error', require('./routes/error.js'));

models.sequelize.sync().then(function () {
    const server = app.listen(process.env.PORT || 8080, () => {
        console.log('Server Started At', server.address().port);
    });
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});