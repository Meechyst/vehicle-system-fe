(function () {
    'use strict';

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        $stateProvider
            .state('profile.userDetail', {
                url: '/profile/:userId',
                views: {
                    "profile-user-details": {
                        templateUrl: 'templates/user-details.html',
                        controller: 'UserDetailsController as userDetailsCtrl'
                    }
                },
                resolve: {
                    _usersVehicles: ['VehicleAPI', '$stateParams', function (VehicleAPI, $stateParams) {
                        return VehicleAPI.vehicle.getUsersAllVehicles($stateParams.userId).then(function (result) {
                            return result;
                        });
                    }]
                }
            })
    }

    angular.module('myApp.user').config(routes);

})();