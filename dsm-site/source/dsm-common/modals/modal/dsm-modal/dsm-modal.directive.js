(function () {
    angular.module('dsmCommon').directive('dsmModal', DsmModalDirective);

    DsmModalDirective.$inject = [];

    function DsmModalDirective() {
        return {
            restrict: 'E',
            templateUrl: './source/dsm-common/modals/modal/dsm-modal/dsm-modal.directive.html',
            controller: 'dsmModalController',
            controllerAs: 'ctrl',
            scope: {
                onClose: '&'
            },
            bindToController: true,
            transclude: {
                header: '?modalHeader',
                body: 'modalBody',
                footer: '?modalFooter'
            }
        };
    }
})();