var friends = [{id: 2, name: 'Sandra'}, {id: 3, name: 'Emile'}];

app.service('favoryService',
		['$firebaseArray',
		 'rfc4122',
                             
	function($firebaseArray, uuid) {
		var ref = new Firebase("https://incandescent-heat-4484.firebaseio.com/favory");
		ref.on('value', function(snap) {
			//console.log(snap.val());
		});
		var sync = $firebaseArray(ref);
		
		this.getFavories = function() { return sync; };
		
		this.addFavory = function(favory) {
			favory.id = uuid.v4();
			sync.$add({id: favory.id, name: favory.name});
		};
	}
		
]);