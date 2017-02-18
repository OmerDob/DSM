(function () {
    angular.module('dsmCalendar').controller('activityModalController', ActivityModalController);

    ActivityModalController.$inject = ['$scope', 'activity', 'deferred', 'changesTrackerFactory', 'confirmationModalService', '$q'];

    function ActivityModalController($scope, activity, deferred, changesTrackerFactory, confirmationModalService, $q) {
        var _this = this;

        _this.save = save;
        _this.cancel = cancel;
        _this.canSave = canSave;

        var _activityChangesTracker;

        function ctor() {
            _activityChangesTracker = changesTrackerFactory.create(activity);
            _this.activity = _activityChangesTracker.getWorkingCopy();
        }

        function save() {
            if ($scope.activityForm.$valid) {
                _activityChangesTracker.saveChanges();
                deferred.resolve();
            }
        }

        function cancel() {
            var exitPromise = _activityChangesTracker.isDirty() ?
                confirmationModalService.prompt('Are you sure you want to leave without saving you changes?') :
                $q.when();
            
            exitPromise.then(() => deferred.reject());
        }

        function canSave() {
            return _activityChangesTracker.isDirty();
        }

        ctor();
    }
})();