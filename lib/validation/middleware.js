'use strict'

const indicative = require('indicative')
const RequestValidator = require('./request')
const ValidationError = require('./error')

module.exports = function (validator) {
  return async function (req, res, next) {
    let v = validator(RequestValidator, req)

    if ((v instanceof RequestValidator) === false) {
      return next()
    }

    try {
      if (v.hasRules()) {
        await indicative.validate(
          v.getData(req.body), 
          v.getRules(),
          v.getMessages(),
          v.getFormatter()
        )
      }

      if (v.hasFilters()) {
        await indicative.sanitize(
          v.getData(req.body),
          v.getFilters()
        ) 
      }
    } catch (errors) {
      return next(new ValidationError(errors))
    }
 
    next()
  }
}

