angular.module('dsm.app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./source/test.directive.html',
    "<div>test</div>"
  );

}]);
