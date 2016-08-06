(function() {
	'use strict';

	var controller = function($scope, UserService) {
		// set focus (generic code)
		$(document).on('shown.bs.modal', function() {
			$(this).find('.modal-body input:text:visible:first').focus();
		});
		$(document).on('hidden.bs.modal', function() {
			$(this).find('input:text:visible:first').focus();
		});

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
		$scope.setSort("name");

		// delete user
		$scope.userToDelete = {};
		$scope.setUserToDelete = function(user) {
			$scope.userToDelete = user;
		};
		$scope.deleteUser = function() {
			UserService.deleteUser($scope.userToDelete.id).then(function(data) {
				getUserList();
			}, function(errResponse) {
				console.error('Error while delete the user');
			});
		};

		// User Create
		$scope.postType = ""; // it can be CREATE or UPDATE
		var resetUserForm = function(userForm) {
			$scope.userPost = {
				login : "",
				name : ""
			};
			if (userForm) {
				userForm.$setPristine();
			}
		};
		
		$scope.setDialogToCreate = function() {
			$scope.postType = "CREATE";
			$('#modalDialog').modal('toggle');
		};
		$scope.saveUser = function(userForm) {
			if (userForm.$valid) {
				UserService.saveUser($scope.userPost).then(function(data) {
					$('#modalDialog').modal('toggle');
					getUserList();
					resetUserForm(userForm);

				}, function(errResponse) {
					console.error('Error trying to save a new user.');
				});
			}
		};

		// update user
		$scope.setDialogToUpdate = function(user) {
			$scope.postType = "UPDATE";
			$scope.userPost = angular.copy(user);
			$('#modalDialog').modal('toggle');
		};
		$scope.updateUser = function() {
			UserService.updateUser($scope.userPost).then(function(data) {
				$('#modalDialog').modal('toggle');
				getUserList();
				resetUserForm(userForm);
			}, function(errResponse) {
				console.error('Error while updating the user');
			});
		};

		$scope.closeDialog = function(userForm) {
			$('#modalDialog').modal('toggle');
			resetUserForm(userForm);

		};
		resetUserForm();
	};

	// creation of the controller
	var module = angular.module("eat.better");
	module.controller('UserController', controller);

})();
