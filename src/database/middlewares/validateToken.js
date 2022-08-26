const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.TOKEN_NOT_FOUND });
  }

  const { JWT_SECRET } = process.env;

  const decoded = jwt.verify(token, JWT_SECRET);

  const user = await User.findOne({ where: { username: decoded.data.username } });

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.EXPIRED_TOKEN });
  }

  return next();
};

module.exports = {
  validateToken,
};