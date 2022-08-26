const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');

const validateLength = (value, length) => !value || value.length < length; 

const validateNewUser = ({ displayName, email, password }) => {
  const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  switch (true) {
    case validateLength(displayName, 8):
      return { code: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.INVALID_LENGTH('displayName', '8') };
    case validateLength(password, 6):
      return { code: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.INVALID_LENGTH('password', '6') };
    case !regex.test(email):
      return { code: StatusCodes.BAD_REQUEST,
        message: ReasonPhrases.INVALID_EMAIL };
    default:
      return false;
  }
};

module.exports = validateNewUser;