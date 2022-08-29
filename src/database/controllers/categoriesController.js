const categoriesService = require('../services/categoriesService');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
  
    const { code, message, response } = await categoriesService.createCategory(name);
  
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

const getAllCategories = async (_req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();

    return res.status(StatusCodes.OK).json(categories);
  } catch (err) {
    res
      .status(StatusCodes.SERVER_ERROR)
      .json({ message: `${ReasonPhrases.INTERNAL_ERROR} ${err.message}` });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};