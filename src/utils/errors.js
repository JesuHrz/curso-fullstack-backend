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

module.exports = {
  AuthenticationError,
  DatabaseConnectionError
}
