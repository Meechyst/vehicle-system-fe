(function () {
    'use strict';

    angular.module('myApp.directives').directive('uniqueName', uniqueName);

    uniqueName.$inject = ['AuthService'];

    // checking to see if we can match a user with given username
    function uniqueName(AuthService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.unique = AuthService.checkName;
            }
        }
    }
})();