const jwt = require('jsonwebtoken');
const postsService = require('../services/postsService');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');

const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { title, content, categoryIds } = req.body;
    const { JWT_SECRET } = process.env;

    const { data: { id: userId } } = jwt.verify(token, JWT_SECRET);

    const { code, message, response } = await postsService
      .createPost({ title, content, categoryIds, userId });

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
  try {
    const { code, response } = await postsService.getAllPosts();

    res.status(code).json(response);
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const { code, message, response } = await postsService.getPost(id);

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

const updatePost = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { params: { id }, body: { title, content } } = req;
    const { JWT_SECRET } = process.env;

    const { data: { id: tokenId } } = jwt.verify(token, JWT_SECRET);

    const { code, message, response } = await postsService
      .updatePost(id, tokenId, title, content);

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

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const { JWT_SECRET } = process.env;

    const decodedToken = jwt.verify(token, JWT_SECRET);
    const { code, message } = await postsService.deletePost(id, decodedToken.data.id);

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).end();
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

const searchPost = async (req, res) => {
  try {
    const { q } = req.query;

    const { code, response } = await postsService.searchPost(q);

    return res.status(code).json(response);
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  searchPost,
};