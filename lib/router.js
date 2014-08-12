Router.configure({
    layoutTemplate: 'masterLayout',
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
                console.log(last);
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
                filter.Level = filterSeverity + ''
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

            /*
            var hash = window.location.hash.substring(1).split("&");
            var json = [];
            var table = [];
            var jsonVariable = {};
            jsonVariable['LogBookID'] = this.params._id;
            if (hash[0] > 0) {
                jsonVariable['LogSeverity'] = hash[0];
            }
            if (hash.length > 1) {
                var search = hash[1].toString().split("=");
                if (search[0] != "" && search[1] != "") {
                    jsonVariable[search[0]] = search[1];
                }
                console.log("searching: ", jsonVariable);
            }


            var findLogs = Logs.find(jsonVariable).fetch();
            var fields = currentLogbook.View;
            var keys = [];
            fields.forEach(function f(field) {
                if (field.visible) {
                    switch (field.field) {
                    case "LogSeverity":
                    case "LogDate":
                        break;
                    default:
                        keys.push({
                            key: field.field
                        });
                        break;
                    }
                }
            });
            findLogs.forEach(function makeTable(entity) {
                var row = [];
                fields.forEach(function f(field) {
                    if (field.visible) {
                        switch (field.field) {
                        case "LogSeverity":
                            {
                                switch (entity[field.field]) {
                                case "1":
                                    row.push({
                                        field: "debug"
                                    });
                                    break;
                                case "2":
                                    row.push({
                                        field: "info"
                                    });
                                    break;
                                case "3":
                                    row.push({
                                        field: "warrning"
                                    });
                                    break;
                                case "4":
                                    row.push({
                                        field: "error"
                                    });
                                    break;
                                case "5":
                                    row.push({
                                        field: "fatal"
                                    });
                                    break;
                                default:
                                    row.push({
                                        field: "undefined"
                                    });
                                    break;
                                }
                            }
                            break;
                        case "LogDate":
                            {
                                row.push({
                                    field: (new Date(entity[field.field])).toDateString()
                                });
                            }
                            break;
                        default:
                            {
                                row.push({
                                    field: entity[field.field]
                                });
                            }
                        }

                    }
                });
                table.push({
                    row: row
                });
            });
            */
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
});