'use strict';

const express = require('express')
const mocha = require('mocha')
const should = require('should')
const Route = require('../lib/route')
const Router = require('../lib/router')
const rp = require('../')

let noop = (() => {})

describe('RoutePlus', function () {
  describe('router()', function () {

    it('creates router from express()', function () {
      let router = rp.router(express())

      should.ok(router)
    })

    it('creates router from express.Router()', function () {
      let adapted = rp.router(express.Router())

      should.ok(adapted)
    })

    it('returns a Route() instance when calling route methods', function () {
      let router = rp.router(express.Router())
      let home = router.get('/dashboard', noop)

      should(home).be.instanceOf(Route)
      should(home.getName()).not.empty
      should(home.getPath()).equal('/dashboard')
    })

  })

  describe('url()', function () {
    beforeEach(() => rp.clear())
    afterEach(() => {
      rp.config.hostname = null
      rp.config.secure = false
    })

    it('generates url for plain routes', function () {
      let router = rp.router(express.Router())

      router.get('/login', noop).as('login')
      router.get('/page/about', noop).as('about')

      should(rp.url('login')).equal('/login')
      should(rp.url('about')).equal('/page/about')
    })

    it('returns route name for invalid route in silent mode', function () {
      should(rp.url('profile', {}, {mode: 'silent'})).equal('/profile')
    })

    it('throws error for invalid route in strict mode', function () {
      should(() => {
        rp.url('profile', {}, {mode: 'strict'})
      }).throw(Error, {message: 'Undefined route name [profile]'})
    })

    it('should genereate url for routes with named parameters', function () {
      let router = rp.router(express.Router())
      router.get('/user/:username', noop).as('profile')

      should(rp.url('profile', {username: 'morrelinko'})).equal('/user/morrelinko')
      should(rp.url('profile', {username: 'john'})).equal('/user/john')
    })

    it('should prepend a baseUrl if specified in options', function () {
      rp.config.secure = true
      rp.config.hostname = 'sample.com'

      let router = rp.router(express.Router())

      router.get('/user/:username', noop).as('profile')

      should(rp.url('profile', {username: 'morrelinko'}))
        .equal('https://sample.com/user/morrelinko')

      should(rp.url('profile', {username: 'morrelinko'}, {hostname: 'example.com'}))
        .equal('https://example.com/user/morrelinko')

      should(rp.url('profile', {username: 'morrelinko'}, {secure: false, hostname: 'example.com'}))
        .equal('http://example.com/user/morrelinko')
    })
  })

  describe('mount()', function () {
    beforeEach(() => rp.clear());

    it('generates url without mounted path using express app.use() ', function () {
      let app = express()
      let router = rp.router(express.Router())

      router.get('/settings', noop).as('setting')
      console.log(rp.url('setting'))
      
      // router.getRouter() returns original express.Router()
      // instance passed to rp.roter(...)
      app.use('/user', router.mount())

      should(rp.url('setting')).equal('/settings')
    })

    it('generates url prepended with mounted path using "prefix" Option ', function () {
      let app = express()
      let router = rp.router(express.Router(), {
        prefix: '/user'
      })

      router.get('/settings', noop).as('setting')

      app.use('/user', router.mount())
      
      should(rp.url('setting')).equal('/user/settings')
    })
  })

  describe('clear()', function () {
    beforeEach(() => rp.clear())

    it('clears route table', function() {
      let router = rp.router(express.Router())

      router.get('/', noop).as('home')
      router.get('/about', noop).as('about')

      should(rp.routeTable()).be.lengthOf(2)

      rp.clear()

      should(rp.routeTable()).be.empty()
    })
  })
})
