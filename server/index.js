/**
 * Module dependencies.
 */
var express = require('express'),
  api = require('./api');
  

var app = module.exports = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

// Routes

//app.get('/', routes.index);
// JSON API
app.get('/', function (req, res) {
  res.send('Hello World!');
  //res.status(status).send(body)
});
app.get('/api/flights', api.getFlights);
app.get('/api/flight/:id', api.getFlight);
app.post('/api/flight', api.postFlight);
app.put('/api/flight/:id', api.putFlight);
app.delete('/api/flight/:id', api.deleteFlight);
app.get('/api/airports', api.getAirports);
app.get('/api/airport/:id', api.getAirport);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

exports.express