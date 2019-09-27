const fs = require('fs');
const path = require('path');
const fullPath = require('../util/path')

const p = path.join(fullPath, 'data', 'cart.json')

module.exports = class Cart {
    static getCartFromFile(cb) {
        fs.readFile(p, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!error) cart = JSON.parse(fileContent);
            cb(cart);
        })
    }
    static addProduct(id, price) {
        this.getCartFromFile((cart) => {
            console.log(cart)
            const product = cart.products.find(product => product.id === id);
            let updatedProduct;
            if (product) {
                updatedProduct = { ...product };
                updatedProduct.quantity++;

                //finds old product's index
                let index = cart.products.findIndex(prod => prod.id === id);

                //updates the array with the updated product
                cart.products[index] = updatedProduct;
            } else {
                updatedProduct = {
                    id,
                    quantity: 1
                }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice += +price;

            fs.writeFile(p, JSON.stringify(cart), (error) => {
                console.log(error)
            })
        })
    }

    static getProducts(cb) {
        this.getCartFromFile((cart) => {
            cb(cart.products);
        })
    }

    static deleteProduct(id, price) {
        console.log(id, price)
        this.getCartFromFile(cart => {
            let product = cart.products.find(product => product.id === id);
            if (!product) return; 

            let products = cart.products.filter(product => product.id !== id);
            let totalPrice = cart.totalPrice;

            totalPrice -= (product.quantity * price);

            cart = {
                products, 
                totalPrice
            }

            fs.writeFile(p, JSON.stringify(cart), error => {
                console.log(error)
            })
        })
    }
}