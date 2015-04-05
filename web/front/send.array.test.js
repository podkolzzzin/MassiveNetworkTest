var sendArray = {

    class: 'send-array',

    step: 10000,
    numTests: 20,
    allTests: 20,
    major: undefined,
    minor: undefined,
    info: [0],
    statistics: [[]],
    array: undefined,

    reset: function() {

        sendArray.statistics = [[]];
        sendArray.info = [0];
        $('.start-sending').off();
        $('.progress-bar').text('').removeClass('hidden');
        $('.chart').addClass('hidden');
    },

    avg: function(data) {

        var r = 0;
        $.each(data, function() {
            r += this;
        });
        return r / data.length;
    },

    analyze: function() {

        var r = [];
        $.each(sendArray.statistics, function() {
            r.push(sendArray.avg(this));
        });
        return r;
    },

    start: function() {

        sendArray.reset();
        sendArray.major = new ProgressBar.Circle('.pb-major', {
            color: '#FCB03C',
            strokeWidth: 2,
            trailWidth: 1,
            duration: 1500
        });

        sendArray.minor = new ProgressBar.Circle('.pb-major', {
            color: '#EEE',
            strokeWidth: 5,
            trailWidth: 0,
            duration: 1500
        });

        $('.start-sending').click(function() {

            sendArray.sendArray();
        });

        engine.currentTransport.listen('data', function(response) {

            response.dataLength /= sendArray.step;
            var info = sendArray.info[response.dataLength - 1];
            var time = timer.finish('data' + response.dataLength);
            sendArray.statistics[response.dataLength - 1].push(time);

            sendArray.minor.animate(info / sendArray.numTests, {
                duration: time
            });

            sendArray.major.animate(sendArray.info.length / sendArray.allTests + info / (sendArray.allTests *  sendArray.numTests), {
                duration: time
            });



            if (info == sendArray.numTests) {
                delete  sendArray.array;
                if(sendArray.info.length == sendArray.allTests) {
                    sendArray.finished();
                    return;
                }
                sendArray.info.push(0);
                console.log(sendArray.avg(sendArray.statistics[response.dataLength - 1]));
                sendArray.statistics.push([]);
            }

            sendArray.sendArray();
        })
    },

    finished: function() {

        $('.chart').removeClass('hidden');
        $('.progress-bar').addClass('hidden');
        var ctx = $(".chart").get(0).getContext("2d");

        var chart = new Chart(ctx);
        var data = {
            labels: [],
            datasets: [
                {
                    label: "Size of sent array",
                    fillColor: "#d5d5d5",
                    strokeColor: "#000",
                    pointColor: "#f00",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#ff0",
                    pointHighlightStroke: "#000",
                    data: sendArray.analyze()
                }
            ]
        };
        for(var i = 0; i < sendArray.statistics.length; i++)
            data.labels.push((i + 1) * sendArray.step);

        chart.Line(data, {responsive: true});
    },

    genArray: function(length) {

        var r = new Array(length);
        for(var i = 0;i < length; i++)
            r[i] = i;
        return r;
    },

    sendArray: function() {

        if(!sendArray.array)
            sendArray.array = sendArray.genArray(sendArray.info.length * sendArray.step)
        timer.start('data' + sendArray.info.length);
        sendArray.info[sendArray.info.length - 1]++;
        engine.currentTransport.emit('data', sendArray.array);
        console.log("Array of ", sendArray.info.length * sendArray.step, "elements had been just sent.")
    }
};

engine.tests['send-array'] = sendArray;
