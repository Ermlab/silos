var requireAdmin = function () {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
        //TODO???
    }
}


var buildFilter = function () {
    var filter = {};
    var filterSeverity = Session.get('filterSeverity');
    var filterLogger = Session.get('filterLogger');
    var filterDate = Session.get('filterDate');

    var m = moment(filterDate, DATE_TIME_FORMAT);

    if (filterSeverity) {
        filter.level = {
            $gte: filterSeverity * 1
        };
    }
    if (filterLogger) {
        filter.logger = filterLogger;
    }

    if (m.isValid()) {
        filter.date = {
            $gte: m.valueOf()
        }
    }
    return filter;
}

Router.configure({
    layoutTemplate: 'masterLayout',
    onBeforeAction: function () {}
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

    this.route('signin', {
        path: '/signin',
        data: function () {
            return {};
        },
        onAfterAction: function () {
            document.title = 'Silos';
        },
    });

    this.route('showLogs', {
        path: '/logbook/:_id',
        onBeforeAction: function () {
            var id = this.params._id;
            Session.set('loggers', []);
            Session.set('currentLogBook', this.params._id);
        },
        waitOn: function () {
            // FIXME: update directly via mongo?
            // Meteor.call('updateTime', this.params._id);

            // Subscribe to all logs in the logbook
            var id = this.params._id;
            Session.setDefault('{0}_limit'.format(id), 100);
            return Meteor.subscribe('logs', id, Session.get('{0}_limit'.format(id)));
            
        },
        data: function () {
            var id = this.params._id;
            var isReady = this.ready();

            var logs = Logs.find(buildFilter(), {
                sort: {
                    date: 1
                }
            }).fetch();

            for (var i in logs) {
                logs[i].levelStr = Utils.logLevelFromInt(logs[i].level);
            }

            return {
                logbook: LogBooks.findOne({
                    _id: this.params._id
                }),
                logs: logs,
                logsCount: Logs.find().count(),
                loading: !isReady
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
            var id = this.params._id;
            Session.setDefault('{0}_limit'.format(id), 1);

            var logs = Logs.find(buildFilter(), {
                sort: {
                    date: 1
                }
            }).fetch();

            for (var i in logs) {
                logs[i].levelStr = Utils.logLevelFromInt(logs[i].level);
            }

            return {
                logbook: LogBooks.findOne(),
                logs: logs,
                loading: !this.ready()
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

    this.route('logBookHelp', {
        path: '/logbook/:_id/help',
        waitOn: function () {},
        data: function () {
            return {
                logbook: LogBooks.findOne(this.params._id)
            };
        }
    });

    this.route('adminLogbooks', {
        path: '/admin/logbooks',
        waitOn: function () {
            // Subscribe to all logs in the logbook
            return [Meteor.subscribe('adminLogbooks'), Meteor.subscribe('adminUsers')];
        },
        data: function () {
            var lb = LogBooks.find().fetch();
            for (var i in lb) {
                var user = Meteor.users.findOne(lb[i].Members[0].UserId);
                if (user) {
                    lb[i].owner = user.username;
                }
            }

            return {
                users: Meteor.users.find().fetch(),
                logBooks: lb
            }
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