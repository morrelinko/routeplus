'use strict'

const util = require('util')
const config = require('./config')
const register = require('./register')
const { exception } = require('./utils')

/**
 * @param name
 * @param parameters
 * @param options
 */
exports.url = function (name, parameters = {}, options = {}) {
  options = Object.assign(config, options)

  // Retreive route definition from route table
  let route = register.get(name)

  if (util.isNull(route)) {
    exception('Undefined route name [' + name + ']', options.mode)

    return '/' + name.trim('/')
  }

  let { routeTable } = register
  let { router } = route

  return `http${(options.secure ? 's' : '')}://`  
    + (options.hostname ? options.hostname : '')
    + (router.prefix || '')
    + route.path.replace(/(\/:\w+\??)/g, function (m, c) {
      c = c.replace(/[/:?]/g, '');
      return (parameters[c] ? '/' + parameters[c] : '')
    })
}
