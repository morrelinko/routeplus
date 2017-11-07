'use strict'

const methods = require('methods')
const register = require('./register')
const Route = require('./route')

/**
 * Routeplus Router
 */
class Router {
  /**
   * 
   * @param {*} router 
   * @param {*} options
   */
  constructor (router, options) {
    this.options = options
    this.router = router
    this.prefix = options.prefix || null
  }

  /**
   * @returns original express.Router() instance
   */
  getRouter () {
    return this.router
  }

  /**
   * Register a new route with the given http verbs.
   * 
   * @param {*} method 
   * @param {*} path 
   * @param {*} options 
   */
  match (method, path, ...handlers) {
    let route = register.add(
      new Route(Object.assign({}, {
        path, 
        method, 
        handlers, 
        router: this
      }))
    )

    this.router[method.toLowerCase()](path, ...handlers)
  
    return route
  }

  mount () {
    return this.router
  }

  /**
   * Passthrough (router)
   */
  use () {
    return this.router.use(...arguments)
  }
}

methods.concat('all').forEach(method => {
  /**
   * @param path
   * @param options
   */
  Router.prototype[method] = function (path, ...handlers) {
    return this.match(method, path, ...handlers)
  }
})

module.exports = Router
