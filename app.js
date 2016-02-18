'use strict';

var path = require('path');
var express = require('express');
var reps = require('./lib/reps');
var app = express();
var PORT = process.env.PORT || 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', false);

app.get('/all/by-zip/:zip', function (req, res) {
  reps.allByZip(req.params.zip, function (err, results) {
    if (err) { return next(err); }
    res.json(results);
  });
});

app.get('/reps/by-name/:name', function (req, res) {
  reps.repsByName(req.params.name, function (err, results) {
    if (err) { return next(err); }
    res.json(results);
  });
});
app.get('/reps/by-state/:state', function (req, res) {
  reps.repsByState(req.params.state, function (err, results) {
    if (err) { return next(err); }
    res.json(results);
  });
});

app.get('/sens/by-name/:name', function (req, res) {
  reps.sensByName(req.params.name, function (err, results) {
    if (err) { return next(err); }
    res.json(results);
  });
});
app.get('/sens/by-state/:state', function (req, res) {
  reps.sensByState(req.params.state, function (err, results) {
    if (err) { return next(err); }
    res.json(results);
	});
});

app.get('/', function (req, res, next) {
  var method;
  
  switch (req.query.method) {
  case 'zip':
    method = reps.allByZip;
    break;
  case 'name':
    method = reps.repsByName;
    break;
  case 'state':
    method = reps.repsByState;
    break;
  default:
    method = function (param, cb) { cb(null, []); };
    break;
  }
      
  method(req.query.search, function (err, results) {
    if (err) { return next(err); }
    res.render('index', {
      reps: results,
      query: req.query
    });
  });
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
