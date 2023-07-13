'use strict'

const { User } = require('../models')
const { verify } = require('../utils/jwt')
const { AuthenticationError } = require('../utils/errors')
const response = require('../utils/response')

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]

    if (!token) throw new AuthenticationError()

    const decodedToken = await verify(token)
    const foundUser = await User.findByPk(decodedToken.id)

    if (!foundUser) throw new AuthenticationError()

    const { password: _, ...user } = foundUser.toJSON()

    req.user = user

    next()
  } catch (e) {
    response.error(res, { code: 401, message: 'Unauthorized.' })
  }
}

module.exports = authenticate
