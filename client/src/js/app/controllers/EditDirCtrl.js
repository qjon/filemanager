'use strict';
angular.module('filemanager')
    .controller('EditDirCtrl', ['$scope', '$state', '$timeout', 'DirStructure', function($scope, $state, $timeout, DirStructure){

        $scope.changedDir = DirStructure.getSubDirById($state.params.changeDirId);

        $scope.folderName = $scope.changedDir.name;

        $scope.orgName = $scope.folderName;

        $timeout(function(){
            angular.element('input[name="folder_name"]').focus();
        }, 200);


        $scope.goBack = function(){
            $state.go('main', {dirId: $state.params.dirId});
        }

        $scope.saveFolder = function(){
            if($scope.folderName !== '')
            {
                DirStructure.saveFolder($scope.changedDir, $scope.folderName, $scope.goBack);
            }
        }
    }])
;