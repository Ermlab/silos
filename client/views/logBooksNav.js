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
    'click #insertActive': function (e) {
        var getElement = e.currentTarget.getAttribute('ref');

        var allLogsBooks = LogBooks.find().fetch();

        for (var i = 0; i < LogBooks.find().count(); i++) {
            if (allLogsBooks[i]._id == e.currentTarget.getAttribute('ref')) {
                document.getElementById(getElement).setAttribute('class', 'active');
                var object = document.getElementsByName(allLogsBooks[i]._id);
                object[0].setAttribute('id', 'changeIconColor');
                object[1].setAttribute('id', 'changeIconColor');
            } else {
                document.getElementById(allLogsBooks[i]._id).setAttribute('class', '');
                var object = document.getElementsByName(allLogsBooks[i]._id);
                object[0].setAttribute('id', 'changeIconColor');
                object[1].setAttribute('id', 'changeIconColor');
            }
        }
    }
});