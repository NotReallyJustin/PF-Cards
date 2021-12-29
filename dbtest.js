const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://Admin:123454321@default.uwt1u.mongodb.net/Default?retryWrites=true&w=majority', 
	{useNewUrlParser: true, useUnifiedTopology: true});
const collection = client.db('Default').collection('Cards');

client.connect().then(() => {
	let result = collection.find(
		{'$text': {'$search': 'Russia Cyberattack'}, 'date': '07/21'},
		{'score': {'$meta': 'textScore'}}
	).sort({'score': {'$meta': 'textScore'}}).limit(10);

	result.forEach(res => {
		console.log('res');
	});

	//console.log('I am async!')
	//console.log(result.next());
});

client.close(); 
