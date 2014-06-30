Template.showLogs.events({
'submit form': function(e) {
e.preventDefault();
$(e.target).find('[level=Level]').val();
},
ownPost: function() {
	return this.AuthorID == Meteor.userId(); }
});
