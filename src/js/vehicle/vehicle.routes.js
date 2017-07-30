(function () {
    'use strict';

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        $stateProvider
            .state('profile.vehicleList', {
                url: '/profile',
                views: {
                    "profile-vehicle-list": {
                        templateUrl: 'templates/profile.vehicle-list.html',
                        controller: 'VehicleListController as vehicleListCtrl'
                    }
                },
                resolve: {
                    _allVehicles: ['VehicleAPI', function (VehicleAPI) {
                        return VehicleAPI.vehicle.getAll().then(function (response) {
                            return response.vehicles;
                        })
                    }]
                }
            })
            .state('profile.registerVehicle', {
                url: '/profile/:userId/register-vehicle',
                views: {
                    "profile-register-vehicle": {
                        templateUrl: 'templates/register-vehicle.html',
                        controller: 'RegisterVehicleController as registerVehicleCtrl'
                    }
                },
                //Redirect user if they're trying to register a vehicle
                //with someone else's id
                onEnter: function ($stateParams, AuthService, $state, toastr) {
                    var userId;
                    AuthService.getCurrentUser().then(function (result) {
                        userId = result.id;
                        //viewing his/her profile
                        if (userId == $stateParams.userId) { //can use if not here todo

                        } else {
                            //redirect to correct route
                            $state.go('profile.registerVehicle', {userId: userId});
                            toastr.info('You can\'t register a vehicle with someone else\'s ID. Redirected back to your profile, where you can perform that action');
                        }
                    });
                }
            })
            .state('profile.vehicleDetail', {
                url: '/profile/:userId/vehicle/:vehicleId',
                views: {
                    "profile-vehicle-details": {
                        templateUrl: 'templates/profile.vehicle-details.html',
                        controller: 'VehicleDetailsController as vehicleDetailsCtrl'
                    }
                },
                resolve: {
                    _vehicle: ['VehicleAPI', '$stateParams', function (VehicleAPI, $stateParams) {
                        return VehicleAPI.vehicle.getUsersVehicle($stateParams.userId, $stateParams.vehicleId).then(function (result) {
                            return result;
                        });
                    }]
                }
            })
            .state('profile.editVehicle', {
                url: '/profile/:userId/vehicle/:vehicleId/edit-vehicle',
                views: {
                    "profile-edit-vehicle": {
                        templateUrl: 'templates/edit-vehicle.html',
                        controller: 'EditVehicleController as editVehicleCtrl'
                    }
                },
                resolve: {
                    _vehicle: ['VehicleAPI', '$stateParams', function (VehicleAPI, $stateParams) {
                        return VehicleAPI.vehicle.getUsersVehicle($stateParams.userId, $stateParams.vehicleId).then(function (result) {
                            return result.data;
                        });
                    }]
                },
                onEnter: function ($stateParams, AuthService, $state, VehicleAPI, toastr) {
                    var userId;
                    var vehicleId;
                    //get user from param
                    AuthService.getCurrentUser().then(function (result) {
                        userId = result.id;
                        //get vehicle of that user
                        VehicleAPI.vehicle.getUsersVehicle(userId, $stateParams.vehicleId).then(function (result) {
                            //if it's returning an error message - redirect to their profile
                            if (result.message) {
                                $state.go('profile.userDetail', {userId: userId});
                                toastr.error(result.message + '. Redirecting to back to your profile');
                            } else {
                                //else vehicle service will return a vehicle
                                vehicleId = result.data.id;
                                //check if the user that is viewing the page
                                //is the owner of both profile and vehicle
                                if (userId == $stateParams.userId && vehicleId == $stateParams.vehicleId) {
                                    //no else needed but hey, safety first.
                                } else {
                                    $state.go('profile.userDetail', {userId: userId});
                                    toastr.info('You can\'t edit someone else\'s vehicle. Redirected back to your profile');
                                }
                            }
                        });
                    });
                }
            })
    }

    angular.module('myApp.vehicle').config(routes);

})();