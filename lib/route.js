'use strict';

const { noop } = require('./utils')

/**
 * Route fluent builder
 */
module.exports = class Route {
  /**
   * Class Constructor
   */
  constructor (options) {
    this.path = options.path
    this.method = options.method
    this.name = options.name || null
    this.handlers = options.handlers || [noop]
    this.router = options.router || null
    this.options = {}
  }

  getName () {
      return this.name
  }

  getPath () {
    return this.path
  }

  getRouter () {
    return this.router
  }

  setRouter (router) {
    this.router = router
  } 

  /**
   * 
   * @param {*} name 
   * @returns Route
   */
  as (name) {
    this.name = name
    return this
  }

  /**
   * @returns Route
   */
  options () {
    return this.options()
  }
}
