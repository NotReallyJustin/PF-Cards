const { MongoClient } = require('mongodb');
const url = `'mongodb+srv://Admin:123454321@default.uwt1u.mongodb.net/Default?retryWrites=true&w=majority'`;
const mango = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mango.db('Default');

module.exports.initialize = () => {
    mango.connect()
        .then(() => {
            console.log('Mongo Connected!');
        });
}

module.exports.db = db;