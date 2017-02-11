(function () {
    angular.module('dsmCalendar').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './source/dsm-calendar/activity/activities-list/activities-list.html',
                controller: 'activitiesListController',
                controllerAs: 'ctrl',
                resolve: {
                    activities: 'activitiesListResolver'
                }
            });
    }]);
})();