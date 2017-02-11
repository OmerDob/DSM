(function () {
    angular.module('dsmCalendar').factory('activitiesListResolver', ActivitiesListResolver);

    ActivitiesListResolver.$inject = ['activityService'];

    function ActivitiesListResolver(activityService) {
        return activityService.getAll();
    }
})();