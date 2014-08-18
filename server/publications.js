Meteor.publish('logBooks', function () {
    if (this.userId) {
        var cursor = LogBooks.find({
            'Members.UserId': this.userId
        });
        console.log('Publishing ' + cursor.count() + ' logbooks to ' + this.userId);
        return cursor;
    }
});


Meteor.publish('logs', function (id) {
    // TODO: make sure that current user can subscribe to this logbook

    var cursor = Logs.find({
        LogBookID: id
    });
    console.log('publishing ' + cursor.count() + ' logs in ' + id + ' to ' + this.userId);
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
        console.log('(token) publishing ' + cursor.count() + ' logs in ' + logbook._id);
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
            'Limit': 1,
            'LastVisit': 1
        }
    });
});