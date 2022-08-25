const { User } = require('../models');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');
const generateToken = require('../../utils/generateToken');

const userLogin = async (email, password) => {
  if (!email || !password) {
    return { code: StatusCodes.BAD_REQUEST, message: ReasonPhrases.REQUIRED_FIELDS };
  }

  const user = await User.findOne({ where: { email, password } });

  if (!user || user.password !== password) {
    return { code: StatusCodes.BAD_REQUEST, message: ReasonPhrases.INVALID_FIELDS };
  }

  const token = generateToken(user);

  return { code: StatusCodes.OK, token };
};

module.exports = {
  userLogin,
};