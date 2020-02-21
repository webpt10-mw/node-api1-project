// implement your API here
const express = require('express');
const server = require('./server');
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n *** http://localhost:${port} *** \n`);
});
