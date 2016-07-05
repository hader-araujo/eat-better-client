(function() {
	'use strict';

	var controller = function($scope, SystemVersionService) {

		$scope.systemVersion = '';

		var getSystemVersion = function() {
			SystemVersionService.getSystemVersion().then(function(data) {
				$scope.systemVersion = data;
			}, function(errResponse) {
				console.error('Error while getting the system version');
			});
		};

		getSystemVersion();

	};

	var module = angular.module("myApp");
	module.controller('SystemVersionController', [ controller ]);

})();
