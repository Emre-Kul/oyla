const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('pages/index',{
        session : req.session.user
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');//i can create page for that
});

module.exports = router;
