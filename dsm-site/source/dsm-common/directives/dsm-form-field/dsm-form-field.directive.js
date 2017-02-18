(function () {
    angular.module('dsmCommon').directive('dsmFormField', DsmFormFieldDirective);

    DsmFormFieldDirective.$inject = [];

    function DsmFormFieldDirective() {
        return {
            restrict: 'E',
            templateUrl: './source/dsm-common/directives/dsm-form-field/dsm-form-field.directive.html',
            transclude: true,
            require: '^^form',
            scope: {
                fieldLabel: '@label',
                errorMessages: '<'
            },
            link: link
        };

        function link(scope, element, attr, formCtrl) {
            scope.showError = () => formCtrl.$submitted;
        }
    }
})();