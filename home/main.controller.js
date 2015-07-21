(function () {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$location', 'UserService', '$rootScope' ,'$http','$scope' ];
    function MainCtrl($location, UserService, $rootScope ,$http,$scope) {
        $scope.userservice=UserService;




 }

})();