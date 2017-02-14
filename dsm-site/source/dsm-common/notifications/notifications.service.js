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