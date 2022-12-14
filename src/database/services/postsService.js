const Sequelize = require('sequelize');
const { User, Category, PostCategory, BlogPost } = require('../models');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);
const { Op } = Sequelize;

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

const updatePost = async (id, userId, title, content) => {
  if (!title || !content) {
    return { code: StatusCodes.BAD_REQUEST, message: ReasonPhrases.REQUIRED_FIELDS };
  }

  const { code, message } = await getPost(id);

  if (message) {
    return { code, message };
  }

  const [rowsAffected] = await BlogPost.update(
    { title, content },
    { where: { id, userId } },
  );

  if (rowsAffected < 1) {
    return { code: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED_USER };
  }

  const { response } = await getPost(id);

  return { code: StatusCodes.OK, response };
};

const deletePost = async (id, userId) => {
  const { code, message } = await getPost(id);

  if (message) {
    return { code, message };
  }

  const rowsAffected = await BlogPost.destroy({ where: { id, userId } });

  if (rowsAffected < 1) {
    return { code: StatusCodes.UNAUTHORIZED, message: ReasonPhrases.UNAUTHORIZED_USER };
  }

  return { code: StatusCodes.NO_CONTENT };
};

const searchPost = async (q) => {
  const query = `%${q}%`;

  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: query } }, { content: { [Op.like]: query } }],
    },
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

  return { code: StatusCodes.OK, response: post };
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  searchPost,
};