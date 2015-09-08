app.controller('userConnection',
		["$scope",
		 "$state",
		 "friendService",
		 "userService",
		
		function($scope,$state,friendService,userService) {
			$scope.users = userService.getUsers();
			
			$scope.connect = function() {
				userService.userConnected = $scope.user;
				$state.go('friend');
			};
		}
]);

app.controller('userCreate',[
    "$scope",
    "$firebaseArray",
    "userService",

    function($scope,$firebaseArray,userService) {
        $scope.showForm = false;
        $scope.users = $firebaseArray(userService.getFireBaseRef().child('users'));
        userService.getFireBaseRef().child('users').on('child_added', function() {
            console.log('child_added');
        });

        /**
         * @description
         * Called userService for create user
         * @param user
         */
        $scope.create = function(user) {
            userService.create(user);
        }

        /**
         * @description
         * Save user on firebase
         * @param user
         */
        $scope.save = function(user) {
            $scope.users.$save(user);
        }
        /**
         * @description
         * Reset user model
         */
        $scope.resetUser = function() {
            $scope.user = { pseudo: '', email: '' };
        }

        /**
         * @description
         * Show form for edit user model
         * @param user
         */
        $scope.edit = function(user) {
            $scope.showForm = true;
            $scope.user = user;
        }

        /**
         * @description
         * Called userService for delete user
         * @param user
         */
        $scope.remove = function(user) {
            userService.remove(user);
            console.log('delete');
        }

        /**
         * @description
         * Show form for create new user model
         */
        $scope.new = function() {
            $scope.resetUser();
            $scope.showForm = true;
        }

        /**
         * @description
         * Hide show form
         */
        $scope.cancel = function() {
            $scope.showForm = false;
        }

        /**
         * @description
         * Search a user from its name
         * @param nameToSearch
         */
        $scope.search = function(nameToSearch) {
            $scope.searchUserResults = [];
            userService.getFireBaseRef().child('users').orderByChild("pseudo").once("value", function(snap) {
                angular.forEach(snap.val(), function(user) {
                    console.log(user);
                    if ( user.pseudo.toLowerCase().indexOf(nameToSearch.toLowerCase()) >= 0 )
                        $scope.searchUserResults.push(user);
                });
            });
        }
    }
])

app.controller('userConnect',
		["$scope",
            "userService",
            "KLOnline",

            function($scope,userService,klOnline) {
                $scope.onlineUsers = [];
                klOnline.watch('onlineUsers', function(users) { $scope.onlineUsers = users });


                //$scope.session = userService.getSession();
                $scope.create = function(user) {
                    userService.create(user);
                };

                $scope.auth = function(user) {
                    /*
                    $scope.session = userService.auth(user);
                    console.log($scope.session)
                    */
                    userService.auth(user);
                };

                $scope.unauth = function() {
                    userService.unauth();
                    $scope.session = userService.getSession()
                };


                $scope.isConnected = function() { return userService.isConnected(); }
		}
		
		
]);
