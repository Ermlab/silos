var resizeLogsTable = function () {
    var freeSpace = $(window).height() - $("html").outerHeight();

    var current = $('#logs').height();

    var minHeight = $('#col-logbooks').height();

    $('#logs').height(Math.max(minHeight, current + freeSpace));

    var top = $('#logs').offset();

    var bottom = $(window).height();

}

var scrollDownLogs = function () {
    if (Session.get('autoScroll')) {
        $('#logs').scrollTop($('#logs table').height() + $(window).height());
    }
}

Template.showLogs.helpers({
    autoScroll: function () {
        return Session.get('autoScroll');
    },

    pprint: function (arg) {
        if (arg instanceof Array) {
            var out = [];
            for (var i = 0; i < arg.length; i++) {
                out[i] = Utils.pprint(arg[i]);
            }
            return out.join(', ');
        }
        return Utils.pprint(arg);
    },

    toDate: function (ts) {
        var data = new Date(ts);
        return moment(data).format(DATE_TIME_FORMAT);
    },

    filterSeverity: function () {
        return Session.get('filterSeverity');
    },

    filterLogger: function () {
        return Session.get('filterLogger');
    },

    filterDate: function () {
        return Session.get('filterDate');
    },

    loggers: function () {
        return Session.get('loggers');
    },

    alertClass: function () {
        switch (this.level) {
        case 1:
            return 'alert-trace';
        case 2:
            return 'alert-info';
        case 3:
            return 'alert-success';
        case 4:
            return 'alert-warning';
        case 5:
            return 'alert-danger';
        case 6:
            return 'alert-fatal';
        }
    }
});


Template.showLogs.events({
    'change #filterSeverity': function (e) {
        Session.set('filterSeverity', $(e.target).val());
        $(e.target).blur();
    },
    'change #filterLogger': function (e) {
        Session.set('filterLogger', $(e.target).val());
        $(e.target).blur();
    },
    'change #filterDate': function (e) {
        Session.set('filterDate', $(e.target).val());
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
    },
    'click .log-body': function (e) {
        $(e.target).toggleClass('format-pre');
    },
    'click .log-body': function (e) {
        $(e.target).toggleClass('format-pre');
    },
    'click #filtered': function (e) {
        e.preventDefault();
    }
});

Template.showLogs.helpers({
    action: function () {
        scrollDownLogs();
    }
});

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
    }, 500);

    $('#filterDate').datetimepicker({
        format: DATE_TIME_FORMAT,
        formatTime: TIME_FORMAT,
        formatDate: DATE_FORMAT
    });

}