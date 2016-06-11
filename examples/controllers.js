'use strict';

exports.getHome = function (req, res) {
  res.send('Home');
};

exports.getDashboard = function (req, res) {
  res.send('Dashboard');
};

exports.getProfile = function (req, res) {
  res.send('Profile page')
};

exports.getSettings = function (req, res) {
  res.send('Settings');
};