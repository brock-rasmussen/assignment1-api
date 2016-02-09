'use strict';

var request = require('superagent');

var host = "http://whoismyrepresentative.com/getall_";
//function repRequest ()

exports.allByZip = function (zip, callback) {
  request
    .get(host + "mems.php?zip=" + zip + "&output=json")
    .end(function (err, res) {
      if (err) {
        return callback(err);
      }
      try {
        callback(null, JSON.parse(res.text).results);
      } catch (err) {
        callback(null, []);
      }
    });
};

exports.repsByName = function (name, callback) {
  request
    .get(host + "reps_byname.php?name=" + name + "&output=json")
    .end(function (err, res) {
      if (err) {
        return callback(err);
      }
      try {
        callback(null, JSON.parse(res.text).results);
      } catch (err) {
        callback(null, []);
      }
    });
};

exports.repsByState = function (state, callback) {
  request
    .get(host + "reps_bystate.php?state=" + state + "&output=json")
    .end(function (err, res) {
      if (err) {
        return callback(err);
      }
      try {
        callback(null, JSON.parse(res.text).results);
      } catch (err) {
        callback(null, []);
      }
    });
};

exports.sensByName = function (name, callback) {
  request
    .get(host + "sens_byname.php?name=" + name + "&output=json")
    .end(function (err, res) {
      if (err) {
        return callback(err);
      }
      try {
        callback(null, JSON.parse(res.text).results);
      } catch (err) {
        callback(null, []);
      }
    });
};

exports.sensByState = function (state, callback) {
  request
    .get(host + "sens_bystate.php?state=" + state + "&output=json")
    .end(function (err, res) {
      if (err) {
        return callback(err);
      }
      try {
        callback(null, JSON.parse(res.text).results);
      } catch (err) {
        callback(null, []);
      }
    });
};