(function () {
    'use strict';

    angular.module('myApp.services').factory('VehicleAPI', VehicleAPI);

    VehicleAPI.$inject = ['Restangular', '$q'];

    function VehicleAPI(Restangular, $q) {

        var service = {
            user: user,
            vehicle: {
                create: createVehicle,
                update: updateVehicle,
                delete: deleteVehicle,
                get: getVehicle,
                getAll: getAllVehicles,
                getUsersVehicle: getaVehicleOfaUser,
                getUsersAllVehicles: getAllVehiclesOfaUser,
                getAllTypes: getAllTypes,
                getAllBrands: getAllBrands,
                getAllModels: getAllModels,
                getAllDatasOfType: getAllDatasOfType
            },
            checkPlate: checkPlate,
            createDummyData: createDummyData
        };

        function user() {
            return Restangular.one('user').get();
        }

        function getVehicle(id) {
            return Restangular.one('vehicles', id).get().then();
        }

        function getAllVehicles(){
            return Restangular.one('vehicles').get().then();
        }

        function createVehicle(userId, data){
            return Restangular.one('users', userId).all('vehicles').post(data)
        }

        function updateVehicle(userId, vehicleId, data){
            return Restangular.one('users', userId).one('vehicles', vehicleId).customPUT(data)
        }

        function deleteVehicle(userId, vehicleId){
            return Restangular.one('users', userId).one('vehicles', vehicleId).remove()
        }

        function getaVehicleOfaUser(userId, vehicleId){
           return Restangular.one('users', userId).one('vehicles', vehicleId).get().then();
        }

        function getAllVehiclesOfaUser(userId){
            return Restangular.one('users', userId).one('vehicles').get().then();
        }

        function getAllTypes(){
            return Restangular.one('types').get().then();
        }
        function getAllBrands(id, name){
            return Restangular.one('brands-of-type').get({id: id, name: name}).then();
        }

        function getAllModels(id, name){
            return Restangular.one('models-of-brand').get({id: id, name: name}).then();
        }
        function getAllDatasOfType(){
            return Restangular.one('datas-of-type').get().then();
        }

        function checkPlate(plate){
            var deferred = $q.defer();
            Restangular.one('checkPlate').getList("", {plate: plate}).then(function() {
                //if resulto no uniquerto
                deferred.reject();
            }, function() {
                deferred.resolve();
            });

            return deferred.promise;
        }
        //we make a get request to /api/dbSeed which fires an artisan command
        //to boot database factory that seeds the db with dummy data
        function createDummyData(){
            return Restangular.one('dbSeed').get();
        }

        return service;
    }

})();











        //
        //function create(data) {
        //    return Restangular.all('vehicles').post(data).then(function (result) {
        //        toastr.info('You have successfully created a new vehicle.');
        //        return result.data;
        //    })
        //        .catch(function (response) {
        //            toastr.error(response.data.message);
        //        });
        //}
        //
        //function get(id) {
        //    return Restangular.one('vehicles', id).get().then(function (result) {
        //        console.log("result", result);
        //        service.user = result.data;
        //        return result.data;
        //    });
        //}
        //
        //function getAll() {
        //    return Restangular.all('vehicles').get().then(function (result) {
        //}
        //
        //function checkVehicle(plate){
        //    var deferred = $q.defer();
        //    Restangular.one('checkVehicle').getList("", {plate: plate}).then(function() {
        //        // Same as checkEmail logic. Found vehicle, reject the promise.
        //        deferred.reject();
        //    }, function() {
        //        // Vehicle not found, therefore unique
        //        deferred.resolve();
        //    });
        //
        //    return deferred.promise;
        //}
        //
        //
        //function login(data) {
        //    return Restangular.all('login').post(data).then(function (result) {
        //        service.user = result.data;
        //        toastr.success('You have successfully signed in!');
        //        return result.data;
        //    })
        //        .catch(function(error) {
        //            toastr.error(error.data.message, error.status);
        //        });
        //}
        //
        //function recoverPassword(){
        //    return Restangular.all('password/reset').getList().then();
        //}
        //
        //function logout() {
        //    return Restangular.all('logout').customGET().then(function (response) {
        //        service.user = null;
        //        $localStorage.token = null;
        //        toastr.info('You have successfully signed out');
        //        return response;
        //    });
        //}

    //}

