angular.module('filemanager')
    .service('FileTypes', function(){
        this.images = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/png'];
        this.audio = ['audio/mpeg', 'audio/x-ms-wma', 'audio/vnd.rn-realaudio', 'audio/x-wav'];
        this.video = ['video/mpeg', 'video/mp4', 'video/quicktime', 'video/x-ms-wmv'];
        this.archive = ['application/zip'];
    })
    .service('FileIcons', function(){
        this.imagesExtensions = ['aac', 'ai', 'aiff', 'avi', '_blank', 'bmp', 'c', 'cpp', 'css', 'dat', 'dmg', 'doc', 'dotx', 'dwg', 'dxf', 'eps', 'exe', 'flv', 'gif', 'h', 'hpp', 'html', 'ics', 'iso', 'java', 'jpg', 'js', 'key', 'less', 'mid', 'mp3', 'mp4', 'mpg', 'odf', 'ods', 'odt', 'otp', 'ots', 'ott', '_page', 'pdf', 'php', 'png', 'ppt', 'psd', 'py', 'qt', 'rar', 'rb', 'rtf', 'sass', 'scss', 'sql', 'tga', 'tgz', 'tiff', 'txt', 'wav', 'xls', 'xlsx', 'xml', 'yml', 'zip'];

        this.getIconPath = function(fileName){
            var ext = fileName.substr(_.lastIndexOf(fileName, '.') + 1);
            if(this.imagesExtensions.indexOf(ext) > -1)
            {
                return '/data/icons/' + ext + '.png';
            }
            else
            {
                return '/data/icons/_blank.png';
            }
        }
    })
;