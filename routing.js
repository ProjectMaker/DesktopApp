app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/connection');
	
	$stateProvider.state('chat', {
		url: '/chat',
		controller: 'chat',
		templateUrl: 'src/templates/chat.html'
    })
    .state('connection', {
    	url: '/connection',
    	templateUrl: 'src/templates/user/formConnect.html',
    	controller: 'userConnect'
    })
    .state('createUser', {
		url: '/createUser',
		templateUrl: 'src/templates/user/formCreate.html',
		controller: 'userCreate'
	})
	.state('favory', {
		url: '/favory',
		templateUrl: 'src/templates/favory/favory.html',
		controller: 'favory'
	})
    
});