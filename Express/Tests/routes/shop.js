const express = require('express');
const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

//adds a new middleware function
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

//__dirname holds the absolute path

module.exports = router;