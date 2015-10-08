/**
* Posts
* @namespace lostitems.posts.directives
*/
(function () {
  'use strict';

  angular
    .module('lostitems.posts.directives')
    .directive('posts', posts);

  /**
  * @namespace Posts
  */
  function posts() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf lostitems.posts.directives.Posts
    */
    var directive = {
      controller: 'PostsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        posts: '=',
        mediaroot: '=',
      },
      templateUrl: '/static/templates/posts/posts.html'
    };

    return directive;
  }
})();