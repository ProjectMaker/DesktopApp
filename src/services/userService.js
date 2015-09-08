var users = [{id: 1, name: 'Tom'}, {id: 2, name: 'Sandra'}, {id: 3, name: 'Emile'}];

app.factory('KLWatcher',
    function() {
        var KLWatcher = function() {
            this.initialize();
        };

        angular.extend(KLWatcher.prototype, {
            initialize: function() {
                this.callbacks = {};
                console.log('initialize');
            },

            watch: function(variable, callback) {
                if ( typeof(this[variable]) !== undefined ) {
                    if ( !this.callbacks[variable] ) this.callbacks[variable] = [];
                    this.callbacks[variable].push(callback);
                }
            },

            notify: function(variable) {
                if ( !this[variable]) return;
                if ( !this.callbacks[variable]) return;

                angular.forEach(this.callbacks[variable], function(callback, key) {
                    callback(this[variable]);
                }, this)
            }
        });

        return KLWatcher;
});

app.factory('KLOnline',
            ['KLWatcher',

    function(KLWatcher) {
        var KLOnline = function () {
            this.initialize();
        };


        angular.extend(KLOnline.prototype,KLWatcher.prototype);
        angular.extend(KLOnline.prototype, {
            initialize: function() {
                /*
                KLWatcher.prototype.initialize.apply(this);
                this.onlineUsers = [];
                this.onlinesRef = new Firebase("https://incandescent-heat-4484.firebaseio.com/online");
                this.onlineRef = this.onlinesRef.push();
                var connectedRef = new Firebase("https://incandescent-heat-4484.firebaseio.com/.info/connected");
                connectedRef.on('value', function(snap) {
                    this.onlineRef.set({name:"Unknown",  status:"online"});
                    this.onlineRef.onDisconnect().remove();
                }, this);

                this.onlinesRef.on("value", function(snap) {
                    this.onlineUsers = snap.val();
                    this.notify('onlineUsers')

                }, this);
                */
            },

            getOnlineUsers: function() { return this.onlineUsers; },

            updateOnlineUser: function(user) {
                this.onlineRef.set({name: user.name});
            },

            disconnectUser: function() {
                this.onlineRef.remove();
            }
        });

        return new KLOnline();
    }
]);

app.service('userService',
		['$firebaseArray',
			'$firebaseObject',
		 	'$firebaseAuth',
			'KLOnline',

	function($firebaseArray,$firebaseObject,$firebaseAuth,klOnline) {
		var ref = new Firebase("https://incandescent-heat-4484.firebaseio.com/");
		var auth = $firebaseAuth(ref);

        this.getFireBaseRef = function() {return ref; };


        /*
		auth.$onAuth( function(authData) {
			if ( !authData ) return;
			//ref.child('users').child(authData.uid).set({name: authData.password.email, provider: 'password'});
			
			ref.child('users').child(authData.uid).once('value', function(snap) {
				if ( !snap.exists() ) ref.child('users').child(authData.uid).set({name: authData.password.email, provider: 'password'});
				console.log('syncUser, %s',snap.exists());
			});
		});
        */

        this.remove = function(user) {
            auth.$removeUser({
                email: user.email,
                password: user.password
            }).then(
                function() {
                    ref.child('users').child(user.$id).remove();
                }
            ).catch(
                function(error) {
                    console.log('errro');
                }
            )};


		this.create = function(user) {
			auth.$createUser(user)
				.then(function(userData) {
                    ref.child('users').child(userData.uid).set(user);
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
                    klOnline.updateOnlineUser({name: authData.password.email});
				}).catch( function(error) {
					console.log(error.message)
				});
			
			
			console.log('auth');
		};
		this.unauth = function() {
            klOnline.disconnectUser();
			auth.$unauth(); 
		};
		
		this.getSession = function() { return auth.$getAuth(); };
		this.isConnected = function() {
			//console.log(auth.$getAuth());
			return auth.$getAuth();
		}
	}
	
		
]);