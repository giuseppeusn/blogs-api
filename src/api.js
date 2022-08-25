const express = require('express');
const usersController = require('./database/controllers/usersController');

const app = express();

app.use(express.json());

app.post('/login', usersController.userLogin);

module.exports = app;
