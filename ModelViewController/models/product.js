const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this).then(result => console.log(result)).catch(error => console.log(error)
      )
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray().then(products => products).catch(error => console.log(error)
    )
  }

  static findById(id) {
    const db = getDb();
    return db.collection('products').find({ _id: new mongodb.ObjectId(id) }).next().then(product => product).catch(error => console.log(error)
    )
  }

  edit() {
    const db = getDb();
    return db.collection('products').updateOne({ _id: new mongodb.ObjectId(this.id) }, { $set: this }).then(result => console.log(result)).catch(error => console.log(error))
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(id) }).then(result => console.log('Deleted')).catch(error => console.log(error))
  }
}

module.exports = Product;