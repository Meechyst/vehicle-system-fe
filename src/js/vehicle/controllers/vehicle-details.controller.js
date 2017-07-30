(function () {
    'use strict';

    angular.module('myApp.vehicle').controller('VehicleDetailsController', VehicleDetailsController);

    VehicleDetailsController.$inject = ['_vehicle', '$state','VehicleAPI', 'AuthService', 'toastr'];

    function VehicleDetailsController(_vehicle, $state, VehicleAPI, AuthService, toastr) {

        var vm = this;

        vm.errors = "";
        vm.vehicle = [];
        vm.loggedUser = AuthService.user;
        vm.removeVehicle = removeVehicle;

        //Backend sends error message or the data according to the request uri
        //We display the data || error message
         _vehicle && _vehicle.data ?  vm.vehicle = _vehicle.data : vm.error = _vehicle.message;

        function removeVehicle(userId, vehicleId){
            var answer = confirm("Do you confirm that you want to delete the vehicle?");
            if (!answer) {
                toastr.info('Vehicle survived');
                return false
            } else {
                VehicleAPI.vehicle.delete(userId, vehicleId).then(function(){
                    toastr.success('You have successfully removed the vehicle');
                    $state.go('profile.userDetail', {userId: userId});
                });
            }
        }


    }

})();