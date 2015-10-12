/**
* PostsController
* @namespace lostitems.posts.controllers
*/
(function () {
  'use strict';

  angular
    .module('lostitems.posts.controllers')
    .controller('RecoverPostController', RecoverPostController);

  RecoverPostController.$inject = ['$rootScope', '$scope', 'Authentication','post', 'ngDialog', 'Upload', 'Snackbar', 'Posts'];

  /**
  * @namespace RecoverPostController
  */
  function RecoverPostController($rootScope, $scope, Authentication, post, ngDialog, Upload, Snackbar, Posts) {
    var vm = this;
    console.log(post);
    console.log('pasa por el controller nuevo');
    vm.recover = recover;

    function recover (regist_recovered){
      console.log(post);
      var item = {};
      item.id = post.id;
      item.recovered = false;
      //item.file = "";
      /*
      Upload.upload({
                url: '/api/v1/posts/'+item.id+'/',
                method: 'PUT',
                //data: {file: vm.datafile, content: vm.content}
                data: item
            }).then(createPostSuccessFn,createPostErrorFn, 
            function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + (evt.config.data.file ? evt.config.data.file.name : 'sin adjunto' ));
            });
*/
      Posts.update(item).then(createPostSuccessFn,createPostErrorFn);

              /**
      * @name createPostSuccessFn
      * @desc Show snackbar with success message
      */
      function createPostSuccessFn(data, status, headers, config) {
        console.log(data);
        $rootScope.$broadcast('post.created', data.data);

        regist_recovered.$setPristine();
        regist_recovered.$setValidity();
        ngDialog.close();
        Snackbar.show('La entrega del objeto se ha registrado correctamente.');
      }


      /**
      * @name createPostErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createPostErrorFn(data, status, headers, config) {

      $rootScope.$broadcast('post.created.error');
      if(data.error)Snackbar.error(data.error);
      else Snackbar.error("Error inesperado!");

        ngDialog.close();
      }


    }
  }
})();