(function () {
    angular.module('dsmCommon').factory('changesTrackerFactory', ChangesTrackerFactory);

    ChangesTrackerFactory.$inject = [];

    function ChangesTrackerFactory() {
        return {
            create: original => new ChangesTracker(original)
        };

        function ChangesTracker(original) {
            var _this = this;

            _this.getWorkingCopy = getWorkingCopy;
            _this.saveChanges = saveChanges;
            _this.isDirty = isDirty;

            var _workingCopy;

            function ctor() {
                _workingCopy = angular.copy(original);
            }

            function getWorkingCopy() {
                return _workingCopy;
            }

            function saveChanges() {
                angular.copy(_workingCopy, original);
            }

            function isDirty() {
                var originalString = angular.toJson(original);
                var workingCopyString = angular.toJson(_workingCopy);

                return originalString != workingCopyString;
            }

            ctor();
        }
    }
})();