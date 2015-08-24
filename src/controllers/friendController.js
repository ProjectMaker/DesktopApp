app.controller('friendChat',
		["$scope",
		 "friendService",

		function($scope,friendService) {
			console.log('frienChat');
			$scope.$on('open', function(evt,params) { console.log(params); });
		}
]);

app.controller('friendList',
		["$scope",
		 "$controller",
		 "friendService",
		
		function($scope,$controller,friendService) {
			$scope.friendService = friendService;
			$scope.openChat = function(friend) {
				$scope.broadcast('openChat', {friend: friend});
			};
		}
]);

app.controller('friend',
		["$scope",
		 "friendService",
		 "userService",
		 
		function($scope,friendService,userService) {
			console.log('oo');
			$scope.userConnected = userService.userConnected;
			$scope.friendService = friendService;
			$scope.$on('openChat', function(evt, params) {
				$scope.$broadcast('open', params);
				console.log('openChat');
			})
		}
]);