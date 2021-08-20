const app = require('express')();
const PORT = process.env.PORT || 8081;
const brief = require('./brief.js');
const cards = require('./cards.js');

app.use('./API/brief', brief);

app.use('./API/cards', cards);

app.get('/', function (req, res) {
	res.status(404).send("The requested API is not found.");
});

//Route api
app.listen(PORT, () => {
	console.log(`App listening on port ${port}`);
});