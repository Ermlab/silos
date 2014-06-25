Template.createLogBook.events({
'submit form': function(e) {
e.preventDefault();

var LogBook = {
Nazwa: $(e.target).find('[name=Nazwa]').val()
}
LogBook._id = LogBooks.insert(LogBook);
Router.go('/',LogBook);
}
});
