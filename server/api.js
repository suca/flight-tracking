/*
 * Serve JSON to our AngularJS client
 */

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
