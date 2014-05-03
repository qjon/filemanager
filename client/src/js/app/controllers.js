'use strict';
angular.module('filemanager')
    .controller('MainCtrl', ['$scope', '$http', function($scope, $http){
        /**
         * Lista katalogów obecnie przeglądanego katalogu
         * @type {Array}
         */
        $scope.dirs = [];

        /**
         * Lista plików obecnie przeglądanego katalogu
         * @type {Array}
         */
        $scope.files = [];

        /**
         * Filtr typów plików (false = wyłączony)
         * @type {boolean|string}
         */
        $scope.fileTypeFilter = false;

        /**
         * Lista typów plików wraz z typami mime
         * @type {{images: Array, audio: Array, video: Array, archive: Array}}
         */
        $scope.fileTypes = {
            images: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/png'],
            audio: ['audio/mpeg', 'audio/x-ms-wma', 'audio/vnd.rn-realaudio', 'audio/x-wav'],
            video: ['video/mpeg', 'video/mp4', 'video/quicktime', 'video/x-ms-wmv'],
            archive: ['application/zip']
        };

        $http.get('/data/directory.json')
            .success(function(data){
                $scope.dirs = data.dirs;
                $scope.files = data.files;
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