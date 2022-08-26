const { User } = require('../models');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');
const generateToken = require('../../utils/generateToken');
const validateNewUser = require('../schemas/validateNewUser');

const userLogin = async (email, password) => {
  if (!email || !password) {
    return { code: StatusCodes.BAD_REQUEST, message: ReasonPhrases.REQUIRED_FIELDS };
  }

  const user = await User.findOne({ where: { email } });
  console.log(user);

  if (!user || user.password !== password) {
    return { code: StatusCodes.BAD_REQUEST, message: ReasonPhrases.INVALID_FIELDS };
  }

  const token = generateToken(user);

  return { code: StatusCodes.OK, token };
};

const createUser = async ({ displayName, email, password, image }) => {
  const { code, message } = validateNewUser({ displayName, email, password });

  if (message) {
    return { code, message };
  }

  const alreadyExist = await User.findOne({ where: { email } });

  if (alreadyExist) {
    return { code: StatusCodes.CONFLICT, message: ReasonPhrases.USER_REGISTRED };
  }

  await User.create({ displayName, email, password, image });
  
  const { token } = await userLogin(email, password);

  return { code: StatusCodes.CREATED, token };
};

const getAllUsers = async () => User.findAll({ attributes:
  ['id', 'displayName', 'email', 'image'] });

const getUser = async (id) => {
  const user = await User.findOne({ where: { id },
    attributes: ['id', 'displayName', 'email', 'image'] });

  if (!user) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.USER_NOT_EXIST };
  }

  return { code: StatusCodes.OK, response: user };
};

module.exports = {
  userLogin,
  createUser,
  getAllUsers,
  getUser,
};