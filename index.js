const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/',require('./routes/index.js'));
app.use('/login',require('./routes/login.js'));
app.use('/register',require('./routes/register.js'));


models.sequelize.sync().then(function () {
    const server = app.listen(process.env.PORT || 8080, () => {
        console.log('Server Started At', server.address().port);
    });
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});