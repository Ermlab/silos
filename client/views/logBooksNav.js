Template.logBooksNav.helpers({
    logBooks: function () {
        // find all logbook which current user is member of
        var la = LogBooks.find({
            Members: {
                $elemMatch: {
                    UserId: Meteor.userId()
                }
            }
        }).fetch()

        _.each(la, function (obj) {
            try {
                obj.isntRead = Logs.find({
                    LogBookID: obj._id,
                    LogDate: {
                        $gt: (new Date(obj.LastVisit[0].date).getTime())
                    }
                }).count();

            } catch (E) {
                obj.isntRead = Logs.find({
                    LogBookID: obj._id
                }).count();
            };
        });
        return la;
    },
    
    activeClass: function () {
        return Session.get("currentLogBook") == this._id ? "active" : "";
    },

    friendsLogBooks: function () {
        var user = Meteor.user();
        var email = user && user.emails && user.emails[0].address;
        var user = Meteor.user();
        var email = user && user.emails && user.emails[0].address;
        var lb = LogBooks.find({
            "users": email
        }).fetch();
        _.each(lb, function (obj) {
            try {
                obj.isntRead = Logs.find({
                    LogBookID: obj._id,
                    LogDate: {
                        $gt: (new Date(obj.LastVisit[0].date).getTime())
                    }
                }).count();
            } catch (E) {
                obj.isntRead = Logs.find({
                    LogBookID: obj._id
                }).count();
            }
        });
        return lb;
    }
});


Template.logBooksNavItem.helpers({
    ownPost: function () {
        return this.AuthorID == Meteor.userId();
    }
});

Template.logBooksNavItem.events({
});