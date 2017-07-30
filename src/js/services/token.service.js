(function () {
    'use strict';

    angular.module('myApp.services').factory('TokenService', TokenService);

    TokenService.$inject = ['Restangular', '$q'];

    function TokenService(Restangular, $q) {
        var service = {
            getToken: getToken
        };

        var promise = null;


         //If a token request is already made, send the same promise and let them wait for the same result.
        function getToken() {
            if (!promise) {
                var deferred = $q.defer();

                Restangular.all('token').customGET().then(function (result) {
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                }).finally(function () {
                    promise = null;
                });

                promise = deferred.promise;

                return deferred.promise;
            }

            return promise;
        }


        return service;
    }

})();