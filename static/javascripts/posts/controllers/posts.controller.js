/**
* PostsController
* @namespace lostitems.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('lostitems.posts.controllers')
    .controller('PostsController', PostsController);

  PostsController.$inject = ['$scope', 'Posts', 'Authentication', 'ngDialog', '$controller'];

  /**
  * @namespace PostsController
  */
  function PostsController($scope, Posts, Authentication, ngDialog, $controller) {
    var vm = this;

    vm.columns = [];

    activate();

    vm.auth = Authentication.isAuthenticated();


    vm.modalRecover = function(post){
     var modalInstance = ngDialog.open({
        templateUrl: '/static/templates/posts/regist_recovered_post.html',
        scope: $scope,
        controller: $controller('RecoverPostController as vm', {$scope: $scope,post: post})
      });
     
      ngDialog.close();
      //$scope.closeThisDialog();
/*
      $scope.$watchCollection(function () { return $scope.posts; }, render);
      $scope.$watch(function () { return $(window).width(); }, render);*/
    };



    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf lostitems.posts.controllers.PostsController
    */
    function activate() {
      $scope.$watchCollection(function () { return $scope.posts; }, render);
      $scope.$watch(function () { return $(window).width(); }, render);
    }

    /**
    * @name calculateNumberOfColumns
    * @desc Calculate number of columns based on screen width
    * @returns {Number} The number of columns containing Posts
    * @memberOf lostitems.posts.controllers.PostsControllers
    */
    function calculateNumberOfColumns() {
      var width = $(window).width();

      if (width >= 1200) {
        return 4;
      } else if (width >= 992) {
        return 3;
      } else if (width >= 768) {
        return 2;
      } else {
        return 1;
      }
    }


    /**
    * @name approximateShortestColumn
    * @desc An algorithm for approximating which column is shortest
    * @returns The index of the shortest column
    * @memberOf lostitems.posts.controllers.PostsController
    */
    function approximateShortestColumn() {
      var scores = vm.columns.map(columnMapFn);

      return scores.indexOf(Math.min.apply(this, scores));


      /**
      * @name columnMapFn
      * @desc A map function for scoring column heights
      * @returns The approximately normalized height of a given column
      */
      function columnMapFn(column) {
        var lengths = column.map(function (element) {
          return element.brand ? element.brand.length : 1;
        });

        return lengths.reduce(sum, 0) * column.length;
      }


      /**
      * @name sum
      * @desc Sums two numbers
      * @params {Number} m The first number to be summed
      * @params {Number} n The second number to be summed
      * @returns The sum of two numbers
      */
      function sum(m, n) {
        return m + n;
      }
    }


    /**
    * @name render
    * @desc Renders Posts into columns of approximately equal height
    * @param {Array} current The current value of `vm.posts`
    * @param {Array} original The value of `vm.posts` before it was updated
    * @memberOf lostitems.posts.controllers.PostsController
    */
    function render(current, original) {
      if (current !== original) {
        vm.columns = [];
        // Calc number of columns based on the window.width
        for (var i = 0; i < calculateNumberOfColumns(); ++i) {
          vm.columns.push([]);
        }
        /*
        for (var i = 0; i < current.length; ++i) {
          var column = approximateShortestColumn();
          vm.columns[column].push(current[i]);
        }
        */
        var j = 0;
        for (var i = 0; i < current.length; ++i) {
            vm.columns[j].push(current[i]);
            j = j >= vm.columns.length-1 ? 0 : j+1;
        }
      }
      Posts.setColumns(vm.columns);
    }
  }
})();