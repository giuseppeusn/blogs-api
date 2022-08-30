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

const getAllPosts = async (_req, res) => {
  const { code, response } = await postsService.getAllPosts();

  res.status(code).json(response);
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const { code, message, response } = await postsService.getPost(id);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(response);
};

const updatePost = async (req, res) => {
  const token = req.headers.authorization;
  const { params: { id }, body: { title, content } } = req;
  const { JWT_SECRET } = process.env;

  const decodedToken = jwt.verify(token, JWT_SECRET);

  const { code, message, response } = await postsService
    .updatePost(id, decodedToken.data.id, title, content);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(response);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const { JWT_SECRET } = process.env;

  const decodedToken = jwt.verify(token, JWT_SECRET);
  const { code, message } = await postsService.deletePost(id, decodedToken.data.id);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).end();
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};