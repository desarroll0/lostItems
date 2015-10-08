/**
* Post
* @namespace lostitems.posts.directives
*/
(function () {
  'use strict';

  angular
    .module('lostitems.posts.directives')
    .directive('post', post);

  /**
  * @namespace Post
  */
  function post() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf lostitems.posts.directives.Post
    */
    var directive = {
      restrict: 'E',
      scope: {
        post: '=',
        mediaroot: '=',
      },
      templateUrl: '/static/templates/posts/onepost.html'
    };

    return directive;
  }
})();