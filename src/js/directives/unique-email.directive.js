(function () {
    'use strict';

    angular.module('myApp.directives').directive('uniqueEmail', uniqueEmail);

    uniqueEmail.$inject = ['AuthService'];

    //sends backend an email(value) and returns a response from service
    //to check it input value matches the one in db
    function uniqueEmail(AuthService) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.unique = AuthService.checkEmail;
            }
        }
    }
})();