var rooms = [{id: 1, friends: 2, messages: [{from: 1, to: 2, content: 'Tom'}]}];

app.service('chatService',
		['friendService',
		'rfc4122',
	function(friendService, uuid) {
		rooms[0]['id'] = uuid.v4(); 
		
		rooms[0]['friend'] = friendService.getFriend(2);
		
		this.getRooms = function() { return rooms; };
		
		this.addRoom = function() {
			
		};
	}]
	
		
);