const models = require('../models');

function createAdmin() {
    models.UserMeta.findOne({
        where: {
            user_id: 1,
            key: "is_admin"
        }
    })
        .then((userMeta) => {
            if (!userMeta) {
                models.UserMeta.create({ user_id: 1, key: "is_admin", value: "1" }).
                    then(() => console.log("Admin Created...")).
                    catch((e) => console.log(e));
            }
            else {
                models.UserMeta.update({ value: "1" }, {
                    where: {
                        user_id: 1,
                        key: "is_admin"
                    }
                }).
                    then(() => console.log("Admin Updated...")).
                    catch((e) => console.log(e));
            }
        })
        .catch((e) => console.log(e));

    return 0;
}

function install() {
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