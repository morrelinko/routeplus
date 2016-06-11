'use strict';

let router = require('./router');
let builder = require('./builder');

exports.adapt = router.adapt;
exports.url = router.url;
exports.routes = router.routes;
exports.clear = router.clear;

exports.builder = builder;
