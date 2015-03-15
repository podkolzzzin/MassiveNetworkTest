var followTest = {

    context: undefined,
    canvas: undefined,
    class: 'follow-cursor',
    current: undefined,
    dragMove: false,
    circles: [],

    reset: function () {

        $('.field canvas').off();
    },

    start: function () {

        engine.currentTransport.listen('move', function (data) {

            if (!followTest.circles[data.id])
                followTest.circles[data.id] = {id: data.id};
            followTest.circles[data.id].position = {x: data.x, y: data.y};
            followTest.render();
        });

        engine.currentTransport.listen('disconnection', function (data) {

            delete followTest.circles[data];
            followTest.render();
        });

        followTest.canvas = $('.field canvas');
        followTest.context = followTest.canvas.get(0).getContext('2d');
        followTest.current = {
            position: {x: 0, y: 0},
            id: 'current'
        };
        followTest.circles[followTest.current.id] = followTest.current;

        followTest.canvas.bind("mousedown mouseup", function (e) {

            followTest.dragMove = e.type == 'mousedown';
            followTest.canvas.css('cursor', followTest.dragMove ? 'none' : 'inherit');
        });

        followTest.canvas.bind('mouseleave', function () {

            followTest.dragMove = false;
            followTest.canvas.css('cursor', 'inherit');
        });

        followTest.canvas.bind('mousemove', function (e) {

            engine.mouse.update(e);
            if (!followTest.dragMove)
                return;

            followTest.current.position = engine.mouse.relative($(this));
            engine.currentTransport.emit('move', followTest.current.position);
            followTest.render();
        });

        followTest.render();
    },

    render: function () {

        followTest.context.fillStyle = "#000";
        followTest.context.fillRect(0, 0, followTest.canvas.width(), followTest.canvas.height());
        for (var key in followTest.circles) {

            var circle = followTest.circles[key];
            followTest.context.beginPath();
            followTest.context.arc(circle.position.x, circle.position.y, 10, 0, Math.PI * 2);
            followTest.context.stroke();
            followTest.context.fillStyle = (circle == followTest.current) ? "#FF0000" : "#D5D5D5";
            followTest.context.fill();
        }
    }
};

engine.tests['follow-cursor'] = followTest;