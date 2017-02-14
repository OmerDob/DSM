(function () {
    angular.module('dsmCommon').controller('notificationsBarController', NotificationBarController);

    NotificationBarController.$inject = ['notificationsService'];

    function NotificationBarController(notificationsService) {
        var _this = this;

        _this.getNotifications = notificationsService.getNotifications;
    }
})();