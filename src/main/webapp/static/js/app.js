(function(){
	'use strict';
	var app = angular.module('myApp',[]);
	app.run(function($rootScope){
		  $rootScope._ = _;
		});
}());
