const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { code, message, token } = await usersService.userLogin(email, password);

    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json({ token });
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const { code, message, token } = await usersService
      .createUser({ displayName, email, password, image });
    
    if (message) {
      return res.status(code).json({ message });
    }

    return res.status(code).json({ token });
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const users = await usersService.getAllUsers();

    res.status(StatusCodes.OK).json(users);
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, message, response } = await usersService.getUser(id);

    if (message) {
      return res.status(code).json({ message });
    }

    res.status(code).json(response);
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { JWT_SECRET } = process.env;

    const { data: { id } } = jwt.verify(token, JWT_SECRET);

    await usersService.deleteUser(id);

    return res.status(StatusCodes.NO_CONTENT).end();
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

module.exports = {
  userLogin,
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
};