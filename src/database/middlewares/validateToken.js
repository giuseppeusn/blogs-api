const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.TOKEN_NOT_FOUND });
  }

  try {
    const { JWT_SECRET } = process.env;

    const decoded = jwt.verify(token, JWT_SECRET);

    await User.findOne({ where: { displayName: decoded.data.displayName } });

    return next();
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: ReasonPhrases.EXPIRED_TOKEN });
  }
};

module.exports = {
  validateToken,
};