Router.configure({
    layoutTemplate: 'masterLayout',
    onBeforeAction: function () {
        console.log('glob onba');
    }
});

//Router.onBeforeAction('loading');

Router.map(function () {
    this.route('welcome', {
        path: '/',
        waitOn: function () {},
        data: function () {}
    });

    this.route('lastLogbook', {
        path: '/lastLogbook',
        onAfterAction: function () {
            try {
                var last = LogBooks.findOne();
                if (last) {
                    Router.go('showLogs', {
                        _id: last._id
                    });
                }
            } catch (e) {
                Router.go('welcome');
            }
        }
    });

    this.route('showLogs', {
        path: '/logbook/:_id',
        waitOn: function () {
            // FIXME: update directly via mongo?
            // Meteor.call('updateTime', this.params._id);

            // Subscribe to all logs in the logbook
            return Meteor.subscribe('logs', this.params._id);
        },
        data: function () {
            var filter = {};
            var filterSeverity = Session.get('filterSeverity');
            if (filterSeverity) {
                filter.level = {
                    $gte: filterSeverity * 1
                };
            }
            var logs = Logs.find(filter).fetch();

            for (var i in logs) {
                logs[i].levelStr = Utils.logLevelFromInt(logs[i].level);
            }

            return {
                logbook: LogBooks.findOne({
                    _id: this.params._id
                }),
                logs: logs,
            };

        }
    });

    this.route('showLogsToken', {
        path: '/view/:token',
        template: 'showLogs',
        layoutTemplate: 'masterLayoutShowLogbookWithToken',
        waitOn: function () {
            // Subscribe to all logs in the logbook
            return Meteor.subscribe('logs-by-token', this.params.token);
        },

        data: function () {
            var filter = {};
            var filterSeverity = Session.get('filterSeverity');
            if (filterSeverity) {
                filter.level = {
                    $gte: filterSeverity * 1
                };
            }
            var logs = Logs.find(filter).fetch();

            for (var i in logs) {
                logs[i].levelStr = Utils.logLevelFromInt(logs[i].level);
            }

            return {
                logbook: LogBooks.findOne(),
                logs: logs,
            };
        }
    });

    this.route('logBookSettings', {
        path: '/logbook/:_id/settings',
        waitOn: function () {},
        data: function () {
            return {
                logbook: LogBooks.findOne(this.params._id)
            };
        }
    });

    this.route('noAccess', {
        path: "/noAccess"
    });

});

/*
function requireLoginCreate(pause) {
    if (!Meteor.user()) {
        this.render('accessDenied');
        pause();
    }
}

function requireLoginShow(pause) {
    if (!Meteor.user()) {
        this.render('startPage');
        pause();
    }
}

Router.onBeforeAction(requireLoginCreate, {
    only: 'createLogBook'
});
Router.onBeforeAction(requireLoginCreate, {
    only: 'addUser'
});
Router.onBeforeAction(requireLoginCreate, {
    only: 'editLogBook'
});
Router.onBeforeAction(requireLoginCreate, {
    only: 'showUsers'
});
Router.onBeforeAction(requireLoginShow, {
    only: 'showLogBooks'
});*/