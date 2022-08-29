const jwt = require('jsonwebtoken');
const postsService = require('../services/postsService');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');

const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { title, content, categoryIds } = req.body;
    const { JWT_SECRET } = process.env;

    const decodedToken = jwt.verify(token, JWT_SECRET);

    const { code, message, response } = await postsService
      .createPost({ title, content, categoryIds, userId: decodedToken.data.id });

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json(response);
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

const getAllPosts = async (req, res) => {
  const token = req.headers.authorization;
  const { JWT_SECRET } = process.env;

  const decodedToken = jwt.verify(token, JWT_SECRET);

  const posts = await postsService.getAllPosts(decodedToken.data.id);

  res.status(200).json(posts);
};

module.exports = {
  createPost,
  getAllPosts,
};