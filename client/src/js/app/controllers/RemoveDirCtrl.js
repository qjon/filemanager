'use strict';
angular.module('filemanager')
    .controller('RemoveDirCtrl', ['$scope', '$state', 'DirStructure', function($scope, $state, DirStructure){

        $scope.removedDir = DirStructure.getSubDirById($state.params.removeDirId);

        $scope.folderName = $scope.removedDir.name;


        $scope.goBack = function(){
            $state.go('main', {dirId: $state.params.dirId});
        }

        $scope.removeFolder = function(){
            if($scope.folderName !== '')
            {
                DirStructure.removeFolder($scope.removedDir, $scope.goBack);
            }
        }
    }])
;