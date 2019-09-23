//Third party modules
const express = require('express');
const bp = require('body-parser');

const path = require('path');

const userRoutes = require('./routes/user').router;
const userList = require('./routes/user').userList;

//app works as a request handler
const app = express();

//Parsing income request body
app.use(bp.urlencoded({
    extended: false
}))


//without this line, it isn't possible to use the main.css and user.css files inside the html files
// app.use(express.static(path.join(__dirname, 'public')))


app.use('/users', userRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, './views', 'page-not-found.html'));
});

app.listen(4000);

