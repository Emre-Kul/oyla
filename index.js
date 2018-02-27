const path = require('path');
const express = require('express');
const app = express();

app.set('view engne','ejs');

app.use(express.static(path.join(__dirname, '/public')));

const server = app.listen(process.env.PORT || 8080, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server Started At ${host} ${port}`);
});

