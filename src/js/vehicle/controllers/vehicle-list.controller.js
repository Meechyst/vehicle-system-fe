(function () {
    'use strict';

    angular.module('myApp.vehicle').controller('VehicleListController', VehicleListController);

    VehicleListController.$inject = ['_allVehicles', 'AuthService'];

    function VehicleListController(_allVehicles, AuthService) {

        var vm = this;

        vm.vehicles = _allVehicles;
        vm.user = AuthService.user;


        vm.sortDirection = sortDirection;
        vm.predicate = 'name';
        vm.reverse = true;
        vm.order = order;

        //determine sort order by value
        function order(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }

        function sortDirection() {
            vm.caret = !vm.caret
        }
    }

})();