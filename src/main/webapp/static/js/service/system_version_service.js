'use strict';

App.factory('SystemVersionService', ['$http', '$q', function($http, $q){

	return {
		
			getSystemVersion: function() {
					return $http.get('http://localhost:8080/eatbetterserver/systemversion')
							.then(
									function(response){
										return response.data;
									}, 
									function(errResponse){
										console.error('Error while fetching users');
										return $q.reject(errResponse);
									}
							);
			},
		    
	};

}]);
