LogBooks = new Meteor.Collection('logBooks');
LogBooks.allow({
	insert: function(userId, doc) {

	return !! userId;
	},
	update: ownsDocument,
	remove: ownsDocument

});

Logs = new Meteor.Collection('logs');
Limits =new Meteor.Collection('limits');
//LogBookUsers=new Meteor.Collection('logBookUsers');

Logs.allow({
	insert: function(userId, doc) {

	return !! userId;},
	remove: function(userId, doc) {

	return true;
	}

});

//Houston.add_collection(Meteor.users);