var
  assert = require('assert'),
  express = require('express');

var PORT = 8000;

var app = express();


app.get('/', function (req, res) {
    res.send('Hello World!');
});

var server = app.listen(PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
