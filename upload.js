const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb+srv://Admin:123454321@default.uwt1u.mongodb.net/Default?retryWrites=true&w=majority', 
	{useNewUrlParser: true, useUnifiedTopology: true});
const collection = client.db('Default').collection('Cards');

function gatherData() 
{
	var name = '';
	var date = '';
	var content = '';
	var tag = '';
	var bib = '';

	rl.question('Insert name: ', ans => {
		name = ans;

		rl.question('Content: ', ans => {
			content = ans;

			rl.question('Insert Date Uploaded: ', ans => {
				date = ans;

				rl.question('Insert Tag: ', ans => {
					tag = ans;

					rl.question('Insert Bibliography: ', ans => {
						bib = `**${tag}** ${ans}`

						upload(name, date, content, tag, bib);
					});
				});
			});
		});
	});
}

function upload(name, date, content, tag, bib) 
{
	collection.insertOne({
		name: name,
		date: date,
		content: content,
		tag: tag,
		bib: bib
	});

	gatherData();
}

client.connect().then(() => {
	console.log('Ready!');
	gatherData();
})