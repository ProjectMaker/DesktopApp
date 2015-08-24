app.directive("chatRoom", function() {
	var controller = [
	    '$scope',
	    function($scope) {
		
	    	function initialize() {
	    		$scope.dialogId = null;
				$scope.messages = [];
			}
			
			initialize();
			
			$scope.send = function() {
				console.log('send');
				$scope.messages.push({destination: 'user', content: $scope.message});
				$scope.sendMessage({message: $scope.message, dialogId: $scope.dialogId});
			};
			
			$scope.$on('receive', function(evt, params) {
				if ( params.friend == $scope.friend )
					$scope.messages.push({destination: 'friend', content: params.message});
			});
	    }
	];
	
	return {
		restrict: 'E',
		scope: {
			friend: '=',
			onClose: '&',
			sendMessage: '&'
		},
		templateUrl: 'src/templates/chatRoom.html',
		controller: controller,
		link: function(scope, element, attrs) {
			console.log(scope.friend);
			
		}
	};
});