const express = require('express');
const path = require('path')

const router = express.Router();

const products = require('./admin').products;

const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
    console.log(products)
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    res.render('ejs/shop', { products, pageTitle: 'Shop', path: '/', hasProducts: products.length > 0, activeShop: true, productCSS: true })
})

module.exports = router;