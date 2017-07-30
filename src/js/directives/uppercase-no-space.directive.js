(function () {
    'use strict';

    angular.module('myApp.directives').directive('uppercaseNoSpace', uppercaseNoSpace);

    uppercaseNoSpace.$inject = [];

    //long live stackoverflow
    function uppercaseNoSpace() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
                var capitalize = function(inputValue) {
                    if (inputValue == undefined) inputValue = '';
                    var capitalized = inputValue.toUpperCase().replace(/[\s]/g, '');
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                };
                modelCtrl.$parsers.push(capitalize);
                capitalize(scope[attrs.ngModel]); // capitalize initial value
            }
        }
    }
})();