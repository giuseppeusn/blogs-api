const express = require('express');
const usersController = require('./database/controllers/usersController');
const { usersRoute, categoriesRoute, postsRoute } = require('./database/routes');

const app = express();

app.use(express.json());

app.post('/login', usersController.userLogin);
app.use('/user', usersRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postsRoute);

module.exports = app;
