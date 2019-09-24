const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('ejs/add-product', {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        activeAddProduct: true,
        productCSS: true,
        formsCSS: true
    })
})

router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect('/')
})
module.exports = {
    router,
    products
}