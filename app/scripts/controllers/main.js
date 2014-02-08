'use strict';

angular.module('hackvdayApp')
  .controller('MainCtrl', function ($scope, $firebase) {
    $scope.messages = $firebase(new Firebase('https://brilliant-fire-2550.firebaseio.com/chat'));
  });
