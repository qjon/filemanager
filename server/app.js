var connect = require('connect');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
var database = require('./database');
var q = require('q');

database.connect();


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
/**
 * Client servis
 */
app.use("/", express.static(__dirname + '/../client/'));

/**
 * Get dir structure
 */
app.post('/api/directory', function(req, res) {
    var dirId = req.body.dir_id;
    q.all([database.getSubFolders(dirId), database.getFilesFromFolder(dirId), database.getFolder(dirId)]).then(function(data){
        var dir = data[2];
        dir.dirs = data[0];
        dir.files = data[1];
        res.send(dir);
    });
});
app.post('/api/directory/add', function(req, res) {
    var parentId = req.body.dir_id, name = req.body.name;
    q.all([database.addSubFolder(parentId, name)]).then(function(data){
        res.send({id: data[0].insertId, parent_id: parentId, name: name});
    });
});


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});