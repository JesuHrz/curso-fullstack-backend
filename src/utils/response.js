const success = (res, { message = 'Success', code = 200, data = {} } = {}) => {
  res.status(code)
  res.json({ code, error: false, message, data })
}

const error = (res, { message = 'Not Found', code = 404 } = {}) => {
  res.status(404)
  res.json({ code, error: true, message })
}

module.exports = {
  success,
  error
}
