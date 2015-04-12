
var app = angular.module('flightTrackingApp', [
    'ngRoute'
]).
config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        /*$locationProvider.html5Mode(true);*/
        $routeProvider.
        when('/', {
            templateUrl: 'views/main/main.html',
            controller: 'mainController'
        }).
        when('/map', {
            templateUrl: 'views/map/map.html',
            controller: 'mapController'
        }).
        when('/aircraft', {
            templateUrl: 'views/aircraft/aircraft.html',
            controller: 'aircraftController'
        }).
        when('/airplane', {
            templateUrl: 'views/airplane/airplane.html',
            controller: 'airplaneController'
        }).
        when('/test', {
            templateUrl: 'views/aircraft/test.html',
            controller: 'aircraftController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
])  