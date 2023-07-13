'use strict'

const { instance } = require('../utils/db')
const userModelConfig = require('./user')
const billingModelConfig = require('./billing')

module.exports = {
  User: userModelConfig(instance),
  Billing: billingModelConfig(instance)
}
