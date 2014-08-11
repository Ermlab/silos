Meteor.publish('logBooks', function () {
    console.log('Publishing logbooks to ' + this.userId);
    var cursor = LogBooks.find({
        'Members.UserId': this.userId
    });
    console.log('publishing ' + cursor.count() + ' logbooks to ' + this.userId);
    return cursor;
});


Meteor.publish('logs', function (id) {
    // TODO: make sure that current user can subscribe to this logbook

    var cursor = Logs.find({
        LogBookID: id
    });
    console.log('publishing ' + cursor.count() + ' logs in ' + id + ' to ' + this.userId);
    return cursor;
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