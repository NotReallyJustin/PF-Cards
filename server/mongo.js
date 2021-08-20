const { MongoClient } = require('mongodb');
const pwd = '12345321';
const url = `mongodb+srv://Admin:${pwd}@default.uwt1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mango = new MongoClient(url);
db;

module.exports.initialize = () => {
    mango.connect()
        .then(() => {
            console.log('Mongo Connected!');
            db = mango.db('Default');
        });
}

module.exports.db = db;