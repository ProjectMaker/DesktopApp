app.controller('userConnection',
		["$scope",
		 "$state",
		 "friendService",
		 "userService",
		
		function($scope,$state,friendService,userService) {
			console.log(userService.getUsers());
			$scope.users = userService.getUsers();
			
			$scope.connect = function() {
				userService.userConnected = $scope.user;
				$state.go('friend');
			};
		}
]);


app.controller('userConnect',
		["$scope",
		 "userService",
	
		function($scope,userService) {
			$scope.user = {};
			//$scope.session = userService.getSession();
			$scope.create = function(user) {
				userService.create(user);
			};
			
			$scope.auth = function(user) {
				/*
				$scope.session = userService.auth(user);
				console.log($scope.session)
				*/
				userService.auth(user);
			};
			$scope.unauth = function() { userService.unauth(); $scope.session = userService.getSession() };
			
			
			$scope.isConnected = function() { return userService.isConnected(); } 
		}
		
		
]);
