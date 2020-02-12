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

server.post('/api/users', async (req, res) => {
	if (!req.body.name) {
		return res
			.status(400)
			.json({ message: 'please provide name for the user' });
	}
	if (!req.body.bio) {
		return res.status(400).json({ message: 'please provide bio for the user' });
	}
	const newUser = {
		name: req.body.name,
		bio: req.body.bio
	};
	try {
		const addUser = await db.insert(newUser);
		if (addUser) {
			res.status(201).json(addUser);
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			errorMessage: 'There was an error while saving the user to the database.'
		});
	}
});

module.exports = server;
