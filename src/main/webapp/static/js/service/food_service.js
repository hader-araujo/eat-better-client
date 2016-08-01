(function() {
	'use strict';

	var service = function($http, $q) {

		var getFoodListFromTheServer = function(page, max) {

			var params = {
				page : page,
				max : max
			};

			var config = {
				params : params,
				headers : {
					'Accept' : 'application/json'
				}
			};

			var url = "http://localhost:8080/eatbetterserver/food";

			return $http.get(url, config).then(function(response) {
				return response.data;
			}, function(errResponse) {
				console.error('Error while fetching food');
				return $q.reject(errResponse);
			});

		};

		return {

			getFoodListFromTheServer : getFoodListFromTheServer

		};

	};

	var module = angular.module("eat.better");
	module.factory("FoodService", [ '$http', '$q', service ]);
}());
