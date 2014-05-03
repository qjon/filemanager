var connect = require('connect');
connect.createServer(
    connect.static(__dirname + '/../client/')
).listen(3000);