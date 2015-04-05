var httpTransport = {

    port: 8889,
    ip: null,
    xmlHttp: undefined,
    listeners: [],
    stopped: false,

    get: function() {

        httpTransport.xmlHttp = new XMLHttpRequest();
        httpTransport.xmlHttp.open('GET', '', true);
        httpTransport.xmlHttp.onreadystatechange = httpTransport.receive
    },

    receive: function() {

        if (httpTransport.stopped)
            return;
        var data = JSON.parse(httpTransport.xmlHttp.responseText);
        var f = httpTransport.listeners[data.event];
        if(f) {
            f(data);
        }
        httpTransport.get();
    },

    reset: function() {

        httpTransport.stopped = true;
    },

    start: function(ip) {

        httpTransport.ip = ip;
        httpTransport.get();
    },

    emit: function(event, data) {

        var xml = new XMLHttpRequest();
        xml.open('GET', JSON.stringify({
            event: event,
            data: data
        }), true);
        xml.send();
    },

    listen: function(event, listener) {

        httpTransport.listeners[event] = listener;
    },

    disconnect: function() {

    }
};