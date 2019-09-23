const express = require('express');
const path = require('path');

const router = express.Router();
const rootDir = require('../util/path');

//After sending a response, you shouldn't call next(), to guarantee that another response won't be sent too.
//Only fires for get requests
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;