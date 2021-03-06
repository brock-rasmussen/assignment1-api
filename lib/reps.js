'use strict';

var request = require('superagent');
var host = 'http://whoismyrepresentative.com/getall_';

function repsRequest(path, queryParam) {
  return function (param, cb) {
    request
      .get(host + path)
      .query({
        [queryParam]: param,
        output: 'json'
      })
      .end(function (err, res) {
        if (err) { return cb(err); }
        try {
          cb(null, JSON.parse(res.text).results);
        } catch (err) {
          cb(null, []);
        }
      });
  };
}

exports.allByZip = repsRequest('mems.php', 'zip');
exports.repsByName = repsRequest('reps_byname.php', 'name');
exports.repsByState = repsRequest('reps_bystate.php', 'state');
exports.sensByName = repsRequest('sens_byname.php', 'name');
exports.sensByState = repsRequest('sens_bystate.php', 'state');
