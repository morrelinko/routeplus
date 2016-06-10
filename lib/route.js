'use strict';

function Route(path, options) {
  this._path = path;
  this._name = null;
  this._options = options;
}

Route.prototype.as = function (name) {
  this._name = name;
  return this;
};

Route.prototype.options = function () {
  return this.option();
};

Route.prototype.option = function (name, value) {
  if (arguments.length === 0) {
    return this._options;
  }

  if (value) {
    return this._options[name] = value;
  }

  return this._options[name];
};

Route.prototype.getName = function () {
  return this._name;
};

Route.prototype.getPath = function () {
  return this._path;
};

module.exports = Route;
