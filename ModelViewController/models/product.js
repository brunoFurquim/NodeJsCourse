const fs = require('fs');
const path = require('path');

const Cart = require('./cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  //Saves a product to the json file
  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  edit() {
    getProductsFromFile(products => {
      let index = products.findIndex(prod => prod.id == this.id);
      products[index] = { ...this };
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err)
      })
    })
  }

  //finds product using id, then removes it from products file and writes to the file the updated array
  delete() {
    getProductsFromFile(products => {
      let updatedProducts = products.filter(prod => prod.id !== this.id);
      Cart.deleteProduct(this.id, this.price);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      })
    })
  }

  //Gets all products from json file and calls the callback function passing the array of parsed products as argument
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  //Gets all products from json file, finds the products by id and calls the callback function passing it as argument
  static findById(id, cb) {
    getProductsFromFile(products => {
      var product = products.find(p => p.id === id);
      cb(product);
    })
  }
};
