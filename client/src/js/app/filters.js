angular.module('filemanager')
    .filter('fileMime', function(){
        return function(filesList, fileMimeTypesList){
            var files = [];
            if(typeof fileMimeTypesList === 'undefined' || fileMimeTypesList.length === 0)
            {
                return filesList;
            }

            filesList.forEach(function(file){
                if(fileMimeTypesList.indexOf(file.mime) > -1)
                {
                    files.push(file);
                }
            });

            return files;
        };
    })
;