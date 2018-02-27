const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(process.env.PORT || 8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server Started At ${host} ${port}`);
});

