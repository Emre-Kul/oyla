const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/public')));

require('./routes/views.js')(app);

models.sequelize.sync().then(function () {
    const server = app.listen(process.env.PORT || 8080, () => {
        console.log('Server Started At', server.address().port);
    });
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
});