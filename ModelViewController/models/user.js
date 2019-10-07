const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
    constructor(name, email, cart, id) {
        this.name = name;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    static findById(id) {
        const db = getDb();

        return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) })
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map((product) => {
            return product.productId;
        })
        return db.collection('products').find({ _id: {$in: productIds}}).toArray().then(products => {
            return products.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find(prod => prod.productId.toString() == p._id.toString()).quantity
                }
            })
        })
    }

    addToCart(product) {

        //prod.productId is an object, not a string
        //cast is needed for comparison
        if (this.cart.items == null)
            this.cart.items = [];
        const index = this.cart.items.findIndex(prod => {
            return prod.productId.toString() == product._id;
        });

        if (index >= 0) {
            this.cart.items[index].quantity++;
        } else {
            this.cart.items.push({ productId: new mongodb.ObjectId(product._id), quantity: 1 })            
        }
        console.log(this.cart.items);

        const db = getDb();
        return db.collection('users').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: { cart: this.cart } })
    }

    deleteItemFromCart(id) {
        const index = this.cart.items.findIndex(prod => {
            return prod.productId.toString() == id.toString();
        })
        this.cart.items.splice(index, 1);
        const db = getDb();

        return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: this.cart}})
    }

    addOrder() {
        const db = getDb();
        return this.getCart().then(products => {
            const order = {
                items: products,
                user: {
                    _id: new mongodb.ObjectId(this._id),
                    name: this.name    
                }
            }
            return db.collection('orders').insertOne(order)
        }).then(result => {
            //cleans cart in the user object
            this.cart = {
                items: []
            }

            //cleans cart in the database
            return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart: this.cart}})
        })
    }

    getOrders() {
        const db = getDb();

        return db.collection('orders').find({'user._id': new mongodb.ObjectId(this._id)}).toArray().then(orders => {
            console.log(orders);
            return orders;
        })
    }
}

module.exports = User;