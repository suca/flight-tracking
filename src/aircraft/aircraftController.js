//AirCraft
app.controller('aircraftController', function ($scope, $http) {

	var myCenter = new google.maps.LatLng(45.434046,12.340284);
	


	function initialize () {
		var mapProp = {
			center:myCenter,
		 	zoom: 17,
		 	mapTypeId:google.maps.MapTypeId.HYBRID
		};

		var map = new google.maps.Map($("#googleMap")[0],mapProp);
	}

	setTimeout(function() {
		initialize();

		setTimeout(function(){
			$("a[title='Click to see this area on Google Maps']").hide()
		}, 10000);
	}, 2000);
	
	//google.maps.event.addDomListener(window, 'load', initialize);

});



