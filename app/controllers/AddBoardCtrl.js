"use strict";

app.controller('AddBoardCtrl', function($scope, $window, DataFactory) {
  $scope.newBoard = {};

  $scope.createBoard = function() {
    DataFactory.addBoard($scope.newBoard);
    $scope.newBoard = {}; // clear new board form
    $window.location.href = '/#/view'; // send user to view
  };
});