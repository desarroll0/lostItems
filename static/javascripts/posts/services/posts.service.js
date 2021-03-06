/**
* Posts
* @namespace lostitems.posts.services
*/
(function () {
  'use strict';

  angular
    .module('lostitems.posts.services')
    .factory('Posts', Posts);

  Posts.$inject = ['$http'];

  /**
  * @namespace Posts
  * @returns {Factory}
  */
  function Posts($http) {
    var columns;
    var Posts = {
      all: all,
      entregados: entregados,
      create: create,
      update: update,
      get: get,
      getColumns: getColumns,
      setColumns: setColumns
    };

    return Posts;

    ////////////////////

    /**
    * @name all
    * @desc Get all Posts
    * @returns {Promise}
    * @memberOf lostitems.posts.services.Posts
    */
    function all() {
      return $http.get('/api/v1/post/recovered/no/');
    }
    /**
    * @name all
    * @desc Get entregados Posts
    * @returns {Promise}
    * @memberOf lostitems.posts.services.Posts
    */
    function entregados() {
      return $http.get('/api/v1/post/recovered/si/');
    }


    /**
    * @name create
    * @desc Create a new Post
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf lostitems.posts.services.Posts
    */
    function create(item, datafile) {
       var fd = new FormData();

       var url = '/api/v1/posts/';

       //angular.forEach(datafile,function(file){
       fd.append('file',datafile);
       //});

       //sample data
       var data = item;

       fd.append("content", content);


      return $http.post(url, fd, {
        withCredentials : false,
        headers : {
        'Content-Type' : 'multipart/form-data'
        },
        transformRequest : angular.identity
       });
    }
    /**
    * @name create
    * @desc Create a new Post
    * @param {string} content The content of the new Post
    * @returns {Promise}
    * @memberOf lostitems.posts.services.Posts
    */
    function update(item) {
      return $http.put('/api/v1/posts/' + item.id + '/', angular.toJson(item));/*
      return $http.put('/api/v1/posts/' + item.id + '/', angular.toJson(item),{
        withCredentials : false,
        headers : {
        'Content-Type' : undefined
        },
        transformRequest : angular.identity
       });*/
    }

    /**
     * @name get
     * @desc Get the Posts of a given user
     * @param {string} username The username to get Posts for
     * @returns {Promise}
     * @memberOf lostitems.posts.services.Posts
     */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/posts/');
    }

    function getColumns(cols){
      columns = cols;
    }

    function setColumns(){
      return columns;
    }
  }
})();