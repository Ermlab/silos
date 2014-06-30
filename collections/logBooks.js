LogBooks = new Meteor.Collection('logBooks');
LogBooks.allow({
	insert: function(userId, doc) {
	return !! userId;
	},
    update: function(userId, doc) {
        return !! userId;
    }
});
Logs = new Meteor.Collection('logs');
Limits =new Meteor.Collection('limits');
//LogBookUsers=new Meteor.Collection('logBookUsers');
