const express = require('express');
const path = require('path');

const router = express.Router();

const userList = [];

router.get('/add-user', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views', 'add-user.html'));
})

router.post('/add-user', (req, res, next) => {
    userList.push(req.body.user);
    res.redirect('/');
})

router.get('/list', (req, res, next) => {
    console.log(userList);
    res.sendFile(path.join(__dirname, '../views', 'user-list.html'))
})


module.exports = {
    router,
    userList
}