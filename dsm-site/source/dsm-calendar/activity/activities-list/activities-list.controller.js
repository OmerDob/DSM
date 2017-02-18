(function () {
    angular.module('dsmCalendar').controller('activitiesListController', ActivitiesListController);

    ActivitiesListController.$inject = ['activityService', 'activities', 'confirmationModalService', 'notificationsService', 'activityModalService'];

    function ActivitiesListController(activityService, activities, confirmationModalService, notificationsService, activityModalService) {
        var _this = this;

        _this.createActivity = createActivity;
        _this.editActivity = editActivity;
        _this.deleteActivity = deleteActivity;

        function ctor() {
            _this.activities = activities;
        }

        function createActivity() {
            var newActivity = {};

            activityModalService
                .editActivity(newActivity)
                .then(() => activityService.createActivity(newActivity))
                .then(activity => {
                    notificationsService.success({
                        message: 'Activity created.',
                        expiry: 5000
                    });

                    _this.activities.push(activity);
                });
        }

        function editActivity(activity) {
            activityModalService
                .editActivity(activity)
                .then(() => activityService.updateActivity(activity))
                .then(() => notificationsService.success({
                    message: 'Activity saved.',
                    expiry: 5000
                }));
        }

        function deleteActivity() {
            var activityIdToRemove = _this.selectedActivity.id;

            confirmationModalService
                .prompt('Are you sure you want to delete this activity?')
                .then(() => activityService.deleteActivity(activityIdToRemove))
                .then(() => {
                    notificationsService.success({
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