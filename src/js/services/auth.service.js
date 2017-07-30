(function () {
    'use strict';

    angular.module('myApp.services').factory('AuthService', AuthService);

    AuthService.$inject = ['Restangular', '$localStorage', '$q', 'toastr', '$state'];

    function AuthService(Restangular, $localStorage, $q, toastr, $state) {
        var service = {
            user: null,
            createUser: createUser,
            checkCurrentUser: checkCurrentUser,
            checkEmail: checkEmail,
            checkName: checkName,
            logout: logout,
            login: login,
            getCurrentUser : getCurrentUser,
            getUriUser : getUriUser
        };

        function createUser(data) {
            return Restangular.all('register').post(data).then(function (result) {
                service.user = result.data;
                toastr.info('You have successfully created a new account and have been signed-in');
                return result.data;
            })
                .catch(function (response) {
                    toastr.error(response.data.message);
                });
        }
        //logged in user.
        function getCurrentUser() {
            return Restangular.all('user').customGET().then(function (result) {
                service.user = result.data;
                return result.data;
            });
        }

        function checkCurrentUser() {
            var deferred = $q.defer();
            if (service.user) {
                deferred.resolve(service.user);
            } else if ($localStorage.token) {
                getCurrentUser().then(function (result) {
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });
            } else {
                deferred.resolve(null);
            }
            return deferred.promise;
        }

        //get user with the id of param :userId
        function getUriUser(id){
            return Restangular.one('users', id).get().then(function(result){
                return result;
            });
        }

        //check the db if there's a record with given email value
        function checkEmail(email){
            var deferred = $q.defer();
            Restangular.one('checkEmail').getList("", {email: email}).then(function() {
                //Found the email, therefore not unique
                deferred.reject();
            }, function() {
                //email not found, therefore unique
                deferred.resolve();
            });

            return deferred.promise;
        }

        //same thing of checkEmail with name value
        function checkName(name){
            var deferred = $q.defer();
            Restangular.one('checkName').getList("", {name: name}).then(function() {
                deferred.reject();
            }, function() {
                //name not found
                deferred.resolve();
            });

            return deferred.promise;
        }

        function login(data) {
            return Restangular.all('login').post(data).then(function (result) {
                service.user = result.data;
                toastr.success('You have successfully signed in!');
                return result.data;
            })
                .catch(function(error) {
                    toastr.error(error.data.message, error.status);
                });
        }


        function logout() {
            return Restangular.all('logout').customGET().then(function (response) {
                service.user = null;
                $localStorage.token = null;
                toastr.info('You have successfully signed out');
                $state.go('home');
                return response;
            });
        }

        return service;
    }

})();