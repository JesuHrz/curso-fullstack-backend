'use strict'

const bcrypt = require('bcrypt')
const saltRounds = 10

const encrypt = (str) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(str, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
}

const compare = (str, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(str, hash, function (err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  encrypt,
  compare
}
