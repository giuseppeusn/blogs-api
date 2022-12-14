const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  SERVER_ERROR: 500,
};

const ReasonPhrases = {
  INVALID_FIELDS: 'Invalid fields',
  REQUIRED_FIELDS: 'Some required fields are missing',
  INTERNAL_ERROR: 'Internal server error!',
  INVALID_LENGTH: (field, length) => `"${field}" length must be at least ${length} characters long`,
  INVALID_EMAIL: '"email" must be a valid email',
  FIELD_REQUIRED: (field) => `"${field}" is required`,
  USER_REGISTRED: 'User already registered',
  TOKEN_NOT_FOUND: 'Token not found',
  EXPIRED_TOKEN: 'Expired or invalid token',
  FIELD_NOT_EXIST: (field) => `${field} does not exist`,
  CATEGORY_NOT_FOUND: '"categoryIds" not found',
  UNAUTHORIZED_USER: 'Unauthorized user',
};

module.exports = {
  StatusCodes,
  ReasonPhrases,
};