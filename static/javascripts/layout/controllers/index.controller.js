/**
* IndexController
* @namespace lostitems.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('lostitems.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Authentication, Posts, Snackbar) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = [];
<<<<<<< HEAD
=======
    vm.mediaroot = mediaroot;

>>>>>>> ba327165c30a1be59812004534f58b35d11c04ef

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf lostitems.layout.controllers.IndexController
    */
    function activate() {
      Posts.all().then(postsSuccessFn, postsErrorFn);

      $scope.$on('post.created', function (event, post) {
        vm.posts.unshift(post);
      });

      $scope.$on('post.created.error', function () {
        vm.posts.shift();
      });


      /**
      * @name postsSuccessFn
      * @desc Update posts array on view
      */
      function postsSuccessFn(data, status, headers, config) {
        vm.posts = data.data;
        if(vm.posts.length <= 0 )
          Snackbar.error("No hay objetos para mostrar!");
        console.log(vm.posts);
      }


      /**
      * @name postsErrorFn
      * @desc Show snackbar with error
      */
      function postsErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();