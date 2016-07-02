'use strict';

App.controller('FoodController', ['$scope', 'FoodService', function($scope, FoodService) {
          var self = this;
          self.page;
          self.foodList = '';
              
          self.getFood = function(page, max){
        	  var max = 10;
        	  
        	  FoodService.getFoodListFromTheServer(self.page, max)
                  .then(
      					       function(d) {
      						        self.foodList = d;
      					       },
            					function(errResponse){
      					    	    self.foodList = '';
            						console.error('Error while getting the food list', errResponse);
            					}
      			       );
          };
          
          self.firstPage = function(){
        	  self.page = 1;
        	  self.getFood();
          };
          self.lastPage = function(){
        	  self.page = 263;
        	  self.getFood();
          };
          
          self.nextPage = function(){
        	  if (self.page < 263){        	  
        		  self.page++;
        	  }
        	  self.getFood();
          };
          
          self.previousPage = function(){
        	  if (self.page > 1){        	  
        		  self.page--;
        	  }
        	  self.getFood();
          };
          
          self.firstPage();
          
      }]);
