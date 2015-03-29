var pingRendering = {

    class: 'ping-rendering',
    currentColor: 0,
    colors: [ "black", "red", "green", "white", "purple", "yellow"],

    reset: function() {

        $('.request-rendering').off();
    },

    start: function() {

        engine.currentTransport.listen('colorChanged', function(data) {

            $('.ping-block span').text(timer.end('timeout'));
            $('.response-rendering').css('background-color', data);
        });

        $('.request-rendering').click(function() {

            timer.start('timeout');
            pingRendering.currentColor++;
            pingRendering.currentColor %= pingRendering.colors.length;
            var color = pingRendering.colors[pingRendering.currentColor];
            engine.currentTransport.emit('colorChanged', color);
            $('.request-rendering').css('background-color', color);
        });
    }
};

engine.tests['ping-rendering'] = pingRendering;