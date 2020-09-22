'use strict';

// Declare app level module which depends on views, and core components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.UpcomingEvents',
    'myApp.Overview',
    'myApp.version'
]);
myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $routeProvider.when('', {
        templateUrl: 'index.html',
        controller: 'indexController'
    });

    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/overview'});
}]);


myApp.controller('indexController', ['$scope', function ($scope) {

}]);



