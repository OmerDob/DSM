(function () {
    angular.module('dsmCommon').service('confirmationModalService', ConfirmationModalService);

    ConfirmationModalService.$inject = ['$q', 'modalFactory'];

    function ConfirmationModalService($q, modalFactory) {
        var _this = this;

        _this.prompt = prompt;

        function prompt(message) {
            var modalDeferred = $q.defer();
            var modal = modalFactory.create({
                templateUrl: './source/dsm-common/modals/confirmation-modal/confirmation-modal.html',
                controller: 'confirmationModalController',
                controllerAs: 'ctrl',
                resolve: {
                    message: message,
                    deferred: modalDeferred
                }
            });

            modal.show();

            return modalDeferred.promise.finally(modal.close);
        }
    }
})();