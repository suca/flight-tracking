var mysql = require('mysql'),
	http = require('http'),
	connection;

var connectDB = function () {
	connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'sucaomar',
	  database : 'flights'
	});
	connection.connect();	
};
var getData = function (options, reqServer, resServer) {
	var request = http.request(options, function (res) {
	    var data = '';
	    res.on('data', function (chunk) {
	        data += chunk;
	    });
	    res.on('end', function () {
	    	console.log(data);
	        resServer.send(data);
	    });
	});
	request.on('error', function (e) {
	    resServer.send(e.message);
	});
	request.end();
};
/*
 * Serve JSON to our AngularJS client
 */
exports.getAirports = function (req, res) {
	connectDB();
	connection.query('SELECT * from airports', function(err, rows, fields) {
		connection.end();
		if (!err) {
			res.send(rows);
		 	
		} else {
		   console.log('Error while performing Query.');
		  
		}
	});
};
exports.getAirport = function (req, res) {
	connectDB();
	var identifier = req.params.id;
	connection.query('SELECT * from airports where ID='+identifier, function(err, rows, fields) {
		connection.end();
		if (!err) {
			res.send(rows);
		 	
		} else {
		   console.log('Error while performing Query.');  
		}
	});
};
exports.getFlights = function (req, res) {
	var options = {
	    host: 'planefinder.net',
	    path: '/endpoints/update.php?callback=planeDataCallback&faa=1&routetype=iata'
	}
	getData(options, req, res);
	
};
exports.getFlight = function (req, res) {
	var identifier = req.params.id;
	var options = {
	    host: 'planefinder.net',
	    path: '/endpoints/planeData.php?callback=jQuery110208798748317640275_1428803056304&adshex=0D042B&flightno=' + identifier + '&ts=' + new Date().getTime() + '&isFAA=0&_=1428803056331'
	}
	getData(options, req, res);
};
exports.postFlight = function (req, res) {
	res.send('post');
};
exports.putFlight = function (req, res) {
	res.send('put');
};
exports.deleteFlight = function (req, res) {
	res.send('delete');
};
