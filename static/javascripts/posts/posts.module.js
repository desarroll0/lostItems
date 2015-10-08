(function () {
  'use strict';

  angular
    .module('lostitems.posts', [
      'lostitems.posts.controllers',
      'lostitems.posts.directives',
      'lostitems.posts.services'
    ]);

  angular
    .module('lostitems.posts.controllers', []);

  angular
    .module('lostitems.posts.directives', ['ngDialog']);

  angular
    .module('lostitems.posts.services', []);
})();