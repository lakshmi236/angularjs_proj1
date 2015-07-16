(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', 'UserService', '$rootScope' ,'$http' ];
    function HomeController($location, UserService, $rootScope ,$http) {
       // alert("home controller");
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.isuser=false;
        initController();
        vm.getQuote = getQuote;
        vm.state=null;
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

               var url="http://ZiptasticAPI.com/"+vm.zipcode+"?callback=JSON_CALLBACK";

            $http.jsonp(url).
                success(function(data) {
                    $rootScope.data = data;
                   vm.state=data.state;
                    alert(vm.state);
                    $location.path('/quote/'+vm.state+'/'+vm.zipcode);
                }).
                error(function (data) {
                    $rootScope.data = "Request failed";
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