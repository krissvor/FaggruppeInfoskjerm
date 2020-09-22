'use strict';

// Declare app level module which depends on views, and core components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.version'
]);
    myApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });

        $routeProvider.when('', {
            templateUrl: 'index.html',
            controller: 'indexController'
        });
    }]);

    myApp.controller('indexController', ['$scope', function($scope) {
        $scope.upcomingEvents = [];
        $scope.months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];


        var script = document.createElement('script');
        script.src = 'https://appsupteamcomp.azurewebsites.net/api/TestGetEvents?callback=callbackFunction';
        document.head.appendChild(script);
    }]);



function callbackFunction(data){
        var scope = angular.element(document.body).scope();
        for (var i in data) {
            var entry = data[i];
            var startDateTime = new Date(entry.start);
            var endDateTime = new Date(entry.end);

            var event = {
                dateString: startDateTime.getDate() + ". " + scope.months[startDateTime.getMonth()] + ", kl. " +  getTimeString(startDateTime),
                startTimeString: getTimeString(startDateTime),
                endTimeString: getTimeString(endDateTime),
                start: startDateTime,
                end: endDateTime,
                title: entry.title,
                location: entry.location,
                description:  entry.description
            };
            if(i == 0){
                scope.$apply(scope.nextEvent = event);
            }
            scope.$apply(scope.upcomingEvents.push(event));

        }
    }

function getTimeString(date){
    var hours = date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
    return hours + ":" + minutes;
}