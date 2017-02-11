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