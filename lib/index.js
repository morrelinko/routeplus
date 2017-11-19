'use strict';

const express = require('express')
const config = require('./config')
const register = require('./register')
const generator = require('./generator')
const Router = require('./router')

exports.config = config
exports.url = generator.url
exports.routeTable = register.routeTable
exports.routes = register.routes
exports.clear = register.clear
exports.router = (router, options = {}) => new Router(router, options, register)
exports.Router = (options) => exports.router(express.Router(), options)
