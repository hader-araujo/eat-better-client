(function(){
	'use strict';
	var app = angular.module('myApp',['ui.bootstrap']);
	app.run(function($rootScope){
		  $rootScope._ = _;
		});
}());
