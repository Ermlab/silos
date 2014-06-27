Template.showLogs.events({
'submit form': function(e) {
e.preventDefault();
$(e.target).find('[level=Level]').val();
}
})
