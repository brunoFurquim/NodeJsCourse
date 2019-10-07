const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://brunofurquimc:Furquimdecampos@cluster0-6hcij.mongodb.net/shop?retryWrites=true&w=majority').then((client) => {
        console.log('Connected')
        _db = client.db();
        cb()
    }).catch(error => console.log(error))
}

const getDb = () => {
    if (_db)
        return _db;
    throw 'No database found!'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
