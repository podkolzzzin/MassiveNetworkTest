$(document).ready(function () {

    engine.start();
});

var engine = {

    currentTest: null,
    currentTransport: null,
    tests: [],
    transports: [],
    mouse: {

        x: 0,
        y: 0,

        relative: function(element) {

            return {
                x: engine.mouse.x - element.position().left,
                y: engine.mouse.y - element.position().top
            };
        },

        update: function(event) {

            engine.mouse.x = event.pageX;
            engine.mouse.y = event.pageY;
        }
    },

    start: function () {

        engine.updateCurrentTransport();

        $('.test-item').click(function () {

            engine.startTest($(this).data('test'))
        });

        $('.transport-item').click(function() {

            $('.transport.selected').removeClass('selected');
            $(this).addClass('selected');
            engine.updateCurrentTransport();
        })
    },

    startTest: function (test) {

        if(engine.currentTest) {
            engine.currentTest.reset();
            $('.' + engine.currentTest.class).addClass('hidden');
        }

        engine.currentTest = engine.tests[test];
        $('.' + test).removeClass('hidden');
        engine.tests[test].start();
    },

    updateCurrentTransport: function() {

        if (engine.currentTransport != null)
            engine.currentTransport.reset();
        engine.currentTransport = engine.transports[$('.transport-item.selected').data('transport')];
        engine.currentTransport.start(document.location.hostname);
    }
};