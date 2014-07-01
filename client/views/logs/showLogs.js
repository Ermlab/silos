Template.showLogs.events({
'submit form': function(e) {
e.preventDefault();
$(e.target).find('[level=Level]').val();
}
})

Template.showLogs.events({
    'submit form[id=tagForm]': function(e) {
        console.log("witaj");
        e.preventDefault();
        var tag=$(e.target).find('#tag').val();
        console.log(tag);
        var path="/showLogs/"+this.id+"/tag/"+tag;
        Router.go(path)
    }
})
