const express = require('express');

const server = express();

server.use(express.json());

server.use('/', (req, res) => {
	res.send('users is up');
});

module.exports = server;
