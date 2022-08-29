const Sequelize = require('sequelize');
const { User, Category, PostCategory, BlogPost } = require('../models');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const createPost = async ({ title, content, categoryIds, userId }) => {
  if (!title || !content) {
    return { code: StatusCodes.BAD_REQUEST, message: ReasonPhrases.REQUIRED_FIELDS };
  }

  const categories = await Promise
    .all(categoryIds.map((id) => Category.findOne({ where: { id } })));

  if (categories.includes(null)) {
    return { code: StatusCodes.BAD_REQUEST, message: ReasonPhrases.CATEGORY_NOT_FOUND };
  }

  const response = await sequelize.transaction(async (t) => {
    const post = await BlogPost.create({ title, content, userId }, { transaction: t });
    await Promise.all(categoryIds.map((id) => PostCategory
      .create({ postId: post.id, categoryId: id }, { transaction: t })));
    
    return post;
  });

  return { code: StatusCodes.CREATED, response };
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category, as: 'categories',
      },
    ],
  });

  return { code: StatusCodes.OK, response: posts };
};

const getPost = async (id) => {
  const posts = await BlogPost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category, as: 'categories',
      },
    ],
  });

  if (!posts) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.FIELD_NOT_EXIST('Post') };
  }

  return { code: StatusCodes.OK, response: posts };
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
};