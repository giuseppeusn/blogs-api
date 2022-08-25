const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  SERVER_ERROR: 500,
};

const ReasonPhrases = {
  INVALID_FIELDS: 'Invalid fields',
  REQUIRED_FIELDS: 'Some required fields are missing',
  INTERNAL_ERROR: 'Internal server error!',
};

module.exports = {
  StatusCodes,
  ReasonPhrases,
};