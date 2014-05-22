'use strict';
angular.module('filemanager')
    .controller('AddDirCtrl', ['$scope', '$state', '$timeout', 'LastState', 'DirStructure', function($scope, $state, $timeout, lastState, DirStructure){
        $scope.folderName = '';

        $timeout(function(){
            angular.element('input[name="folder_name"]').focus();
        }, 200);


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