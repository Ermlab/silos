var updates = {
    '1' : function () {
        var user = Meteor.users.findOne();
        logger.info('User ' + user.emails[0].address + ' gets admin rights');
        Roles.addUsersToRoles(user._id, ['admin']);
    },
    '2' : function () {
        Meteor.users.update({}, {$set: {logbookLimit:3}});
    }
};

Updates = {
    run: function () {
        var upd = Settings.findOne('updates');
        var done = [];
        
        if (upd !== undefined && upd.done !== undefined) {
            done = upd.done;
        }
        
        for (var key in updates) {
            if (!_.contains(done, key)) {
                logger.info("Applying update "+key);
                updates[key]();
                Settings.upsert('updates', {$push: {'done': key}});
            }
        }
    },
    define: function (u) {
        updates = u;
    }
};