(function () {
    'use strict';

    angular
        .module('app')
        .controller('quoteController', quoteController);

    quoteController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function quoteController($location, AuthenticationService, FlashService) {
        // alert("login controller");
        var vm = this;

        vm.login = login;

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