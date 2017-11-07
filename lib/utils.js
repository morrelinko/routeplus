'use strict'

/**
 * @param error
 * @param mode
 */
exports.exception = function (error, mode = 'silent') {
  if (typeof(error) === 'string') {
    error = new Error(error)
  }

  switch(mode) {
    case 'warn':
      console.warn(error.message)
      break
    case 'strict':
      throw error
      break
  }
}

exports.noop = function () {}
