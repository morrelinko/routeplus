'use strict'

class RequestValidator {
  constructor(options) {
    this.rules = options.rules || {}
    this.messages = options.messages || {}
    this.filters = options.filters || {}
    this.data = options.data || {}
    this.formatter = options.formatter || null
  }

  static create (options) {
    return new RequestValidator(options)
  }

  authorize () {
    return true
  }

  hasData () {
    return Object.keys(this.data).length > 0
  }

  getData (defData = {}) {
    return this.hasData() ? this.data : defData
  }

  getRules () {
    return this.rules
  }

  hasRules () {
    return Object.keys(this.rules).length > 0
  }

  getMessages () {
    return this.messages
  }

  hasMessages () {
    return Object.keys(this.messages).length > 0
  }

  getFilters () {
    return this.filters
  }

  hasFilters () {
    return Object.keys(this.filters).length > 0
  }

  getFormatter () {
    return this.formatter
  }
}

module.exports = RequestValidator
