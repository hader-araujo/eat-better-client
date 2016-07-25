(function() {
	'use strict';

	var controller = function($scope, UserService) {

		$scope.userList = '';
		$scope.pages = [];
		
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
				size: 10
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
				setPages();
				
			}, function(errResponse) {
				console.error('Error while getting the user');
			});
		};
		
		var setPages = function() {
			var startPage, endPage;
	        if ($scope.pageable.totalPages <= 10) {
	            // less than 10 total pages so show all
	            startPage = 1;
	            endPage = $scope.pageable.totalPages;
	        } else {
	            // more than 10 total pages so calculate start and end pages
	            if ($scope.pageable.number <= 6) {
	                startPage = 1;
	                endPage = 10;
	            } else if ($scope.pageable.number + 4 >= $scope.pageable.totalPages) {
	                startPage = $scope.pageable.totalPages - 9;
	                endPage = $scope.pageable.totalPages;
	            } else {
	                startPage = $scope.pageable.number - 5;
	                endPage = $scope.pageable.number + 4;
	            }
	        }
	        $scope.pages = _.range(startPage, endPage + 1);
		}

		$scope.setPage = function(newPage) {
			$scope.pageable.number = newPage;
			getUser();
		};

		getUser();
		
	};

	var module = angular.module("myApp");
	module.controller('UserController', controller);

})();
