(function () {
    angular.module('dsmCalendar').controller('activitiesListController', ActivitiesListController);

    ActivitiesListController.$inject = ['activityService', 'activities', 'confirmationModalService'];

    function ActivitiesListController(activityService, activities, confirmationModalService) {
        var _this = this;

        _this.deleteActivity = deleteActivity;
        _this.test = test;

        function ctor() {
            _this.activities = activities;
        }

        function deleteActivity() {
            var activityIdToRemove = _this.selectedActivity._id;

            confirmationModalService
                .prompt('Are you sure you want to delete this activity?')
                .then(() => activityService.deleteActivity(activityIdToRemove))
                .then(() => {
                    _this.selectedActivity = undefined;
                    _this.activities = _this.activities.filter(activity => activity._id != activityIdToRemove);
                });
        }

        function test() {
            confirmationModalService.prompt('hello confirmation');
        }

        ctor();
    }
})();