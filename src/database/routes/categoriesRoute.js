const express = require('express');
const { validateToken } = require('../middlewares/validateToken');
const categoriesController = require('../controllers/categoriesController');

const categoriesRoute = express.Router();

categoriesRoute.post('/', validateToken, categoriesController.createCategory);
categoriesRoute.get('/', validateToken, categoriesController.getAllCategories);

module.exports = categoriesRoute;