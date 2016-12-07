"use strict";

app.controller('AddBoardCtrl', function($scope, $window, DataFactory) {
    $scope.newBoard = {};
    $scope.hasBoard = false;

    let test = DataFactory.getBoards()
        .then((data) => {
            $scope.hasBoard = (data.length > 0);
        });

    $scope.createBoard = function() {
        DataFactory.addBoard($scope.newBoard)
            .then(() => {
                $scope.newBoard = {}; // clear new board form
                $window.location.href = '/#/view'; // send user to view		
            });
    };
});