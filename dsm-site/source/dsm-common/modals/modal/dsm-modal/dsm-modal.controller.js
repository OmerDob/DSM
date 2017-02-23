(function () {
    angular.module('dsmCommon').controller('dsmModalController', DsmModalController);

    DsmModalController.$inject = ['$transclude'];

    function DsmModalController($transclude) {
        var _this = this;

        _this.onClose = _this.onClose || angular.noop;
        _this.hasPart = $transclude.isSlotFilled;
    }
})();