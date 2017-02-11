(function () {
    angular.module('dsmCalendar', [
        'ngRoute'
    ]);
})();
(function () {
    angular.module('dsmApp', [
        'dsmCalendar'
    ]);
})();
(function () {
    angular.module('dsmApp').component('dsmApp', {
        template: '<div ng-view></div>'
    });
})();
(function () {
    angular.module('dsmCalendar').controller('activitiesListController', ActivitiesListController);

    ActivitiesListController.$inject = ['activityService', 'activities'];

    function ActivitiesListController(activityService, activities) {
        var _this = this;

        _this.deleteActivity = deleteActivity;

        function ctor() {
            _this.activities = activities;
        }

        function deleteActivity() {
            var activityIdToRemove = _this.selectedActivity._id;

            activityService
                .deleteActivity(activityIdToRemove)
                .then(() => {
                    _this.selectedActivity = undefined;
                    _this.activities = _this.activities.filter(activity => activity._id != activityIdToRemove);
                });
        }

        ctor();
    }
})();
(function () {
    angular.module('dsmCalendar').factory('activitiesListResolver', ActivitiesListResolver);

    ActivitiesListResolver.$inject = ['activityService'];

    function ActivitiesListResolver(activityService) {
        return activityService.getAll();
    }
})();
(function () {
    angular.module('dsmCalendar').service('activityService', ActivityService);

    ActivityService.$inject = ['$http'];

    function ActivityService($http) {
        var _this = this;

        _this.getAll = getAll;
        _this.deleteActivity = deleteActivity;

        function getAll() {
            return $http
                .get('http://localhost:3030/activity')
                .then(res => res.data);
        }

        function deleteActivity(activityId) {
            return $http
                .delete(`http://localhost:3030/activity/${activityId}`);
        }
    }
})();
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