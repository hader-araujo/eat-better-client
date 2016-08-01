(function(){
	'use strict';
	var app = angular.module('eat.better',['ngRoute']);
	
	app.run(function($rootScope){
		  $rootScope._ = _;
		});
	
	app.config(function($routeProvider){
		$routeProvider
		.when("/home", {
			templateUrl: "./view/home.html"
		})
		.when("/user", {
			templateUrl: "./view/user.html",
			controller: "UserController"
		})
		.when("/food", {
			templateUrl: "./view/food.html",
			controller: "FoodController"
		})
		.otherwise({redirectTo: "/home"});
	});
}());
