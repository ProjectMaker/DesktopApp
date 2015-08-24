app.controller('chat',
		["$scope",
		 "friendService",
		 "userService",
		 "chatService",
		function($scope,friendService,userService,chatService) {
			$scope.name = userService.name;
			$scope.friendsDialog = [];
			$scope.friendsConnected = friendService.getFriends();
			
			
			
			$scope.sendMessage = function(friend, message) {
				$scope.$broadcast('receive', {friend: friend, message: "J'adore"});
				console.log(arguments);
			};
			
			$scope.startDialog = function(friend) {
				var friendDialog = _.find($scope.friendsDialog, function(friendDialog) { return friendDialog == friend; });
				if ( !friendDialog ) {
					$scope.friendsDialog.push(friend);
					console.log('startDialog with %s', friend.name);
				}
			};
			
			$scope.stopDialog = function(friend) {
				console.log('stopDialog, %s', friend.name);
				
				$scope.friendsDialog = _.reject($scope.friendsDialog, function(_friend) { console.log('ooo : %s; %s', _friend.name, friend.name); return _friend.name == friend.name; } );
			};
			
			var rooms = chatService.getRooms();
			_.each(rooms, function(room) { if ( room['active'] ) $scope.startDialog(room['friend']); });
		}
]);

app.controller('chatRoom',
		["$scope",
		 "friendService",
		 
		function($scope,friendService) {
			$scope.messages = [];
			$scope.send = function() {
				console.log('send');
				$scope.messages.push({destination: 'user', content: $scope.message});
				$scope.sendMessage({message: $scope.message});
			};
			
			$scope.$on('receive', function(evt, params) {
				$scope.messages.push({destination: 'friend', content: params.message});
				console.log('receive');
				console.log(params);
			});
		}
]);