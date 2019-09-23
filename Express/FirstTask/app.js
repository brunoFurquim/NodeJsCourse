const express = require('express');

//Request handler
const app = express();

//Middleware
app.use('/users', (req, res, next) => {
    res.send('<h1>Hello from /users</h1>');
});

//Middleware
app.use((req, res, next) => {
    res.send('<h1>Hello from /</h1>');
});

app.listen(4000);