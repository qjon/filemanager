describe('services.js', function () {
    beforeEach(module('filemanager'));

    describe('FileIconClassesService', function () {
        var fileIconClassService;

        beforeEach(inject(function($injector){
            fileIconClassService = $injector.get('FileIconClasses');
        }));


        it('should return fa-file-text for moj.pdf file name', function () {
            expect(fileIconClassService.getClass('moj.pdf')).toEqual('fa-file-text');
        });

        it('should return fa-file for to.moj.exe file name', function () {
            expect(fileIconClassService.getClass('to.moj.exe')).toEqual('fa-file');
        });
    });
});