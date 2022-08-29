const express = require('express');
const { validateToken } = require('../middlewares/validateToken');
const postsController = require('../controllers/postsController');

const postsRoute = express.Router();

postsRoute.post('/', validateToken, postsController.createPost);
postsRoute.get('/', validateToken, postsController.getAllPosts);
postsRoute.get('/:id', validateToken, postsController.getPost);
postsRoute.put('/:id', validateToken, postsController.updatePost);

module.exports = postsRoute;
