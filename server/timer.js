/**
 * Created by radek on 01.07.14.
 */
if (Meteor.isServer) {
    Meteor.setInterval(function () {
        // console.log("Timer");
        // console.log((new Date).setMonth((new Date).getMonth()-1));
        Logs.remove({
            LogDate: {
                $lt: (new Date).setMonth((new Date).getMonth() - 1)
            }
        });
        LogBooks.find().fetch().forEach(
            function (obj) {
                //console.log(obj._id);
                if (Logs.find({
                    LogBookID: obj._id
                }).count() > 100) {
                    Logs.remove({
                        LogBookID: obj._id,
                        LogDate: {
                            $lt: Logs.find({
                                LogBookID: obj._id
                            }).fetch()[100].LogDate
                        }
                    });
                }

                // TODO: update logs count in logbook
            }
        );
    }, 1000);
}