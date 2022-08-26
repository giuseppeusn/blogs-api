const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const { JWT_SECRET } = process.env;

  const JWT_CONFIG = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, JWT_SECRET, JWT_CONFIG);

  return token;
};

module.exports = generateToken;