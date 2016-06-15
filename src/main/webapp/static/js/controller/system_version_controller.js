'use strict';

App.controller('SystemVersionController', ['$scope', 'SystemVersionService', function($scope, SystemVersionService) {
          var self = this;
          self.systemVersion='';
              
          self.getSystemVersion = function(){
        	  SystemVersionService.getSystemVersion()
                  .then(
      					       function(d) {
      						        self.systemVersion = d;
      					       },
            					function(errResponse){
            						console.error('Error while getting the system version');
            					}
      			       );
          };
           
          self.getSystemVersion();
      }]);
