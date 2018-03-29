/**
 * http://127.0.0.1:1111/?{"nombre":"AAFR"}
 * No jala
 */


var http = require('http');

var port = "1111";

http.createServer(function(req, res) {
    if (req.method == 'GET') {
        var jsonString = '';

        req.on('data', function(data) {
            jsonString += data;
        });

        req.on('end', function() {
            console.log(JSON.parse(jsonString));
        });
    }
}).listen(port);