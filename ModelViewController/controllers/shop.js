const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      product,
      pageTitle: 'Product Details',
      path: `/products`
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {

  Cart.getCartFromFile((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      products.forEach(element => {
        const cartProductData = cart.products.find(prod => prod.id === element.id);
        console.log("data", cartProductData)
        if (cartProductData) {
          cartProducts.push({ productData: element, qty: cartProductData.quantity });
        }
      });
      res.render('shop/cart', {
        products: cartProducts,
        path: '/cart',
        pageTitle: 'Your Cart'
      });
    })
  })

};

exports.postCartItemDelete = (req, res, next) => {
  Product.findById(req.body.productId, product => {
    Cart.deleteProduct(product.id, product.price);
    res.redirect('/cart');
  });
}

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(product.id, product.price);
    res.redirect('/cart')
  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
