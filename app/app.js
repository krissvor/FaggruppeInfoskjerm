'use strict';

// Declare app level module which depends on views, and core components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.UpcomingEvents',
    'myApp.version'
]);
    myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider.when('/UpcomingEvents', {
            templateUrl: 'UpcomingEvents/UpcomingEvents.html',
            controller: 'UpcomingEventsCtrl'
        });

        $routeProvider.when('', {
            templateUrl: 'index.html',
            controller: 'indexController'
        });
    }]);

    myApp.controller('indexController', ['$scope', function($scope) {

    }]);



