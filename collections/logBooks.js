LogBooks = new Meteor.Collection('logBooks');

LogBooks.allow({
	insert: function(userId, doc) {
	return !! userId;
	}
});
