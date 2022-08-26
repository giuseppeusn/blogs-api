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

module.exports = {
  userLogin,
  createUser,
};