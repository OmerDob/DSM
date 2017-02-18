(function () {
    angular.module('dsmCalendar').service('activityModalService', ActivityModalService);

    ActivityModalService.$inject = ['modalFactory', '$q'];

    function ActivityModalService(modalFactory, $q) {
        var _this = this;

        _this.editActivity = editActivity;

        function editActivity(activity) {
            var deferred = $q.defer();
            var modal = modalFactory.create({
                templateUrl: './source/dsm-calendar/activity/activity-modal/activity-modal.html',
                controller: 'activityModalController',
                controllerAs: 'ctrl',
                resolve: {
                    activity: activity,
                    deferred: deferred
                }
            });

            modal.show();

            return deferred.promise.finally(modal.close);
        }
    }
})();