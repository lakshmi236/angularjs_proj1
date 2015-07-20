(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    HomeController.$inject = ['$rootScope'];
    function HomeController($rootScope ) {
        // alert("home controller");
        var vm = this;
        vm.isHeader=true;




    }

})();