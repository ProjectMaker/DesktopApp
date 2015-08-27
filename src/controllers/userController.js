app.controller('userConnection',
		["$scope",
		 "$state",
		 "friendService",
		 "userService",
		
		function($scope,$state,friendService,userService) {
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
            "KLOnline",

            function($scope,userService,klOnline) {
                $scope.onlineUsers = [];
                klOnline.watch('onlineUsers', function(users) { $scope.onlineUsers = users });


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

                $scope.unauth = function() {
                    userService.unauth();
                    $scope.session = userService.getSession()
                };


                $scope.isConnected = function() { return userService.isConnected(); }
		}
		
		
]);
