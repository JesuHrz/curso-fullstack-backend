'use strict'

const { Sequelize } = require('sequelize')
const { glob } = require('glob')
const path = require('path')

const { db } = require('../config')
const { DatabaseConnectionError } = require('./errors')

let instance = null
let authenticated = false

const getInstance = () => {
  if (!instance) {
    instance = new Sequelize(
      db.database,
      db.username,
      db.password,
      {
        host: db.host,
        dialect: db.dialect
      }
    )
  }

  return instance
}

const initModels = async () => {
  try {
    const modelDefiners = await glob('src/models/*.js', { ignore: ['node_modules/**', 'src/models/index.js'] })

    for (const modelDefiner of modelDefiners) {
      const _path = path.join(process.cwd(), modelDefiner)
      require(_path)(getInstance())
    }
  } catch (e) {
    throw new DatabaseConnectionError('No connection.')
  }
}

const createConnection = async () => {
  try {
    const sequelize = getInstance()

    if (!authenticated) {
      await sequelize.authenticate()
      await initModels()
      await sequelize.sync()

      authenticated = true
    }

    return sequelize
  } catch (e) {
    throw new DatabaseConnectionError(e.message)
  }
}

module.exports = {
  instance: getInstance(),
  createConnection
}
