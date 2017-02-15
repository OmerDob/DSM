(function () {
    angular.module('dsmCommon', [
        'ngAnimate'
    ]);
})();
(function () {
    angular.module('dsmCalendar', [
        'ngRoute',
        'dsmCommon'
    ]);
})();
(function () {
    angular.module('dsmApp', [
        'dsmCommon',
        'dsmCalendar'
    ]);
})();
(function () {
    angular.module('dsmApp').component('dsmApp', {
        templateUrl: './source/dsm-app.component.html'
    });
})();
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
            var activityIdToRemove = _this.selectedActivity._id;

            confirmationModalService
                .prompt('Are you sure you want to delete this activity?')
                .then(() => activityService.deleteActivity(activityIdToRemove))
                .then(() => {
                    notificationsService.info({
                        message: 'Activity has been removed.',
                        expiry: 5000
                    });
                    _this.selectedActivity = undefined;
                    _this.activities = _this.activities.filter(activity => activity._id != activityIdToRemove);
                });
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
                templateUrl: './source/dsm-common/modals/confirmation-modal/confirmation-modal.html',
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
(function () {
    angular.module('dsmCommon').component('notificationsBar', {
        templateUrl: './source/dsm-common/notifications/notifications-bar/notifications-bar.component.html',
        controller: 'notificationsBarController',
        controllerAs: 'ctrl'
    });
})();
(function () {
    angular.module('dsmCommon').controller('notificationsBarController', NotificationBarController);

    NotificationBarController.$inject = ['notificationsService'];

    function NotificationBarController(notificationsService) {
        var _this = this;

        _this.getNotifications = notificationsService.getNotifications;
    }
})();
(function () {
    angular.module('dsmCommon').service('notificationsService', NotificationsService);

    NotificationsService.$inject = ['$timeout'];

    function NotificationsService($timeout) {
        var _this = this;

        _this.getNotifications = getNotifications;
        _this.info = info;
        _this.success = success;
        _this.failure = failure;

        var _notifications;
        var _nextId;

        const MAX_NOTIFICATIONS_NUM = 3;

        function ctor() {
            _notifications = [];
            _nextId = 1;
        }

        function getNotifications() {
            return _notifications;
        }

        function info(config) {
            notify(angular.extend({extraClasses: ['info']}, config));
        }

        function failure(config) {
            notify(angular.extend({extraClasses: ['failure']}, config));
        }

        function success(config) {
            notify(angular.extend({extraClasses: ['success']}, config));
        }

        function notify(config) {
            var notificationId = _nextId++;
            var notification = angular.extend({
                id: notificationId,
                close: () => removeNotification(notificationId)
            }, config);

            _notifications.unshift(notification);

            if (_notifications.length > MAX_NOTIFICATIONS_NUM) {
                _notifications.pop();
            }

            if (notification.expiry) {
                $timeout(notification.close, notification.expiry);
            }
        }

        function removeNotification(notificationId) {
            _notifications = _notifications.filter(notification => notification.id != notificationId);
        }

        ctor();
    }
})();