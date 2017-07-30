(function () {
    'use strict';

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        $stateProvider
            .state('profile', {
                views: {
                    "": {
                        templateUrl: 'templates/profile.html',
                        controller: 'ProfileController as profileCtrl'
                    }
                },
                onEnter: function ($state, AuthService) {
                    AuthService.checkCurrentUser().then(function (res) {
                        //authenticated
                        if (res) {
                        //unauthenticated
                        } else {
                            $state.go('auth.login');
                        }
                    })
                }
            })
    }

    angular.module('myApp.profile').config(routes);

})();