(function () {
    'use strict';

    routing.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routing($stateProvider, $urlRouterProvider) {

        //redirect to 404 if no state contains given url
        $urlRouterProvider.otherwise('/#/');

        $stateProvider.state('home', {
            url: "/",
            views: {
                "": {
                    templateUrl: 'templates/index.html'
                }
            }
        }).state('otherwise', {
            url: '/404',
            templateUrl: 'templates/error404.html'
        })
    }

    angular.module('myApp').config(routing);


    restangularConfig.$inject = ['RestangularProvider'];

    function restangularConfig(RestangularProvider) {
        RestangularProvider.setResponseExtractor(function (response) {
            var newResponse = response;
            if (angular.isArray(response)) {
                angular.forEach(newResponse, function (value, key) {
                    newResponse[key].original = angular.copy(value);
                });
            } else if (angular.isObject(response)) {
                newResponse.original = angular.copy(response);
            }

            return newResponse;
        });
    }

    angular.module('myApp').config(restangularConfig);


    api.$inject = ['Restangular', '$localStorage', '$http', 'TokenService', '$state'];

    function api(Restangular, $localStorage, $http, TokenService, $state) {
        Restangular.setBaseUrl('http://localhost:8000/api');

        // add a response interceptor for token
        Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {

            //get token from user object that comes with response
            if (url.endsWith('/api/login')) {
                var auth = response.data.data.token;
                if (auth) {
                    $localStorage.token = auth;
                }
            }
            //same thing for register route
            if (url.endsWith('/api/register')) {
                var auth2 = response.data.data.token;
                if (auth2) {
                    $localStorage.token = auth2;
                }
            }
            return data;
        });


        // add a response interceptor for getList
        Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            var extractedData;
            if (operation === "getList") {
                extractedData = data.result;
            } else {
                extractedData = data;
            }
            return extractedData;
        });


        Restangular.setFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {
            var token = {};

            if ($localStorage.token) {
                token.Authorization = $localStorage.token;
            }

            return {
                element: element,
                params: params,
                headers: _.extend(headers, token),
                httpConfig: httpConfig
            };
        });


        var refreshAccessToken = function () {
            // Refresh access-token logic
            return TokenService.getToken();
        };

        Restangular.setErrorInterceptor(function (response, deferred, responseHandler) {
            console.log("response", response);
            if (response.status === 401) {
                if (response.data.message === "Token has expired") {
                    refreshAccessToken().then(function () {
                        // Repeat the request and then call the handlers the usual way.
                        //Set the new token


                        response.config.headers.Authorization = $localStorage.token;
                        $http(response.config).then(responseHandler, deferred.reject);
                        // Be aware that no request interceptors are called this way.
                    });

                    return false; // error handled
                } else if (response.data.error === "token_invalid") {
                    delete $localStorage.token;
                    $state.go('auth.login');
                    return false;
                }

            } else if (response.status === 400 && response.data.error === "token_expired") {
                // After a long time the token expires
                delete $localStorage.token;
            }

            return true; // error not handled
        });

    }

    angular.module('myApp').run(api);

})();