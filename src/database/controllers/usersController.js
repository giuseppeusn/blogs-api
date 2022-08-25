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

module.exports = {
  userLogin,
};