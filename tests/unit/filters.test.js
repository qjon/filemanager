describe('filters.js', function () {
    beforeEach(module('filemanager'));

    describe('fileMimeType:', function () {
        var fileMimeFilter,
            filesList = [
                {
                    "id": 1,
                    "name": "Dino 1",
                    "src": "/data/images/IMG_5549.JPG",
                    "mime": "image/jpg"
                },
                {
                    "id": 10,
                    "name": "Dino 2 - PDF dokument",
                    "src": "/data/pdf/some.pdf",
                    "mime": "application/pdf"
                },
                {
                    "id": 11,
                    "name": "Dino 3",
                    "src": "/data/images/IMG_5559.JPG",
                    "mime": "image/jpg"
                },
                {
                    "id": 2,
                    "name": "Dino 4",
                    "src": "/data/images/IMG_5565.JPG",
                    "mime": "image/jpg"
                },
                {
                    "id": 4,
                    "name": "Dino 5",
                    "src": "/data/images/IMG_5567.JPG",
                    "mime": "image/jpg"
                }
            ],
            imagesMimes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/png'],
            pdfMimes = ['application/pdf'],
            $filter
        ;

        beforeEach(inject(function($injector){
            $filter = $injector.get('$filter');
            fileMimeFilter = $filter('fileMime');
        }));

        it('images mimes should return 4 items', function () {
            expect(fileMimeFilter(filesList, imagesMimes).length).toBe(4);
        });

        it('pdf mimes should return 1 item', function () {
            expect(fileMimeFilter(filesList, pdfMimes).length).toBe(1);
        });

        it('empty mime list should return 5 items', function () {
            expect(fileMimeFilter(filesList, []).length).toBe(5);
        });

        it('undefined mime list should return 5 items', function () {
            expect(fileMimeFilter(filesList).length).toBe(5);
        });

    });
});