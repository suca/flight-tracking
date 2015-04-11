var mysql = require('mysql'),
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
	//console.log("ID: " + identifier);
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
	res.send("GET", "Flights");
};
exports.getFlight = function (req, res) {
	res.send("GET", "Flight");
};
exports.postFlight = function (req, res) {
	res.send("POST", "Flight");
};
exports.putFlight = function (req, res) {
	res.send("PUT", "Flight");
};
exports.deleteFlight = function (req, res) {
	res.send("DELETE", "Flight");
};
