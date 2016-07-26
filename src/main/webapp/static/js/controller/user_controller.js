(function() {
	'use strict';

	var controller = function($scope, UserService) {
		$scope.numberPage = 10;
		$scope.userList = '';
		
		$scope.search = {
				login: '',
				name: '',
				sort: 'login',
				order: 'desc'
		};
		
		$scope.pageable = {
				number: 1,
				totalElements: 0,
				totalPages: 0,
				size: 5
		};
		
		
		var getUser = function() {
			var pageableParam = {
					login : $scope.search.login,
					name :  $scope.search.name,
					sort :  $scope.search.sort,
					order : $scope.search.order,
					page :  $scope.pageable.number - 1,
					size :  $scope.pageable.size,
				};
			
			UserService.getUser(pageableParam).then(function(data) {
				$scope.userList = data.content;
				$scope.pageable = data.page;
				$scope.pageable.number++;
				
			}, function(errResponse) {
				console.error('Error while getting the user');
			});
		};
		
		$scope.setPage = function() {
			getUser();
		};

		getUser();
		
	};

	var module = angular.module("myApp");
	module.controller('UserController', controller);

})();

$(document).ready(function() {
    $('#example').DataTable();
} );
