describe('controllers.js', function () {

    beforeEach(module('filemanager'));

    describe('MainCtrl:', function () {
        var $scope, $rootScope, createMainCtrl;

        beforeEach(inject(function($injector){
            var $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();

            createMainCtrl = function(){
                return $controller('MainCtrl', {
                    '$scope': $scope,
                    '$http': $injector.get('$http')
                })
            }
        }));

        beforeEach(function(){
            createMainCtrl();
        });

        describe('primary values', function () {
            it('default fileTypeFilter should have been false', function () {
                expect($scope.fileTypeFilter).toBeFalsy();
            });
        });


        describe('functions:', function () {
            describe('setFilterType:', function () {
                it('should set type images', function () {
                    $scope.setFilterType('images');
                    expect($scope.fileTypeFilter).toEqual('images');
                });

                it('should clear filter', function () {
                    $scope.setFilterType();
                    expect($scope.fileTypeFilter).toBeFalsy();
                });

                it('use unknown filter name should clear filter', function () {
                    $scope.setFilterType('photoshop');
                    expect($scope.fileTypeFilter).toBeFalsy();
                });
            });
//
//            describe('showDirSection:', function () {
//                beforeEach(function(){
//                    $scope.showDirSection();
//                });
//
//                it('should change isViewerSectionVisible to false', function () {
//                    expect($scope.isViewerSectionVisible).toBeFalsy();
//                });
//
//                it('should change isDirSectionVisible to true', function () {
//                    expect($scope.isDirSectionVisible).toBeTruthy();
//                });
//            });
//
//            describe('showViewerSection:', function () {
//                beforeEach(function(){
//                    $scope.showViewerSection();
//                });
//
//                it('should change isViewerSectionVisible to true', function () {
//                    expect($scope.isViewerSectionVisible).toBeTruthy();
//                });
//
//                it('should change isDirSectionVisible to false', function () {
//                    expect($scope.isDirSectionVisible).toBeFalsy();
//                });
//
//            });



        });

    });
});