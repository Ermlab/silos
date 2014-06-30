Template.addUser.events({
    'submit form': function(e) {
        e.preventDefault();

        Nazwa=$(e.target).find('[name=Nazwa]').val();
        console.log(Nazwa);
        console.log( this.id);
        LogBooks.update({ _id: this.id },{ $push: { users: Nazwa }});


       Router.go('/');
    }
});
