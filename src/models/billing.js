'use strict'

const { Sequelize, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Billing = sequelize.define('billing', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfPaid: {
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
    tableName: 'billing'
  })

  if (sequelize.models.user) {
    Billing.belongsTo(sequelize.models.user)
  }

  return Billing
}
