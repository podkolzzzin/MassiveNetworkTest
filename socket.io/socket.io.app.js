var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(8888);


io.on("connection", function(s) {

    s.on("move", function (data) {

        data.id = this.id;
        this.broadcast.emit("move", data);
    });

});

console.log("server started");
