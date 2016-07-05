(function() {
	'use strict';

	var FoodController = function($scope, FoodService) {
		$scope.page;
		$scope.foodList = '';

		var getFood = function(page, max) {
			var max = 10;

			FoodService.getFoodListFromTheServer($scope.page, max).then(
					function(data) {
						$scope.foodList = data;
					},
					function(errResponse) {
						$scope.foodList = '';
						console.error('Error while getting the food list',
								errResponse);
					});
		};

		var firstPage = function() {
			$scope.page = 1;
			getFood();
		};
		$scope.firstPage = firstPage;

		$scope.lastPage = function() {
			$scope.page = 263;
			getFood();
		};

		$scope.nextPage = function() {
			if ($scope.page < 263) {
				$scope.page++;
			}
			getFood();
		};

		$scope.previousPage = function() {
			if ($scope.page > 1) {
				$scope.page--;
			}
			getFood();
		};

		firstPage();

	};

	var module = angular.module("myApp");
	module.controller("FoodController", FoodController);

}());
