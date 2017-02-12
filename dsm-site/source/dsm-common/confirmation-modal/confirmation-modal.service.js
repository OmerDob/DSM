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