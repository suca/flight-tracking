app.controller('mainController', function($rootScope, $scope, $location, $http) {

    var optionClicked = function (event) {
    	$(".nav.navbar-nav").find("li").removeClass("active");
    	$(this).parent().addClass("active");
    	$(".navbar-toggle").trigger('click');
    };
    $("#flightOpt").click(optionClicked);
    $("#aircraftOpt").click(optionClicked);
    $("#reportOpt").click(optionClicked);
    $("#homeOpt").click(function(){
    	$(".nav.navbar-nav").find("li").removeClass("active");
    	$(".navbar-toggle").trigger('click');
    });
   

	$http({
        method: 'GET',
        url:    'http://localhost:3000/api/airports',
        params: '',
        data:   {},
        headers: {
          "Content-Type": "application/json"
        }
      }).
      success(function(response){
      	if (response) {
      		

			var featuresMap = [];
      		for (var i=0; i<1; i++) {
      			featuresMap.push({
	            	'type': 'Feature',
	            	'geometry': {
	             		'type': 'Point',
	              		'coordinates': [response[i].LATITUDE, response[i].LONGITUDE]
	            	}
	          	});
      		}

          var myLatlng = new google.maps.LatLng(response[0].LATITUDE,response[0].LONGITUDE);

          function initialize () {
            var mapProp = {
              center:myLatlng,
              zoom: 17,
              mapTypeId:google.maps.MapTypeId.HYBRID
            };

            var map = new google.maps.Map($("#googleMap")[0],mapProp);

             var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Google Maps'
            });
          }

          setTimeout(function() {
            initialize();

            setTimeout(function(){
              $("a[title='Click to see this area on Google Maps']").hide()
            }, 10000);
          }, 2000);
          
      	}
      })
      .error(function(){
        console.log("Failure");
      });
});