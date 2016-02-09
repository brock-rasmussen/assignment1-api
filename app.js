'use strict';

var express = require('express');
var app = express();

var reps = require('./lib/reps');

app.get('/all/by-zip/:zip', function (req, res) {
  reps.allByZip(req.params.zip, function (err, people) {
    if (err) { return next(err); }
    res.json(people);
  });
});

app.get('/reps/by-name/:name', function (req, res) {
  reps.repsByName(req.params.name, function (err, people) {
    if (err) { return next(err); }
    res.json(people);
  });
});
app.get('/reps/by-state/:state', function (req, res) {
  reps.repsByState(req.params.state, function (err, people) {
    if (err) { return next(err); }
    res.json(people);
  });
});

app.get('/sens/by-name/:name', function (req, res) {
  reps.sensByName(req.params.name, function (err, people) {
    if (err) { return next(err); }
    res.json(people);
  });
});
app.get('/sens/by-state/:state', function (req, res) {
  reps.sensByState(req.params.state, function (err, people) {
    if (err) { return next(err); }
    res.json(people);
  });
});

app.listen(3000);

module.exports = app;
