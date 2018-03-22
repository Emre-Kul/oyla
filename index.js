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

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/index.js'));
app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

models.sequelize.sync().then(function () {
    const server = app.listen(process.env.PORT || 8080, () => {
        console.log('Server Started At', server.address().port);
    });
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});