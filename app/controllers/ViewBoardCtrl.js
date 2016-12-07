"use strict";

app.controller("ViewBoardCtrl", function($scope, DataFactory) {
	$scope.hasPins = false;
	$scope.pins = [];

	DataFactory.getBoards()
	  .then((data) => {
	  	$scope.boardname = data.name;
	  	DataFactory.getPins()
	  	.then((data) => {
	  		$scope.pins = data;
	  		if ($scope.pins.length > 0)
	  			$scope.hasPins = true;
	  		else
	  			$scope.hasPins = false;
	  		$scope.$apply();
	  	})
	  });
});