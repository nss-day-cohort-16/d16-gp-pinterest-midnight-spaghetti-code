"use strict";

app.controller("NavBarCtrl", function($scope, $window, AuthFactory){

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			$scope.loggedIn = true;
		} else {
			$scope.loggedIn = false;
		}
		$scope.$apply();
	});

	$scope.logout = function() {
		console.log("logging out");
		AuthFactory.logoutUser(AuthFactory.getUser());
		$window.location.href = "#/login";
	};

});