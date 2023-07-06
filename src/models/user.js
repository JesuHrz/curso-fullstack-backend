'use strict'

const { Sequelize, DataTypes } = require('sequelize')
const { encrypt, compare } = require('../utils/encrypt')

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('now()')
    }
  },
  {
    tableName: 'user'
  })

  User.beforeCreate(async (user) => {
    const hashedPassword = await encrypt(user.password)
    user.password = hashedPassword
  })

  User.prototype.validatePassword = async function (password) {
    return compare(password, this.password)
  }

  return User
}
