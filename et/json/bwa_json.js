/*https://gist.github.com/Jalalhejazi/5435385*/
/*
	Response header info:
	Access-Control-Allow-Origin:*
	Content-Type:text/json
	X-Powered-By:nodejs
*/

var http = require('http');
var fs = require('fs');
var port = "1111";

http.createServer(function(request, response) {

    response.writeHead(200, {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'X-Powered-By': 'nodejs'
    });


    fs.readFile('data.json', function(err, content) {
        response.write(content);
        response.end();
    });

}).listen(port);

console.log("Listening on port " + port);