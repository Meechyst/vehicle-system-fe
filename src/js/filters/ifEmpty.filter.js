(function () {
    'use strict';

    angular.module('myApp.filters').filter('ifEmpty', ifEmpty);

    ifEmpty.$inject = [];

    //returns given data if the value is null or empty string
    //ex: | ifEmpty:'get to the choppa'
    function ifEmpty(){
        return function(input, defaultValue) {
            if (angular.isUndefined(input) || input === null || input === '') {
                return defaultValue;
            }
            return input;
        }
    }

})();