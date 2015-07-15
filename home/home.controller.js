(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope' ,'$http' ];
    function HomeController(UserService, $rootScope ,$http) {
       // alert("home controller");
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.isuser=false;
        initController();
        vm.getQuote = getQuote;
        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            if ($rootScope.globals.currentUser!=null) {

                UserService.GetByUsername($rootScope.globals.currentUser.username)
                    .then(function (user) {
                        vm.user = user;
                        vm.isuser=true;
                    });
            }
        }


        function getQuote() {

               alert(vm.zipcode);


            $http.get("https://www.zipcodeapi.com/rest/xLuMT8yWjs7w0ecQqv58Ld5mU2YTmycUjHHdPf98IhEIwQyWmE47RauMdsGz1Tuk/info.json/95050/degrees")
                .success(function(response) {
                    alert(response);
                   //$scope.names = response.records;
                });

        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }


    }

})();