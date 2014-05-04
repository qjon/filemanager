angular.module('filemanager')
    .service('FileTypes', function(){
        this.images = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/png'];
        this.audio = ['audio/mpeg', 'audio/x-ms-wma', 'audio/vnd.rn-realaudio', 'audio/x-wav'];
        this.video = ['video/mpeg', 'video/mp4', 'video/quicktime', 'video/x-ms-wmv'];
        this.archive = ['application/zip'];
    })
    .service('FileIconClasses', function(){
        this.classes = {
            pdf: 'fa-file-text'
        };

        this.getClass = function(fileName){
            var ext = fileName.substr(_.lastIndexOf(fileName, '.') + 1);
            return this.classes[ext] || 'fa-file';
        }
    })
;