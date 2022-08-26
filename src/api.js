const express = require('express');
const usersController = require('./database/controllers/usersController');
const { usersRoute, categoriesRoute } = require('./database/routes');

const app = express();

app.use(express.json());

app.post('/login', usersController.userLogin);
app.use('/user', usersRoute);
app.use('/categories', categoriesRoute);

module.exports = app;
