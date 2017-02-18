(function () {
    angular.module('dsmCalendar').service('activityService', ActivityService);

    ActivityService.$inject = ['$http', 'moment'];

    function ActivityService($http, moment) {
        var _this = this;

        _this.getAll = getAll;
        _this.createActivity = createActivity;
        _this.updateActivity = updateActivity;
        _this.deleteActivity = deleteActivity;

        var _serviceUrl;

        function ctor() {
            _serviceUrl = 'http://localhost:3030/activity';
        }

        function getAll() {
            return $http
                .get(_serviceUrl)
                .then(res => res.data)
                .then(activities => activities.map(fixDates));
        }

        function updateActivity(activity) {
            return $http
                .put(`${_serviceUrl}/${activity.id}`, activity)
        }

        function createActivity(activityData) {
            return $http
                .post(_serviceUrl, activityData)
                .then(res => res.data)
                .then(fixDates);
        }

        function deleteActivity(activityId) {
            return $http
                .delete(`${_serviceUrl}/${activityId}`);
        }

        function fixDates(activity) {
            activity.startDate = moment(activity.startDate).toDate();
            activity.endDate = moment(activity.endDate).toDate();

            return activity;
        }

        ctor();
    }
})();