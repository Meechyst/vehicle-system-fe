(function () {
    'use strict';

    angular.module('myApp.directives').directive('uniquePlate', uniquePlate);

    uniquePlate.$inject = ['VehicleAPI'];

    //communicates with the service to go and see if given plate
    //exist in db. Returns obj
    function uniquePlate(VehicleAPI) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.unique = VehicleAPI.checkPlate;
            }
        }
    }
})();