const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll({}).then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(error => console.log(error))
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId).then(product => {
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '/products'
    });
  }).catch(error => console.log(error))
};

exports.getIndex = (req, res, next) => {
  Product.findAll({}).then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(error => console.log(error))
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts();
  }).then(products => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products
    });
  }).catch(error => console.log(error)
  )
};

exports.postOrder = (req, res, next) => {
  let fetchedProducts;
  let fetchedCart;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts();
  }).then(products => {
    fetchedProducts = products;
    return req.user.createOrder();
  }).then(order => {
    return order.addProducts(fetchedProducts.map((element) => {
      element.orderItem = {
        quantity: element.cartItem.quantity
      }
      return element;
    }))
  }).then(() => {
    return fetchedCart.setProducts(null)
  }).then(() => {
    res.redirect('/cart')
  })
    .catch(error => console.log(error))
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let quantity = 1;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({ where: { id: prodId } })
  }).then(products => {
    let product;
    if (products.length > 0)
      product = products[0];

    //if product is already in the cart
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      quantity += oldQuantity;
      return product;
    }

    return Product.findByPk(prodId);
  }).then(product => {
    return fetchedCart.addProduct(product, {
      through: {
        quantity
      }
    });
  }).then(response => res.redirect('/cart')).catch(error => console.log(error))

};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  req.user.getCart().then(cart => {
    return cart.getProducts({ where: { id: prodId } })
  }).then(products => {
    let product = products[0];

    //Cart item is the inbetween table
    return product.cartItem.destroy();
  }).then(() => {
    res.redirect('/cart')
  }).catch(error => console.log(error))
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({
    include: ['products']
  }).then((orders) => {
    console.log(orders)
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders
    });
  }).catch(error => console.log(error)
  )
};

