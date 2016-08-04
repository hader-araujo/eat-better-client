(function() {
	'use strict';

	var service = function($http, $q) {

		var url = "http://localhost:8080/eatbetterserver/user";

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

			return $http.get(url, config).then(function(response) {
				return response.data;
			}, function(errResponse) {
				console.error('Error while fetching user');
				return $q.reject(errResponse);
			});
		};

		var deleteUser = function (id){
			
			return $http.delete(url + "/" +  id).then(function(response){
				return response.data;
			}, function (errResponse) {
				console.error('Error while delete the user');
			});
		};
		
		var saveUser = function (user){
			
			return $http.post(url, user).then(function(response){
				return response.data;
			}, function (errResponse) {
				console.error('Error while save a new user');
			});
		};
		
		return {
			getUserList : getUserList,
			deleteUser : deleteUser,
			saveUser : saveUser
		};

	};

	var module = angular.module("eat.better");
	module.factory('UserService', [ '$http', '$q', service ]);

}());
