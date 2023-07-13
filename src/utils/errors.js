'use strict'

class DatabaseConnectionError extends Error {
  constructor (message) {
    super(message)
    this.name = 'DatabaseConnectionError'
  }
}

class AuthenticationError extends Error {
  constructor (message = 'Unauthorized.') {
    super(message)
    this.name = 'AuthenticationError'
  }
}

class NotFoundError extends Error {
  constructor (message = 'Not found.') {
    super(message)
    this.name = 'NotFoundError'
    this.code = 404
  }
}

module.exports = {
  AuthenticationError,
  DatabaseConnectionError,
  NotFoundError
}
