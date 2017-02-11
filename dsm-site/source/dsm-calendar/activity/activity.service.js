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