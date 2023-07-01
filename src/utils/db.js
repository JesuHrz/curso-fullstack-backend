const { Sequelize } = require('sequelize')

const { db } = require('../config')
const { DatabaseConnectionError } = require('./errors')

const createConnection = async () => {
  try {
    const sequelize = new Sequelize(
      db.database,
      db.username,
      db.password,
      {
        host: db.host,
        dialect: db.dialect
      }
    )

    await sequelize.authenticate()
  } catch (e) {
    throw new DatabaseConnectionError(e.message)
  }
}

module.exports = {
  createConnection
}
