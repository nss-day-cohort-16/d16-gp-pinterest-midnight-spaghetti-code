"use strict";

app.controller("NavBarCtrl", function($scope, $window, AuthFactory){

	$scope.loggedIn = false;

	let NavBarObj = {
		logout() {
			AuthFactory.logoutUser(AuthFactory.getUser());
			$window.location.href = "#/login";
		}
	};

	return NavBarObj;
});