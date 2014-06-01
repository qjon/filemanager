'use strict';
var fm = angular.module('fm', ['filemanager', 'ui.router', 'ngAnimate']);

fm.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.when('', '/dir/0');


    $stateProvider
        .state('main', {
            url: '/dir/:dirId',
            templateUrl: '/templates/main.html',
            controller: 'MainCtrl',
            resolve: {
                dir: ['DirStructure', '$stateParams', function(DirStructure, $stateParams){
                    return DirStructure.load($stateParams.dirId)
                }]
            }
        })
        .state('main.add', {
            url: '/add',
            templateUrl: '/templates/dir_add.html',
            controller: 'AddDirCtrl'
        })
        .state('main.edit', {
            url: '/edit',
            templateUrl: '/templates/dir_edit.html',
            controller: 'EditDirCtrl'
        })
    ;
}]);

fm.run(['$rootScope', 'LastState', '$state', function ($rootScope, lastState) {
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
        lastState.setLastState(from, fromParams);
    });
}]);

