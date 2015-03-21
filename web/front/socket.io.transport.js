var socketIoTransport = {

    io: null,
    port: 8888,

    reset: function() {

        if (socketIoTransport.io == null)
            return;
        socketIoTransport.disconnect();
    },

    start: function(ip) {

        socketIoTransport.io = io(ip + ":" + socketIoTransport.port);
    },

    emit: function(event, data) {

        socketIoTransport.io.emit(event, data)
    },

    listen: function(event, listener) {

        socketIoTransport.io.on(event, listener);
    },

    disconnect: function() {

        io.disconnect();
    }
};

engine.transports['socket.io'] = socketIoTransport;