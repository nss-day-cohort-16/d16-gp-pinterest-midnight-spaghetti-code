"use strict";

app.factory("AuthFactory", function() {

	let currentUser = null,
			provider = new firebase.auth.GoogleAuthProvider();

	let AuthObject = {
		// createUser(userObj) {
		// 	return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password);
		// },
		loginUser(userObj) {
			currentUser = null;
	    return firebase.auth().signInWithPopup(provider); 
		},
		logoutUser(userObj) {
			return firebase.auth().signOut();
		},
		isAuthenticated() {
			return new Promise((resolve, reject) => {
				firebase.auth().onAuthStateChanged((user) => {
					if (user) {
						currentUser = user.uid;
						resolve(true);
					} else {
						resolve(false);
					}
				});
			});
		},
		getUser() {
			return currentUser;
		}
	};

	return AuthObject;

});