const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const models = require('./models');
const app = express();

const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.locals.moment = require('moment');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(session({
    key: 'user_sid',
    secret: 'random',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: models.sequelize
    }),
    cookie: {
        expires: 99999999999
    }
}));

app.use(function (req, res, next) {
    res.locals.session = req.session.user;
    next();
});

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/index.js'));

app.use('/auth',require('./routes/auth.js'));
app.use('/user', require('./routes/user.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/survey', require('./routes/survey.js'));
app.use('/error', require('./routes/error.js'));

app.get('*', function(req, res){
  res.redirect('/error/404');
});

models.sequelize.sync().then(function () {
    const server = app.listen(process.env.PORT || 8080, () => {
        console.log('Server Started At', server.address().port);
    });
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});