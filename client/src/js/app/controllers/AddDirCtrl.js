'use strict';
angular.module('filemanager')
    .controller('AddDirCtrl', ['$scope', '$state', 'LastState', 'DirStructure', function($scope, $state, lastState, DirStructure){
        $scope.folderName = '';

        $scope.goBack = function(){
            lastState.goBack();
        }

        $scope.addFolder = function(){
            if($scope.folderName !== '')
            {
                DirStructure.addFolder($scope.folderName, $scope.goBack);
            }
        }
    }])
;