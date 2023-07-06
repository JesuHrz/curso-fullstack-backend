'use strict'

const success = (res, { message = 'Success', code = 200, data = null } = {}) => {
  res.status(code)

  const reponse = { message, error: false, code }

  if (data) {
    reponse.data = data
  }

  res.json(reponse)
}

const error = (res, { message = 'Not Found', code = 404 } = {}) => {
  res.status(code)
  res.json({ code, error: true, message })
}

module.exports = {
  success,
  error
}
