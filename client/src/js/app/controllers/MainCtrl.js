'use strict';
angular.module('filemanager')
    .controller('MainCtrl', ['$scope', '$state', '$http', 'DirStructure', 'DirObj', 'FileObj', 'FileTypes', function($scope, $state, $http, DirStructure, DirObj, FileObj, FileTypes){
        /**
         * List of folders in current folder
         * @type {Array}
         */
        $scope.dirs = DirStructure.currentDir.dirs;

        /**
         * List of files in current folder
         * @type {Array}
         */
        $scope.files = DirStructure.currentDir.files;

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


        $scope.showDirSection = function(){
            $state.go('main.add');
        }
    }])
;