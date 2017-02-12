(function () {
    angular.module('dsmCommon', []);
})();
(function () {
    angular.module('dsmCalendar', [
        'ngRoute',
        'dsmCommon'
    ]);
})();
(function () {
    angular.module('dsmApp', [
        'dsmCalendar'
    ]);
})();
(function () {
    angular.module('dsmApp').component('dsmApp', {
        template: '<div ng-view></div>'
    });
})();
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
(function () {
    angular.module('dsmCalendar').factory('activitiesListResolver', ActivitiesListResolver);

    ActivitiesListResolver.$inject = ['activityService'];

    function ActivitiesListResolver(activityService) {
        return activityService.getAll();
    }
})();
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
(function () {
    angular.module('dsmCalendar').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './source/dsm-calendar/activity/activities-list/activities-list.html',
                controller: 'activitiesListController',
                controllerAs: 'ctrl',
                resolve: {
                    activities: 'activitiesListResolver'
                }
            });
    }]);
})();
(function () {
    angular.module('dsmCommon').controller('confirmationModalController', ConfirmationModalController);

    ConfirmationModalController.$inject = ['message', 'deferred'];

    function ConfirmationModalController(message, deferred) {
        var _this = this;

        _this.ok = deferred.resolve;
        _this.cancel = deferred.reject;

        function ctor() {
            _this.message = message;
        }

        ctor();
    }
})();
(function () {
    angular.module('dsmCommon').service('confirmationModalService', ConfirmationModalService);

    ConfirmationModalService.$inject = ['$q', 'modalService'];

    function ConfirmationModalService($q, modalService) {
        var _this = this;

        _this.prompt = prompt;

        function prompt(message) {
            var modalDeferred = $q.defer();
            var modal = modalService.create({
                templateUrl: './source/dsm-common/confirmation-modal/confirmation-modal.html',
                controller: 'confirmationModalController',
                controllerAs: 'ctrl',
                resolve: {
                    message: message,
                    deferred: modalDeferred
                }
            });

            modal.show();

            return modalDeferred.promise.finally(() => modal.close());
        }
    }
})();
(function () {
    angular.module('dsmCommon').factory('modalService', ModalFactory);

    ModalFactory.$inject = ['$document', '$rootScope', '$compile', '$templateCache', '$controller'];

    function ModalFactory($document, $rootScope, $compile, $templateCache, $controller) {
        function Modal(config) {
            var _this = this;

            _this.show = show;
            _this.close = close;

            var _modalScope;
            var _modalElement;

            function ctor() {
                buildModalScope();
                buildModalElement();
            }

            function show() {
                var bodyElement = angular.element($document[0].body);

                bodyElement.append(_modalElement);
            }

            function close() {
                _modalElement.remove();
            }

            function buildModalScope() {
                _modalScope = $rootScope.$new();

                if (config.controller) {
                    var controllerLocals = angular.extend({}, config.resolve, {$scope: _modalScope});
                    var modalController = $controller(config.controller, controllerLocals);

                    if (config.controllerAs) {
                        _modalScope[config.controllerAs] = modalController;
                    }
                }
            }

            function buildModalElement() {
                var modalTemplate = config.template || $templateCache.get(config.templateUrl);
                var modalContent = $compile(modalTemplate)(_modalScope);
                var modalWrapper = angular.element('<div class="dsm-modal-wrapper">');

                _modalElement = angular.element('<div class="dsm-modal">');

                modalWrapper.append(modalContent)
                _modalElement.append(modalWrapper);
            }

            ctor();
        }

        return {
            create: config => new Modal(config)
        };
    }
})();