angular.module('filemanager')
    .factory('FileObj', ['FileTypes', function(FileTypes){
        function FileObj(data) {
            this.image = false;
            this.setData(data);
        }

        FileObj.prototype = {
            setData: function(data){
                angular.extend(this, data);

                this.image = (FileTypes.images.indexOf(this.mime) > -1) ? true : false;
            },
            isImage: function(){
                return this.image;
            }
        }

        return FileObj;
    }])
    .factory('DirObj', function(){
        function DirObj(data) {
            this.setData(data);
        }

        DirObj.prototype = {
            setData: function(data){
                angular.extend(this, data);
            }
        }

        return DirObj;
    })
;
