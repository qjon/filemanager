'use strict';
angular.module('filemanager')
    .service('DirStructure', ['$q', '$http', 'DirObj', 'FileObj', function($q, $http, DirObj, FileObj){
        /**
         * Current dir
         * @type {DirObj}
         */
        this.currentDir = false;


        this.addFolder = function(name, callbackSuccess, callbackError){
            var that = this;
            $http.post('/api/directory/add', {'dir_id': this.currentDir.id, name: name})
                .success(function(data){
                    var dir = new DirObj(data);
                    that.currentDir.dirs.push(dir);
                    if(callbackSuccess)
                    {
                        callbackSuccess(new DirObj(data));
                    }
                })
                .error(function(data){
                    if(callbackError)
                    {
                        callbackError(data);
                    }
                })
            ;
        }

        this.saveFolder = function(name, callbackSuccess, callbackError){
            var that = this;
            $http.post('/api/directory/save', {'dir_id': this.currentDir.id, name: name})
                .success(function(){
                    that.name = name;
                    if(callbackSuccess)
                    {
                        callbackSuccess(that);
                    }
                })
                .error(function(data){
                    if(callbackError)
                    {
                        callbackError(data);
                    }
                })
            ;
        }



        this.load = function(dirId){
            var defer = $q.defer(), that = this;

            if(this.currentDir !== false && parseInt(dirId, 10) === this.currentDir.id)
            {
                return this;
            }

            $http.post('/api/directory', {'dir_id': dirId})
                .success(function(data){
                    var currentDir = new DirObj(data);

                    currentDir.parentId = data['parent_id'];
                    currentDir.dirs = [];
                    currentDir.files = [];

                    data.dirs.forEach(function(dirData){
                        currentDir.dirs.push(new DirObj(dirData));
                    });

                    data.files.forEach(function(fileData){
                        currentDir.files.push(new FileObj(fileData));
                    });

                    that.currentDir = currentDir;

                    defer.resolve(that);
                })
            ;

            return defer.promise;
        }
    }])
    .factory('FileObj', ['FileTypes', 'FileIcons', function(FileTypes, FileIcons){
        function FileObj(data) {
            this.image = false;
            this.icon = false;
            this.setData(data);
        }

        FileObj.prototype = {
            setData: function(data){
                angular.extend(this, data);

                this.image = (FileTypes.images.indexOf(this.mime) > -1) ? true : false;
                if(!this.image)
                {
                    this.icon = FileIcons.getIconPath(this.src);
                }
            },
            isImage: function(){
                return this.image;
            }
        }

        return FileObj;
    }])
    .factory('DirObj', function(){
        function DirObj(data) {
            this.dirs = [];
            this.files = [];

            this.setData(data);
        }

        DirObj.prototype = {
            setData: function(data){
                angular.extend(this, data);
            },
            getSubDir: function(id){
                return _.find(this.dirs, {id: id});
            }
        }

        return DirObj;
    })
;
