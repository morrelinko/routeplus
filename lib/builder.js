'use strict';

exports.P_INIT = 0;
exports.P_MIDDLEWARE = 50;
exports.P_CTRL = 60;
exports.P_TERMINATE = 100;

let _builders = exports._builders = {};
let _count = exports._count = 0;
let _default = exports._default = null;
let _middlewares = exports._middlewares = {};

let builder = module.exports = function (ctrl) {
  return builder.create(ctrl).mix(_middlewares);
};

/**
 * Registers a
 * @param name
 * @param fn
 */
builder.register = function (name, fn) {
  builder[name] = _builders[name] = fn;

  if (_default == null) {
    _default = name;
  }
};

/**
 * Sets
 * @returns {*}
 */
builder.default = function () {
  return _default;
};

builder.middleware = function (name, fn) {
  if (arguments.length === 1) {
    if (!name.name) {
      throw new Error('Registering a middleware without name.');
    }

    fn = name;
    name = fn.name;
  }

  _middlewares[name] = fn;
};

builder.create = function (ctrl) {
  let _ctrl = ctrl;
  let _stack = [];

  return {
    stack: _stack,
    ctrl: _ctrl,
    
    use (fn, pos) {
      if (!pos && pos !== 0) {
        pos = exports.P_MIDDLEWARE;
      }

      _stack.push({
        fn: fn,
        pos: pos
      });

      return this;
    },

    build() {
      this.use((req, res, next) => _ctrl.call(_ctrl, req, res, next), exports.P_CTRL);
      return _stack.sort((a, b) => a.pos - b.pos).map(item => item.fn);
    },

    mix(middlewares) {
      let i = 0;
      let keys = Object.keys(middlewares);
      let l = keys.length;
      while (i < l) {
        this[keys[i]] = middlewares[keys[i]];
        i++;
      }

      return this;
    }
  };
};
