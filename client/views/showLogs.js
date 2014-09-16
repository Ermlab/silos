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
    var data = new Date(ts);
    return moment(data).format('DD/MM/YYYY HH:mm');
};

Template.showLogs.filtredByDate = function (object) {
    var base = object;

    var fromMoment = document.getElementById("datetimepicker").value;

    if (fromMoment) {
        var myDate = fromMoment.substring(0, 10);
        myDate = myDate.split("/");

        var myHours = fromMoment.substring(10);
        myHours = myHours.split(":");

        var newDate = myDate[1] + "/" + myDate[0] + "/" + myDate[2] + " " + myHours[0] + ":" + myHours[1];

        var convertDate = new Date(newDate).getTime();

        var dif = base - convertDate;

        var daysDifference = Math.floor(dif / 1000 / 60);

        dif -= daysDifference * 1000 * 60;

        if (daysDifference > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
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

Template.showLogs.alertClass = function () {
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
    },
    'click .log-body': function (e) {
        $(e.target).toggleClass('format-pre');
    },
    'click .log-body': function (e) {
        $(e.target).toggleClass('format-pre');
    },
    'click #filtered': function (e) {
        e.preventDefault();
        console.log('Hi i am here !');
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
    }, 500);

    jQuery('#datetimepicker').datetimepicker({
        format: 'd/m/Y H:i'
    });
}