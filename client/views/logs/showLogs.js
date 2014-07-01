Template.showLogs.events({
    'submit form': function(e) {
        e.preventDefault();
        $(e.target).find('[level=Level]').val();
    },
    ownPost: function() {
        return this.AuthorID == Meteor.userId(); }
});
Template.showLogs.rendered=function()
{
    console.log(Logs.find().fetch().logd);
}
Template.showLogs.events({
    'submit form[id=tagForm]': function(e) {
        console.log("witaj");
        e.preventDefault();
        var tag=$(e.target).find('#tag').val();
        console.log(tag);
        var path="/showLogs/"+this.id+"/tag/"+tag;
        Router.go(path)
    },
    'click .delete': function(e) {
	if (confirm("Usunac loga?")) {
	var currentLogId = this._id;
	Logs.remove(currentLogId);
	}
     }
});
Template.showLogs.events({
    'submit form[id=levelForm]': function(e) {
        console.log("witaj");
        e.preventDefault();
        var level=$(e.target).find('#level').val();
        console.log(tag);
        var path="/showLogs/"+this.id+"/level/"+level;
        Router.go(path)
    }
})


