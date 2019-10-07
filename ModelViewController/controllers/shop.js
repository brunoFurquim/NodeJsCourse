const Product = require('../models/product');


// PRODUCTS

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(error => console.log(error))
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId).then(product => {
    console.log(product)
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '/products'
    });
  }).catch(error => console.log(error))
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(error => console.log(error))
};

//ORDERS

exports.getOrders = (req, res, next) => {
  req.user.getOrders().then(orders => {
    console.log(orders);
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders
    })
  })
};

exports.postOrder = (req, res, next) => {
  req.user.addOrder().then(result => {
    res.redirect('/orders')
  }).catch(error => console.log(error))
}

//CART

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    console.log(cart)
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: cart
    });
  }).catch(error => console.log(error)
  )
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId).then(product => {
    return req.user.addToCart(product);
  }).then(() => res.redirect('/cart'))
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user.deleteItemFromCart(prodId).then(result => {
    res.redirect('/cart')
  })
}



