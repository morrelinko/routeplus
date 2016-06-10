'use strict';

/**
 * <code>
 *   let express = require('express');
 *   let rp = require('routeplus');
 *
 *   let router = rp.adapt(express.Router());
 *   router.get('/login').name('auth.login');
 *
 * </code>
 *
 * @author Laju Morrison <morrelinko@gmail.com>
 */

let util = require('util');
let methods = require('methods');
let Route = require('./route');

// Holds routes
let __routes = [];

/**
 * @param router Express Router
 */
exports.adapt = function (router) {
  let options = {};
  // override route methods (get, post, put.. etc)
  methods.concat('all').forEach(method => {
    // grab reference of original router implementation
    let _method = router[method];
    
    router[method] = function _route(path) {
      let route = new Route(path, options);
      _method.apply(router, arguments);
      __routes.push(route);
      return route;
    };
  });

  router.mount = function (app, path) {
    let args = [];
    options.mountpath = path;
    args = args.concat(Array.prototype.slice.call(arguments, 1));
    args = args.concat(router);
    app.use.apply(app, args);
  };

  return router;
};

/**
 * Gets all defined routes
 * @returns {Array} Route Collection
 */
exports.routes = function () {
  return __routes;
};

exports.clear = function () {
  __routes = [];
};

/**
 * Generate url from named routes
 *
 * @param name
 * @param args
 * @param options
 * @returns {*|string|void|XML}
 */
exports.url = function (name, args, options) {
  options = Object.assign({
    silent: true
  }, options);

  let route = null;
  let i = 0;
  while (i < __routes.length) {
    if (__routes[i].getName() == name) {
      route = __routes[i];
      break;
    }
    i++;
  }

  if (util.isNull(route)) {
    if (!options.silent) {
      throw new Error('Undefined route name [' + name + ']');
    }

    return '/' + name.trim('/');
  }

  return (options.baseUrl ? options.baseUrl : '')
    + (route.option('mountpath') || '')
    + route.getPath().replace(/(\/:\w+\??)/g, function (m, c) {
      c = c.replace(/[/:?]/g, '');
      return (args[c] ? '/' + args[c] : '');
    });
};
