'use strict';
angular.module('filemanager')
    .controller('MainCtrl', ['$scope', '$http', 'DirObj', 'FileObj', 'FileTypes', function($scope, $http, DirObj, FileObj, FileTypes){
        /**
         * List of folders in current folder
         * @type {Array}
         */
        $scope.dirs = [];

        /**
         * List of files in current folder
         * @type {Array}
         */
        $scope.files = [];

        /**
         * Current file type filter name (false = off)
         * @type {boolean|string}
         */
        $scope.fileTypeFilter = false;

        /**
         * List file  mime types
         * @type {{images: Array, audio: Array, video: Array, archive: Array}}
         */
        $scope.fileTypes = FileTypes;

        $http.get('/data/directory.json')
            .success(function(data){
                data.dirs.forEach(function(dirData){
                    $scope.dirs.push(new DirObj(dirData));
                });

                data.files.forEach(function(fileData){
                    $scope.files.push(new FileObj(fileData));
                });
            })
        ;


        /**
         * Change filter file type name
         *
         * @param filterName
         */
        $scope.setFilterType = function(filterName){
            if(filterName && filterName !== false && $scope.fileTypes[filterName])
            {
                $scope.fileTypeFilter = filterName;
            }
            else
            {
                $scope.fileTypeFilter = false;
            }
        };

    }])
;