var friends = [{id: 2, name: 'Sandra'}, {id: 3, name: 'Emile'}];

app.service('friendService',
	function() {
		this.getFriends = function() { return friends; };
		
		this.getFriend = function(id) { return _.find(friends, function(friend) { return friend.id == id } ); };
	}
		
);