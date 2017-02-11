(function () {
    angular.module('dsm.app', []);

    angular.module('dsm.app').run(function () {
        console.log('hello dsm');
    });
})();
(function () {
    angular.module('dsm.app').directive('dsmTest', function () {
        return {
            restrict: 'E',
            templateUrl: './source/test.directive.html'
        };
    });
})();