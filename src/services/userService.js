var users = [{id: 1, name: 'Tom'}, {id: 2, name: 'Sandra'}, {id: 3, name: 'Emile'}];

app.service('userService',
		['$firebaseArray',
		 '$firebaseObject',
		 '$firebaseAuth',

	function($firebaseArray,$firebaseObject,$firebaseAuth) {
		var presenceListRef = new Firebase("https://incandescent-heat-4484.firebaseio.com/presence");
		var presenceRef = presenceListRef.push();	
		
		var connectedRef = new Firebase("https://incandescent-heat-4484.firebaseio.com/.info/connected");
		connectedRef.on('value', function(snap) {
			console.log(snap.val());
			presenceRef.set({name:'tom',  status:"online"});
			presenceRef.onDisconnect().remove();
		});
		
		presenceListRef.on("value", function(snap) {
			//console.log(snap);
			_.each(snap.val(), function(user) {
				console.log(user.name);
			});
			
			
		});
				
		var ref = new Firebase("https://incandescent-heat-4484.firebaseio.com/");
		var auth = $firebaseAuth(ref);
		auth.$onAuth( function(authData) {
			if ( !authData ) return;
			//ref.child('users').child(authData.uid).set({name: authData.password.email, provider: 'password'});
			
			ref.child('users').child(authData.uid).once('value', function(snap) {
				if ( !snap.exists() ) ref.child('users').child(authData.uid).set({name: authData.password.email, provider: 'password'});
				console.log('syncUser, %s',snap.exists());
			});
		});
		/*
		var users = $firebaseArray(ref.child('users'));
		//sync.$loaded( function() { console.log(sync)});
		//sync.$add(users).catch(function(err) { console.log(err); });
		
		*/
		this.getUsers = function() { return users; };
		
		this.create = function(user) {
			auth.$createUser(user)
				.then(function(userData) {
					console.log(userData);
				}).catch(function(error) {
					console.log(error.message);
				});
			return auth;
		};
		
		this.auth = function(user) {
			//userRef.set({name:'zozo',  status:"online"});
			
			auth.$authWithPassword(user)
				.then( function(authData) {
					presenceRef.set({name: authData.password.email, status: 'online'});
					
				}).catch( function(error) {
					console.log(error.message)
				});
			
			
			console.log('auth');
		};
		this.unauth = function() { 
			userRef.remove();
			auth.$unauth(); 
		};
		
		this.getSession = function() { return auth.$getAuth(); }
		
		this.isConnected = function() {
			//console.log(auth.$getAuth());
			return auth.$getAuth();
		}
	}
	
		
]);