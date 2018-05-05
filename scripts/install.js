const models = require('../models');

function createAdmin(){
    return 0;
}

function install(){
    console.log("Connecting to database!");
    models.sequelize.sync().then(function () {
        console.log("Connected to database!");
        console.log("Creating admin!");
        createAdmin();
    }).catch(err => {
        console.error('Unable to connect to the database: ', err);
    });
}

install();