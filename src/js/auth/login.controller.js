(function () {
    'use strict';

    angular.module('myApp.auth').controller('LoginController', LoginController)

    LoginController.$inject = ['AuthService', '$state', '$stateParams'];

    function LoginController(AuthService, $state, $stateParams) {

        var vm = this;

        vm.user = null;
        vm.formData = {};
        vm.error = false;
        vm.disableSubmit = false;
        vm.formData.name = $stateParams.name || "";
        vm.login = login;
        vm.clearFormData = clearFormData;

        function clearFormData(){
            vm.formData = {};
        }


        function login() {
            vm.error = false;

            vm.disableSubmit = true;
            AuthService.login(vm.formData).then(function() {
                vm.disableSubmit = false;
                $state.go('profile.vehicleList'); //login successful

            }, function (err) { //login failed
                console.log(err);
                vm.formData = {};
                vm.error = true;
                vm.disableSubmit = false;

            });
        }

    }

})();