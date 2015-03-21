var pingRendering = {

    class: 'ping-rendering',
    currentColor: 0,
    start: undefined,
    colors: [ "black", "red", "green", "white", "purple", "yellow"],

    reset: function() {

        $('.request-rendering').off();
    },

    start: function() {

        engine.currentTransport.listen('colorChanged', function(data) {

            $('.ping-block span').text((new Date()).getTime() - pingRendering.start.getTime());
            $('.response-rendering').css('background-color', data);
        });

        $('.request-rendering').click(function() {

            pingRendering.start = new Date();
            pingRendering.currentColor++;
            pingRendering.currentColor %= pingRendering.colors.length;
            var color = pingRendering.colors[pingRendering.currentColor];
            engine.currentTransport.emit('colorChanged', color);
            $('.request-rendering').css('background-color', color);
        });
    }
};

engine.tests['ping-rendering'] = pingRendering;