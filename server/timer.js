if (Meteor.isServer) {
    Meteor.setInterval(function () {
        var countBefore = Logs.find().count();
        var timestamp = Date.now() - 700 * 24 * 3600;
        Logs.remove({
            date: {
                $lt: timestamp
            }
        });
        var countAfter = Logs.find().count();
        console.log("Logs removed (before/after)", countBefore, countAfter);

    }, 60 * 1000);
}