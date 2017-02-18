(function () {
    angular.module('dsmApp').config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }]);
})();