'use strict';

let express = require('express');
let rp = require('../');
let ctrls = require('./controllers');

rp.builder.middleware(function loggedIn() {
  this.use(function (req, res, next) {
    console.log('LoggedIn middleware');
    next();
  });

  return this;
});

rp.builder.middleware('guest', function () {
  this.use(function (req, res, next) {
    console.log('Guest middleware');
    next();
  });

  return this;
});

let app = express();
app.get('/', rp.builder(ctrls.getHome).guest().build());
app.get('/dashboard', rp.builder(ctrls.getDashboard).loggedIn().build());
app.listen(3000);
