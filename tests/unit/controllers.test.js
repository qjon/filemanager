describe('controllers.js', function () {

    beforeEach(module('filemanager'));

    describe('MainCtrl:', function () {
        var $scope, $rootScope, createMainCtrl, $state, DirStructure, $httpBackend;

        beforeEach(inject(function($injector){
            var $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $state = $injector.get('$state');
            DirStructure = $injector.get('DirStructure');
            $httpBackend = $injector.get('$httpBackend');

            createMainCtrl = function(){
                return $controller('MainCtrl', {
                    '$scope': $scope,
                    '$http': $injector.get('$http')
                })
            }
        }));

        beforeEach(function(){
            $httpBackend.expectPOST('/api/directory', {dir_id: 0})
                .respond({"id": 0, "name": "Home", "parent_id": 0, "dirs":[{"id":1,"name":"Katalog"},{"id":2,"name":"Katalog o bardzo długiej nazwie"}],"files":[{"id":1,"name":"Dino 1","src":"/data/images/IMG_5549.JPG","mime":"image/jpg"},{"id":10,"name":"Dino 2","src":"/data/images/IMG_5554.JPG","mime":"image/jpg"},{"id":11,"name":"Dino 3","src":"/data/images/IMG_5559.JPG","mime":"image/jpg"},{"id":2,"name":"Dino 4","src":"/data/images/IMG_5565.JPG","mime":"image/jpg"},{"id":4,"name":"Dino 5","src":"/data/images/IMG_5567.JPG","mime":"image/jpg"},{"id":7,"name":"Dino 6","src":"/data/images/IMG_5568.JPG","mime":"image/jpg"},{"id":8,"name":"Dino 7","src":"/data/images/IMG_5573.JPG","mime":"image/jpg"},{"id":21,"name":"Dino 8","src":"/data/images/IMG_5583.JPG","mime":"image/jpg"},{"id":22,"name":"Dino 9","src":"/data/images/IMG_5584.JPG","mime":"image/jpg"},{"id":34,"name":"Dino 10","src":"/data/images/IMG_5585.JPG","mime":"image/jpg"},{"id":112,"name":"Dino 11","src":"/data/images/IMG_5588.JPG","mime":"image/jpg"},{"id":100,"name":"Dino 12","src":"/data/images/IMG_5590.JPG","mime":"image/jpg"},{"id":50,"name":"Przykładowy PDF","src":"/data/pdf/przykladowy_pdf.pdf","mime":"application/pdf"}]})
            ;
            DirStructure.load(0);
            $httpBackend.flush();

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

            describe('showDirSection:', function () {
                it('should call $state.go', function () {
                    spyOn($state, 'go');
                    $scope.showDirSection();
                    expect($state.go).toHaveBeenCalledWith('main.add')
                });
            });

            describe('goToFolder:', function () {
                it('should call $state.go with dirId equal 0', function () {
                    spyOn($state, 'go');
                    $scope.goToFolder(false);
                    expect($state.go).toHaveBeenCalledWith('main', {dirId: 0});
                });
                it('should call $state.go with dirId equal 1', function () {
                    spyOn($state, 'go');
                    $scope.goToFolder($scope.currentDir.dirs[0]);
                    expect($state.go).toHaveBeenCalledWith('main', {dirId: 1});
                });
            });

            describe('goFolderUp:', function () {
                it('should call $state.go with dirId equal 0', function () {
                    spyOn($state, 'go');
                    $scope.goFolderUp();
                    expect($state.go).toHaveBeenCalledWith('main', {dirId: 0});
                });
            });
        });

    });


    describe('AddDirCtrl:', function () {
        var $scope, $rootScope, createMainCtrl, $state, DirStructure, $httpBackend, LastState;

        beforeEach(inject(function($injector){
            var $controller = $injector.get('$controller');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $state = $injector.get('$state');
            DirStructure = $injector.get('DirStructure');
            $httpBackend = $injector.get('$httpBackend');
            LastState = $injector.get('LastState');

            createMainCtrl = function(){
                return $controller('AddDirCtrl', {
                    '$scope': $scope,
                    '$state': $state,
                    '$timeout': $injector.get('$timeout'),
                    'LastState': LastState,
                    'DirStructure': DirStructure
                })
            }

            createMainCtrl();
        }));

        describe('functions:', function () {
            it('should fire go back function from LasState object', function () {
                spyOn(LastState, 'goBack');
                $scope.goBack();
                expect(LastState.goBack).toHaveBeenCalled();
            });

            it('should fire addFolder with name "New folder"', function () {
                spyOn(DirStructure, 'addFolder');
                $scope.folderName = 'New folder';
                $scope.addFolder();
                expect(DirStructure.addFolder).toHaveBeenCalledWith('New folder', $scope.goBack);
            });

            it('should not fire addFolder if new folder name is empty', function () {
                spyOn(DirStructure, 'addFolder');
                $scope.addFolder();
                expect(DirStructure.addFolder).not.toHaveBeenCalled();
            });
        });
    });
});