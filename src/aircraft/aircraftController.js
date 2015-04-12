






// //AirCraft
app.controller('aircraftController', function ($scope, $http) {

// var map;
//         var directionDisplay;
//         var directionsService;
//         var stepDisplay;
//         var markerArray = [];
//         var position;
//         var marker = null;
//         var polyline = null;
//         var poly2 = null;
//         var speed = 0.000005,
//             wait = 1;
//         var infowindow = null;

//         var myPano;
//         var panoClient;
//         var nextPanoId;
//         var timerHandle = null;

//         function createMarker(latlng, label, html) {
//             // alert("createMarker("+latlng+","+label+","+html+","+color+")");
//             var contentString = '<b>' + label + '</b><br>' + html;
//             var marker = new google.maps.Marker({
//                 position: latlng,
//                 map: map,
//                 title: label,
//                 zIndex: Math.round(latlng.lat() * -100000) << 5
//             });
//             marker.myname = label;
//             // gmarkers.push(marker);

//             google.maps.event.addListener(marker, 'click', function() {
//                 infowindow.setContent(contentString);
//                 infowindow.open(map, marker);
//             });
//             return marker;
//         }


//         function initialize() {
//             infowindow = new google.maps.InfoWindow({
//                 size: new google.maps.Size(150, 50)
//             });
//             // Instantiate a directions service.
//             directionsService = new google.maps.DirectionsService();

//             // Create a map and center it on Manhattan.
//             var myOptions = {
//                 zoom: 13,
//                 mapTypeId: google.maps.MapTypeId.ROADMAP
//             }
//             map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

//             address = 'new york'
//             geocoder = new google.maps.Geocoder();
//             geocoder.geocode({
//                 'address': address
//             }, function(results, status) {
//                 map.setCenter(results[0].geometry.location);
//             });

//             // Create a renderer for directions and bind it to the map.
//             var rendererOptions = {
//                 map: map
//             }
//             directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

//             // Instantiate an info window to hold step text.
//             stepDisplay = new google.maps.InfoWindow();

//             polyline = new google.maps.Polyline({
//                 path: [],
//                 strokeColor: '#FF0000',
//                 strokeWeight: 3
//             });
//             poly2 = new google.maps.Polyline({
//                 path: [],
//                 strokeColor: '#FF0000',
//                 strokeWeight: 3
//             });
//         }



//         var steps = []

//         $scope.calcRoute = function() {

//             if (timerHandle) {
//                 clearTimeout(timerHandle);
//             }
//             if (marker) {
//                 marker.setMap(null);
//             }
//             polyline.setMap(null);
//             poly2.setMap(null);
//             directionsDisplay.setMap(null);
//             polyline = new google.maps.Polyline({
//                 path: [],
//                 strokeColor: '#FF0000',
//                 strokeWeight: 3
//             });
//             poly2 = new google.maps.Polyline({
//                 path: [],
//                 strokeColor: '#FF0000',
//                 strokeWeight: 3
//             });
//             // Create a renderer for directions and bind it to the map.
//             var rendererOptions = {
//                 map: map
//             }
//             directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

//             var start = document.getElementById("start").value;
//             var end = document.getElementById("end").value;
//             var travelMode = google.maps.DirectionsTravelMode.DRIVING

//             var request = {
//                 origin: start,
//                 destination: end,
//                 travelMode: travelMode
//             };

//             // Route the directions and pass the response to a
//             // function to create markers for each step.
//             directionsService.route(request, function(response, status) {
//                 if (status == google.maps.DirectionsStatus.OK) {
//                     directionsDisplay.setDirections(response);

//                     var bounds = new google.maps.LatLngBounds();
//                     var route = response.routes[0];
//                     startLocation = new Object();
//                     endLocation = new Object();

//                     // For each route, display summary information.
//                     var path = response.routes[0].overview_path;
//                     var legs = response.routes[0].legs;
//                     for (i = 0; i < legs.length; i++) {
//                         if (i == 0) {
//                             startLocation.latlng = legs[i].start_location;
//                             startLocation.address = legs[i].start_address;
//                             // marker = google.maps.Marker({map:map,position: startLocation.latlng});
//                             marker = createMarker(legs[i].start_location, "start", legs[i].start_address, "green");
//                         }
//                         endLocation.latlng = legs[i].end_location;
//                         endLocation.address = legs[i].end_address;

//                         var auxPath = [endLocation.latlng, startLocation.latlng];
//                         polyline.setPath(auxPath);


//                         /*var steps = legs[i].steps;
//                         for (j = 0; j < steps.length; j++) {
//                             var nextSegment = steps[j].path;
//                             for (k = 0; k < nextSegment.length; k++) {  
//                                 console.log(nextSegment[k]);
//                                 polyline.getPath().push(nextSegment[k]);
//                                 // bounds.extend(nextSegment[k]);
//                             }
//                         }*/
//                     }

//                     polyline.setMap(map);
//                     map.fitBounds(bounds);
//                     //        createMarker(endLocation.latlng,"end",endLocation.address,"red");
//                     map.setZoom(18);
//                     startAnimation();
//                 }
//             });
//         }



//         var step = 50; // 5; // metres
//         var tick = 100; // milliseconds
//         var eol;
//         var k = 0;
//         var stepnum = 0;
//         var speed = "";
//         var lastVertex = 1;


//         //=============== animation functions ======================
//         function updatePoly(d) {
//             // Spawn a new polyline every 20 vertices, because updating a 100-vertex poly is too slow
//             if (poly2.getPath().getLength() > 20) {
//                 poly2 = new google.maps.Polyline([polyline.getPath().getAt(lastVertex - 1)]);
//                 // map.addOverlay(poly2)
//             }

//             if (polyline.GetIndexAtDistance(d) < lastVertex + 2) {
//                 if (poly2.getPath().getLength() > 1) {
//                     poly2.getPath().removeAt(poly2.getPath().getLength() - 1)
//                 }
//                 poly2.getPath().insertAt(poly2.getPath().getLength(), polyline.GetPointAtDistance(d));
//             } else {
//                 poly2.getPath().insertAt(poly2.getPath().getLength(), endLocation.latlng);
//             }
//         }


//         function animate(d) {
//             // alert("animate("+d+")");
//             if (d > eol) {
//                 map.panTo(endLocation.latlng);
//                 marker.setPosition(endLocation.latlng);
//                 return;
//             }
//             var p = polyline.GetPointAtDistance(d);
//             map.panTo(p);
//             marker.setPosition(p);
//             updatePoly(d);
//             timerHandle = setTimeout(animate(" + (d + step) + "), tick);
//         }


//         function startAnimation() {
//             eol = polyline.Distance();
//             map.setCenter(polyline.getPath().getAt(0));
//             // map.addOverlay(new google.maps.Marker(polyline.getAt(0),G_START_ICON));
//             // map.addOverlay(new GMarker(polyline.getVertex(polyline.getVertexCount()-1),G_END_ICON));
//             // marker = new google.maps.Marker({location:polyline.getPath().getAt(0)} /* ,{icon:car} */);
//             // map.addOverlay(marker);
//             poly2 = new google.maps.Polyline({
//                 path: [polyline.getPath().getAt(0)],
//                 strokeColor: "#0000FF",
//                 strokeWeight: 10
//             });
//             // map.addOverlay(poly2);
//             setTimeout(animate(50), 2000); // Allow time for the initial map display
//         }   

//         setTimeout(function() {
// 		initialize();
// 	}, 2000);     

//         //=============== ~animation funcitons =====================
// 	// var myCenter = new google.maps.LatLng(45.434046,12.340284);
	


// 	// function initialize () {
// 	// 	var mapProp = {
// 	// 		center:myCenter,
// 	// 	 	zoom: 17,
// 	// 	 	mapTypeId:google.maps.MapTypeId.HYBRID
// 	// 	};

// 	// 	var map = new google.maps.Map($("#map_canvas")[0],mapProp);
// 	// }

// 	// setTimeout(function() {
// 	// 	initialize();

// 	// 	setTimeout(function(){
// 	// 		$("a[title='Click to see this area on Google Maps']").hide()
// 	// 	}, 10000);
// 	// }, 2000);
	
// 	// google.maps.event.addDomListener(window, 'load', initialize);

});



