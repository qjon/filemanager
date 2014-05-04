describe('services.js', function () {
    beforeEach(module('filemanager'));

    describe('FileIconsService', function () {
        var fileIcons;

        beforeEach(inject(function($injector){
            fileIcons = $injector.get('FileIcons');
        }));


        it('should return /data/icons/_blank.png for moj.jar file name', function () {
            expect(fileIcons.getIconPath('moj.jar')).toEqual('/data/icons/_blank.png');
        });

        it('should return /data/icons/pdf.png for moj.jar file name', function () {
            expect(fileIcons.getIconPath('moj.pdf')).toEqual('/data/icons/pdf.png');
        });

    });
});