'use strict'

const { instance } = require('../utils/db')
const userModelConfig = require('./user')

module.exports = {
  User: userModelConfig(instance)
}
