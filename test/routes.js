'use strict';

let express = require('express');
let mocha = require('mocha');
let should = require('should');
let rp = require('../');
let Route = require('../lib/route');

let noop = () => {
};

describe('routeplus', function () {
  describe('adapt()', function () {

    it('should adapt express app', function () {
      let adapted = rp.adapt(express());

      should.ok(adapted);
    });

    it('should adapt express Router', function () {
      let router = express.Router();
      let adapted = rp.adapt(router);

      should.ok(adapted);
    });

    it('should return a Route() instance when calling route methods', function () {
      let router = rp.adapt(express.Router());
      let home = router.get('/', noop);

      should(home).be.instanceOf(Route);
      should(home.getName()).equal(null);
      should(home.getPath()).equal('/');
    });

  });

  describe('url()', function () {
    beforeEach(() => rp.clear());

    it('should generate url for plain routes', function () {
      let router = rp.adapt(express.Router());
      router.get('/login', noop).as('login');
      router.get('/page/about', noop).as('about');

      should(rp.url('login')).equal('/login');
      should(rp.url('about')).equal('/page/about');
    });

    it('should genereate url for routes with named parameters', function () {
      let router = rp.adapt(express.Router());
      router.get('/user/:username', noop).as('profile');

      should(rp.url('profile', {username: 'morrelinko'})).equal('/user/morrelinko');
      should(rp.url('profile', {username: 'john'})).equal('/user/john');
    });

    it('should prepend a baseUrl if specified in options', function () {
      let router = rp.adapt(express.Router());
      router.get('/user/:username', noop).as('profile');

      let url = rp.url('profile', {username: 'morrelinko'}, {baseUrl: 'http://example.com'});
      should(url).equal('http://example.com/user/morrelinko');
    });

    it('should return route name for invalid route when the silent option set to true', function () {
      should(rp.url('profile', {}, {silent: true})).equal('/profile');
    });

    it('should throw error for invalid route when the silent option set to false', function () {
      should(() => {
        rp.url('profile', {}, {silent: false})
      }).throw(Error, {message: 'Undefined route name [profile]'});
    });
  });

  describe('mount()', function () {
    beforeEach(() => rp.clear());

    it('should generate url without mounted path using app.use() ', function () {
      let app = express();
      let router = rp.adapt(express.Router());
      router.get('/settings', noop).as('setting');
      app.use('/user', router);

      should(rp.url('setting')).equal('/settings');
    });

    it('should generate url prepended with mounted path using router.mount() ', function () {
      let app = express();
      let router = rp.adapt(express.Router());
      router.get('/settings', noop).as('setting');
      router.mount(app, '/user');

      should(rp.url('setting')).equal('/user/settings');
    });
  });

  describe('clear()', function () {
    beforeEach(() => rp.clear());

    it('should clear route list', function() {
      let router = rp.adapt(express.Router());
      router.get('/', noop).as('home');
      router.get('/about', noop).as('about');

      should(rp.routes()).be.lengthOf(2);

      rp.clear();
      should(rp.routes()).be.empty();
    });
  });
})
;