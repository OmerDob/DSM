(function () {
    angular.module('dsmCommon').factory('modalFactory', ModalFactory);

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