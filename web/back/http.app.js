var http = require("http");

http.createServer(function(request, response) {

    response.write();
    response.end();
}).listen(8889);