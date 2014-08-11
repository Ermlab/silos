Meteor.methods({
    clearLogBook: function (LogBookId) {
        if (!this.isSimulation) {
            Logs.remove({
                LogBookID: LogBookId
            });
            LogBooks.update({
                _id: LogBookId
            }, {
                $set: {
                    LogsCount: 0
                }
            })
        }
    },
    updateTime: function (LogBookId) {
        if (Meteor.isServer) {
            if (!this.isSimulation) {

                var Logbooks = LogBooks.findOne({
                    _id: LogBookId
                });
                var visited = false;
                Logbooks.LastVisit.forEach(function (obj) {
                    if (obj.user === Meteor.userId()) {
                        visited = true;
                    }
                });
                console.log(visited);

                if (visited) {

                    LogBooks.update({
                        _id: LogBookId,
                        "LastVisit.user": Meteor.userId()
                    }, {
                        $set: {
                            "LastVisit.$.date": (new Date()).getTime()
                        }
                    });
                } else {
                    console.log("first time");
                    LogBooks.update({
                        _id: LogBookId
                    }, {
                        $push: {
                            'LastVisit': {
                                'user': Meteor.userId(),
                                'date': (new Date()).getTime()
                            }
                        }
                    });
                }
            }
        }
    }
});