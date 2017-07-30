(function () {
    'use strict';

    angular.module('myApp.directives').directive('valueRestrict', valueRestrict);

    valueRestrict.$inject = [];

    //no special characters and spaces allowed.
    function valueRestrict() {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, modelCtrl) {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == null)
                        return ''
                    var cleanInputValue = inputValue.replace(/[^\w]|_/gi, '');
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    return cleanInputValue;
                });
            }
        }
    }
})();