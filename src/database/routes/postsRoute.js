const express = require('express');
const { validateToken } = require('../middlewares/validateToken');
const postsController = require('../controllers/postsController');

const postsRoute = express.Router();

postsRoute.post('/', validateToken, postsController.createPost);
postsRoute.get('/search', validateToken, postsController.searchPost);
postsRoute.get('/', validateToken, postsController.getAllPosts);
postsRoute.get('/:id', validateToken, postsController.getPost);
postsRoute.put('/:id', validateToken, postsController.updatePost);
postsRoute.delete('/:id', validateToken, postsController.deletePost);

module.exports = postsRoute;
