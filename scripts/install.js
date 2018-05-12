const models = require('../models');

function createUser(userData) {
    return new Promise((resolve, reject) => {
        models.User.create(userData).then((user) => {
            models.UserProfile.create({ user_id: user.id }).then((userProfile) => {
                resolve(user, userProfile);
            })
        }).catch(reject);
    });
}

function createAdmin() {
    return new Promise((resolve, reject) => {
        createUser(
            {
                email: "admin@oyla.com",
                password: "123456",
                username: "admin"
            }
        ).then((user) => {
            models.UserMeta.create({ user_id: user.id, key: "is_admin", value: "1" }).then(() => { resolve("Admin Created") });
        }).catch(reject);
    });
}

function install() {
    console.log("Connecting to database!");
    models.sequelize.sync().then(function () {
        console.log("Connected to database!");
        console.log("Creating admin!");
        createAdmin().then(console.log).catch(console.log);
    }).catch(err => {
        process.exit();
        console.error('Unable to connect to the database: ', err);
    });
}

install();