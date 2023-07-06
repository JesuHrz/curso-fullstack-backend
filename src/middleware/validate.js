const { ValidationError } = require('yup')
const response = require('../utils/response')

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params
    })

    return next()
  } catch (e) {
    let message = 'Bad request.'

    if (e instanceof ValidationError) {
      message = e.errors
    }

    response.error(res, { code: 400, message })
  }
}

module.exports = validate
