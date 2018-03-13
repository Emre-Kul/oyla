const models = require('../models/');

exports.loginPost = function (req, res) {
    const { email, password } = req.body;
    res.send(`Will Login With ${email} --- ${password}`);
}

exports.registerPost = function (req, res) {
    const { username, email, password, repassword } = req.body;
    /*
    res.render('pages/register',{
        error : 
        { 
            username : {
                value : username,
                message : `Username in Use`
            }
        }
    });
    */
    if(password !== repassword){
        res.send("Passwords Not Same!");
        return;
    }

    if(password.length > 10 || password.length < 4){//i will delete this magic numbers
        res.send("Password must be beetween 4 and 10");
        return;
    }
    
    models.User.create({username : username,password : password,email : email,token : 'NONE'}).then((user) => {
        res.render('pages/index');
    }).catch((err) => {
        res.status(404).send("ERR");
        console.log(err);
    });
}