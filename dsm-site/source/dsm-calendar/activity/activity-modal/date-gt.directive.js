(function () {
    angular.module('dsmCalendar').directive('dateGt', DateGtDirective);

    DateGtDirective.$inject = ['moment'];

    function DateGtDirective(moment) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        function link(scope, element, attrs, ngModelCtrl) {
            scope.$watch(attrs.dateGt, () => ngModelCtrl.$validate());

            ngModelCtrl.$validators.dateGt = function (modelValue) {
                var otherDate = scope.$eval(attrs.dateGt);

                return moment(otherDate).isBefore(modelValue);
            }
        }
    }
})();