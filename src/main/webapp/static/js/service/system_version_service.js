(function() {
	'use strict';

	var service = function($http, $q) {

		var getSystemVersion = function() {

			return $http.get(
					'http://localhost:8080/eatbetterserver/systemversion')
					.then(function(response) {
						return response.data;
					}, function(errResponse) {
						console.error('Error while fetching system version');
						return $q.reject(errResponse);
					});
		};

		return {
			getSystemVersion : getSystemVersion
		};

	};

	var module = angular.module("myApp");
	module.factory('SystemVersionService', [ '$http', '$q', service ]);

}());
