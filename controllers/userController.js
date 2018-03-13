exports.loginPost = function (req, res) {
    const { email, password } = req.body;
    res.send(`Will Login With ${email} --- ${password}`);
}

exports.registerPost = function (req, res) {
    const {username, email, password, repassword} = req.body;
    res.send(`Will Register ${username} ${email} ${password} ${repassword}`)
}