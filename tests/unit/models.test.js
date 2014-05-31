describe('models.js', function () {
    var FileObj, DirObj, DirStructure;
    beforeEach(module('filemanager'));

    beforeEach(inject(function($injector){
        FileObj = $injector.get('FileObj');
        DirObj = $injector.get('DirObj');
        DirStructure = $injector.get('DirStructure');
    }));

    describe('DirsStructure', function () {
        var $httpBackend;
        beforeEach(inject(function($injector){
            $httpBackend = $injector.get('$httpBackend');
            $httpBackend.expectPOST('/api/directory', {dir_id: 0})
                .respond({"id": 0, "name": "Home", "parent_id": 0, "dirs":[{"id":1,"name":"Katalog"},{"id":2,"name":"Katalog o bardzo długiej nazwie"}],"files":[{"id":1,"name":"Dino 1","src":"/data/images/IMG_5549.JPG","mime":"image/jpg"},{"id":10,"name":"Dino 2","src":"/data/images/IMG_5554.JPG","mime":"image/jpg"},{"id":11,"name":"Dino 3","src":"/data/images/IMG_5559.JPG","mime":"image/jpg"},{"id":2,"name":"Dino 4","src":"/data/images/IMG_5565.JPG","mime":"image/jpg"},{"id":4,"name":"Dino 5","src":"/data/images/IMG_5567.JPG","mime":"image/jpg"},{"id":7,"name":"Dino 6","src":"/data/images/IMG_5568.JPG","mime":"image/jpg"},{"id":8,"name":"Dino 7","src":"/data/images/IMG_5573.JPG","mime":"image/jpg"},{"id":21,"name":"Dino 8","src":"/data/images/IMG_5583.JPG","mime":"image/jpg"},{"id":22,"name":"Dino 9","src":"/data/images/IMG_5584.JPG","mime":"image/jpg"},{"id":34,"name":"Dino 10","src":"/data/images/IMG_5585.JPG","mime":"image/jpg"},{"id":112,"name":"Dino 11","src":"/data/images/IMG_5588.JPG","mime":"image/jpg"},{"id":100,"name":"Dino 12","src":"/data/images/IMG_5590.JPG","mime":"image/jpg"},{"id":50,"name":"Przykładowy PDF","src":"/data/pdf/przykladowy_pdf.pdf","mime":"application/pdf"}]})
            ;
            DirStructure.load(0);
            $httpBackend.flush();
        }));


        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should load two dirs', function () {
            expect(DirStructure.currentDir.dirs.length).toBe(2);
        });


        it('should add new dir', function () {
            $httpBackend.expectPOST('/api/directory/add', {dir_id: 0, name: 'New folder'})
                .respond({"id":10,"name":"New folder", parent_id: 0})
            ;
            DirStructure.addFolder('New folder');
            $httpBackend.flush();
            expect(DirStructure.currentDir.dirs.length).toBe(3);
        });


        it('second load with the same ID should use data from memory', function () {
            DirStructure.load(0);
            expect(DirStructure.currentDir.dirs.length).toBe(2);
        });

    });

    describe('FileObj:', function () {
        var imageFileObj = {
            "id": 21,
            "name": "Dino 8",
            "src": "/data/images/IMG_5583.JPG",
            "mime": "image/jpg"
        }
        pdfFileObj = {
            "id": 50,
            "name": "Przykładowy PDF",
            "src": "/data/pdf/przykladowy_pdf.pdf",
            "mime": "application/pdf"
        }
        ;

        describe('functions:', function () {

            it('setData: should set data for new object correctly', function () {
                var fileObj = new FileObj({id: 7, name: 'Nowy plik', mime: 'image/jpg'});
                expect(fileObj.id).toBe(7);
                expect(fileObj.name).toEqual('Nowy plik');
            });

            it('isImage: should return true for mime: image/jpg', function () {
                var fileObj = new FileObj(imageFileObj);
                expect(fileObj.isImage()).toBeTruthy();
            });

            it('isImage: should return false for mime: application/pdf', function () {
                var fileObj = new FileObj(pdfFileObj);
                expect(fileObj.isImage()).toBeFalsy();
            });

        });
    });

    describe('DirObj:', function () {

        describe('functions:', function () {

            describe('setData:', function () {
                it('should set data for new object correctly', function () {
                    var dirObj = new DirObj({id: 11, name: 'Nowy katalog'});
                    expect(dirObj.id).toBe(11);
                    expect(dirObj.name).toEqual('Nowy katalog');
                });
            });

        });
    });
});