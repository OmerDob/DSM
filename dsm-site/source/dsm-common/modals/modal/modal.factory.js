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

                _modalScope.$on('$destroy', () => _modalElement.remove());
            }

            function show() {
                var bodyElement = angular.element($document[0].body);

                bodyElement.append(_modalElement);
            }

            function close() {
                _modalScope.$destroy();
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

                _modalElement = $compile(modalTemplate)(_modalScope);
                _modalElement.addClass('dsm-modal');
            }

            ctor();
        }

        return {
            create: config => new Modal(config)
        };
    }
})();