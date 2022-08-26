const express = require('express');
const usersController = require('../controllers/usersController');
const { validateToken } = require('../middlewares/validateToken');

const usersRoute = express.Router();

usersRoute.post('/', usersController.createUser);
usersRoute.get('/', validateToken, usersController.getAllUsers);

module.exports = usersRoute;