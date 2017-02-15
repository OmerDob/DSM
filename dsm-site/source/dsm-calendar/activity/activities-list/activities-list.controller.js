(function () {
    angular.module('dsmCalendar').controller('activitiesListController', ActivitiesListController);

    ActivitiesListController.$inject = ['activityService', 'activities', 'confirmationModalService', 'notificationsService'];

    function ActivitiesListController(activityService, activities, confirmationModalService, notificationsService) {
        var _this = this;

        _this.deleteActivity = deleteActivity;

        function ctor() {
            _this.activities = activities;
        }

        function deleteActivity() {
            var activityIdToRemove = _this.selectedActivity.id;

            confirmationModalService
                .prompt('Are you sure you want to delete this activity?')
                .then(() => activityService.deleteActivity(activityIdToRemove))
                .then(() => {
                    notificationsService.info({
                        message: 'Activity has been removed.',
                        expiry: 5000
                    });
                    _this.selectedActivity = undefined;
                    _this.activities = _this.activities.filter(activity => activity.id != activityIdToRemove);
                });
        }

        ctor();
    }
})();