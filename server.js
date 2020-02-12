const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.send('users is up');
});

server.get('/api/users', async (req, res) => {
	try {
		const users = await db.find();
		if (users) {
			res.status(200).json(users);
		}
	} catch (err) {
		console.log(err);
		res
			.status(500)
			.json({ errorMessage: 'The users information could not be retrived.' });
	}
});

module.exports = server;
