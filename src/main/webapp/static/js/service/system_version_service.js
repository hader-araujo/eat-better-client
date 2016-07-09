(function() {
	'use strict';

	var service = function($http, $q) {

		var getSystemVersion = function() {

			var config = {
				headers : {
					'Accept' : 'application/json'
				}
			};

			var url = "http://localhost:8080/eatbetterserver/systemversion";

			return $http.get(url, config).then(function(response) {
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
