const models = require('../models');

models.sequelize.sync({force : true}).then(function () {
    console.log("The database has been successfully initialized!");
    process.exit();
}).catch(err => {
    console.error('Unable to connect to the database: ', err);
    process.exit();
});

//Not a best way for migration but it's working :D
