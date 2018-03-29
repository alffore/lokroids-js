/**
 * http://127.0.0.1:1111/?{"nombre":"AAFR"}
 * No jala
 */


var http = require('http');

var port = "1111";

http.createServer(function handler(req, res) {
    var POST = {};

    res.writeHead(200);

    if (req.method == 'GET') {
        req.on('data', function(data) {
            data = data.toString();
            console.log(data);

            data = data.split('&');
            for (var i = 0; i < data.length; i++) {
                var _data = data[i].split("=");
                POST[_data[0]] = _data[1];
            }
            console.log(POST);
        });
        res.end();
    }
}).listen(port);