(function() {
	'use strict';

	var controller = function($scope, UserService) {

		$scope.User = '';

		var getUser = function() {
			UserService.getUser().then(function(data) {
				$scope.User = data;
			}, function(errResponse) {
				console.error('Error while getting the user');
			});
		};

		getUser();

	};

	var module = angular.module("myApp");
	module.controller('UserController', controller);

})();
