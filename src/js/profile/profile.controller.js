(function () {
    'use strict';

    angular.module('myApp.profile').controller('ProfileController', ProfileController);

    ProfileController.$inject = ['AuthService', '$scope', 'toastr', 'VehicleAPI', '$state', '$timeout'];

    function ProfileController(AuthService, $scope, toastr, VehicleAPI, $state, $timeout) {

        var vm = this;

        vm.user = null;
        vm.logout = logout;
        vm.picture = "";
        vm.dummyData = dummyData;
        vm.pageGrayOut = false;

        //setup a watch for user
        $scope.$watch(function () {
            return AuthService.user;
        }, function (user) {
            vm.user = user;
        });

        function logout() {
            AuthService.logout();
        }

        function dummyData(){
           vm.pageGrayOut = true;
          VehicleAPI.createDummyData().then(function(response){
              if(response){
                  toastr.info(response + '. 10 New people and 30 related vehicles added');
                  vm.pageGrayOut = false;
                  $state.reload();
              } else {
                  toastr.info('Something went wrong. Refresh the page and try again');
                  vm.pageGrayOut = false;
              }
          });
        }
    }

})();