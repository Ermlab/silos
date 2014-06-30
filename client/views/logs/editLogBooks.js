Template.editLogBook.events({
'submit form': function(e) {
e.preventDefault();


var currentLogBookId = this._id;

var logBookProperties = {
Nazwa: $(e.target).find('[name=Nazwa]').val()


}



LogBooks.update(currentLogBookId, {$set: logBookProperties}, function(error) {
if (error) {
alert(error.reason);
} else {
Router.go('showLogBooks', {_id: currentLogBookId});
}
});
},

'click .delete': function(e) {
e.preventDefault();

if (confirm("Usunac LogBooka?")) {
var currentLogBookId = this._id;
console.log(LogBooks.find({_id: currentLogBookId}).count());
LogBooks.remove(currentLogBookId);
console.log(LogBooks.find({_id: currentLogBookId}).count());
Router.go('showLogBooks');
}
}
});
