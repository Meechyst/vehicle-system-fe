(function () {
    'use strict';

    angular.module('myApp.auth').controller('SignupController', SignupController);

    SignupController.$inject = ['AuthService', '$state'];

    function SignupController(AuthService, $state) {

        var vm = this;
        vm.formData = {};
        vm.disableSubmit = false;
        vm.register = register;
        vm.gotoLoginWithUsername = gotoLoginWithUsername;


        function register() {
            vm.disableSubmit = true;
            AuthService.createUser(vm.formData).then(function () {
                $state.go('profile.vehicleList');
                vm.disableSubmit = false;

            });
        }

        //If user finds out he's trying to register with an email that is already in the db
        //we give him a direction to go to login page and carry his/her email with it.
        function gotoLoginWithUsername(data){
            $state.go('auth.login', {name: data})
        }

    }

})();