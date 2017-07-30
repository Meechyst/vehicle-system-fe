(function () {
    'use strict';

    angular.module('myApp.user').controller('UserDetailsController', UserDetailsController);

    UserDetailsController.$inject = ['_usersVehicles',  'AuthService', '$stateParams'];

    function UserDetailsController(_usersVehicles, AuthService, $stateParams) {

        var vm = this;
        vm.loggedUser = AuthService.user;
        vm.error = "";
        vm.errorCode = "";
        vm.uriUser = {};

        //Here we're fetching id from param and using to get that user's data.
        //We're using uriUser to fill user data in userDetail only because
        //by default userDetail view gets its data from userVehicle obj
        //which is nothing but all the vehicles of a user, which happens to also contain user data.
        //So when the user has no vehicle to show, uriUser is there to fill user data in view.
        AuthService.getUriUser($stateParams.userId).then(function(result){
            vm.uriUser = result.data;
        });


        //if resolve returns data and it contains "vehicles"
        _usersVehicles && _usersVehicles.vehicles ?
            //we assign it to vm.vehicles. else it will contain "message" and "messageCode". we assign them accordingly
            vm.vehicles = _usersVehicles.vehicles : vm.error = _usersVehicles.message; vm.errorCode = _usersVehicles.messageCode;

    }

})();