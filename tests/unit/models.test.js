describe('models.js', function () {
    var FileObj, DirObj;
    beforeEach(module('filemanager'));

    beforeEach(inject(function($injector){
        FileObj = $injector.get('FileObj');
        DirObj = $injector.get('DirObj');
    }));

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
                var fileObj = new FileObj({id: 7, name: 'Nowy plik'});
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