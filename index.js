var http = require('http');
var fs = require('fs');
//2.
var server = http.createServer(function (req, resp) {
	fs.readFile("index.html", function (error, pgResp) {
		if (error) {
			resp.writeHead(404);
			resp.write('Contents you are looking are Not Found');
		} else {
			resp.writeHead(200, { 'Content-Type': 'text/html' });
			resp.write(pgResp);
		}
			
		resp.end();
	});
});
server.listen(3000);
 
console.log('Server Started listening on 5050');