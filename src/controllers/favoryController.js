app.controller('favory',
		["$scope",
		 "$state",
		 "friendService",
		 "userService",
		 "favoryService",
		
		function($scope,$state,friendService,userService,favoryService) {
			console.log(userService.getUsers());
			$scope.favories = favoryService.getFavories();
			
			$scope.create = function(favory) {
				favoryService.addFavory(favory);
			};
		}
]);
