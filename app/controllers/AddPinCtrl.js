"use strict";

app.controller('AddPinCtrl', function($scope, $window, DataFactory) {
  $scope.newPin = {};

  $scope.createPin = function() {
    DataFactory.addPin($scope.newPin);
    $scope.newPin = {}; // clear new pin form
    $window.location.href = '/view'; // send user to view
  };
});