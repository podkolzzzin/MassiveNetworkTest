var timer = {

    timers: [],

    start: function(name) {

        timer.timers[name] = new Date();
    },

    time: function(name) {

        return (new Date()).getTime() - timer.timers[name].getTime();
    },

    finish: function(name) {

        var r = timer.time(name);
        delete timer.timers[name];
        return r;
    }
};