module.exports = function(app){
    app.get('/register', (req, res) => {
        res.render('pages/register');
    });

    app.get('/login', (req, res) => {
        res.render('pages/login');
    });

    app.get('/', (req, res) => {
        res.render('pages/index');
    });
}