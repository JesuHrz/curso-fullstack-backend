'use strict'

const jwt = require('jsonwebtoken')
const { auth } = require('../config')

const sign = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, auth.secret, { expiresIn: '4d' }, function (err, token) {
      if (err) reject(err)
      resolve(token)
    })
  })
}

const verify = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, auth.secret, function (err, decoded) {
      if (err) reject(err)
      resolve(decoded)
    })
  })
}

module.exports = {
  sign,
  verify
}
