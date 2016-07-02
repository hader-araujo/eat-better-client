'use strict';

App.factory('FoodService', [
		'$http',
		'$q',
		function($http, $q) {

			return {

				getFoodListFromTheServer : function(page, max) {
					
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

					return $http.get(
							'http://localhost:8080/eatbetterserver/food', config
							)
							.then(
									function(response) {
										return response.data;
									}, function(errResponse) {
										console.error('Error while fetching food');
										return $q.reject(errResponse);
									});
					
					
				}

			};

		} ]);
