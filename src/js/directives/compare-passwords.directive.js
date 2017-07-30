(function () {
    'use strict';

    angular.module('myApp.directives').directive('compareTo', compareTo);

    compareTo.$inject = [];

    //compares model value with given model's value
    //ex: in model2 we put compare-to="model3"
    // and if its value doesn't match model3's, it will throw a validation error
    function compareTo() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }
})();