'use strict';

let express = require('express');
let mocha = require('mocha');
let should = require('should');
let rp = require('../lib');
let noop = () => undefined;
let middlewareFn = (req, res, next) => next();

describe('Builder', function () {
  describe('middleware()', function () {
    it('should register named middleware', function () {
      rp.builder.middleware('test', noop);

      // @internalAPI
      should(rp.builder._middlewares).have.property('test');
    });

    it('should register named middleware using function name if no name is explicitly specified', function () {
      rp.builder.middleware(function test() {
      });

      should(rp.builder._middlewares).have.property('test');
    });
  });

  describe('create()', function () {
    it('should create a builder', function () {
      let b = rp.builder(noop).build();

      should.ok(b);
      should(b).be.instanceOf(Object);
    });

    describe('use()', function () {
      it('should attach middlewares', function () {
        let ctrl = rp.builder(noop);

        should.ok(ctrl);
        // controller not attached until build() method is called.
        should(ctrl._stack).be.of.length(0);

        ctrl.use(middlewareFn);
        should(ctrl._stack).be.of.length(1);

        ctrl.build();
        should(ctrl._stack).be.of.length(2);
      });
    });

    describe('build()', function () {
      it('should return an array of handler functions', function () {
        let stack = rp.builder(noop).use(middlewareFn).build();

        should.ok(stack);
        should(stack).be.instanceOf(Array);
        should(stack).be.of.length(2); // 1. controller method 2. noop middleware
      });
    });

    describe('mix()', function () {
      it('should mix in named middlewares', function () {
        rp.builder.middleware('loggedIn', noop);

        should.ok(rp.builder(noop).loggedIn);
      });
    });
  });
});
