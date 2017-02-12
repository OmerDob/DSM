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