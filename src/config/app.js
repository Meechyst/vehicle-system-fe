(function () {
    'use strict';

    angular.module('myApp',
        [
            // Vendor dependencies
            'ngAnimate',
            'ngAria',
            'ngMessages',
            'ui.router',
            'restangular',
            'ngStorage',
            'toastr',

            // Application Modules
            'myApp.services',
            'myApp.directives',
            'myApp.filters',
            'myApp.auth',
            'myApp.profile',
            'myApp.user',
            'myApp.vehicle'

        ]
    );
})();