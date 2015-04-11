app.controller('mainController', function($rootScope, $scope, $location) {
    $scope.hello = 'Hola Tu!';

    //$location.path('/map');
    var optionClicked = function (event) {
    	$(".nav.navbar-nav").find("li").removeClass("active");
    	$(this).parent().addClass("active");
    	$(".navbar-toggle").trigger('click');
    };
    $("#flightOpt").click(optionClicked);
    $("#aircraftOpt").click(optionClicked);
    $("#reportOpt").click(optionClicked);
	
    
});