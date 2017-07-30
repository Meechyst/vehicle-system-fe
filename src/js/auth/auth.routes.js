(function () {
    'use strict';

    routes.$inject = ['$stateProvider'];

    function routes($stateProvider) {
        $stateProvider
            .state('auth', {
                abstract: true,
                views: {
                    '': {
                        template: '<div ui-view="login"></div><div ui-view="signup"></div><div ui-view="forgot"></div>'
                    }
                },
                //Defining this here because this is a parent state
                //making children inherit the same effect
                onEnter: function($state, AuthService) {
                    AuthService.checkCurrentUser().then(function(res){
                        if (res) { //if logged in
                            $state.go('profile.vehicleList');
                        } else { // unauthenticated
                            $state.go('auth.login');
                        }
                    })
                }
            })
            .state('auth.login', {
                url: '/login/:name',
                views: {
                    "login": {
                        templateUrl: 'templates/login.html',
                        controller: 'LoginController as loginCtrl'
                    }
                },
                params:{
                    name: {value:null}
                }
            })
            .state('auth.signup', {
                url: '/signup',
                views: {
                    "signup": {
                        templateUrl: 'templates/sign-up.html',
                        controller: 'SignupController as signupCtrl'
                    }
                }
                // todo: ask if the user wants to leave the page when there's data in the form
                //onExit: function($scope) {
                //    //var answer = confirm("Want to leave this page?");
                //    //if (!answer) {
                //    //    return false;
                //    //}
                //    console.log($scope.formData);
                //}
            })

    }

    angular.module('myApp.auth').config(routes);
})();