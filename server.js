const express = require('express');
const cors = require('cors');
const db = require('./data/db');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send('users is up');
});

/**
 * GET /api/users
 */
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

/**
 * POST /api/users
 */
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
    bio: req.body.bio,
  };
  try {
    const addUser = await db.insert(newUser);
    if (addUser) {
      res.status(201).json(addUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database.',
    });
  }
});

/**
 * GET /api/users/:id
 */
server.get('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await db.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist' });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: 'The user information could not be retrieved' });
  }
});

/**
 * DELETE /api/users/:id
 */
server.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const del = await db.remove(id);
    if (del) {
      res.status(204).json(del);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does not exist' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: 'The user could not be removed' });
  }
});

/**
 * PUT /api/users/:id
 */
server.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: 'Please provide name for the user' });
  }
  if (!req.body.bio) {
    return res.status(400).json({ message: 'Please provide bio for the user' });
  }
  const user = {
    name: req.body.name,
    bio: req.body.bio,
  };
  try {
    const updateUser = await db.update(id, user);
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res
        .status(404)
        .json({ message: 'The user with the specified ID does nto exist.' });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ errorMessage: 'The User information could not be modified.' });
  }
});

server.use((req, res) => {
  res.status(404).json({ message: '404 page not found fail whale :(' });
});

module.exports = server;
