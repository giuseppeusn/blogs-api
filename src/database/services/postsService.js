const Sequelize = require('sequelize');
const { Category } = require('../models');
const { BlogPost } = require('../models');
const { PostCategory } = require('../models');
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

module.exports = {
  createPost,
};