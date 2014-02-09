'use strict';

angular.module('hackvdayApp')
  .controller('MainCtrl', function ($scope, $firebase) {
    $scope.deliveries = $firebase(new Firebase('https://brilliant-fire-2550.firebaseio.com/deliveries'));
    $scope.delivery = {};
    $scope.dorms = [
        'Carlyle Court', 'Founders Hall', 'Goddard Hall', 'Weinstein',
        'Third North'
      ];
    $scope.addDelivery = function() {
        $scope.deliveries.$add({recipient: $scope.delivery.recipient,
                                message:  $scope.delivery.message,
                                sender:     $scope.delivery.sender,
                                phoneNumber: $scope.delivery.phoneNumber,
                                rose:     $scope.delivery.rose,
                                chocolate: $scope.delivery.chocolate,
                                destination: $scope.delivery.destination,
                                roomNumber: $scope.delivery.roomNumber
                        });
        $scope.newPerson = {};
    }
  });
