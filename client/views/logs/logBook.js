Template.logBook.helpers({
ownPost: function() {
	return this.AuthorID == Meteor.userId(); }
});

Template.logBookSub.events({
    'click .goTologBook': function(e)
    {
        gotToLogBook(e)
    }
});
Template.logBook.events({
    'click .goTologBook': function(e)
    {
        gotToLogBook(e)
    }
});
function gotToLogBook(e)
{
    var adress=e.target.href.split("/");
    var ID=adress[adress.length-1]
    Meteor.call('createTable',ID,window.location.hash.substring(1));
}


