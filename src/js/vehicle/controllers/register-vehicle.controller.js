(function () {
    'use strict';

    angular.module('myApp.vehicle').controller('RegisterVehicleController', RegisterVehicleController);

    RegisterVehicleController.$inject = ['VehicleAPI', 'toastr', '$state', '$stateParams', '$timeout'];

    function RegisterVehicleController(VehicleAPI, toastr, $state, $stateParams, $timeout) {

        var vm = this;
        vm.formData = {};
        vm.disableSubmit = false;
        vm.register = register;

        /** Type input **/
        vm.types = []; //initiating the data that we get from api and send to view
        vm.showAddTypeToggle = showAddTypeToggle; //button that shows option to switch from select to input incase user can't find his/her choice of vehicle detail
        vm.showAddType = false; //bool value for switch button
        vm.typeInput = false; // bool value for switching from select to input. being used in a ng-if
        vm.typeToggle = typeToggle; //button that does the swithing
        vm.typeDisabled = true; // bool for input disable

        //getting all types to populate the select
        VehicleAPI.vehicle.getAllTypes().then(function (result) {
            vm.types = result.types;
            vm.typeDisabled = false;
        });

        function typeToggle() {
            //just an ng-if toggle for text box and select box
            vm.typeInput = !vm.typeInput;
            //emptying children fields if user decides to enter a new input via text box
            vm.formData.typeSelect = null;
            vm.formData.brandSelect = null;
            vm.formData.brandText = null;
            vm.formData.modelSelect = null;
            vm.formData.modelText = null;

            //disabling children inputs when user switches to text input for new input.
            vm.brandDisabled = true;
            vm.modelDisabled = true;
            //also wanna prevent user to get text box of brands without picking/typing a parent input.
            vm.showAddBrand = false;
            vm.showAddModel = false;


        }

        // when working with ng-blur/focus, immidiately switching between true/false for ng-show/hide directives
        //results in some unexpected issues, so here's a witty workaround.
        function showAddTypeToggle() {
            $timeout(function () {
                vm.showAddType = !vm.showAddType;
            }, 1000)
        }


        /** Brand input **/
        vm.brands = [];
        vm.showAddBrandToggle = showAddBrandToggle;
        vm.showAddBrand = false;
        vm.brandInput = false;
        vm.brandToggle = brandToggle;
        vm.getBrands = getBrands;
        vm.brandDisabled = true;
        vm.showBrandLoading = false;

        function getBrands(id, name) {
            if (vm.formData.typeSelect || vm.formData.typeText) {
                vm.showBrandLoading = true;
                vm.brandDisabled = true;

                vm.formData.brandSelect = null;
                vm.formData.brandText = null;
                vm.formData.modelSelect = null;
                vm.formData.modelText = null;

                vm.modelDisabled = true;
                vm.showAddModel = false;

                VehicleAPI.vehicle.getAllBrands(id, name).then(function (result) {
                    result = result.plain();
                    delete result.original; //restangular returns an item called original when returning backend response, getting rid of it.
                    vm.showBrandLoading = false;
                    vm.brandDisabled = false;
                    return vm.brands = result;
                });
            }

        }

        function brandToggle() {
            vm.brandInput = !vm.brandInput;
            vm.formData.brandSelect = null;
            vm.formData.modelSelect = null;
            vm.formData.modelText = null;

            vm.modelDisabled = true;
            vm.showAddModel = false;

        }

        function showAddBrandToggle() {
            $timeout(function () {
                vm.showAddBrand = !vm.showAddBrand;
            }, 1000)
        }

        /** --------- **/


        /** Model input **/
        vm.models = [];
        vm.showAddModelToggle = showAddModelToggle;
        vm.showAddModel = false;
        vm.modelInput = false;
        vm.modelToggle = modelToggle;
        vm.getModels = getModels;
        vm.modelDisabled = true;
        vm.showModelLoading = false;


        function getModels(id, name) {
            if (vm.formData.brandSelect || vm.formData.brandText) {
                if (vm.formData.brandText || !vm.brands['message']) {
                    vm.showModelLoading = true;
                    vm.modelDisabled = true;
                    VehicleAPI.vehicle.getAllModels(id, name).then(function (result) {
                        result = result.plain();
                        delete result.original;
                        vm.showModelLoading = false;
                        vm.modelDisabled = false;
                        return vm.models = result;
                    });
                }
            }
        }

        function modelToggle() {
            vm.modelInput = !vm.modelInput;
            vm.formData.modelSelect = null;
        }

        function showAddModelToggle() {
            $timeout(function () {
                vm.showAddModel = !vm.showAddModel;
            }, 1000)
        }

        /** --------- **/


        function register() {

            var userId = $stateParams.userId;
            vm.disableSubmit = true;
            //we eliminate all the possibilities of user's bad input
            //except for modelSelect, which somehow passes validation if 'message' response is set as a model name
            //which is a error message that's coming from backend if there's no associated record with chosen parent.
            //we do a quick check here if user is trying to register a vehicle with message input
            //we tell them not to.
            if (vm.formData.modelSelect != 'message') {
                VehicleAPI.vehicle.create(userId, vm.formData).then(function (result) {
                    toastr.success('You have successfully registered a new vehicle');
                    console.log(vm.formData);
                    vm.disableSubmit = false;
                    $state.go('profile.userDetail', {userId: userId});
                    return result.data;
                })
                    //err handling
                    .catch(function (response) {
                        toastr.error(response.data.message);
                        vm.disableSubmit = false;

                    });
            } else {
                vm.disableSubmit = false;
                toastr.error('Please select a correct model');
            }

        }
    }

})();