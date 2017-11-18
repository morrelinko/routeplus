'use strict'

class ValidationError extends Error {
  constructor (errors) {
    super()
    Error.captureStackTrace(this, ValidationError)
    this.errors = errors
  }

  getErrors () {
    return this.errors
  }
}

module.exports = ValidationError
