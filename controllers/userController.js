const models = require('../models');

exports.userProfileGet = function (req, res) {
    let userProfileData;
    models.UserProfile.findOne({ user_id: req.session.user.id }).then((userProfile) => {
        res.render('pages/userProfile', {
            userProfile: userProfile.dataValues
        });
    }).catch((err) => {
        console.log(err);
        res.send("Some Error Accured");
    });
}

exports.userProfilePost = function (req, res) {
    const { fullname, income, sex, degree } = req.body;
    models.UserProfile.update(
        {
            fullname : fullname,
            income : income,
            sex : sex,
            degree : degree
        },
        {
            where : {
                user_id : req.session.user.id
            }
        }
    ).then((result) => {
        res.redirect('/user/profile');
    }).catch((err) => {
        res.send(err.errors[0].message);
    });
    
}
