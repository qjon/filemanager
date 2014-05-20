describe('services.js', function () {
    beforeEach(module('filemanager'));

    describe('FileIconsService', function () {
        var fileIcons;

        beforeEach(inject(function($injector){
            fileIcons = $injector.get('FileIcons');
        }));


        it('should return /data/icons/_blank.png for file name equal moj.jar', function () {
            expect(fileIcons.getIconPath('moj.jar')).toEqual('/data/icons/_blank.png');
        });

        it('should return /data/icons/pdf.png for file name equal moj.pdf', function () {
            expect(fileIcons.getIconPath('moj.pdf')).toEqual('/data/icons/pdf.png');
        });

    });


    describe('LastStateService', function () {
        var lastState, state = {name: "some_state"}, params = {id: 5, name: 'two'}, $state;
        beforeEach(inject(function($injector, _$state_){
            lastState = $injector.get('LastState');
            $state = _$state_;
        }));

        it('should set state and params', function () {
            lastState.setLastState(state, params);
            expect(lastState.state).toEqual(state);
            expect(lastState.params).toEqual(params);
        });

        it('should go state', function () {
            lastState.setLastState(state, params);
            spyOn($state, 'go');
            lastState.goBack();
            expect($state.go).toHaveBeenCalledWith(state.name, params);
        });


        it('should go to default state', function () {
            spyOn($state, 'go');
            lastState.goBack();
            expect($state.go).toHaveBeenCalledWith('main', {dirId: 0});
        });
    });
});