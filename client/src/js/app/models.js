angular.module('filemanager')
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
