const { Category } = require('../models');
const { StatusCodes, ReasonPhrases } = require('../../utils/httpStatusCodes');

const createCategory = async (name) => {
  if (!name) {
    return { code: StatusCodes.BAD_REQUEST, message: ReasonPhrases.FIELD_REQUIRED('name') };
  }

  const category = await Category.create({ name });

  const response = {
    id: category.dataValues.id,
    name,
  };

  return { code: StatusCodes.CREATED, response };
};

module.exports = {
  createCategory,
};