'use strict';
angular.module('filemanager')
    .controller('MainCtrl', ['$scope', '$http', function($scope, $http){
        $scope.dirs = [];
        $scope.files = [];

        $http.get('/data/directory.json')
            .success(function(data){
                $scope.dirs = data.dirs;
                $scope.files = data.files;
            })
        ;
    }])
;