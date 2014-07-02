LogBooks = new Meteor.Collection('logBooks');
LogBooks.allow({
	insert: function(userId, doc) {

	return !! userId;
	},
	update: ownsDocument,
	remove: ownsDocument

});

Users = new Meteor.Collection("userData");

Users.allow({
    update: function(userId, doc, fields, modifier)
    {
        return true;
    }
});

Logs = new Meteor.Collection('logs');

//LogBookUsers=new Meteor.Collection('logBookUsers');

Logs.allow({
	insert: function(userId, doc) {

	return !! userId;},
	remove: function(userId, doc) {

	return true;
	}

});
Houston.add_collection(Meteor.users);
