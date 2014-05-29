var mysql = require('mysql');
var q = require('q');

module.exports = {
    connection: false,
    connect: function(){
        this.connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'filemanager',
            password : 'filemanager'
        });

        this.createTables();
    },
    createTables: function(){
        var that = this;
        that.connection.query('USE filemanager', function (err) {
            if (err) throw err;
            that.connection.query('CREATE TABLE IF NOT EXISTS dirs('
                + 'id INT NOT NULL AUTO_INCREMENT,'
                + 'parent_id INT,'
                + 'PRIMARY KEY(id),'
                + 'name VARCHAR(255)'
                +  ')', function (err) {
                if (err) throw err;
                that.connection.query('CREATE TABLE IF NOT EXISTS files('
                    + 'id INT NOT NULL AUTO_INCREMENT,'
                    + 'PRIMARY KEY(id),'
                    + 'dir_id INT,'
                    + 'name VARCHAR(255),'
                    + 'mime VARCHAR(100) NOT NULL,'
                    + 'src VARCHAR(255) NOT NULL'
                    +  ')', function (err, result) {
                    if (err) throw err;
                    if(result.warningCount === 0)
                    {
                        that.insertDefaultValues();
                    }
                });
            });


        });
    },
    insertDefaultValues: function(){
        var dirs = [{name: 'Pierwszy Katalog',"parent_id": 0}, {name: 'Drugi folder', "parent_id": 0}];
        var files = [
            {
                "dir_id": 0,
                "name": "Dino 7",
                "src": "/data/images/IMG_5573.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 8",
                "src": "/data/images/IMG_5583.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 1",
                "src": "/data/images/IMG_5549.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 2",
                "src": "/data/images/IMG_5554.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 3",
                "src": "/data/images/IMG_5559.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 4",
                "src": "/data/images/IMG_5565.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 5",
                "src": "/data/images/IMG_5567.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 6",
                "src": "/data/images/IMG_5568.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 11",
                "src": "/data/images/IMG_5588.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 12",
                "src": "/data/images/IMG_5590.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 9",
                "src": "/data/images/IMG_5584.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Dino 10",
                "src": "/data/images/IMG_5585.JPG",
                "mime": "image/jpg"
            },
            {
                "dir_id": 0,
                "name": "Przykładowy PDF",
                "src": "/data/pdf/przykladowy_pdf.pdf",
                "mime": "application/pdf"
            }
        ];

        var that = this;

        dirs.forEach(function(dir){
            that.connection.query('INSERT INTO dirs SET ?', dir, function(err, result){
            });
        });
        files.forEach(function(file){
            that.connection.query('INSERT INTO files SET ?', file, function(err, result){
            });
        });
    },
    addSubFolder: function(parentId, name){
        var defer = q.defer();
        this.connection.query('INSERT INTO dirs SET ?', {name: name, parent_id: parentId}, function(err, result){
            defer.resolve(result);
        });
        return defer.promise;
    },
    /**
     * Get list of folders
     * @param dirId
     * @returns {Promise.promise|*}
     */
    getSubFolders: function(dirId){
        var defer = q.defer();
        var query = "SELECT * FROM dirs WHERE parent_id = " + dirId;
        this.connection.query(query, function(err, rows, fields){
            defer.resolve(rows);
        });

        return defer.promise;
    },

    /**
     * Get folder data
     * @param dirId
     * @returns {Promise.promise|*}
     */
    getFolder: function(dirId){
        if(dirId == 0)
        {
            return {id: 0, parent_id: null, name: 'Home'};
        }
        var defer = q.defer();
        var query = "SELECT * FROM dirs WHERE id = " + dirId;
        this.connection.query(query, function(err, rows, fields){
            defer.resolve(rows[0]);
        });

        return defer.promise;
    },



    /**
     * Get list of files in folder
     * @param dirId
     * @returns {Promise.promise|*}
     */
    getFilesFromFolder: function(dirId){
        var defer = q.defer();
        var query = "SELECT * FROM files WHERE dir_id = " + dirId;
        this.connection.query(query, function(err, rows, fields){
            defer.resolve(rows);
        });

        return defer.promise;
    }
}