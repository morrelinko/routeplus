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
    this.middlewares = []
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
    method = method.toLowerCase()

    let route = register.add(
      new Route(
        Object.assign(
          {},
          {
            path,
            method,
            handlers,
            router: this
          }
        )
      )
    )

    let expressRoute = this.router.route(path)

    expressRoute[method].call(
      expressRoute,
      ...[...this.middlewares, ...handlers]
    )

    expressRoute.routeplus = route

    return route
  }

  mount () {
    return this.router
  }

  /**
   * Passthrough (router)
   */
  use () {
    return this.middlewares.push(...arguments)
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
