'use strict';

var path = require('path');
var express = require('express');

var reps = require('./lib/reps');

var app = express();
var PORT = process.env.PORT || 8000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('view cache', false);

app.get('/', function (req, res, next) {
  var method;
  switch (req.query.type) {
  case 'zip':
    method = reps.allByZip;
    break;
  case 'name':
    method = reps.repsByName;
    break;
  case 'state':
    method = reps.repsByState;
    break;
  }
      
  if (method) {
    method(req.query.search, function (err, people) {
      if (err) { return next(err); }
      res.render('index', {
        reps: people
      });
    });
  }
  
  res.render('index', {
    foo: 'bar',
    arr: [1, 2, 3, 4, 5, 6, 7]
  });
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
