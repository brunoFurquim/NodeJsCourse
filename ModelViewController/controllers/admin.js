const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editing = req.query.edit;
  const productId = req.params.productId;

  const product = Product.findById(productId, (product) => {
    res.render('admin/edit-product', {
      product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  let prod = req.body;
  let updatedProduct = new Product(prod.title, prod.imageUrl, prod.description, prod.price);
  updatedProduct.id = prod.id;

  updatedProduct.edit();
  res.redirect('/admin/products');
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  let productId = req.body.id;

  Product.findById(productId, (product) => {
    let prod = new Product(product.title, product.imageUrl, product.description, product.price);
    prod.id = product.id;

    prod.delete();
    res.redirect('/admin/products');
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
