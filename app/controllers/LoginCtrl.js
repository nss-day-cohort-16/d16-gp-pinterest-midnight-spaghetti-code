"use strict";

app.controller("LoginCtrl", function($scope, AuthFactory, $window){


$scope.login = (user) => {
	AuthFactory.loginUser()
	.then((user)=> {
		$window.location.href = "#/board";
	});
};

});