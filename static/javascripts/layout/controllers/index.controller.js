/**
* IndexController
* @namespace lostitems.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('lostitems.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$routeParams', 'Authentication', 'Posts', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, $routeParams, Authentication, Posts, Snackbar) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.posts = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf lostitems.layout.controllers.IndexController
    */
    function activate() {

      var entregado =  $routeParams.si ? $routeParams.si : null;
      
      if(entregado != 'si')
        Posts.all().then(postsSuccessFn, postsErrorFn);
      else
        Posts.entregados().then(postsSuccessFn, postsErrorFn);


      $scope.$on('post.created', function (event, post) {
        vm.posts.unshift(post);
      });

      $scope.$on('post.created.error', function () {
        vm.posts.shift();
      });


      $scope.$on('post.eliminated', function (event, post) {
        var pkey;
        angular.forEach(vm.posts, function(value, key) {
            if(value.id == post.id) pkey = key;
        });
        vm.posts.splice(pkey, 1);
      });



      /**
      * @name postsSuccessFn
      * @desc Update posts array on view
      */
      function postsSuccessFn(data, status, headers, config) {
        for(var i=0; i < data.data.length; i++ ){
        if(data.data[i].datafile) data.data[i].datafile = data.data[i].datafile.replace(data.config.url, "/")
        else data.data[i].datafile = '';
        }

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