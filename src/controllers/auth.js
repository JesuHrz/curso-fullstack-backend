'use strict'

const { User } = require('../models')
const response = require('../utils/response')
const { AuthenticationError } = require('../utils/errors')

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ where: { email } })
    const comparedPassword = await existingUser?.validatePassword(password)

    if (!existingUser || !comparedPassword) {
      throw new AuthenticationError('Email and/or password are invalid.')
    }

    response.success(res, { code: 200, message: 'Authenticated.' })
  } catch (e) {
    const responseError = { code: 500, message: 'Something was wrong.' }

    if (e instanceof AuthenticationError) {
      responseError.code = 401
      responseError.message = e.message
    }

    response.error(res, responseError)
  }
}

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body
    const existingUser = await User.findOne({ where: { email } })

    if (existingUser) {
      response.error(res, { code: 409, message: 'Email is already taken.' })
      return
    }

    const createdUser = await User.create({ fullName, email, password })
    const { password: _, ...user } = createdUser.toJSON()

    response.success(res, { code: 201, data: user })
  } catch (e) {
    response.error(res, { code: 400, message: 'Bad request.' })
  }
}

module.exports = {
  signIn,
  signUp
}
