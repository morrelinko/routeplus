'use strict';

exports.P_INIT = 0;
exports.P_MIDDLEWARE = 50;
exports.P_CTRL = 60;
exports.P_TERMINATE = 100;

let builder = module.exports = function (ctrl) {
  return builder.create(ctrl).mix(builder._middlewares);
};

builder._builders = {};
builder._middlewares = {};

/**
 * Registers a
 * @param name
 * @param fn
 */
builder.register = function (name, fn) {
  builder[name] = this._builders[name] = fn;
};

builder.middleware = function (name, fn) {
  if (arguments.length === 1) {
    if (!name.name) {
      throw new Error('Registering a middleware without name.');
    }

    fn = name;
    name = fn.name;
  }

  this._middlewares[name] = fn;
};

builder.create = function (ctrl) {
  let _ctrl = ctrl;
  let _stack = [];

  return {
    _stack: _stack,
    _ctrl: _ctrl,

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
