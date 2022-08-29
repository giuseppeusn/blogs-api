const express = require('express');
const { validateToken } = require('../middlewares/validateToken');
const postsController = require('../controllers/postsController');

const postsRoute = express.Router();

postsRoute.post('/', validateToken, postsController.createPost);

module.exports = postsRoute;
