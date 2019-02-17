const {APP_NAME} = require('../config')
const {APIError} = require('../helpers')

function bodyParserHandler(error, request, response, next) {
  if (error instanceof SyntaxError || error instanceof TypeError) {
    // console.error(error);
    return next(new APIError(400, 'Bad Request', 'Malformed JSON.'))
  }
}

function fourZeroFourHandler(request, response, next) {
  return response
    .status(404)
    .json(
      new APIError(
        404,
        'Resource Not Found',
        `${request.path} is not valid path to a ${APP_NAME} resource.`
      )
    )
}

function fourZeroFiveHandler(request, response, next) {
  return response
    .status(405)
    .json(
      new APIError(
        405,
        'Method Not Allowed',
        `${request.method} method is not supported at ${request.path}.`
      )
    )
}

function globalErrorHandler(error, request, response) {
  let err = error
  if (!(error instanceof APIError)) {
    err = new APIError(500, error.type, error.message)
  }

  return response.status(err.status).json(err)
}

module.exports = {
  bodyParserHandler,
  fourZeroFourHandler,
  fourZeroFiveHandler,
  globalErrorHandler
}
