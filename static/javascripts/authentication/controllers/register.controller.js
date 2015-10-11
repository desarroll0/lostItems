/**
* Register controller
* @namespace lostitems.authentication.controllers
*/
(function () {
  'use strict';

  angular
    .module('lostitems.authentication.controllers')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication', 'Snackbar'];


  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication, Snackbar) {
    var vm = this;
    vm.register = register;
    vm.is_active = true;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf lostitems.authentication.controllers.RegisterController
     */
    function activate() {
      // If the user is not authenticated, they should not be here.
      if (!Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }
    
    /**
    * @name register
    * @desc Register a new user
    * @memberOf lostitems.authentication.controllers.RegisterController
    */
    function register(registform) {

      Authentication.register(angular.lowercase(vm.email), vm.password, vm.username, vm.first_name, vm.last_name, vm.is_active).
      then(registerSuccessFn, registerErrorFn);  
      /**
      * @name registerSuccessFn
      * @desc Log the new user in
      */
      function registerSuccessFn(resp, status, headers, config) {
        Snackbar.show("Creado "+angular.lowercase(vm.email)+" ( "+vm.username+" ) Exitosamente! ");
        
        vm.email = "";
        vm.password = "";
        vm.username = "";
        vm.first_name = "";
        vm.last_name = "";
        registform.$setPristine();
        registform.$setValidity();
        
      }
      /**
      * @name registerErrorFn
      * @desc Log "Epic failure!" to the console
      */
      function registerErrorFn(resp, status, headers, config) {
        if(resp.data){
          if(resp.data.message)Snackbar.error(resp.data.message);
          else if(resp.data.detail)Snackbar.error(resp.data.detail);
          else{
            //Shows the first property and value of response
            var jsonresp = resp.data;//JSON.parse(resp.data);
            Snackbar.error(Object.keys(resp.data)[0]+' : '+resp.data[Object.keys(resp.data)[0]]);
          }
        }  
        else Snackbar.error("Error inesperado");
      }
      
    }
  }
})();