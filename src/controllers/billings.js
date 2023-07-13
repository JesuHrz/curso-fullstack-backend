'use strict'

const { Billing } = require('../models')
const response = require('../utils/response')
const { NotFoundError } = require('../utils/errors')

const getBillingsByUser = async (req, res) => {
  try {
    const { user } = req
    const billings = await Billing.findAll({
      where: { userId: user.id }
    })
    response.success(res, { code: 200, data: { billings } })
  } catch (e) {
    console.error('getBillingsByUser', e)
    response.error(res, { code: 500, message: 'Something was wrong.' })
  }
}

const createBilling = async (req, res) => {
  try {
    const { user, body } = req
    const { name, price, description, dateOfPaid } = body
    const billing = await Billing.create({
      name,
      price,
      description,
      dateOfPaid,
      userId: user.id
    })

    response.success(res, { code: 201, data: billing })
  } catch (e) {
    console.error('createBilling', e)
    response.error(res, { code: 500, message: 'Something was wrong.' })
  }
}

const updateBilling = async (req, res) => {
  try {
    const { user, body, params } = req
    const { name, price, description, dateOfPaid } = body

    const billing = await Billing.findOne({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!billing) throw new NotFoundError()

    await billing.update({ name, price, description, dateOfPaid })
    await billing.reload()

    response.success(res, { code: 201, data: billing })
  } catch (e) {
    console.error('updateBilling', e)
    const error = { code: 500, message: 'Something was wrong.' }

    if (e instanceof NotFoundError) {
      error.message = e.message
      error.code = e.code
    }

    response.error(res, error)
  }
}

const deleteBilling = async (req, res) => {
  try {
    const { user, params } = req
    const billing = await Billing.destroy({
      where: {
        id: params.id,
        userId: user.id
      }
    })

    if (!billing) throw new NotFoundError()

    response.success(res, { code: 201 })
  } catch (e) {
    console.error('deleteBilling', e)
    const error = { code: 500, message: 'Something was wrong.' }

    if (e instanceof NotFoundError) {
      error.message = e.message
      error.code = e.code
    }

    response.error(res, error)
  }
}

const filterBillings = async (req, res) => {
  try {
    const { user, query } = req
    let billings = []

    if (query.type === 'date') {
      billings = await Billing.findAll({
        where: {
          userId: user.id,
          dateOfPaid: query.value
        }
      })
    }

    response.success(res, { code: 200, data: { billings } })
  } catch (e) {
    console.error('filterBillings', e)
    response.error(res, { code: 500, message: 'Something was wrong.' })
  }
}

module.exports = {
  createBilling,
  getBillingsByUser,
  updateBilling,
  deleteBilling,
  filterBillings
}
