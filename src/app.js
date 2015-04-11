
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
        when('/reports', {
            templateUrl: 'views/reports/report.html',
            controller: 'reportController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
])  