Template.createLogBook.isDisabled = function () {
    if (!Utils.canAddNewLogbook()) {
        return 'disabled';
    }
};

Template.createLogBook.events({
    'click #newLogbookBtn': function (e) {
        e.preventDefault();
        
        var timestamp = (new Date()).getTime();

        var logBook = {
            Name: 'Untitled logbook',
            Key: Random.id(64),
            Created: timestamp,
            LogsCount: 0,
            Fields: [],
            Members: [
                {
                    UserId: Meteor.userId(),
                    LastViewed: timestamp,
                    Role: 'owner'
                }
            ]
        };
        var id = LogBooks.insert(logBook);

        Session.set('newLogbookCreated', true);
        Router.go('logBookSettings', {
            _id: id
        });
    }
});