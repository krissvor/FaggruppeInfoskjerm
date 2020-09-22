'use strict';

angular.module('myApp.UpcomingEvents', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/upcomingEvents', {
            templateUrl: 'views/upcomingEvents/upcomingEvents.html',
            controller: 'upcomingEventsController'
        });
    }])

    .controller('upcomingEventsController', ['$scope', '$window', function ($scope, $window) {
        $scope.upcomingEvents = [];
        $scope.months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];


        var script = $window.document.createElement('script');
        script.src = 'https://appsupteamcomp.azurewebsites.net/api/TestGetEvents?callback=upcomingCallback';
        $window.document.head.appendChild(script);

        $scope.openWorkplace = function(event){
            $window.open("https://www.vg.no", "_blank");
        };
    }]);

function upcomingCallback(data) {
    var scope = angular.element(document.getElementById("upcomingEvents")).scope();
    for (var i in data) {
        var entry = data[i];
        var startDateTime = new Date(entry.start);
        var endDateTime = new Date(entry.end);

        var event = {
            dateString: startDateTime.getDate() + ". " + scope.months[startDateTime.getMonth()] + ", kl. " + getTimeString(startDateTime),
            startTimeString: getTimeString(startDateTime),
            endTimeString: getTimeString(endDateTime),
            start: startDateTime,
            end: endDateTime,
            title: entry.title,
            location: entry.location,
            description: entry.description
        };
        if (i == 0) {
            scope.$apply(scope.nextEvent = event);
        }
        scope.$apply(scope.upcomingEvents.push(event));

    }
}

function getTimeString(date) {
    var hours = date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();
    return hours + ":" + minutes;
}