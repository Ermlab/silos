if (Meteor.isServer) {
    Meteor.setInterval(function () {
        var countBefore = Logs.find().count();
        var timestamp = Date.now() - 14 * 24 * 3600 * 1000;
        Logs.remove({
            date: {
                $lt: timestamp
            }
        });
        var countAfter = Logs.find().count();
        
        // update log counts
        _.each(LogBooks.find().fetch(), function (l) {
            var count = Logs.find({
                LogBookID: l._id
            }).count();
            LogBooks.update(l._id, {
                $set: {
                    LogsCount: count
                }
            });
        });

    }, 60 * 1000);
}