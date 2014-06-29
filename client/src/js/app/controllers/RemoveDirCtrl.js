'use strict';
angular.module('filemanager')
    .controller('RemoveDirCtrl', ['$scope', '$state', 'DirStructure', function($scope, $state, DirStructure){

        $scope.removedDir = DirStructure.getSubDirById($state.params.removeDirId);

        $scope.folderName = $scope.removedDir.name;

        $scope.error = '';

        $scope.showAlert = function(responseData){
            $scope.error = responseData.message;
        }

        $scope.goBack = function(){
            $state.go('main', {dirId: $state.params.dirId});
        }

        $scope.removeFolder = function(){
            if($scope.folderName !== '')
            {
                DirStructure.removeFolder($scope.removedDir, $scope.goBack, $scope.showAlert);
            }
        }
    }])
;