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
            it('dirs should be empty array', function () {
                expect($scope.dirs.length).toBe(0);
            });

            it('files should be empty array', function () {
                expect($scope.files.length).toBe(0);
            });

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

                it('use undefined filter name should clear filter', function () {
                    $scope.setFilterType('photoshop');
                    expect($scope.fileTypeFilter).toBeFalsy();
                });
            });
        });

    });
});