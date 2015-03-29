var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(8888);

io.on("connection", function(s) {

    console.log("connect");
    s.on("move", function (data) {

        data.id = this.id;
        this.broadcast.emit("move", data);
    });

    s.on("disconnect", function() {

        this.broadcast.emit("disconnection", this.id);
    });

    s.on("colorChanged", function (data) {

        this.emit("colorChanged", data);
    });

    s.on("data", function(data) {

        this.emit("data", {dataLength: data.length});
    })
});

console.log("server started");
