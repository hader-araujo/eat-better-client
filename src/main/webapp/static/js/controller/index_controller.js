(function() {
	'use strict';

	var controller = function($scope, $location) {
	
	$scope.isActive = function (path) {
		  return ($location.path().substr(0, path.length) === path);
		};
	};
	
	var module = angular.module("eat.better");
	module.controller('IndexController', controller);

})();
