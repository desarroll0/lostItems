(function () {
  'use strict';

  angular
    .module('lostitems.authentication', [
      'lostitems.authentication.controllers',
      'lostitems.authentication.services'
    ]);

  angular
    .module('lostitems.authentication.controllers', []);

  angular
    .module('lostitems.authentication.services', ['ngCookies']);
})();