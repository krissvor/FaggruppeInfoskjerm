'use strict';

angular.module("myApp.Overview", ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/overview', {
            templateUrl: 'views/overview/overview.html',
            controller: "overviewController",
        });
    }])

    .controller('overviewController', ['$scope', '$location',function($scope, $location){
        $scope.groups = [];
        var script = document.createElement('script');
        script.src = 'https://appsupteamcomp.azurewebsites.net/api/HttpTrigger2?callback=overviewCallback';
        document.head.appendChild(script);

        $scope.goToGroup = function(group){
            $location.path('upcomingEvents');
        };
    }]);

function overviewCallback(data){
    var scope = angular.element(document.getElementById("overview")).scope();
    for (var i in data){
        var item = data[i];
        var group = {
            name: item
        };
        scope.$apply(scope.groups.push(group));
    }
}