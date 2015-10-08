//angular
//  .module('lostitems', []);

(function () {
  'use strict';

  angular
    .module('lostitems', [
      'lostitems.config',
      'lostitems.routes',
      'lostitems.authentication',
      'lostitems.layout',
      'lostitems.posts',
      'lostitems.utils',
      'lostitems.profiles',
      'ngFileUpload'
    ]);

  angular
    .module('lostitems.routes', ['ngRoute']);

  angular
    .module('lostitems.config', []);



    angular
  .module('lostitems')
  .run(run);

  run.$inject = ['$http'];

  /**
  * @name run
  * @desc Update xsrf $http headers to align with Django's defaults
  */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
    //$http.defaults.headers.post["Content-Type"] = "application/text";
  }

})();