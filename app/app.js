"use strict";

var app = angular.module("PinterestApp", ["ngRoute", "ngMaterial"]);

let isAuth = (AuthFactory, $q) => $q( (resolve, reject) => {
  AuthFactory.isAuthenticated()
  .then( (userExists) => {
    if(userExists) {
      resolve();
    } else {
      reject();
    }
  });
});

app.config(function($routeProvider, $mdThemingProvider) {
  $routeProvider.
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  }).
  when('/board', {
    templateUrl: 'partials/add-board.html',
    controller: 'AddBoardCtrl'
  }).
  when('/pin', {
    templateUrl: 'partials/add-pin.html',
    controller: 'AddPinCtrl'
  }).
  when('/view', {
    templateUrl: 'partials/view-board.html',
    controller: 'ViewBoardCtrl'
  }).
  otherwise('/login');
  
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');
});

app.run( ($location, FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig);
});


