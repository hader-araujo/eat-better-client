(function() {
	'use strict';

	var service = function($http, $q) {

		var getUserList = function(pageable) {

			var params = {
					searchValue : pageable.searchValue,
					page : pageable.page,
					size : pageable.size,
					sort : pageable.sort + ',' + pageable.order
				};
			
			var config = {
				params : params,
				headers : {
					'Accept' : 'application/json'
				}
			};

			var url = "http://localhost:8080/eatbetterserver/user";

			return $http.get(url, config).then(function(response) {
				return response.data;
			}, function(errResponse) {
				console.error('Error while fetching user');
				return $q.reject(errResponse);
			});
		};

		var deleteUser = function (id){
			
			var url = "http://localhost:8080/eatbetterserver/user/" + id;
			return $http.delete(url).then(function(response){
				return response.data;
			}, function (errResponse) {
				console.error('Error while delete the user');
			});
		}; 
		
		return {
			getUserList : getUserList,
			deleteUser : deleteUser
		};

	};

	var module = angular.module("eat.better");
	module.factory('UserService', [ '$http', '$q', service ]);

}());
