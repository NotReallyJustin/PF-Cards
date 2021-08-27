const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
const path = require('path');
const brief = require('./brief.js');
const cards = require('./cards.js');

require('./mongo.js').initialize();

/*app.use('*', (req, res, next) => {
	console.log(req.originalUrl);
	next();
});*/

app.use('/API/brief', brief);

app.use('/API/cards', cards);

app.get('/API/*', function (req, res) {
	res.status(404).send("The requested API is not found.");
});

app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

//Route api
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});