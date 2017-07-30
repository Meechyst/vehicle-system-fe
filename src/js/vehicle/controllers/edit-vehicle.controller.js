(function () {
    'use strict';

    angular.module('myApp.vehicle').controller('EditVehicleController', EditVehicleController);

    EditVehicleController.$inject = ['VehicleAPI', 'toastr', '$state', '$stateParams', '_vehicle'];

    function EditVehicleController(VehicleAPI, toastr, $state, $stateParams, _vehicle) {

        var vm = this;
        vm.formData = [];
        vm.disableSubmit = false;
        vm.edit = edit;
        vm.vehicle = _vehicle;

        //overwriting var names for view because form data uses var names as keys in payload
        //and backend's request object feeds on them.
        vm.vehicle.type = vm.vehicle.vmodel.type.name;
        vm.vehicle.brand = vm.vehicle.vmodel.brand.name;
        vm.vehicle.vehicleModel = vm.vehicle.vmodel.name;
        vm.vehicle.modelYear = vm.vehicle.vmodel.year;

        //we use vm.vehicle obj for ng-model to populate input boxes
        //therefore we can't use formData obj to get data from view
        //instead we push vm.vehicle data into formData, to use it as updated data
        vm.formData.push(vm.vehicle);

        function edit() {

            var userId = $stateParams.userId;
            var vehicleId = $stateParams.vehicleId;

            vm.disableSubmit = true;

            VehicleAPI.vehicle.update(userId, vehicleId, vm.formData[0]).then(function (result) {
                toastr.success('You have successfully updated your vehicle');
                vm.disableSubmit = false;
                $state.go('profile.vehicleDetail', {userId: userId, vehicleId: vehicleId});
                return result.data;
            })
                .catch(function (response) {
                    toastr.error(response.data.message);
                    vm.disableSubmit = false;

                });
        }

    }

})();