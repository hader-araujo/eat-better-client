(function() {
	'use strict';

	var controller = function($scope, UserService) {
		// attributes to be used in the html file
		$scope.userList = '';
		$scope.pagesNumberArray = [];
		$scope.search = {
			searchValue : '',
			sort : '',
			order : ''
		};
		$scope.pagination = {
			number : 1,
			totalElements : 0,
			totalPages : 0,
			size : 10
		};

		// Getting users
		var getUserList = function() {
			var paginationParam = {
				searchValue : $scope.search.searchValue,
				sort : $scope.search.sort,
				order : $scope.search.order,
				page : $scope.pagination.number - 1,
				size : $scope.pagination.size,
			};

			UserService.getUserList(paginationParam).then(function(data) {
				$scope.userList = data.content;
				$scope.pagination = data.page;
				$scope.pagination.number++;
				setPagesNumberArray();

			}, function(errResponse) {
				console.error('Error while getting the user');
			});
		};
		getUserList();

		// Pagination
		var setPagesNumberArray = function() {
			var startPage, endPage;
			if ($scope.pagination.totalPages <= 10) {
				// less than 10 total pages so show all
				startPage = 1;
				endPage = $scope.pagination.totalPages;
			} else {
				// more than 10 total pages so calculate start and end pages
				if ($scope.pagination.number <= 6) {
					startPage = 1;
					endPage = 10;
				} else if ($scope.pagination.number + 4 >= $scope.pagination.totalPages) {
					startPage = $scope.pagination.totalPages - 9;
					endPage = $scope.pagination.totalPages;
				} else {
					startPage = $scope.pagination.number - 5;
					endPage = $scope.pagination.number + 4;
				}
			}
			$scope.pagesNumberArray = _.range(startPage, endPage + 1);
		};
		$scope.setPage = function(newPage) {
			$scope.pagination.number = newPage;
			getUserList();
		};

		// Sort
		$scope.setSort = function(field) {
			if (field === $scope.search.sort) {
				$scope.search.order = $scope.search.order === "asc" ? "desc"
						: "asc";
			} else {
				$scope.search.sort = field;
				$scope.search.order = "asc";
			}
			$scope.setPage(1);
		};
		$scope.isSorted = function(field, order) {
			return field === $scope.search.sort
					&& order === $scope.search.order;
		};
		$scope.setSort("login");

		// User clicked - to be used to delete and update user
		$scope.userIdClicked = 0;
		$scope.userNameClicked = 0;
		$scope.setUserClicked = function(id, name) {
			$scope.userIdClicked = id;
			$scope.userNameClicked = name;
		};

		// delete user
		$scope.deleteUser = function() {
			UserService.deleteUser($scope.userIdClicked).then(function(data) {
				getUserList();

			}, function(errResponse) {
				alert("Error trying to delete the user.");
				console.error('Error while delete the user');
			});
		};

	};

	// creation of the controller
	var module = angular.module("eat.better");
	module.controller('UserController', controller);

})();
