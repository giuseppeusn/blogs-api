const express = require('express');
const usersController = require('./database/controllers/usersController');
const usersRoute = require('./database/routes/usersRoute');

const app = express();

app.use(express.json());

app.post('/login', usersController.userLogin);
app.use('/user', usersRoute);

module.exports = app;
