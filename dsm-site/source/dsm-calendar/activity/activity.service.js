(function () {
    angular.module('dsmCalendar').service('activityService', ActivityService);

    ActivityService.$inject = ['$http', 'moment'];

    function ActivityService($http, moment) {
        var _this = this;

        _this.getAll = getAll;
        _this.createActivity = createActivity;
        _this.updateActivity = updateActivity;
        _this.deleteActivity = deleteActivity;

        function getAll() {
            return $http
                .get('http://localhost:3030/activity')
                .then(res => {
                    res.data.forEach(fixDates);

                    return res.data;
                });
        }

        function updateActivity(activity) {
            return $http
                .put(`http://localhost:3030/activity/${activity.id}`, activity)
        }

        function createActivity(activityData) {
            return $http
                .post(`http://localhost:3030/activity`, activityData)
                .then(res => res.data)
                .then(fixDates);
        }

        function deleteActivity(activityId) {
            return $http
                .delete(`http://localhost:3030/activity/${activityId}`);
        }

        function fixDates(activity) {
            activity.startDate = moment(activity.startDate).toDate();
            activity.endDate = moment(activity.endDate).toDate();

            return activity;
        }
    }
})();