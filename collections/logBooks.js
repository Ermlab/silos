LogBooks = new Meteor.Collection('logBooks');
LogBooks.allow({
	insert: function(userId, doc) {
	return !! userId;
	}
});
Logs = new Meteor.Collection('logs');
Limits =new Meteor.Collection('limits');
