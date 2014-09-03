var resizeLogsTable = function () {
    var freeSpace = $(window).height() - $("body").height();

    var current = $('#logs').height();

    var minHeight = $('#col-logbooks').height();

    $('#logs').height(Math.max(minHeight, current + freeSpace));

    var top = $('#logs').offset();
    var bottom = $(window).height();

}


var scrollDownLogs = function () {
    if (Session.get('autoScroll')) {
        $('#logs').scrollTop($('#logs').height() + $(window).height());
    }
}

Template.showLogs.autoScroll = function () {
    return Session.get('autoScroll');
}

Template.showLogs.pprint = function (arg) {
    if (arg instanceof Array) {
        var out = [];
        for (var i = 0; i < arg.length; i++) {
            out[i] = Utils.pprint(arg[i]);
        }
        return out.join(', ');
    }
    return Utils.pprint(arg);
};

Template.showLogs.toDate = function (ts) {
    var date = new Date(ts);
    return date.toISOString();

};

Template.showLogs.filterSeverity = function () {
    return Session.get('filterSeverity');
}

Template.showLogs.filterLogger = function () {
    return Session.get('filterLogger');
}

Template.showLogs.loggers = function () {
    return Session.get('loggers');
}

Template.showLogs.events({
    'change #filterSeverity': function (e) {
        Session.set('filterSeverity', $(e.target).val());
        $(e.target).blur();
    },
    'change #filterLogger': function (e) {
        Session.set('filterLogger', $(e.target).val());
        $(e.target).blur();
    },
    'click #filterReset': function (e) {
        Session.set('filterSeverity', '');
        Session.set('filterLogger', '');
        $(e.target).blur();
        e.preventDefault();
    },
    'click .autoScroll': function (e) {
        Session.set('autoScroll', !Session.get('autoScroll'));
        scrollDownLogs();
        $(e.target).blur();
        e.preventDefault();
    }
});

Template.showLogs.action = function () {
    scrollDownLogs();
}

Template.showLogs.created = function () {
    $(window).resize(function () {
        resizeLogsTable();
    });
}

Template.showLogs.destroyed = function () {
    $(window).off('resize');
};

Template.showLogs.rendered = function () {
    var id = Meteor.setInterval(function () {
        if ($('#logs').offset() !== undefined) {
            $('#logs table').stickyTableHeaders({
                scrollableArea: $('#logs')
            });
            resizeLogsTable();
            scrollDownLogs();
            Meteor.clearInterval(id);
        }
    }, 10);
}