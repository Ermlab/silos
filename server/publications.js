Meteor.publish('logBooks', function () {
    if (this.userId) {
        var cursor = LogBooks.find({
            'Members.UserId': this.userId
        });
        logger.debug('Publishing ' + cursor.count() + ' logbooks to ' + this.userId);
        return cursor;
    }
});


Meteor.publish('logs', function (id, limit) {
    // TODO: make sure that current user can subscribe to this logbook
    limit = limit || 20;

    var cursor = Logs.find({
        LogBookID: id
    }, {
        sort: {
            date: -1
        },
        limit: limit
    });

    logger.debug('published ' + cursor.count() + ' logs in ' + id + ' to ' + this.userId);
    return cursor;
});




Meteor.publish('logs-by-token', function (token) {
    // TODO: make sure that current user can subscribe to this logbook
    var logbook = LogBooks.findOne({
        Key: token
    });

    console.log(logbook);

    if (logbook) {
        var cursor = Logs.find({
            LogBookID: logbook._id
        });
        logger.debug('(token) publishing ' + cursor.count() + ' logs in ' + logbook._id);
        // publish logs and logbook
        return [cursor, LogBooks.find({
            Key: token
        })];
    }
});

Meteor.publish("userData", function () {
    return Meteor.users.find({
        _id: this.userId
    }, {
        fields: {
            'logbookLimit': 1,
            'LastVisit': 1
        }
    });
});

Meteor.publish("adminLogbooks", function () {
    if (Roles.userIsInRole(this.userId, ['admin'])) {
        return LogBooks.find();
    } else {
        this.stop();
        return;
    }
});

Meteor.publish("adminUsers", function () {
    if (Roles.userIsInRole(this.userId, ['admin'])) {
        return Meteor.users.find();
    } else {
        this.stop();
        return;
    }
});