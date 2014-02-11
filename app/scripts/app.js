'use strict';

angular.module('hackvdayApp', [
  'ngRoute', 'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/thanks', {
        templateUrl: 'views/thanks.html',
        controller: 'ThanksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
