(function () {
    'use strict';

    angular
        .module('app')
        .controller('quoteController', quoteController);

    quoteController.$inject = ['$location', 'AuthenticationService', 'FlashService','$routeParams','UserService'];
    function quoteController($location, AuthenticationService, FlashService, $routeParams,UserService) {
        // alert("login controller");
        var vm = this;

        vm.login = login;
        vm.state=$routeParams.state;
        vm.zip=$routeParams.zip;
        UserService.isShow=false;
        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();