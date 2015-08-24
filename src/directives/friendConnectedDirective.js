app.directive("friendConnected", function() {
	
	return {
		replace: true,
		restrict: 'E',
		scope: {
			'friend': "=",
			'startDialog': '&',
			'stopDialog': '&'
		},
		templateUrl: 'src/templates/friendConnected.html'
	};
});