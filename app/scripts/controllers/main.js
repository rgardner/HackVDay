'use strict';

angular.module('hackvdayApp')
  .controller('MainCtrl', function ($scope, $location, $anchorScroll, $firebase) {
    $scope.phoneValidation = /^\d{10}$/;
    $scope.roomValidation = /^\d{1,4}$/;
    $scope.deliveries = $firebase(new Firebase('https://brilliant-fire-2550.firebaseio.com/deliveries'));
    $scope.delivery = {};
    $scope.dorms = [
        'Alumni Hall', 'Brittany Hall', 'Broome Street', 'Carlyle Court',
        'Coral Towers', 'Founders Hall', 'Goddard Hall', 'Gramercy Green',
        'Greenwich Hotel', 'Hayden Hall', 'Lafayette Hall', 'Palladium Hall',
        'Rubin Hall', 'Second Street', 'Seventh Street', 'Third Avenue North',
        '13th Street', '26th Street', 'University Hall', 'Weinstein Hall'
      ];
    $scope.addDelivery = function() {
        $scope.deliveries.$add({recipient: $scope.delivery.recipient,
                                message:  $scope.delivery.message,
                                sender:     $scope.delivery.sender,
                                phoneNumber: $scope.delivery.phoneNumber,
                                dorm: $scope.delivery.dorm,
                                roomNumber: $scope.delivery.roomNumber
                        });
        $scope.delivery = {};

        $location.hash('top');
        $anchorScroll();
      };
  });
