'use strict';

let express = require('express');
let rp = require('../');

let app = rp.adapt(express());
let front = rp.adapt(express.Router());
let user = rp.adapt(express.Router());

app.get('/', function (req, res) {
  res.send('Home page');
}).as('home');

front.get('/about', function (req, res) {
  res.send('About Us Page: ');
}).as('about');

user.get('/:username', function (req, res) {
  res.send('Profile page ');
}).as('profile');

front.get('/routes', function (req, res) {
  res.send([
    'Home: ' + rp.url('home'),
    'About: ' + rp.url('about'),
    'User Profile: ' + rp.url('profile', {username: 'morrelinko'})
  ].join('<br />'));
});

front.mount(app); // equivalent of app.use(front)
user.mount(app, '/user'); // equivalent of app.use('/user', user);

app.listen(3000);