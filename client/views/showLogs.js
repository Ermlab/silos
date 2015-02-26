var resizeLogsTable = function () {
    var freeSpace = $(window).height() - $("html").outerHeight();
    var current = $('#logs').height();
    var minHeight = $('#col-logbooks').height();
    $('#logs').height(Math.max(minHeight, current + freeSpace));
    var top = $('#logs').offset();
    var bottom = $(window).height();            
}

var scrollDownLogs = function () {
    if ($('#logs').length == 0) {
        console.warn("Can't scroll down. #logs does not exist");
    }
    $('#logs').scrollTop($('#logs table').height() + $(window).height());
}

Template.showLogs.helpers({
    autoScroll: function () {
        return Session.get('autoScroll');
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
    onLoaded: function () {
        if (Session.get("autoScroll")) {
            scrollDownLogs();
        }
    },

    // called every time new data arrives to collection
    onData: function () {
        resizeLogsTable();

        if (Logs.find().count() > 0) {
            var target = $('#logs')[0];
            
            if (target) {
                var fromBottom = target.scrollHeight - target.scrollTop;
                var fromTop = target.scrollHeight - fromBottom;
                
                if (target.oldHeight===undefined) {
                    target.oldHeight = target.scrollHeight;
                }
                
                var step = target.scrollHeight - target.oldHeight;
                if (step > 0) {
                    $('#logs').scrollTop($('#logs').scrollTop() + step);
                }
                
                if (!this.loading) {
                    target.oldHeight = undefined;
                }
            }
        }
    },
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
        Session.set('filterDate', '');
        $(e.target).blur();
        e.preventDefault();
    },
    'click .autoScroll': function (e) {
        Session.set('autoScroll', !Session.get('autoScroll'));
        
        if (Session.get('autoScroll')) {
            scrollDownLogs();
        }
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
    },
    'scroll': function (e) {
        var fromBottom = e.target.scrollHeight - e.target.scrollTop;
        var fromTop = e.target.scrollHeight - fromBottom;
        
        var key = '{0}_limit'.format(this.logbook._id);
        if (fromTop == 0 && Session.get(key) < this.logbook.LogsCount) {
            Session.set("autoScroll", false);
            Session.set(key, Session.get(key) + 100);
        }
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
    $('#filterDate').datetimepicker({
        format: DATE_TIME_FORMAT,
        formatTime: TIME_FORMAT,
        formatDate: DATE_FORMAT
    });
}

Template.logEntry.helpers({
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
});