Template.createLogBook.events({
'submit form': function(e) {
e.preventDefault();

var LogBook = {
Nazwa: $(e.target).find('[name=Nazwa]').val(),
Key: Random.id(64)
}
LogBook._id = LogBooks.insert(LogBook);

Router.go('/',LogBook);
}
});
